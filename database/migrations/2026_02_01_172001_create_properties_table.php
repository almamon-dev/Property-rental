<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            
            // Relationships
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // The agent or owner
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            
            // Basic Info
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            // Location
            $table->string('address');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('country')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            
            // Pricing & Type
            $table->enum('purpose', ['sale', 'rent', 'both'])->default('sale'); // Main design requirement
            $table->decimal('price', 15, 2)->nullable(); // Sale Price
            $table->decimal('rent_price', 15, 2)->nullable(); // Rent Price
            $table->string('rent_period')->nullable(); // e.g., 'monthly', 'yearly', 'weekly'
            
            // Property Details
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->decimal('area', 10, 2)->nullable(); // Square feet or meters
            $table->year('build_year')->nullable();
            $table->string('video_url')->nullable();
            
            // Status & Flags
            $table->enum('status', ['active', 'sold', 'rented', 'inactive', 'pending'])->default('active');
            $table->boolean('is_featured')->default(false);
            $table->integer('views_count')->default(0);
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
