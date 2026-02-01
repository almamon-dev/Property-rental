<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete(); // If registered user
            
            $table->string('name'); // For guest users
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('message');
            
            $table->enum('type', ['sale', 'rent', 'general'])->default('general');
            $table->enum('status', ['pending', 'contacted', 'resolved', 'spam'])->default('pending');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
