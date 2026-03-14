<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function home(Request $request)
    {
        $query = Property::with(['category', 'images'])
            ->where('status', 'active');

        if ($request->filled('location')) {
            $query->where(function($q) use ($request) {
                $q->where('address', 'like', '%' . $request->location . '%')
                  ->orWhere('city', 'like', '%' . $request->location . '%')
                  ->orWhere('state', 'like', '%' . $request->location . '%');
            });
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        $properties = $query->latest()->limit(8)->get();

        return Inertia::render('Welcome', [
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('register'),
            'categories' => Category::whereNull('parent_id')->where('is_active', true)->get(),
            'properties' => $properties,
            'filters' => $request->only(['location', 'category'])
        ]);
    }

    public function index(Request $request)
    {
        $query = Property::with(['category', 'images', 'user'])
            ->where('status', 'active');

        // Apply Search Filters
        if ($request->filled('location')) {
            $query->where(function($q) use ($request) {
                $q->where('address', 'like', '%' . $request->location . '%')
                  ->orWhere('city', 'like', '%' . $request->location . '%')
                  ->orWhere('state', 'like', '%' . $request->location . '%')
                  ->orWhere('country', 'like', '%' . $request->location . '%');
            });
        }

        if ($request->filled('city')) {
            $query->where('city', $request->city);
        }

        if ($request->filled('state')) {
            $query->where('state', $request->state);
        }

        if ($request->filled('country')) {
            $query->where('country', $request->country);
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('type')) {
            $query->where('purpose', $request->type);
        }

        if ($request->filled('min_price')) {
            $query->where(function($q) use ($request) {
                $q->where('price', '>=', $request->min_price)
                  ->orWhere('rent_price', '>=', $request->min_price);
            });
        }

        if ($request->filled('max_price')) {
            $query->where(function($q) use ($request) {
                $q->where('price', '<=', $request->max_price)
                  ->orWhere('rent_price', '<=', $request->max_price);
            });
        }

        if ($request->filled('bedrooms')) {
            $query->where('bedrooms', '>=', $request->bedrooms);
        }

        if ($request->filled('bathrooms')) {
            $query->where('bathrooms', '>=', $request->bathrooms);
        }

        $properties = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['location', 'category', 'type', 'min_price', 'max_price', 'bedrooms', 'bathrooms', 'city', 'state', 'country']),
            'categories' => Category::whereNull('parent_id')->where('is_active', true)->get()
        ]);
    }

    public function show($slug)
    {
        $property = Property::with(['category', 'images', 'user', 'amenities'])
            ->where('slug', $slug)
            ->where('status', 'active')
            ->firstOrFail();

        // Increment views
        $property->increment('views_count');

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'related_properties' => Property::with(['category', 'images'])
                ->where('category_id', $property->category_id)
                ->where('id', '!=', $property->id)
                ->where('status', 'active')
                ->take(3)
                ->get()
        ]);
    }

    public function map(Request $request)
    {
        $query = Property::with(['category', 'images', 'user'])
            ->where('status', 'active');

        // Reuse filtering logic or keep it simple for map
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }
        
        if ($request->filled('type')) {
            $query->where('purpose', $request->type);
        }

        $properties = $query->get(); // Load all for map markers

        return Inertia::render('Properties/MapSearch', [
            'properties' => $properties,
            'categories' => Category::whereNull('parent_id')->where('is_active', true)->get(),
            'filters' => $request->only(['category', 'type'])
        ]);
    }

    public function suggestLocations(Request $request)
    {
        $query = $request->get('query');
        if (!$query) return response()->json([]);

        $cities = Property::where('status', 'active')
            ->where('city', 'like', "%{$query}%")
            ->distinct()
            ->pluck('city')
            ->map(function($item) { return ['type' => 'city', 'name' => $item]; });

        $states = Property::where('status', 'active')
            ->where('state', 'like', "%{$query}%")
            ->distinct()
            ->pluck('state')
            ->map(function($item) { return ['type' => 'state', 'name' => $item]; });

        return response()->json($cities->merge($states)->unique('name')->values()->take(5));
    }
}
