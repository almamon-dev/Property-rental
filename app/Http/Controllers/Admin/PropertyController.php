<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Property;
use App\Models\Amenity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Property::with(['category', 'user'])
            ->latest();

        if ($request->input('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%");
            });
        }

        if ($request->input('status') && $request->input('status') !== 'all') {
            $status = $request->input('status');
            if ($status === 'sale') {
                $query->whereIn('purpose', ['sale', 'both']);
            } elseif ($status === 'rent') {
                $query->whereIn('purpose', ['rent', 'both']);
            } else {
                $query->where('status', $status);
            }
        }

        if ($request->input('per_page')) {
            $perPage = $request->input('per_page');
        } else {
            $perPage = 10;
        }

        $properties = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['search', 'status', 'per_page'])
        ]);
    }

    public function bulkAction(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:properties,id',
            'action' => 'required|string|in:activate,deactivate,delete,sold'
        ]);

        $ids = $request->ids;
        $action = $request->action;

        switch ($action) {
            case 'activate':
                Property::whereIn('id', $ids)->update(['status' => 'active']);
                $message = 'Selected properties have been activated.';
                break;
            case 'deactivate':
                Property::whereIn('id', $ids)->update(['status' => 'inactive']);
                $message = 'Selected properties have been deactivated.';
                break;
             case 'sold':
                Property::whereIn('id', $ids)->update(['status' => 'sold']);
                $message = 'Selected properties marked as sold.';
                break;
            case 'delete':
                Property::whereIn('id', $ids)->delete();
                $message = 'Selected properties have been deleted.';
                break;
            default:
                return redirect()->back()->with('error', 'Invalid action.');
        }

        return redirect()->back()->with('success', $message);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('is_active', true)->get();
        $amenities = Amenity::where('is_active', true)->get();

        return Inertia::render('Admin/Properties/Create', [
            'categories' => $categories,
            'amenities' => $amenities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'purpose' => 'required|in:sale,rent,both',
            'price' => 'nullable|required_if:purpose,sale,both|numeric|min:0',
            'rent_price' => 'nullable|required_if:purpose,rent,both|numeric|min:0',
            'rent_period' => 'nullable|string',
            'address' => 'required|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zip_code' => 'nullable|string',
            'country' => 'nullable|string',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'area' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'amenities' => 'array',
            'amenities.*' => 'exists:amenities,id',
            'images' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180'
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        $validated['user_id'] = auth()->id();
        if ($validated['purpose'] === 'rent' || $validated['purpose'] === 'both') {
            $validated['rent_period'] = 'monthly';
        }

        $property = Property::create($validated);

        if ($request->has('amenities')) {
            $property->amenities()->sync($request->amenities);
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'image_path' => $path,
                    'is_main' => $index === 0, // First image is main by default
                    'order' => $index
                ]);
            }
        }

        return redirect()->route('admin.properties.index')->with('success', 'Property created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        $property->load(['amenities', 'images']);
        $categories = Category::where('is_active', true)->get();
        $amenities = Amenity::where('is_active', true)->get();

        return Inertia::render('Admin/Properties/Edit', [
            'property' => $property,
            'categories' => $categories,
            'amenities' => $amenities
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'purpose' => 'required|in:sale,rent,both',
            'price' => 'nullable|required_if:purpose,sale,both|numeric|min:0',
            'rent_price' => 'nullable|required_if:purpose,rent,both|numeric|min:0',
            'rent_period' => 'nullable|string',
            'address' => 'required|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zip_code' => 'nullable|string',
            'country' => 'nullable|string',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'area' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'amenities' => 'array',
            'amenities.*' => 'exists:amenities,id',
            'images' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180'
        ]);

        if ($validated['title'] !== $property->title) {
           $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        }

        if ($validated['purpose'] === 'rent' || $validated['purpose'] === 'both') {
            $validated['rent_period'] = 'monthly';
        }
        
        $property->update($validated);

        if ($request->has('amenities')) {
            $property->amenities()->sync($request->amenities);
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'image_path' => $path,
                    'is_main' => false,
                    'order' => $property->images()->count() + $index
                ]);
            }
        }

        return redirect()->route('admin.properties.index')->with('success', 'Property updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        $property->delete();
        return redirect()->back()->with('success', 'Property deleted successfully.');
    }
}
