import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Home, ChevronLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create Role" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">Roles</h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Link href={route('dashboard')} className="hover:text-[#673ab7] transition-colors"><Home size={16} /></Link>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Account</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <Link href={route('admin.roles.index')} className="hover:text-[#673ab7] transition-colors font-medium">Roles</Link>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Create Role</span>
                        </div>
                    </div>
                    <Link
                        href={route('admin.roles.index')}
                        className="flex items-center gap-2 text-[#673ab7] hover:underline font-bold text-[14px]"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                {/* Form Card - Matching exact design from image */}
                <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#e3e4e8]">
                        <h2 className="text-[18px] font-bold text-[#2f3344]">Role Settings</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Role Name */}
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-[#2f3344]">
                                    Role Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.name ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                    placeholder="e.g. Super Admin"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                            </div>

                            {/* Empty space for grid alignment if needed, or leave it for description below */}
                            <div className="hidden md:block"></div>

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
                                className="bg-[#2c8af8] text-white px-[40px] py-[12px] rounded-[6px] font-bold text-[14px] hover:bg-[#1a7ae8] transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
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
