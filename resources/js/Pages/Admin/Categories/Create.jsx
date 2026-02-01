import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Home, ChevronLeft } from 'lucide-react';

export default function Create({ parentCategories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        parent_id: '',
        is_active: true,
        icon: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create Category" />

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
                            <span>Create Category</span>
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
                    <div className="px-7 py-5 border-b border-[#e3e4e8]">
                        <h2 className="text-[18px] font-bold text-[#2f3344]">Category Settings</h2>
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
                                    placeholder="e.g. Web Development"
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
                                    placeholder="web-development"
                                />
                                <p className="text-[12px] text-[#727586] mt-1">
                                    /content/categories/{data.slug || 'slug-placeholder'}
                                </p>
                                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                            </div>

                            {/* Parent Category */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Parent Category
                                </label>
                                <select
                                    value={data.parent_id}
                                    onChange={e => setData('parent_id', e.target.value)}
                                    className="w-full h-[45px] px-4 bg-white border border-[#e3e4e8] rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] appearance-none cursor-pointer"
                                >
                                    <option value="">None (Root Category)</option>
                                    {parentCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
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
                                    placeholder="globe, layout, server, etc."
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
                                    placeholder="Write a brief description..."
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
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
