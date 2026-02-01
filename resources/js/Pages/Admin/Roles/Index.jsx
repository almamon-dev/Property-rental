import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Home, MoreVertical, Plus, ShieldCheck, 
    Search, X, Check, AlertCircle, Trash2,
    ChevronDown, ChevronLeft, ChevronRight, SquarePen
} from 'lucide-react';

import DeleteModal from '@/Components/Admin/DeleteModal';

export default function Index({ roles, filters = {}, auth }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedIds, setSelectedIds] = useState([]);
    const [showPromo, setShowPromo] = useState(true);
    const [deleteState, setDeleteState] = useState({ isOpen: false, id: null });

    const handleDelete = (id) => {
        setDeleteState({ isOpen: true, id });
    };

    const confirmDelete = () => {
        router.delete(route('admin.roles.destroy', deleteState.id), {
            onSuccess: () => setDeleteState({ isOpen: false, id: null }),
        });
    };

    const handleSearch = (value) => {
        setSearch(value);
        router.get(route('admin.roles.index'), { ...filters, search: value }, { preserveState: true, replace: true });
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === roles.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(roles.data.map(r => r.id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const handlePerPageChange = (e) => {
        router.get(route('admin.roles.index'), { ...filters, per_page: e.target.value, page: 1 }, { preserveState: true });
    };

    const handlePageChange = (url) => {
        if (url) router.get(url, {}, { preserveState: true });
    };

    return (
        <AdminLayout>
            <Head title="Role management" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Top Header - Matching Image */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">
                            Roles
                        </h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={16} className="text-[#727586]" />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Account</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Roles</span>
                        </div>
                    </div>
                    {auth.user.permissions.includes('roles.create') && (
                        <Link
                            href={route('admin.roles.create')}
                            className="inline-flex items-center bg-[#673ab7] text-white px-5 py-[10px] rounded-[8px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm"
                        >
                            <Plus size={18} className="mr-2" />
                            Add new role
                        </Link>
                    )}
                </div>

                {/* Promo Banner */}
                {showPromo && (
                    <div className="relative bg-[#f4f0ff] rounded-[12px] p-6 border border-[#e9e3ff] overflow-hidden flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="text-[18px] font-bold text-[#2f3344] mb-1">
                                Secure your account with roles
                            </h2>
                            <p className="text-[14px] text-[#727586]">
                                Properly configured roles ensure your application remains secure and easy to manage.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setShowPromo(false)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#e3e4e8] text-[#727586] hover:bg-slate-50 transition-all"
                            >
                                <ChevronDown size={18} />
                            </button>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#673ab7]/5 to-transparent pointer-events-none"></div>
                    </div>
                )}

                {/* Main Content Card */}
                <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                    {/* Filter Tabs */}
                    <div className="px-6 border-b border-[#e3e4e8]">
                        <div className="flex gap-10">
                            <button className="pt-5 pb-4 text-[14px] font-bold transition-all relative text-[#673ab7]">
                                All roles
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="p-7">
                        <div className="relative w-full">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a0a3af]">
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search roles..."
                                className="w-full h-[52px] pl-14 pr-6 bg-white border border-[#e3e4e8] rounded-[8px] text-[15px] focus:outline-none focus:border-[#673ab7] transition-all"
                            />
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#e3e4e8]">
                                    <th className="pl-7 pr-4 py-4 w-10">
                                        <div 
                                            onClick={toggleSelectAll}
                                            className={`w-5 h-5 border-[2px] rounded cursor-pointer transition-all flex items-center justify-center ${
                                                roles.data.length > 0 && selectedIds.length === roles.data.length
                                                ? 'bg-[#673ab7] border-[#673ab7]'
                                                : 'border-[#c3c4ca] hover:border-[#673ab7]'
                                            }`}
                                        >
                                            {roles.data.length > 0 && selectedIds.length === roles.data.length && <Check size={14} className="text-white" />}
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        Role name
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-7 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f1f2f4]">
                                {roles.data.length > 0 ? (
                                    roles.data.map((role) => (
                                        <tr 
                                            key={role.id} 
                                            className={`hover:bg-[#fafbfc] transition-colors group ${selectedIds.includes(role.id) ? 'bg-[#f4f0ff]/50' : ''}`}
                                        >
                                            <td className="pl-7 pr-4 py-5">
                                                <div 
                                                    onClick={() => toggleSelect(role.id)}
                                                    className={`w-5 h-5 border-[2px] rounded cursor-pointer transition-all flex items-center justify-center ${
                                                        selectedIds.includes(role.id)
                                                        ? 'bg-[#673ab7] border-[#673ab7]'
                                                        : 'border-[#c3c4ca] hover:border-[#673ab7]'
                                                    }`}
                                                >
                                                    {selectedIds.includes(role.id) && <Check size={14} className="text-white" />}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <span className="text-[14px] font-bold text-[#2f3344] group-hover:text-[#673ab7] transition-colors">
                                                    {role.name}
                                                </span>
                                            </td>
                                            <td className="px-5 py-5">
                                                <span className="text-[13px] text-[#727586] font-normal">
                                                    {role.description || 'No description provided'}
                                                </span>
                                            </td>
                                            <td className="pr-7 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {auth.user.permissions.includes('roles.edit') && (
                                                        <Link
                                                            href={route('admin.roles.edit', role.id)}
                                                            className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#2f3344] bg-[#f1f3f5] hover:bg-[#673ab7] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#673ab7]"
                                                            title="Edit Role"
                                                        >
                                                            <SquarePen size={16} />
                                                        </Link>
                                                    )}
                                                    
                                                    {auth.user.permissions.includes('roles.delete') && (
                                                        <button 
                                                            onClick={() => handleDelete(role.id)}
                                                            className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#ef4444] bg-[#fee2e2]/50 hover:bg-[#ef4444] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#ef4444]"
                                                            title="Delete Role"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-7 py-20 text-center text-[#727586]">
                                            No roles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination - Original Style */}
                    <div className="flex items-center justify-end gap-8 px-8 py-5 border-t border-[#e3e4e8]">
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-[#727586]">Items per page:</span>
                            <div className="relative">
                                <select 
                                    value={filters.per_page || 10}
                                    onChange={handlePerPageChange}
                                    className="h-[38px] pl-4 pr-10 bg-white border border-[#e3e4e8] rounded-[6px] text-[13px] text-[#2f3344] font-bold appearance-none cursor-pointer outline-none focus:border-[#673ab7]"
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#727586]">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[13px] text-[#2f3344] font-medium">
                                {roles.from || 0} - {roles.to || 0} of {roles.total || 0}
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handlePageChange(roles.prev_page_url)}
                                    disabled={!roles.prev_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={() => handlePageChange(roles.next_page_url)}
                                    disabled={!roles.next_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[800px] px-4 animate-in slide-in-from-bottom duration-300">
                        <div className="bg-[#2f3344] text-white p-4 rounded-[12px] shadow-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-[14px] font-bold">{selectedIds.length} items selected</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="text-red-400 hover:text-red-300 font-bold text-[14px] flex items-center gap-2">
                                    <Trash2 size={16} /> Delete selected
                                </button>
                                <button 
                                    onClick={() => setSelectedIds([])}
                                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-[13px] font-bold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <DeleteModal
                    isOpen={deleteState.isOpen}
                    onClose={() => setDeleteState({ isOpen: false, id: null })}
                    onConfirm={confirmDelete}
                    title="Delete Role"
                    message="Are you sure you want to delete this role? Users assigned to this role will lose their permissions."
                />
            </div>
        </AdminLayout>
    );
}
