import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, MapPin, Home, Building2, 
    ArrowRight, Star, Bed, Bath, Move, 
    Filter, ChevronDown, Heart, ArrowUpLeft, ArrowUpRight,
    SearchX
} from 'lucide-react';

export default function Index({ auth, properties, categories, filters }) {
    const [scrolled, setScrolled] = useState(true);
    const [searchData, setSearchData] = useState({
        location: filters.location || '',
        category: filters.category || '',
        type: filters.type || 'buy',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('properties.index'), searchData, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <div className="bg-[#0a0a0b] min-h-screen font-['Inter',sans-serif] text-white selection:bg-[#c5a358] selection:text-black">
            <Head title="Search Properties | Almamon Luxury" />

            {/* Premium Header */}
            <header className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4">
                <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 border border-[#c5a358] flex items-center justify-center rotate-45">
                            <Home size={16} className="text-[#c5a358] -rotate-45" />
                        </div>
                        <span className="text-[18px] font-light tracking-[0.2em] uppercase">
                            ALMA<span className="font-bold">MON</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-8">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-[11px] font-bold tracking-[0.2em] uppercase border border-white/20 px-6 py-2.5 hover:bg-white hover:text-black transition-all">
                                Account
                            </Link>
                        ) : (
                            <Link href={route('login')} className="text-[11px] font-bold tracking-[0.2em] uppercase bg-[#c5a358] text-black px-6 py-2.5 hover:bg-[#d4b574] transition-all">
                                Sign In
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-[1400px] mx-auto">
                    {/* Page Title & Breadcrumb */}
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="space-y-4">
                             <div className="flex items-center gap-3 text-[#c5a358]">
                                <Link href="/" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-white transition-colors">Home</Link>
                                <span className="w-4 h-[1px] bg-white/20" />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Properties</span>
                            </div>
                            <h1 className="text-[40px] md:text-[56px] font-serif italic text-white leading-tight">Elite <span className="not-italic font-sans font-black tracking-tighter uppercase">Properties</span></h1>
                        </div>
                        <p className="text-white/30 text-[14px] font-medium tracking-wide">Showing {properties.data.length} out of {properties.total} discoveries</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-1 space-y-10 animate-in fade-in slide-in-from-left duration-700">
                            <form onSubmit={handleSearch} className="space-y-10">
                                <div className="space-y-6">
                                    <h3 className="text-[12px] font-bold tracking-[0.4em] uppercase text-[#c5a358] flex items-center gap-3">
                                        Refine Search
                                        <span className="flex-1 h-[1px] bg-white/5" />
                                    </h3>
                                    
                                    <div className="space-y-8">
                                        {/* Location */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Destination</label>
                                            <div className="relative group">
                                                <MapPin size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a358] transition-colors" />
                                                <input 
                                                    type="text" 
                                                    placeholder="City or Neighborhood"
                                                    value={searchData.location}
                                                    onChange={e => setSearchData({...searchData, location: e.target.value})}
                                                    className="w-full bg-transparent border-none border-b border-white/10 pl-6 py-2 text-[14px] focus:ring-0 focus:border-[#c5a358] transition-all placeholder:text-white/10"
                                                />
                                            </div>
                                        </div>

                                        {/* Category */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Asset Type</label>
                                            <div className="relative group">
                                                 <Home size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a358] transition-colors" />
                                                 <select 
                                                    value={searchData.category}
                                                    onChange={e => setSearchData({...searchData, category: e.target.value})}
                                                    className="w-full bg-transparent border-none border-b border-white/10 pl-6 py-2 text-[14px] focus:ring-0 focus:border-[#c5a358] transition-all appearance-none cursor-pointer"
                                                 >
                                                    <option value="" className="bg-[#0a0a0b]">All Types</option>
                                                    {categories.map(cat => (
                                                        <option key={cat.id} value={cat.id} className="bg-[#0a0a0b]">{cat.name}</option>
                                                    ))}
                                                 </select>
                                                 <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20" />
                                            </div>
                                        </div>

                                        {/* Price Range */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Price Matrix</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input 
                                                    type="number" 
                                                    placeholder="Min"
                                                    value={searchData.min_price}
                                                    onChange={e => setSearchData({...searchData, min_price: e.target.value})}
                                                    className="bg-white/5 border border-white/5 rounded-[4px] px-3 py-2 text-[13px] focus:ring-1 focus:ring-[#c5a358] outline-none transition-all placeholder:text-white/10"
                                                />
                                                <input 
                                                    type="number" 
                                                    placeholder="Max"
                                                    value={searchData.max_price}
                                                    onChange={e => setSearchData({...searchData, max_price: e.target.value})}
                                                    className="bg-white/5 border border-white/5 rounded-[4px] px-3 py-2 text-[13px] focus:ring-1 focus:ring-[#c5a358] outline-none transition-all placeholder:text-white/10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-[#c5a358] text-black py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-white transition-all shadow-lg active:scale-95">
                                    Apply Analytics
                                </button>
                            </form>

                            <div className="pt-10 border-t border-white/5 space-y-6">
                                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">Exclusive Services</h4>
                                <div className="space-y-4">
                                    {['Private Appraisal', 'Legal Counsel', 'Concierge'].map(item => (
                                        <Link key={item} href="#" className="flex items-center justify-between text-[12px] text-white/50 hover:text-white transition-colors group">
                                            {item}
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Main Grid */}
                        <div className="lg:col-span-3">
                            {properties.data.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 animate-in fade-in slide-in-from-right duration-1000">
                                    {properties.data.map((property, idx) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))}
                                </div>
                            ) : (
                                <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[20px]">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-4">
                                        <SearchX size={40} strokeWidth={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-[20px] font-serif italic text-white">No Assets Found</h3>
                                        <p className="text-white/30 text-[14px]">The criteria did not match any current listings in our collection.</p>
                                    </div>
                                    <button 
                                        onClick={() => router.get(route('properties.index'))}
                                        className="text-[11px] font-black tracking-[0.2em] uppercase text-[#c5a358] hover:text-white underline underline-offset-8"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {properties.links.length > 3 && (
                                <div className="mt-20 flex justify-center gap-4">
                                    {properties.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`w-10 h-10 flex items-center justify-center border text-[12px] font-bold transition-all ${link.active ? 'bg-[#c5a358] border-[#c5a358] text-black' : 'border-white/10 text-white/30 hover:border-white/30 group'} ${!link.url ? 'hidden' : ''}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-white/5 text-center px-6">
                 <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/10">© 2026 ALMAMON TECHNOLOGY GROUP</p>
            </footer>
        </div>
    );
}

function PropertyCard({ property }) {
    return (
        <div className="group space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-white/5">
                <img 
                    src={property.images && property.images.length > 0 ? `/storage/${property.images[0].image_path}` : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
                    alt={property.title} 
                />
                
                {/* Labels */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-[#c5a358] text-black text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-xl">Exclusive</span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-white/10">{property.purpose}</span>
                </div>

                <button className="absolute bottom-6 right-6 w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#ef4444] hover:border-[#ef4444] transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
                    <Heart size={20} />
                </button>
            </div>

            <div className="space-y-4 px-2">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-[#c5a358]" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">{property.city}</span>
                    </div>
                    <Link href={route('properties.show', property.slug)} className="block">
                        <h4 className="text-[24px] font-serif italic text-white group-hover:text-[#c5a358] transition-colors">{property.title}</h4>
                    </Link>
                </div>

                <div className="flex items-center gap-6 py-4 border-y border-white/5">
                     <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/40">
                         <Bed size={14} className="text-[#c5a358]" /> {property.bedrooms} BR
                     </div>
                     <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/40">
                         <Bath size={14} className="text-[#c5a358]" /> {property.bathrooms} BT
                     </div>
                     <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/40">
                         <Move size={14} className="text-[#c5a358]" /> {property.area} SQFT
                     </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <p className="text-[22px] font-light tracking-wide text-white">
                        ${Number(property.purpose === 'rent' ? property.rent_price : property.price).toLocaleString()}
                    </p>
                    <Link href={route('properties.show', property.slug)} className="text-[10px] font-black tracking-[0.2em] uppercase text-[#c5a358] flex items-center gap-2 group/btn hover:gap-4 transition-all">
                        View Dossier <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
