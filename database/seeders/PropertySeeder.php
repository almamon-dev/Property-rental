<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::first();
        if (!$admin) {
            $admin = User::factory()->create();
        }

        $categories = Category::all();
        if ($categories->isEmpty()) {
            $this->call(CategorySeeder::class);
            $categories = Category::all();
        }

        $bdLocations = [
            'Dhaka' => ['Gulshan', 'Banani', 'Uttara', 'Dhanmondi', 'Mirpur', 'Bashundhara', 'Mohakhali'],
            'Chittagong' => ['Agrabad', 'Nasirabad', 'Halishahar', 'Khulshi', 'Panchlaish'],
            'Sylhet' => ['Zindabazar', 'Amberkhana', 'Shahjalal Uposhohor', 'Osmani Nagar'],
            'Rajshahi' => ['Boalia', 'Motihar', 'Shah Makhdum'],
            'Khulna' => ['Khalishpur', 'Daulatpur', 'Sonadanga'],
            'Barisal' => ['Sadarthana', 'Amtala'],
            'Rangpur' => ['Kotwali', 'Mahi Ganj',''],
            'Mymensingh' => ['Sadar', 'Valuka'],
        ];

        $globalLocations = [
            'United Kingdom' => ['London', 'Manchester', 'Birmingham', 'Liverpool'],
            'United States' => ['New York', 'Los Angeles', 'Chicago', 'Miami'],
            'United Arab Emirates' => ['Dubai', 'Abu Dhabi', 'Sharjah'],
            'Canada' => ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
            'Australia' => ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
            'Singapore' => ['Singapore City', 'Sentosa', 'Jurong'],
        ];

        $propertyTypes = [
            'Luxury Villa', 'Modern Apartment', 'Commercial Office', 'Retail Space', 
            'Industrial Warehouse', 'Duplex House', 'Penthouse Suite', 'Residential Plot'
        ];

        $propertyImages = [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1580587771525-78b9bed2e194?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        ];

        // Seed Bangladesh Properties: 5 per Division
        foreach ($bdLocations as $division => $cities) {
            for ($i = 1; $i <= 5; $i++) {
                $city = $cities[array_rand($cities)];
                $this->createProperty($admin, $categories, $division, $city, 'Bangladesh', $propertyTypes, $propertyImages);
            }
        }

        // Seed Global Properties: 5 per Country
        foreach ($globalLocations as $country => $cities) {
            for ($i = 1; $i <= 5; $i++) {
                $city = $cities[array_rand($cities)];
                $this->createProperty($admin, $categories, $country, $city, $country, $propertyTypes, $propertyImages);
            }
        }
    }

    private function createProperty($admin, $categories, $state, $city, $country, $propertyTypes, $propertyImages)
    {
        $type = $propertyTypes[array_rand($propertyTypes)];
        $purpose = collect(['sale', 'rent'])->random();
        $title = $type . ' in ' . $city . ', ' . $state;
        
        // Adjust coordinates slightly based on country if possible, or just random
        $lat = ($country === 'Bangladesh') ? 23.8103 : rand(-30, 50);
        $lng = ($country === 'Bangladesh') ? 90.4125 : rand(-120, 140);

        $property = \App\Models\Property::create([
            'user_id' => $admin->id,
            'category_id' => $categories->random()->id,
            'title' => $title,
            'slug' => Str::slug($title . '-' . Str::random(5)),
            'description' => 'This is a premium ' . strtolower($type) . ' located in the heart of ' . $city . '. It offers modern amenities and excellent connectivity. Perfect for professionals and families looking for high-quality living or workspace in ' . $state . ', ' . $country . '.',
            'address' => 'Street ' . rand(1, 100) . ', ' . $city,
            'city' => $city,
            'state' => $state,
            'zip_code' => (string)rand(1000, 9999),
            'country' => $country,
            'latitude' => $lat + (rand(-500, 500) / 1000),
            'longitude' => $lng + (rand(-500, 500) / 1000),
            'purpose' => $purpose,
            'price' => $purpose === 'sale' ? rand(5000000, 150000000) : null,
            'rent_price' => $purpose === 'rent' ? rand(20000, 500000) : null,
            'rent_period' => $purpose === 'rent' ? 'monthly' : null,
            'bedrooms' => rand(1, 8),
            'bathrooms' => rand(1, 6),
            'area' => rand(800, 10000),
            'build_year' => rand(2010, 2026),
            'status' => 'active',
            'is_featured' => rand(0, 1),
            'views_count' => rand(100, 10000),
        ]);

        // Seed property images
        $randomImages = collect($propertyImages)->random(3);
        foreach ($randomImages as $index => $imageUrl) {
            $property->images()->create([
                'image_path' => $imageUrl,
                'is_main' => $index === 0,
                'order' => $index,
            ]);
        }
    }
}
