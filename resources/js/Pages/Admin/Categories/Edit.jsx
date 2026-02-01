import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Home, ChevronLeft, Trash2 } from 'lucide-react';

export default function Edit({ category, parentCategories }) {
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        parent_id: category.parent_id || '',
        is_active: category.is_active === undefined ? true : !!category.is_active,
        icon: category.icon || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id));
    };

    const handleDelete = () => {
        if(confirm('Are you sure you want to delete this category?')) {
            destroy(route('admin.categories.destroy', category.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Edit Category" />

            <div className="space-y-6">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[22px] font-bold text-[#2f3344]">Categories</h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={14} />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Content</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Edit Category</span>
                        </div>
                    </div>
                    <Link
                        href={route('admin.categories.index')}
                        className="flex items-center gap-2 text-[#673ab7] hover:underline font-bold text-[14px]"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                {/* Form Card - Matching Image Design */}
                <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#e3e4e8] flex justify-between items-center">
                        <h2 className="text-[18px] font-bold text-[#2f3344]">Edit Category Settings</h2>
                        <button 
                            type="button" 
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[13px] font-bold"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Category Name */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full h-[45px] px-4 bg-[#f8f9fa] border ${errors.name ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Category Slug */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    URL Slug *
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className={`w-full h-[45px] px-4 bg-white border ${errors.slug ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                />
                                <p className="text-[12px] text-[#727586] mt-1">
                                    /content/categories/{data.slug}
                                </p>
                                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                            </div>

                            {/* Parent Category */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Parent Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={data.parent_id || ''}
                                        onChange={e => setData('parent_id', e.target.value)}
                                        className="w-full h-[45px] pl-4 pr-10 bg-white border border-[#e3e4e8] rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] appearance-none cursor-pointer"
                                    >
                                        <option value="">None (Root Category)</option>
                                        {parentCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                   
                                </div>
                            </div>

                            {/* Icon Name */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Icon Name (Lucide)
                                </label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={e => setData('icon', e.target.value)}
                                    className="w-full h-[45px] px-4 bg-white border border-[#e3e4e8] rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all"
                                />
                            </div>

                            {/* Description Full Width */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full p-4 bg-white border border-[#e3e4e8] rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all min-h-[100px]"
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-2 flex items-center gap-3 md:col-span-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 text-[#673ab7] border-[#e3e4e8] rounded focus:ring-[#673ab7]"
                                />
                                <label htmlFor="is_active" className="text-[14px] font-bold text-[#2f3344] cursor-pointer">
                                    Active Category
                                </label>
                            </div>
                        </div>

                        {/* Submit Button aligned to right as in image */}
                        <div className="flex justify-end mt-10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#2c8af8] text-white px-[35px] py-[12px] rounded-[6px] font-bold text-[14px] hover:bg-[#1a7ae8] transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
