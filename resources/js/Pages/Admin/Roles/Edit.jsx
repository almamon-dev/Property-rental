import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Home, ChevronLeft, Check } from 'lucide-react';

export default function Edit({ role, permissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name || '',
        description: role.description || '',
        permissions: role.permissions.map(p => p.name) || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.roles.update', role.id));
    };

    const togglePermission = (permissionName) => {
        let newPermissions = [...data.permissions];
        if (newPermissions.includes(permissionName)) {
            newPermissions = newPermissions.filter(p => p !== permissionName);
        } else {
            newPermissions.push(permissionName);
        }
        setData('permissions', newPermissions);
    };

    const toggleCategory = (categoryPermissions) => {
        const categoryPermissionNames = categoryPermissions.map(p => p.name);
        const allSelected = categoryPermissionNames.every(name => data.permissions.includes(name));
        
        let newPermissions = [...data.permissions];
        if (allSelected) {
            newPermissions = newPermissions.filter(p => !categoryPermissionNames.includes(p));
        } else {
            categoryPermissionNames.forEach(name => {
                if (!newPermissions.includes(name)) {
                    newPermissions.push(name);
                }
            });
        }
        setData('permissions', newPermissions);
    };

    return (
        <AdminLayout>
            <Head title="Edit Role" />

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
                            <span>Edit Role</span>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Card */}
                    <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                        <div className="px-7 py-5 border-b border-[#e3e4e8]">
                            <h2 className="text-[18px] font-bold text-[#2f3344]">Role Settings</h2>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6">
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

                                <div className="hidden md:block"></div>

                                {/* Description */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className={`w-full p-4 bg-white border ${errors.description ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all min-h-[100px] resize-none`}
                                        placeholder="Write a brief description..."
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Card */}
                    <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                        <div className="px-7 py-5 border-b border-[#e3e4e8]">
                            <h2 className="text-[18px] font-bold text-[#2f3344]">Role Permissions</h2>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {(() => {
                                    // Handle both array (from simple .all()) or object (if grouped)
                                    const flatPermissions = Array.isArray(permissions) 
                                        ? permissions 
                                        : Object.values(permissions).flat();

                                    const grouped = {};
                                    flatPermissions.forEach(p => {
                                        const group = p.name.includes('.') ? p.name.split('.')[0] : 'General';
                                        if (!grouped[group]) grouped[group] = [];
                                        grouped[group].push(p);
                                    });

                                    return Object.entries(grouped).map(([category, categoryPermissions]) => (
                                    <div key={category} className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2 border-[#f1f2f4]">
                                            <h3 className="text-[15px] font-bold text-[#2f3344] capitalize">{category || 'General'}</h3>
                                            <button 
                                                type="button"
                                                onClick={() => toggleCategory(categoryPermissions)}
                                                className="text-[12px] text-[#673ab7] font-bold hover:underline"
                                            >
                                                {categoryPermissions.every(p => data.permissions.includes(p.name)) ? 'Unselect All' : 'Select All'}
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {categoryPermissions.map((permission) => (
                                                <div 
                                                    key={permission.id}
                                                    className="flex items-start gap-3 group cursor-pointer"
                                                    onClick={() => togglePermission(permission.name)}
                                                >
                                                    <div className={`mt-0.5 w-5 h-5 rounded border transition-all flex items-center justify-center
                                                        ${data.permissions.includes(permission.name) 
                                                            ? 'bg-[#673ab7] border-[#673ab7]' 
                                                            : 'bg-white border-[#e3e4e8] group-hover:border-[#673ab7]'}`}
                                                    >
                                                        {data.permissions.includes(permission.name) && <Check size={14} className="text-white" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[14px] text-[#2f3344] font-medium leading-tight">{permission.name}</p>
                                                        {permission.description && (
                                                            <p className="text-[12px] text-[#727586] mt-0.5">{permission.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* Submit Button - Bottom Right Blue */}
                        <div className="px-8 py-6 bg-[#fafbfc] border-t border-[#e3e4e8] flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#673ab7] text-white px-[40px] py-[12px] rounded-[6px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Save Role & Permissions'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
