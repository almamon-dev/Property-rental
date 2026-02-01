import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Home, Plus, FolderTree, 
    Search, X, Check, AlertCircle, Trash2, SquarePen,
    ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown 
} from 'lucide-react';

export default function Index({ categories, filters = {}, auth, isSubCategoryView = false }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status !== undefined ? (filters.status === '1' ? 'active' : (filters.status === '0' ? 'inactive' : 'all')) : 'all');
    const [selectedIds, setSelectedIds] = useState([]);
    const [showPromo, setShowPromo] = useState(true);

    const handleSearch = (value) => {
        setSearch(value);
        updateFilters({ search: value, page: 1 });
    };

    const updateFilters = (newFilters) => {
        router.get(
            route(isSubCategoryView ? 'admin.sub-categories.index' : 'admin.categories.index'),
            { ...filters, ...newFilters },
            { preserveState: true, replace: true }
        );
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        const statusVal = newStatus === 'all' ? '' : (newStatus === 'active' ? '1' : '0');
        updateFilters({ status: statusVal, page: 1 });
    };

    const handlePerPageChange = (e) => {
        updateFilters({ per_page: e.target.value, page: 1 });
    };

    const handlePageChange = (url) => {
        if (url) router.get(url, {}, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            router.delete(route('admin.categories.destroy', id), {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === categories.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(categories.data.map(c => c.id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    return (
        <AdminLayout>
            <Head title={isSubCategoryView ? "Subcategories" : "Categories"} />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Top Header - Matching Image */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">
                            {isSubCategoryView ? "Subcategory portfolio" : "Category portfolio"}
                        </h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={16} className="text-[#727586]" />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>{isSubCategoryView ? "Subcategory portfolio" : "Category portfolio"}</span>
                        </div>
                    </div>
                    {auth.user.permissions.includes('categories.create') && (
                        <Link
                            href={route('admin.categories.create')}
                            className="inline-flex items-center bg-[#673ab7] text-white px-5 py-[10px] rounded-[8px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm"
                        >
                            <Plus size={18} className="mr-2" />
                            Add new {isSubCategoryView ? 'subcategory' : 'category'}
                        </Link>
                    )}
                </div>

                {/* Promo Banner - Matching Image */}
                {showPromo && (
                    <div className="relative bg-[#f4f0ff] rounded-[12px] p-6 border border-[#e9e3ff] overflow-hidden flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="text-[18px] font-bold text-[#2f3344] mb-1">
                                New Year's sale is on – make your next move!
                            </h2>
                            <p className="text-[14px] text-[#727586]">
                                Grab these great deals that we've handpicked just for you.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-[100px] h-[60px] relative hidden md:block">
                                <div className="absolute right-0 top-0 text-[#673ab7] opacity-20 transform rotate-12">
                                    <Plus size={40} />
                                </div>
                                <div className="absolute right-10 bottom-0 text-[#673ab7] opacity-20">
                                    <FolderTree size={30} />
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowPromo(false)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#e3e4e8] text-[#727586] hover:bg-slate-50 transition-all"
                            >
                                <ChevronDown size={18} />
                            </button>
                        </div>
                        {/* Abstract background pattern for purple % feel */}
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#673ab7]/5 to-transparent pointer-events-none"></div>
                    </div>
                )}

                {/* Main Content Card */}
                <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                    {/* Filter Tabs - Subcategory/Category Style */}
                    <div className="px-6 border-b border-[#e3e4e8]">
                        <div className="flex gap-10">
                            <button
                                onClick={() => handleStatusChange('all')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'all' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                All {isSubCategoryView ? 'subcategories' : 'categories'}
                                {status === 'all' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
                            </button>
                            <button
                                onClick={() => handleStatusChange('active')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'active' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                Active
                                {status === 'active' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
                            </button>
                            <button
                                onClick={() => handleStatusChange('inactive')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'inactive' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                Inactive
                                {status === 'inactive' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar - Matching Image */}
                    <div className="p-7">
                        <div className="relative w-full">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a0a3af]">
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full h-[52px] pl-14 pr-6 bg-white border border-[#e3e4e8] rounded-[8px] text-[15px] focus:outline-none focus:border-[#673ab7] focus:ring-1 focus:ring-[#673ab7] transition-all"
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
                                                selectedIds.length === categories.data.length && categories.data.length > 0
                                                ? 'bg-[#673ab7] border-[#673ab7]'
                                                : 'border-[#c3c4ca] hover:border-[#673ab7]'
                                            }`}
                                        >
                                            {selectedIds.length === categories.data.length && categories.data.length > 0 && <Check size={14} className="text-white" />}
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            {isSubCategoryView ? 'Subcategory name' : 'Category name'} 
                                            <ArrowUpDown size={14} className="text-[#a0a3af] group-hover:text-[#673ab7]" />
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            Status 
                                            <ArrowUpDown size={14} className="text-[#a0a3af] group-hover:text-[#673ab7]" />
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            {isSubCategoryView ? 'Parent' : 'Slug'} 
                                            <ArrowUpDown size={14} className="text-[#a0a3af] group-hover:text-[#673ab7]" />
                                        </div>
                                    </th>
                                    <th className="px-7 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f1f2f4]">
                                {categories.data.length > 0 ? (
                                    categories.data.map((category) => (
                                        <tr 
                                            key={category.id} 
                                            className={`hover:bg-[#fafbfc] transition-colors group ${selectedIds.includes(category.id) ? 'bg-[#f4f0ff]/50' : ''}`}
                                        >
                                            <td className="pl-7 pr-4 py-5">
                                                <div 
                                                    onClick={() => toggleSelect(category.id)}
                                                    className={`w-5 h-5 border-[2px] rounded cursor-pointer transition-all flex items-center justify-center ${
                                                        selectedIds.includes(category.id)
                                                        ? 'bg-[#673ab7] border-[#673ab7]'
                                                        : 'border-[#c3c4ca] hover:border-[#673ab7]'
                                                    }`}
                                                >
                                                    {selectedIds.includes(category.id) && <Check size={14} className="text-white" />}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#2f3344] group-hover:text-[#673ab7] transition-colors">
                                                        {category.name}
                                                    </p>
                                                    <p className="text-[12px] text-[#727586] font-normal tracking-wide">
                                                        {category.slug}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-2">
                                                    {category.is_active ? (
                                                        <>
                                                            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#00b090] flex items-center justify-center text-[#00b090]">
                                                                <Check size={11} strokeWidth={3} />
                                                            </div>
                                                            <span className="text-[13px] font-medium text-[#2f3344]">Active</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#ffb000] flex items-center justify-center text-[#ffb000]">
                                                                <AlertCircle size={11} strokeWidth={3} />
                                                            </div>
                                                            <span className="text-[13px] font-medium text-[#2f3344]">Inactive</span>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <span className="text-[13px] text-[#727586] font-normal">
                                                    {isSubCategoryView ? (category.parent ? category.parent.name : 'Unknown') : category.slug}
                                                </span>
                                            </td>
                                            <td className="pr-7 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {auth.user.permissions.includes('categories.edit') && (
                                                        <Link
                                                            href={route('admin.categories.edit', category.id)}
                                                            className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#2f3344] bg-[#f1f3f5] hover:bg-[#673ab7] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#673ab7]"
                                                            title="Edit"
                                                        >
                                                            <SquarePen size={16} />
                                                        </Link>
                                                    )}
                                                    
                                                    {auth.user.permissions.includes('categories.delete') && (
                                                        <button
                                                            onClick={() => handleDelete(category.id)}
                                                            className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#ef4444] bg-[#fee2e2]/50 hover:bg-[#ef4444] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#ef4444]"
                                                            title="Delete"
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
                                        <td colSpan="5" className="px-7 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3 text-[#727586]">
                                                <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-2">
                                                    <Search size={30} className="text-[#c3c4ca]" />
                                                </div>
                                                <p className="text-[16px] font-bold text-[#2f3344]">No items found</p>
                                                <p className="text-[14px]">Try adjusting your search or filters to find what you're looking for.</p>
                                                <button 
                                                    onClick={() => {setSearch(''); handleStatusChange('all');}}
                                                    className="mt-2 text-[#673ab7] font-bold text-[14px] hover:underline"
                                                >
                                                    Clear filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination - Restored Previous Design Style */}
                    <div className="flex items-center justify-end gap-8 px-8 py-5 border-t border-[#e3e4e8]">
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-[#727586]">Items per page:</span>
                            <div className="relative">
                                <select 
                                    value={filters.per_page || 10}
                                    onChange={handlePerPageChange}
                                    className="h-[38px] pl-4 pr-10 bg-white border border-[#e3e4e8] rounded-[6px] text-[13px] text-[#2f3344] font-medium appearance-none cursor-pointer focus:border-[#673ab7] outline-none"
                                >
                                    <option value="5">5</option>
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
                                {categories.from || 0} - {categories.to || 0} of {categories.total || 0}
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handlePageChange(categories.prev_page_url)}
                                    disabled={!categories.prev_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={() => handlePageChange(categories.next_page_url)}
                                    disabled={!categories.next_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bulk Action Bar - Appearing from bottom like Image 1 */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[800px] px-4 animate-in slide-in-from-bottom duration-300">
                        <div className="bg-[#2f3344] text-white p-4 rounded-[12px] shadow-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4 border-r border-slate-600 pr-5">
                                <span className="text-[14px] font-bold">{selectedIds.length} categories selected</span>
                                <button 
                                    onClick={() => setSelectedIds([])}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-6 px-4 flex-1">
                                <button className="text-[14px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                    <Plus size={16} /> Mark Active
                                </button>
                                <button className="text-[14px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                    <AlertCircle size={16} /> Deactivate
                                </button>
                                <button 
                                    className="text-[14px] font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>

                            <button 
                                onClick={() => setSelectedIds([])}
                                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-[13px] font-bold transition-all"
                            >
                                Cancel selection
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
