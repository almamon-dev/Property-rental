import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Home, ChevronLeft } from 'lucide-react';

export default function Edit({ permission }) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name || '',
        description: permission.description || '',
        category: permission.category || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.permissions.update', permission.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Permission" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">Permissions</h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Link href={route('dashboard')} className="hover:text-[#673ab7] transition-colors"><Home size={16} /></Link>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Account</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <Link href={route('admin.permissions.index')} className="hover:text-[#673ab7] transition-colors font-medium">Permissions</Link>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Edit Permission</span>
                        </div>
                    </div>
                    <Link
                        href={route('admin.permissions.index')}
                        className="flex items-center gap-2 text-[#673ab7] hover:underline font-bold text-[14px]"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                {/* Form Card - Matching exact design from image */}
                <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#e3e4e8]">
                        <h2 className="text-[18px] font-bold text-[#2f3344]">Permission Settings</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Permission Name */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Permission Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.name ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                    placeholder="e.g. users.view"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                                <p className="text-[12px] text-[#727586] mt-1">Use dot notation for better organization.</p>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className={`w-full h-[45px] px-4 bg-white border ${errors.category ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                    placeholder="e.g. Users, Blogs"
                                />
                                {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category}</p>}
                            </div>

                            {/* Description */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className={`w-full p-4 bg-white border ${errors.description ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all min-h-[140px] resize-none`}
                                    placeholder="Write a brief description..."
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Submit Button - Bottom Right Blue */}
                        <div className="flex justify-end mt-10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#673ab7] text-white px-[40px] py-[12px] rounded-[6px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
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
