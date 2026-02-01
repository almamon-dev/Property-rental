
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Home, ChevronLeft, X, ChevronDown, MapPin, LayoutGrid, ImagePlus } from 'lucide-react';
import GoogleMapSelector from '@/Components/Admin/GoogleMapSelector';

export default function Create({ categories, amenities }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: '',
        purpose: 'sale', // default
        price: '',
        rent_price: '',
        rent_period: 'monthly',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        description: '',
        amenities: [],
        images: [],
        latitude: '',
        longitude: '',
        is_featured: false,
        status: 'active'
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', [...data.images, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...newPreviews]);
    };

    const removeImage = (index) => {
        const updatedImages = data.images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        
        setData('images', updatedImages);
        setImagePreviews(updatedPreviews);
    };

    const handleAmenityChange = (id) => {
        if (data.amenities.includes(id)) {
            setData('amenities', data.amenities.filter(item => item !== id));
        } else {
            setData('amenities', [...data.amenities, id]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.properties.store'));
    };

    const sectionTitleStyle = "text-[16px] font-bold text-[#2f3344] flex items-center gap-2";
    const labelStyle = "text-[13px] font-bold text-[#2f3344] block mb-2";
    const inputStyle = `w-full h-[45px] px-4 bg-[#f1f3f5] border border-[#e3e4e8] rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#0077b5] transition-all placeholder:text-gray-400`;
    const selectStyle = `w-full h-[45px] px-4 bg-[#f1f3f5] border border-[#e3e4e8] rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#0077b5] appearance-none cursor-pointer transition-all`;
    const checkboxStyle = "w-5 h-5 text-[#0077b5] border-[#e1e5ee] rounded-[4px] focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all";
    const cardStyle = "bg-white rounded-[12px] border border-[#eff1f5] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_2px_20px_-3px_rgba(0,0,0,0.1),0_10px_25px_-2px_rgba(0,0,0,0.05)]";

    return (
        <AdminLayout>
            <Head title="Create Property" />

            <div className="space-y-6">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[22px] font-bold text-[#2f3344]">Properties</h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={14} />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Properties</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Create Property</span>
                        </div>
                    </div>
                     <Link
                        href={route('admin.properties.index')}
                        className="flex items-center gap-2 text-[#0077b5] hover:underline font-bold text-[14px]"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Basic Information Card */}
                    <div className={cardStyle}>
                        <div className="px-7 py-5 border-b border-[#eff1f5] bg-slate-50/50">
                            <h2 className={sectionTitleStyle}>
                                <div className="w-8 h-8 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                                    <Home size={18} />
                                </div>
                                Basic Information
                            </h2>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            
                            <div className="md:col-span-3">
                                <label className={labelStyle}>Property Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. Luxury Apartment in City Center"
                                />
                                {errors.title && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.title}</p>}
                            </div>

                             <div>
                                <label className={labelStyle}>Category <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className={selectStyle}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                
                                </div>
                                {errors.category_id && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.category_id}</p>}
                            </div>

                             <div>
                                <label className={labelStyle}>Purpose <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        value={data.purpose}
                                        onChange={e => setData('purpose', e.target.value)}
                                        className={selectStyle}
                                    >
                                        <option value="sale">For Sale</option>
                                        <option value="rent">For Rent</option>
                                        <option value="both">Both (Sale & Rent)</option>
                                    </select>
                                 
                                </div>
                            </div>

                            {(data.purpose === 'sale' || data.purpose === 'both') && (
                                <div>
                                    <label className={labelStyle}>Sale Price ($) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className={inputStyle}
                                        placeholder="0.00"
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                            )}

                            {(data.purpose === 'rent' || data.purpose === 'both') && (
                                <div>
                                    <label className={labelStyle}>Rent Price ($) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={data.rent_price}
                                            onChange={e => setData('rent_price', e.target.value)}
                                            className={`${inputStyle} pr-20`}
                                            placeholder="0.00"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <span className="text-gray-400 text-[13px] font-medium">/ Month</span>
                                        </div>
                                    </div>
                                    {errors.rent_price && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.rent_price}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <div className="px-7 py-5 border-b border-[#eff1f5] bg-slate-50/50">
                            <h2 className={sectionTitleStyle}>
                                <div className="w-8 h-8 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                                    <MapPin size={18} />
                                </div>
                                Location
                            </h2>
                        </div>
                         <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            <div className="md:col-span-3">
                                <label className={labelStyle}>Address <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className={inputStyle}
                                    placeholder="Full street address"
                                />
                                {errors.address && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.address}</p>}
                            </div>
                            <div>
                                <label className={labelStyle}>City <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. Dhaka"
                                />
                                {errors.city && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.city}</p>}
                            </div>
                            <div>
                                <label className={labelStyle}>State / Province <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.state}
                                    onChange={e => setData('state', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. Dhaka"
                                />
                                {errors.state && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.state}</p>}
                            </div>
                            <div>
                                <label className={labelStyle}>Zip Code</label>
                                <input
                                    type="text"
                                    value={data.zip_code}
                                    onChange={e => setData('zip_code', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. 1212"
                                />
                                {errors.zip_code && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.zip_code}</p>}
                            </div>
                            <div>
                                <label className={labelStyle}>Country</label>
                                <input
                                    type="text"
                                    value={data.country}
                                    onChange={e => setData('country', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. Bangladesh"
                                />
                                {errors.country && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.country}</p>}
                            </div>
                            <div className="hidden">
                                <label className={labelStyle}>Latitude</label>
                                <input
                                    type="text"
                                    value={data.latitude}
                                    onChange={e => setData('latitude', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. 23.8103"
                                />
                                {errors.latitude && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.latitude}</p>}
                            </div>
                            <div className="hidden">
                                <label className={labelStyle}>Longitude</label>
                                <input
                                    type="text"
                                    value={data.longitude}
                                    onChange={e => setData('longitude', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. 90.4125"
                                />
                                {errors.longitude && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.longitude}</p>}
                            </div>

                            <div className="md:col-span-3 border-t border-[#eff1f5] pt-6">
                                <label className={labelStyle}>Select Location on Map</label>
                                <GoogleMapSelector 
                                    lat={data.latitude} 
                                    lng={data.longitude} 
                                    onLocationSelect={(lat, lng) => {
                                        setData(prev => ({
                                            ...prev,
                                            latitude: lat.toFixed(8),
                                            longitude: lng.toFixed(8)
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Property Details Card */}
                    <div className={cardStyle}>
                        <div className="px-7 py-5 border-b border-[#eff1f5] bg-slate-50/50">
                            <h2 className={sectionTitleStyle}>
                                <div className="w-8 h-8 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                                    <LayoutGrid size={18} />
                                </div>
                                Property Details
                            </h2>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            <div>
                                <label className={labelStyle}>Bedrooms</label>
                                <div className="relative">
                                    <select
                                        value={data.bedrooms}
                                        onChange={e => setData('bedrooms', e.target.value)}
                                        className={selectStyle}
                                    >
                                        <option value="">Select Bedrooms</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                        <option value="11">10+</option>
                                    </select>
                                 
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Bathrooms</label>
                                <div className="relative">
                                    <select
                                        value={data.bathrooms}
                                        onChange={e => setData('bathrooms', e.target.value)}
                                        className={selectStyle}
                                    >
                                        <option value="">Select Bathrooms</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                        <option value="11">10+</option>
                                    </select>
                                 
                                </div>
                            </div>
                             <div>
                                <label className={labelStyle}>Area (sq ft) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    value={data.area}
                                    onChange={e => setData('area', e.target.value)}
                                    className={inputStyle}
                                    placeholder="e.g. 1500"
                                />
                                {errors.area && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.area}</p>}
                            </div>
                            <div className="md:col-span-3">
                                <label className={labelStyle}>Description <span className="text-red-500">*</span></label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full p-4 bg-[#f1f3f5] border border-[#e3e4e8] rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#0077b5] transition-all min-h-[150px] shadow-sm resize-none"
                                    placeholder="Describe your property in detail..."
                                />
                                {errors.description && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.description}</p>}
                            </div>
                        </div>
                    </div>
                
                    {/* Features & Images */}
                    <div className={cardStyle}>
                         <div className="px-7 py-5 border-b border-[#eff1f5] bg-slate-50/50">
                            <h2 className={sectionTitleStyle}>
                                <div className="w-8 h-8 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                                    <ImagePlus size={18} />
                                </div>
                                Features & Images
                            </h2>
                        </div>
                        <div className="p-8 space-y-10">
                             {/* Amenities */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[14px] font-bold text-[#2f3344] block">Amenities</label>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            if (data.amenities.length === amenities.length) {
                                                setData('amenities', []);
                                            } else {
                                                setData('amenities', amenities.map(a => a.id));
                                            }
                                        }}
                                        className="text-[12px] font-bold text-[#0077b5] hover:underline"
                                    >
                                        {data.amenities.length === amenities.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                                    {amenities.map(amenity => (
                                        <div key={amenity.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`amenity-${amenity.id}`}
                                                checked={data.amenities.includes(amenity.id)}
                                                onChange={() => handleAmenityChange(amenity.id)}
                                                className={checkboxStyle}
                                            />
                                            <label htmlFor={`amenity-${amenity.id}`} className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                                {amenity.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {amenities.length === 0 && <p className="text-gray-400 text-sm mt-2 italic">No amenities available. Add them in Amenities section.</p>}
                            </div>

                            {/* Images */}
                            <div>
                                <label className={labelStyle}>Property Images</label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-[#e3e4e8] border-dashed rounded-[6px] hover:bg-[#f8f9fa] transition-colors cursor-pointer relative">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#0077b5] hover:text-[#006396] focus-within:outline-none">
                                                <span>Upload files</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 2MB
                                        </p>
                                    </div>
                                    <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                                </div>
                                {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images}</div>}
                                
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {imagePreviews.map((src, index) => (
                                        <div key={index} className="relative aspect-video bg-gray-100 rounded-[6px] overflow-hidden border border-[#e3e4e8] group">
                                            <img src={src} alt={`Preview ${index}`} className="object-contain w-full h-full" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                             {/* Status Checkboxes */}
                             <div className="flex flex-col sm:flex-row gap-6 border-t border-[#eff1f5] pt-8">
                                <label className="flex items-center gap-3 p-4 rounded-xl border border-[#eff1f5] hover:bg-slate-50 cursor-pointer transition-all group min-w-[200px]">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onChange={e => setData('is_featured', e.target.checked)}
                                        className={checkboxStyle}
                                    />
                                    <span className="text-[14px] font-bold text-[#2f3344]">
                                        Featured Property
                                    </span>
                                </label>
                                 <label className="flex items-center gap-3 p-4 rounded-xl border border-[#eff1f5] hover:bg-slate-50 cursor-pointer transition-all group min-w-[200px]">
                                    <input
                                        type="checkbox"
                                        id="status_active"
                                        checked={data.status === 'active'}
                                        onChange={e => setData('status', e.target.checked ? 'active' : 'inactive')}
                                        className={checkboxStyle}
                                    />
                                    <span className="text-[14px] font-bold text-[#2f3344]">
                                        Active Listing
                                    </span>
                                </label>
                             </div>

                        </div>
                    </div>

                    <div className="flex justify-end pb-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#0077b5] text-white px-[40px] py-[16px] rounded-[10px] font-bold text-[15px] hover:bg-[#006396] transition-all shadow-[0_8px_20px_-6px_rgba(0,119,181,0.5)] active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                        >
                            {processing ? 'Creating...' : 'Create Property'}
                        </button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
