<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'latitude',
        'longitude',
        'purpose',
        'price',
        'rent_price',
        'rent_period',
        'bedrooms',
        'bathrooms',
        'area',
        'build_year',
        'video_url',
        'status',
        'is_featured',
        'views_count',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
        'rent_price' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'build_year' => 'integer',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'views_count' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(PropertyImage::class)->orderBy('order');
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'property_amenity');
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }

    // Scopes for easy filtering
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeForSale($query)
    {
        return $query->whereIn('purpose', ['sale', 'both']);
    }

    public function scopeForRent($query)
    {
        return $query->whereIn('purpose', ['rent', 'both']);
    }
}
