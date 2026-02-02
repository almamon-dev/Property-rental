import React, { useState, useEffect, useRef } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Search,
    ChevronDown,
    Grid3X3,
    Heart,
    MapPin,
    Building,
    Building2,
    Bed,
    Bath,
    Move,
    ArrowRight,
    SearchX,
    X,
    SlidersHorizontal,
    Sparkles,
    Menu
} from "lucide-react";

export default function Index({ auth, properties, categories, filters: initialFilters }) {
    const isFirstRender = useRef(true);

    // --- STATE ---
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openMenus, setOpenMenus] = useState({
        price: true,
        location: true,
        category: true,
        availability: true,
        amenities: false
    });
    
    // Filter State
    const [filters, setFilters] = useState({
        search: initialFilters.search || '',
        location: initialFilters.location || '',
        category: initialFilters.category || '',
        type: initialFilters.type || '',
        min_price: parseInt(initialFilters.min_price) || 0,
        max_price: parseInt(initialFilters.max_price) || 100000000, 
        sort: initialFilters.sort || 'latest',
        per_page: initialFilters.per_page || '24',
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const applyFilters = () => {
        const data = {};
        if (filters.search) data.search = filters.search;
        if (filters.location) data.location = filters.location;
        if (filters.category) data.category = filters.category;
        if (filters.type) data.type = filters.type;
        if (filters.min_price > 0) data.min_price = filters.min_price;
        if (filters.max_price < 100000000) data.max_price = filters.max_price;
        if (filters.sort !== 'latest') data.sort = filters.sort;
        if (filters.per_page !== '24') data.per_page = filters.per_page;

        router.get(route('properties.index'), data, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    // Trigger filter update on state change (Automatic)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            applyFilters();
        }, 400); 
        return () => clearTimeout(timer);
    }, [
        filters.search,
        filters.location,
        filters.category,
        filters.type,
        filters.min_price, 
        filters.max_price,
        filters.sort,
        filters.per_page
    ]);

    // Sync state with props on navigation (History)
    useEffect(() => {
        setFilters({
            search: initialFilters.search || '',
            location: initialFilters.location || '',
            category: initialFilters.category || '',
            type: initialFilters.type || 'buy',
            min_price: parseInt(initialFilters.min_price) || 0,
            max_price: parseInt(initialFilters.max_price) || 100000000, 
            sort: initialFilters.sort || 'latest',
            per_page: initialFilters.per_page || '24',
        });
    }, [initialFilters]);

    const clearAllFilters = () => {
        const resetData = {
            search: '',
            location: '',
            category: '',
            type: '',
            min_price: 0,
            max_price: 100000000,
            sort: 'latest',
            per_page: '24',
        };
        setFilters(resetData);
        
        // Instant navigation to clear URL parameters
        router.get(route('properties.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const { data, links, total, last_page, from, to } = properties;

    return (
        <div className="bg-[#f8f9fb] min-h-screen font-['Inter',sans-serif] text-gray-900 antialiased">
            <Head title="Properties Collection | Almamon Premium" />

            {/* Premium Navigation - Integrated from Welcome Page */}
            <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-2' : 'bg-white py-3 border-b border-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#3D74B6] to-[#2b5382] rounded-lg flex items-center justify-center text-white shadow-md">
                                <Building size={16} className="sm:w-5 sm:h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">ALMAMON</span>
                                <span className="text-[8px] sm:text-[10px] font-medium text-[#3D74B6] hidden sm:block">
                                    Real Estate
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                            {['Buy', 'Rent', 'Commercial', 'Insights', 'Agents', 'About'].map((item) => (
                                <Link 
                                    key={item} 
                                    href="#" 
                                    className="text-sm font-medium text-gray-600 hover:text-[#3D74B6] transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3D74B6] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {auth.user ? (
                                <Link 
                                    href={route('dashboard')} 
                                    className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all font-medium text-sm text-gray-700"
                                >
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#3D74B6] to-[#2b5382] flex items-center justify-center text-white text-xs font-bold">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <span className="hidden sm:inline">{auth.user.name}</span>
                                </Link>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href={route('login')} className="hidden sm:block text-sm font-medium text-gray-600 hover:text-[#3D74B6] transition-colors">
                                        Sign In
                                    </Link>
                                    <Link 
                                        href={route('register')} 
                                        className="bg-gradient-to-r from-[#3D74B6] to-[#2b5382] text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm font-semibold hover:from-[#2b5382] hover:to-[#3D74B6] transition-all shadow-md hover:shadow-lg"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
                <div className="lg:grid lg:grid-cols-12 gap-6 items-start">
                    
                    {/* --- SIDEBAR --- */}
                    <aside className="lg:col-span-3 space-y-4 order-1 sticky top-6">
                        
                        {/* Filter Header with Clear Link */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
                                    <SlidersHorizontal size={16} className="text-[#3D74B6]" />
                                    Filter Properties
                                </h4>
                                <button 
                                    onClick={clearAllFilters}
                                    className="text-[11px] font-bold text-[#3D74B6] hover:text-blue-800 hover:underline flex items-center gap-1 transition-all"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                        
                        {/* Price Filter */}
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-gray-50 bg-gray-50/30">
                                <h4 className="text-[14px] font-bold text-gray-900">Price Range (৳)</h4>
                            </div>
                            <div className="px-5 py-6">
                                <div className="relative h-2 w-full bg-gray-100 rounded-full mb-8">
                                    <div 
                                        className="absolute h-full bg-[#3D74B6] rounded-full"
                                        style={{ 
                                            left: `${(filters.min_price / 100000000) * 100}%`, 
                                            right: `${100 - (filters.max_price / 100000000) * 100}%` 
                                        }}
                                    ></div>
                                    <input
                                        type="range" min="0" max="100000000" step="10000"
                                        value={filters.min_price}
                                        onChange={(e) => setFilters({...filters, min_price: Math.min(Number(e.target.value), filters.max_price - 10000)})}
                                        className="absolute appearance-none w-full h-2 bg-transparent pointer-events-none cursor-pointer slider-range-input"
                                    />
                                    <input
                                        type="range" min="0" max="100000000" step="10000"
                                        value={filters.max_price}
                                        onChange={(e) => setFilters({...filters, max_price: Math.max(Number(e.target.value), filters.min_price + 10000)})}
                                        className="absolute appearance-none w-full h-2 bg-transparent pointer-events-none cursor-pointer slider-range-input"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-gray-400">Min</span>
                                        <input 
                                            type="number" 
                                            value={filters.min_price} 
                                            onChange={(e) => setFilters({ ...filters, min_price: Number(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 outline-none focus:border-[#3D74B6] bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-gray-400">Max</span>
                                        <input 
                                            type="number" 
                                            value={filters.max_price} 
                                            onChange={(e) => setFilters({ ...filters, max_price: Number(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-100 rounded-lg text-[13px] font-bold text-gray-700 outline-none focus:border-[#3D74B6] bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sale Type Filter */}
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-4 flex items-center justify-between bg-gray-50/30 border-b border-gray-50">
                                <h4 className="text-[14px] font-bold text-gray-900">Purpose</h4>
                            </div>
                            <div className="p-2 grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => setFilters({...filters, type: 'buy'})}
                                    className={`py-2 text-[12px] font-bold rounded-lg outline-none focus:outline-none transition-colors ${filters.type === 'buy' ? 'bg-[#3D74B6] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                >
                                    For Sale
                                </button>
                                <button 
                                    onClick={() => setFilters({...filters, type: 'rent'})}
                                    className={`py-2 text-[12px] font-bold rounded-lg outline-none focus:outline-none transition-colors ${filters.type === 'rent' ? 'bg-[#3D74B6] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                >
                                    For Rent
                                </button>
                            </div>
                            {filters.type && (
                                <button 
                                    onClick={() => setFilters({...filters, type: ''})}
                                    className="w-full py-2 text-[10px] font-bold text-gray-400 hover:text-[#FA5C5C] border-t border-gray-50 transition-colors"
                                >
                                    Show All Types
                                </button>
                            )}
                        </div>

                        {/* Location Filter */}
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <button onClick={() => toggleMenu('location')} className={`w-full p-4 flex items-center justify-between bg-gray-50/30 ${openMenus.location ? 'border-b border-gray-50' : ''}`}>
                                <h4 className="text-[14px] font-bold text-gray-900">Location</h4>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${openMenus.location ? 'rotate-180 text-[#3D74B6]' : ''}`} />
                            </button>
                            {openMenus.location && (
                                <div className="px-5 py-4 space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar">
                                    {['Gulshan', 'Banani', 'Uttara', 'Dhanmondi', 'Bashundhara', 'Mirpur'].map((loc) => (
                                        <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="radio" 
                                                name="location"
                                                checked={filters.location === loc} 
                                                onChange={() => setFilters({...filters, location: loc})} 
                                                className="custom-radio" 
                                            />
                                            <span className="text-[13px] font-medium text-gray-600 group-hover:text-[#3D74B6] transition-colors">{loc}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <button onClick={() => toggleMenu('category')} className={`w-full p-4 flex items-center justify-between bg-gray-50/30 ${openMenus.category ? 'border-b border-gray-50' : ''}`}>
                                <h4 className="text-[14px] font-bold text-gray-900">Category</h4>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${openMenus.category ? 'rotate-180 text-[#3D74B6]' : ''}`} />
                            </button>
                            {openMenus.category && (
                                <div className="px-5 py-4 space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar">
                                    {categories.map((cat) => (
                                        <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="category"
                                                    checked={filters.category === String(cat.slug)} 
                                                    onChange={() => setFilters({...filters, category: String(cat.slug)})} 
                                                    className="custom-radio" 
                                                />
                                                <span className="text-[13px] font-medium text-gray-600 group-hover:text-[#3D74B6]">{cat.name}</span>
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-300">{cat.id * 12}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                       
                    </aside>

                    {/* --- LISTING --- */}
                    <main className="w-full lg:col-span-9 order-2 relative min-h-[400px]">
                        {/* --- LIVE FILTER BAR --- */}
                        <div className="mb-6 space-y-4">
                            {/* Search Input */}
                            <div className="relative group">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3D74B6] transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search by title, keywords or ID..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#3D74B6] focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
                                />
                                {filters.search && (
                                    <button 
                                        onClick={() => setFilters({...filters, search: ''})}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FA5C5C] transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Active Chips */}
                            <div className="flex flex-wrap items-center gap-2">
                                {(filters.search || filters.location || filters.category || filters.min_price > 0 || filters.max_price < 100000000) && (
                                    <span className="text-[11px] font-bold text-gray-400 mr-2">Active Filters:</span>
                                )}
                                
                                {filters.search && (
                                    <FilterChip label={`"${filters.search}"`} onClear={() => setFilters({...filters, search: ''})} />
                                )}
                                {filters.location && (
                                    <FilterChip label={filters.location} onClear={() => setFilters({...filters, location: ''})} />
                                )}
                                {filters.category && (
                                    <FilterChip 
                                        label={categories.find(c => String(c.slug) === filters.category)?.name || filters.category} 
                                        onClear={() => setFilters({...filters, category: ''})} 
                                    />
                                )}
                                {(filters.min_price > 0 || filters.max_price < 100000000) && (
                                    <FilterChip 
                                        label={`৳${filters.min_price.toLocaleString()} - ৳${filters.max_price.toLocaleString()}`} 
                                        onClear={() => setFilters({...filters, min_price: 0, max_price: 100000000})} 
                                    />
                                )}
                            </div>
                        </div>

                        {/* --- LISTING TOOLBAR --- */}
                        <div className="flex flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="space-y-0.5">
                                <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">
                                    {filters.category ? categories.find(c => String(c.slug) === filters.category)?.name : 'Premium Listings'}
                                </h2>
                                <p className="text-[11px] font-bold text-gray-400">
                                    Showing {from || 0} – {to || 0} of {total} Properties
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] text-gray-400 font-bold">Show:</span>
                                    <select 
                                        value={filters.per_page}
                                        onChange={(e) => setFilters(prev => ({ ...prev, per_page: e.target.value }))}
                                        className="appearance-none bg-gray-50 border border-gray-100 text-gray-700 text-[12px] rounded-xl pl-3 pr-8 py-1.5 outline-none font-bold hover:bg-white transition-all cursor-pointer min-w-[70px] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[right_4px_center]"
                                    >
                                        <option value="12">12</option>
                                        <option value="24">24</option>
                                        <option value="48">48</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] text-gray-400 font-bold">Sort:</span>
                                    <select 
                                        value={filters.sort}
                                        onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                        className="appearance-none bg-gray-50 border border-gray-100 text-gray-700 text-[12px] rounded-xl pl-3 pr-10 py-1.5 outline-none font-bold hover:bg-white transition-all cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[right_4px_center]"
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="price_low">Price: Low-High</option>
                                        <option value="price_high">Price: High-Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {data.length === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-100 p-16 text-center shadow-sm">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                                    <SearchX size={48} />
                                </div>
                                <h3 className="text-[20px] font-black text-gray-900 mb-2">No Matching Assets</h3>
                                <p className="text-[14px] text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find any properties matching your current filters. Try resetting or adjusting your criteria.</p>
                                <button onClick={clearAllFilters} className="px-8 py-3 bg-[#3D74B6] text-white text-[11px] font-bold rounded-xl hover:bg-[#2b5382] transition-all shadow-lg shadow-blue-100">Reset All Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {last_page > 1 && (
                            <div className="mt-16 flex justify-center">
                                <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                     {links.map((link, i) => {
                                        let label = link.label;
                                        if (label.includes('Previous')) label = "&laquo;";
                                        else if (label.includes('Next')) label = "&raquo;";
                                        
                                        if (link.url) {
                                            return (
                                                <Link 
                                                    key={i} 
                                                    href={link.url} 
                                                    className={`w-10 h-10 flex items-center justify-center text-[13px] font-bold rounded-xl transition-all ${link.active ? "bg-[#3D74B6] text-white shadow-md shadow-blue-100" : "text-gray-500 hover:bg-gray-50 hover:text-[#3D74B6]"}`} 
                                                    preserveScroll 
                                                    preserveState
                                                >
                                                    <span dangerouslySetInnerHTML={{ __html: label }} />
                                                </Link>
                                            );
                                        } else {
                                            return (
                                                <span 
                                                    key={i} 
                                                    className="w-10 h-10 flex items-center justify-center text-[13px] font-bold text-gray-200 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{ __html: label }}
                                                />
                                            );
                                        }
                                     })}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <footer className="py-12 border-t border-gray-100 bg-white mt-16">
                 <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-[10px] font-bold text-gray-300">© 2026 Almamon Real Estate Network • Secure Exchange</p>
                 </div>
            </footer>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .slider-range-input::-webkit-slider-thumb {
                    pointer-events: auto; appearance: none; width: 18px; height: 18px; border-radius: 50%;
                    background: #fff; border: 4px solid #3D74B6;
                    cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                    transition: all 0.2s ease;
                    margin-top: -5px;
                }
                .custom-radio {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border: 2px solid #e5e7eb;
                    border-radius: 50%;
                    background-color: #fff;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    position: relative;
                }
                .custom-radio:checked {
                    border-color: #3D74B6;
                }
                .custom-radio:checked::after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 6px;
                    height: 6px;
                    background-color: #3D74B6;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                }
            ` }} />
        </div>
    );
}

function PropertyCard({ property }) {
    const price = Number(property.purpose === 'rent' ? property.rent_price : property.price);
    const originalPrice = price + (price * 0.15); 

    return (
        <div className="bg-white rounded-2xl border border-gray-100 group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/10 hover:translate-y-[-4px] flex flex-col h-full relative">
            {/* --- SAVE BADGE --- */}
            <div className="absolute top-3 left-3 z-10">
                <div className="bg-[#3D74B6] text-white px-3 py-1 text-[10px] font-bold rounded shadow-lg shadow-blue-900/20 border border-white/10">
                    Save: ৳{Math.floor(price * 0.1).toLocaleString()}
                </div>
            </div>

            <Link href={route('properties.show', property.slug || property.id.toString())} className="relative overflow-hidden aspect-[16/11] bg-gray-50 rounded-t-xl">
                <img 
                    src={property.images && property.images.length > 0 ? `/storage/${property.images[0].image_path}` : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={property.title}
                />
                
                <button 
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-500 text-gray-400 hover:text-red-500"
                >
                    <Heart size={16} />
                </button>
            </Link>

            <div className="p-5 flex flex-col flex-1">
                <Link href={route('properties.show', property.slug || property.id.toString())}>
                    <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#3D74B6] transition-colors leading-tight mb-4 line-clamp-2 min-h-[2.5rem]">
                        {property.title}
                    </h3>
                </Link>
                
                {/* Vertical Specification List */}
                <div className="space-y-2 mb-6 border-t border-gray-50 pt-4">
                    <ListSpec Icon={MapPin} label="Location" val={property.city} />
                    <ListSpec Icon={Bed} label="Bedrooms" val={`${property.bedrooms || 0} Units`} />
                    <ListSpec Icon={Bath} label="Bathrooms" val={`${property.bathrooms || 0} Units`} />
                    <ListSpec Icon={Move} label="Total Area" val={`${property.area} Sqft`} />
                    <ListSpec Icon={Building2} label="Category" val={property.category?.name || 'Asset'} />
                </div>

                <div className="mt-auto border-t border-gray-50 pt-4 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4 font-['Inter',sans-serif]">
                        <span className="text-[18px] font-bold text-[#3D74B6] tracking-tight">৳{price.toLocaleString()}</span>
                        <span className="text-[12px] text-gray-300 line-through font-medium">৳{Math.floor(originalPrice).toLocaleString()}</span>
                    </div>
                    
                    <Link 
                        href={route('properties.show', property.slug || property.id.toString())}
                        className="w-full py-2.5 inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-[#3D74B6] text-[#3D74B6] bg-transparent text-[13px] font-bold transition-all duration-300 hover:bg-[#3D74B6] hover:text-white hover:shadow-lg hover:shadow-blue-100 active:scale-[0.98] group/btn"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

const ListSpec = ({ Icon, label, val }) => (
    <div className="flex items-center justify-between group/row">
        <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-gray-50 flex items-center justify-center text-gray-400 group-hover/row:bg-blue-50 group-hover/row:text-[#3D74B6] transition-colors">
                <Icon size={12} />
            </div>
            <span className="text-[11px] font-bold text-gray-400 transition-wider">{label}</span>
        </div>
        <span className="text-[11px] font-bold text-gray-700">{val}</span>
    </div>
);

const FilterChip = ({ label, onClear }) => (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm group hover:border-[#3D74B6] transition-all">
        <span className="text-[12px] font-medium text-gray-600 group-hover:text-[#3D74B6]">{label}</span>
        <button 
            onClick={onClear}
            className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#FA5C5C] hover:text-white transition-all"
        >
            <X size={10} />
        </button>
    </div>
);

