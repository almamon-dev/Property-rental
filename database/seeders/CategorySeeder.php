<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Root Categories
        $residential = Category::updateOrCreate(['slug' => 'residential'], [
            'name' => 'Residential',
            'description' => 'Properties for living purposes.',
            'is_active' => true,
            'icon' => 'home',
        ]);

        $commercial = Category::updateOrCreate(['slug' => 'commercial'], [
            'name' => 'Commercial',
            'description' => 'Properties for business purposes.',
            'is_active' => true,
            'icon' => 'briefcase',
        ]);

        $land = Category::updateOrCreate(['slug' => 'land'], [
            'name' => 'Land',
            'description' => 'Plots and land for development.',
            'is_active' => true,
            'icon' => 'map',
        ]);

        // Sub-categories for Residential
        $residentialSubs = [
            ['name' => 'Apartment', 'slug' => 'apartment', 'icon' => 'building'],
            ['name' => 'House', 'slug' => 'house', 'icon' => 'home'],
            ['name' => 'Villa', 'slug' => 'villa', 'icon' => 'sun'],
            ['name' => 'Studio', 'slug' => 'studio', 'icon' => 'layout'],
            ['name' => 'Duplex', 'slug' => 'duplex', 'icon' => 'layers'],
            ['name' => 'Penthouse', 'slug' => 'penthouse', 'icon' => 'trending-up'],
        ];

        foreach ($residentialSubs as $sub) {
            Category::updateOrCreate(['slug' => $sub['slug']], [
                'name' => $sub['name'],
                'description' => $sub['name'] . ' listed under Residential.',
                'parent_id' => $residential->id,
                'is_active' => true,
                'icon' => $sub['icon'],
            ]);
        }

        // Sub-categories for Commercial
        $commercialSubs = [
            ['name' => 'Office Space', 'slug' => 'office-space', 'icon' => 'monitor'],
            ['name' => 'Shop', 'slug' => 'shop', 'icon' => 'shopping-cart'],
            ['name' => 'Warehouse', 'slug' => 'warehouse', 'icon' => 'truck'],
            ['name' => 'Building', 'slug' => 'building', 'icon' => 'building-2'],
        ];

        foreach ($commercialSubs as $sub) {
            Category::updateOrCreate(['slug' => $sub['slug']], [
                'name' => $sub['name'],
                'description' => $sub['name'] . ' listed under Commercial.',
                'parent_id' => $commercial->id,
                'is_active' => true,
                'icon' => $sub['icon'],
            ]);
        }
        
        // Sub-categories for Land
        $landSubs = [
            ['name' => 'Residential Plot', 'slug' => 'residential-plot', 'icon' => 'map-pin'],
            ['name' => 'Agricultural Land', 'slug' => 'agricultural-land', 'icon' => 'flower'],
            ['name' => 'Industrial Plot', 'slug' => 'industrial-plot', 'icon' => 'factory'],
        ];

        foreach ($landSubs as $sub) {
            Category::updateOrCreate(['slug' => $sub['slug']], [
                'name' => $sub['name'],
                'description' => $sub['name'] . ' listed under Land.',
                'parent_id' => $land->id,
                'is_active' => true,
                'icon' => $sub['icon'],
            ]);
        }
    }
}
