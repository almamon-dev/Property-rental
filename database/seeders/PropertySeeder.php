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
        if (! $admin) {
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
            'Rangpur' => ['Kotwali', 'Mahi Ganj'],
            'Mymensingh' => ['Sadar', 'Valuka'],
        ];

        $propertyTypes = [
            'Luxury Villa', 'Modern Apartment', 'Commercial Office', 'Retail Space',
            'Industrial Warehouse', 'Duplex House', 'Penthouse Suite', 'Residential Plot',
        ];

        foreach ($bdLocations as $division => $areas) {
            foreach ($areas as $city) {
                for ($i = 1; $i <= 5; $i++) {
                    $type = $propertyTypes[array_rand($propertyTypes)];
                    $purpose = collect(['sale', 'rent'])->random();

                    $title = $type.' in '.$city.', '.$division;

                    Property::create([
                        'user_id' => $admin->id,
                        'category_id' => $categories->random()->id,
                        'title' => $title,
                        'slug' => Str::slug($title.'-'.Str::random(5)),
                        'description' => 'This is a premium '.strtolower($type).' located in the heart of '.$city.'. It offers modern amenities and excellent connectivity. Perfect for professionals and families looking for high-quality living or workspace in '.$division.'.',
                        'address' => 'Road '.rand(1, 20).', Block '.chr(rand(65, 75)).', '.$city,
                        'city' => $city,
                        'state' => $division,
                        'zip_code' => (string) rand(1000, 9999),
                        'country' => 'Bangladesh',
                        'latitude' => 23.8103 + (rand(-100, 100) / 1000),
                        'longitude' => 90.4125 + (rand(-100, 100) / 1000),
                        'purpose' => $purpose,
                        'price' => $purpose === 'sale' ? rand(5000000, 50000000) : null,
                        'rent_price' => $purpose === 'rent' ? rand(20000, 150000) : null,
                        'rent_period' => $purpose === 'rent' ? 'monthly' : null,
                        'bedrooms' => rand(1, 6),
                        'bathrooms' => rand(1, 4),
                        'area' => rand(800, 4500),
                        'build_year' => rand(2015, 2025),
                        'status' => 'active',
                        'is_featured' => rand(0, 1),
                        'views_count' => rand(100, 5000),
                    ]);
                }
            }
        }
    }
}
