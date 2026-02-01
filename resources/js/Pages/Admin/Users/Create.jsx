import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Home, ChevronLeft, Check, Shield, User as UserIcon, Lock } from 'lucide-react';

export default function Create({ roles, permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
        permissions: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    const toggleRole = (roleName) => {
        let newRoles = [...data.roles];
        if (newRoles.includes(roleName)) {
            newRoles = newRoles.filter(r => r !== roleName);
        } else {
            newRoles.push(roleName);
        }
        setData('roles', newRoles);
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
            <Head title="Create User" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">Users</h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Link href={route('dashboard')} className="hover:text-[#673ab7] transition-colors"><Home size={16} /></Link>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Account</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <Link href={route('admin.users.index')} className="hover:text-[#673ab7] transition-colors font-medium">Users</Link>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Create User</span>
                        </div>
                    </div>
                    <Link
                        href={route('admin.users.index')}
                        className="flex items-center gap-2 text-[#673ab7] hover:underline font-bold text-[14px]"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                        <div className="px-7 py-5 border-b border-[#e3e4e8]">
                            <h2 className="text-[18px] font-bold text-[#2f3344]">User Details</h2>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.name ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                        placeholder="Enter full name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.email ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.password ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                        placeholder="Enter password"
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.password_confirmation ? 'border-red-500' : 'border-[#e3e4e8]'} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Roles Assignment */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                                <div className="px-7 py-5 border-b border-[#e3e4e8] flex items-center gap-2">
                                    <Shield size={18} className="text-[#673ab7]" />
                                    <h2 className="text-[16px] font-bold text-[#2f3344]">Assign Roles</h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    {roles.map((role) => (
                                        <div 
                                            key={role.id}
                                            className="flex items-center gap-3 group cursor-pointer"
                                            onClick={() => toggleRole(role.name)}
                                        >
                                            <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center
                                                ${data.roles.includes(role.name) 
                                                    ? 'bg-[#673ab7] border-[#673ab7]' 
                                                    : 'bg-white border-[#e3e4e8] group-hover:border-[#673ab7]'}`}
                                            >
                                                {data.roles.includes(role.name) && <Check size={14} className="text-white" />}
                                            </div>
                                            <span className="text-[14px] text-[#2f3344] font-medium">{role.name}</span>
                                        </div>
                                    ))}
                                    {roles.length === 0 && (
                                        <p className="text-sm text-gray-500">No roles available.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Direct Permissions Assignment */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                                <div className="px-7 py-5 border-b border-[#e3e4e8] flex items-center gap-2">
                                    <Lock size={18} className="text-[#673ab7]" />
                                    <h2 className="text-[16px] font-bold text-[#2f3344]">Direct Permissions</h2>
                                    <span className="text-[12px] text-[#727586] font-normal ml-2">(Override role permissions)</span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
                                        {/* Since permissions might be a plain array or grouped object, we'll try to display it simply if it's not grouped, 
                                            but Controller sends Permission::all() which is a Collection. 
                                            If we want grouping, we need to ensure controller groups it or we group it here.
                                            The Edit page expects `permissions` as grouped.
                                            Let's check the controller again. Controller sends Permission::all().
                                            We should group them by a convention, e.g. 'users.view' -> Group 'Users'.
                                        */}
                                        
                                        {/* Simple approach: Group in JS if needed, or just list them. 
                                            Let's group by the first part of the name (before dot). */}
                                        {(() => {
                                            const grouped = {};
                                            permissions.forEach(p => {
                                                const group = p.name.includes('.') ? p.name.split('.')[0] : 'General';
                                                if (!grouped[group]) grouped[group] = [];
                                                grouped[group].push(p);
                                            });

                                            return Object.entries(grouped).map(([category, categoryPerms]) => (
                                                <div key={category} className="space-y-3">
                                                    <div className="flex items-center justify-between border-b pb-2 border-[#f1f2f4]">
                                                        <h3 className="text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                                            {category || 'General'}
                                                        </h3>
                                                        <button 
                                                            type="button"
                                                            onClick={() => toggleCategory(categoryPerms)}
                                                            className="text-[11px] text-[#673ab7] font-bold hover:underline"
                                                        >
                                                            {categoryPerms.every(p => data.permissions.includes(p.name)) ? 'Unselect All' : 'Select All'}
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {categoryPerms.map((perm) => (
                                                            <div 
                                                                key={perm.id}
                                                                className="flex items-start gap-3 group cursor-pointer"
                                                                onClick={() => togglePermission(perm.name)}
                                                            >
                                                                <div className={`mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center
                                                                    ${data.permissions.includes(perm.name) 
                                                                        ? 'bg-[#673ab7] border-[#673ab7]' 
                                                                        : 'bg-white border-[#e3e4e8] group-hover:border-[#673ab7]'}`}
                                                                >
                                                                    {data.permissions.includes(perm.name) && <Check size={12} className="text-white" />}
                                                                </div>
                                                                <span className="text-[13px] text-[#2f3344] font-medium">{perm.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button - Bottom Right Blue */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#2c8af8] text-white px-[50px] py-[13px] rounded-[6px] font-bold text-[15px] hover:bg-[#1a7ae8] transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create User Account'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
