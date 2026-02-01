
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Home, Plus, Store, 
    Search, X, Check, Trash2, AlertCircle,
    ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown, SquarePen
} from 'lucide-react';

export default function Index({ properties, filters = {}, auth }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [selectedIds, setSelectedIds] = useState([]);
    const [showPromo, setShowPromo] = useState(true);

    const handleSearch = (value) => {
        setSearch(value);
        updateFilters({ search: value, page: 1 });
    };

    const updateFilters = (newFilters) => {
        router.get(
            route('admin.properties.index'),
            { ...filters, ...newFilters },
            { preserveState: true, replace: true }
        );
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        const statusVal = newStatus === 'all' ? '' : newStatus;
        updateFilters({ status: statusVal, page: 1 });
    };

    const handlePerPageChange = (e) => {
        updateFilters({ per_page: e.target.value, page: 1 });
    };

    const handlePageChange = (url) => {
        if (url) router.get(url, {}, { preserveState: true });
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === properties.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(properties.data.map(p => p.id));
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
            <Head title="Properties" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Top Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">
                            Property Portfolio
                        </h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={16} className="text-[#727586]" />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Property Portfolio</span>
                        </div>
                    </div>
                    {/* Check permission logic or allow default if not strict */}
                    <Link
                        href={route('admin.properties.create')}
                        className="inline-flex items-center bg-[#673ab7] text-white px-5 py-[10px] rounded-[8px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm"
                    >
                        <Plus size={18} className="mr-2" />
                        Add New Property
                    </Link>
                </div>

                {/* Promo Banner */}
                {showPromo && (
                    <div className="relative bg-[#f4f0ff] rounded-[12px] p-6 border border-[#e9e3ff] overflow-hidden flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="text-[18px] font-bold text-[#2f3344] mb-1">
                                Manage your real estate efficiently!
                            </h2>
                            <p className="text-[14px] text-[#727586]">
                                Keep your listings updated and boost your sales/rentals.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="w-[100px] h-[60px] relative hidden md:block">
                                <div className="absolute right-0 top-0 text-[#673ab7] opacity-20 transform rotate-12">
                                    <Plus size={40} />
                                </div>
                                <div className="absolute right-10 bottom-0 text-[#673ab7] opacity-20">
                                    <Store size={30} />
                                </div>
                            </div>
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
                            <button
                                onClick={() => handleStatusChange('all')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'all' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                All Properties
                                {status === 'all' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
                            </button>
                             <button
                                onClick={() => handleStatusChange('sale')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'sale' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                For Sale
                                {status === 'sale' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
                            </button>
                             <button
                                onClick={() => handleStatusChange('rent')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'rent' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                For Rent
                                {status === 'rent' && (
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
                                onClick={() => handleStatusChange('sold')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'sold' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                Sold
                                {status === 'sold' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
                            </button>
                            <button
                                onClick={() => handleStatusChange('rented')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'rented' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                Rented
                                {status === 'rented' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
                            </button>
                             <button
                                onClick={() => handleStatusChange('pending')}
                                className={`pt-5 pb-4 text-[14px] font-bold transition-all relative ${
                                    status === 'pending' ? 'text-[#673ab7]' : 'text-[#727586] hover:text-[#2f3344]'
                                }`}
                            >
                                Pending Review
                                {status === 'pending' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#673ab7] rounded-t-full"></div>
                                )}
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
                                placeholder="Search by title, location..."
                                className="w-full h-[52px] pl-14 pr-6 bg-white border border-[#e3e4e8] rounded-[8px] text-[15px] focus:outline-none focus:border-[#673ab7] focus:ring-1 focus:ring-[#673ab7] transition-all"
                            />
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#e3e4e8]">
                                    <th className="pl-7 pr-4 py-4">
                                        <div className="flex items-center gap-3 cursor-pointer group" onClick={toggleSelectAll}>
                                            <div 
                                                className={`w-[18px] h-[18px] border rounded-[4px] transition-all flex items-center justify-center ${
                                                    selectedIds.length === properties.data.length && properties.data.length > 0
                                                    ? 'bg-[#673ab7] border-[#673ab7]'
                                                    : 'border-[#d1d5db] hover:border-[#673ab7] bg-white'
                                                }`}
                                            >
                                                {selectedIds.length === properties.data.length && properties.data.length > 0 && <Check size={14} className="text-white" />}
                                            </div>
                                            <span className="text-[11px] font-bold text-[#2f3344] uppercase tracking-wider group-hover:text-[#673ab7] transition-colors whitespace-nowrap">Select All</span>
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            Property
                                            <ArrowUpDown size={14} className="text-[#a0a3af] group-hover:text-[#673ab7]" />
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            Price
                                            <ArrowUpDown size={14} className="text-[#a0a3af] group-hover:text-[#673ab7]" />
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            Category
                                            <ArrowUpDown size={14} className="text-[#a0a3af] group-hover:text-[#673ab7]" />
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            Status
                                            <ArrowUpDown size={14} className="text-[#a0a3af] group-hover:text-[#673ab7]" />
                                        </div>
                                    </th>
                                    <th className="px-7 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f1f2f4]">
                                {properties.data.length > 0 ? (
                                    properties.data.map((property) => (
                                        <tr 
                                            key={property.id} 
                                            className={`hover:bg-[#fafbfc] transition-colors group ${selectedIds.includes(property.id) ? 'bg-[#f4f0ff]/50' : ''}`}
                                        >
                                            <td className="pl-7 pr-4 py-5">
                                                <div 
                                                    onClick={() => toggleSelect(property.id)}
                                                    className={`w-[18px] h-[18px] border rounded-[4px] cursor-pointer transition-all flex items-center justify-center ${
                                                        selectedIds.includes(property.id)
                                                        ? 'bg-[#673ab7] border-[#673ab7]'
                                                        : 'border-[#d1d5db] hover:border-[#673ab7] bg-white'
                                                    }`}
                                                >
                                                    {selectedIds.includes(property.id) && <Check size={14} className="text-white" />}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-[60px] h-[60px] rounded-[6px] overflow-hidden bg-[#f8f9fa] border border-[#e3e4e8] flex-shrink-0">
                                                        <img
                                                            src={property.images && property.images.length > 0 ? `/storage/${property.images[0].image_path}` : 'https://placehold.co/600x400?text=No+Image'}
                                                            alt={property.title}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-[14px] font-bold text-[#2f3344] group-hover:text-[#673ab7] transition-colors">
                                                            {property.title}
                                                        </p>
                                                        <p className="text-[12px] text-[#727586] font-normal tracking-wide">
                                                            {property.address}, {property.city}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                               <div className="text-[14px] font-bold text-[#2f3344]">
                                                    {property.purpose === 'sale' || property.purpose === 'both' ? 
                                                        <div>Sale: ${Number(property.price).toLocaleString()}</div> : null}
                                                    {property.purpose === 'rent' || property.purpose === 'both' ? 
                                                        <div>Rent: ${Number(property.rent_price).toLocaleString()}/{property.rent_period}</div> : null}
                                                </div>
                                                <div className="text-[12px] uppercase text-[#727586] font-bold mt-1">
                                                    {property.purpose}
                                                </div>
                                            </td>
                                             <td className="px-5 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {property.category?.name || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-2">
                                                    {property.status === 'active' ? (
                                                        <>
                                                            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#00b090] flex items-center justify-center text-[#00b090]">
                                                                <Check size={11} strokeWidth={3} />
                                                            </div>
                                                            <span className="text-[13px] font-medium text-[#2f3344] capitalize">{property.status}</span>
                                                        </>
                                                    ) : property.status === 'pending' ? (
                                                        <>
                                                             <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-orange-500 flex items-center justify-center text-orange-500">
                                                                <AlertCircle size={11} strokeWidth={3} />
                                                            </div>
                                                            <span className="text-[13px] font-medium text-[#2f3344] capitalize">Pending Review</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#ffb000] flex items-center justify-center text-[#ffb000]">
                                                                <AlertCircle size={11} strokeWidth={3} />
                                                            </div>
                                                            <span className="text-[13px] font-medium text-[#2f3344] capitalize">{property.status}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="pr-7 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.properties.edit', property.id)}
                                                        className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#2f3344] bg-[#f1f3f5] hover:bg-[#673ab7] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#673ab7]"
                                                        title="Edit Property"
                                                    >
                                                        <SquarePen size={16} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => {
                                                            if(confirm('Are you sure you want to delete this property?')) {
                                                                router.delete(route('admin.properties.destroy', property.id));
                                                            }
                                                        }}
                                                        className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#ef4444] bg-[#fee2e2]/50 hover:bg-[#ef4444] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#ef4444]"
                                                        title="Delete Property"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-7 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3 text-[#727586]">
                                                <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-2">
                                                    <Store size={30} className="text-[#c3c4ca]" />
                                                </div>
                                                <p className="text-[16px] font-bold text-[#2f3344]">No properties found</p>
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

                    {/* Pagination */}
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
                                {properties.from || 0} - {properties.to || 0} of {properties.total || 0}
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handlePageChange(properties.prev_page_url)}
                                    disabled={!properties.prev_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={() => handlePageChange(properties.next_page_url)}
                                    disabled={!properties.next_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
                            <div className="flex items-center gap-4 border-r border-slate-600 pr-5">
                                <span className="text-[14px] font-bold">{selectedIds.length} properties selected</span>
                                <button 
                                    onClick={() => setSelectedIds([])}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-6 px-4 flex-1">
                                <button 
                                    onClick={() => router.post(route('admin.properties.bulk-action'), { ids: selectedIds, action: 'activate' })}
                                    className="text-[14px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <Plus size={16} /> Mark Active
                                </button>
                                <button 
                                    onClick={() => router.post(route('admin.properties.bulk-action'), { ids: selectedIds, action: 'sold' }, { onSuccess: () => setSelectedIds([]) })}
                                    className="text-[14px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <AlertCircle size={16} /> Mark Sold
                                </button>
                                <button 
                                    onClick={() => {
                                        if (confirm(`Are you sure you want to delete ${selectedIds.length} properties?`)) {
                                            router.post(route('admin.properties.bulk-action'), { ids: selectedIds, action: 'delete' }, {
                                                onSuccess: () => setSelectedIds([])
                                            });
                                        }
                                    }}
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
