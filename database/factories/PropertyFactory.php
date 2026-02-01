<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $purpose = $this->faker->randomElement(['sale', 'rent', 'both']);
        $price = ($purpose === 'sale' || $purpose === 'both') ? $this->faker->numberBetween(100000, 2000000) : null;
        $rentPrice = ($purpose === 'rent' || $purpose === 'both') ? $this->faker->numberBetween(1000, 10000) : null;
        
        return [
            'user_id' => 1, // Assuming admin is ID 1 for now, or use User::factory()
            'category_id' => \App\Models\Category::inRandomOrder()->first()->id ?? 1,
            'title' => $this->faker->sentence(4),
            'slug' => $this->faker->slug(),
            'description' => $this->faker->paragraphs(3, true),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'zip_code' => $this->faker->postcode(),
            'country' => $this->faker->country(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'purpose' => $purpose,
            'price' => $price,
            'rent_price' => $rentPrice,
            'rent_period' => $rentPrice ? $this->faker->randomElement(['monthly', 'yearly', 'weekly']) : null,
            'bedrooms' => $this->faker->numberBetween(1, 6),
            'bathrooms' => $this->faker->numberBetween(1, 4),
            'area' => $this->faker->numberBetween(500, 5000),
            'build_year' => $this->faker->year(),
            'status' => 'active',
            'is_featured' => $this->faker->boolean(20),
            'views_count' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
