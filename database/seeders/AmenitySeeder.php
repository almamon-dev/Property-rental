<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            ['name' => 'Swimming Pool', 'slug' => 'swimming-pool', 'icon' => 'droplets'],
            ['name' => 'Gym / Fitness Center', 'slug' => 'gym', 'icon' => 'dumbbell'],
            ['name' => 'Car Parking', 'slug' => 'parking', 'icon' => 'car'],
            ['name' => 'High-speed WiFi', 'slug' => 'wifi', 'icon' => 'wifi'],
            ['name' => '24/7 Security', 'slug' => 'security', 'icon' => 'shield-check'],
            ['name' => 'Air Conditioning', 'slug' => 'air-conditioning', 'icon' => 'wind'],
            ['name' => 'Central Heating', 'slug' => 'heating', 'icon' => 'thermometer'],
            ['name' => 'Elevator / Lift', 'slug' => 'elevator', 'icon' => 'arrow-up-circle'],
            ['name' => 'CCTV Cameras', 'slug' => 'cctv', 'icon' => 'video'],
            ['name' => 'Garden / Park', 'slug' => 'garden', 'icon' => 'trees'],
            ['name' => 'Power Backup', 'slug' => 'power-backup', 'icon' => 'zap'],
            ['name' => 'Water Supply', 'slug' => 'water-supply', 'icon' => 'droplet'],
            ['name' => 'Fire Safety', 'slug' => 'fire-safety', 'icon' => 'flame'],
            ['name' => 'Balcony', 'slug' => 'balcony', 'icon' => 'layout'],
            ['name' => 'Furnished', 'slug' => 'furnished', 'icon' => 'armchair'],
            ['name' => 'Maintenance Staff', 'slug' => 'maintenance', 'icon' => 'wrench'],
        ];

        foreach ($amenities as $amenity) {
            \App\Models\Amenity::updateOrCreate(
                ['slug' => $amenity['slug']],
                [
                    'name' => $amenity['name'],
                    'icon' => $amenity['icon'],
                    'is_active' => true,
                ]
            );
        }
    }
}
