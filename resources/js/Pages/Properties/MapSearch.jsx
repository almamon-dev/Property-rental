
import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
    Building, MapPin, Search, Filter, 
    X, ChevronRight, Bed, Bath, Move, 
    ArrowLeft, List, LayoutGrid, SlidersHorizontal
} from 'lucide-react';

// Fix for marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

export default function MapSearch({ auth, properties = [], categories = [], filters = {} }) {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const defaultCenter = [23.8103, 90.4125]; // Dhaka default

    if (!mounted) return null;

    return (
        <div className="bg-white min-h-screen font-['Inter',sans-serif] text-gray-900 overflow-hidden flex flex-col h-screen">
            <Head title="Live Map Search | Almamon Premium" />

            {/* Premium Header */}
            <header className="h-16 border-b border-gray-100 px-4 flex items-center justify-between bg-white z-[1000]">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-[#3D74B6] rounded-lg flex items-center justify-center text-white shadow-lg">
                            <Building size={16} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">ALMAMON</span>
                    </Link>
                    
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                        <MapPin size={14} className="text-[#3D74B6]" />
                        <span className="text-xs font-bold text-gray-600">Global Coverage: {properties.length} Listings Live</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link 
                        href={route('properties.index')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold text-gray-600 transition-all border border-gray-100"
                    >
                        <List size={14} />
                        List View
                    </Link>
                    {auth.user ? (
                        <div className="w-8 h-8 rounded-full bg-[#3D74B6] flex items-center justify-center text-white text-xs font-bold shadow-md">
                            {auth.user.name.charAt(0)}
                        </div>
                    ) : (
                        <Link href={route('login')} className="text-xs font-bold text-[#3D74B6] hover:underline px-2">Sign In</Link>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Left Side: Map Container */}
                <div className="flex-1 relative">
                    <MapContainer 
                        center={defaultCenter} 
                        zoom={6} 
                        zoomControl={false}
                        style={{ height: '100%', width: '100%' }}
                        className="z-10"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <ZoomControl position="bottomright" />
                        
                        {properties.map(property => (
                            property.latitude && property.longitude && (
                                <Marker 
                                    key={property.id} 
                                    position={[parseFloat(property.latitude), parseFloat(property.longitude)]} 
                                    icon={DefaultIcon}
                                    eventHandlers={{
                                        click: () => setSelectedProperty(property)
                                    }}
                                >
                                    <Popup className="premium-popup">
                                        <div className="w-48">
                                            <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2">
                                                <img 
                                                    src={property.images?.[0]?.image_path.startsWith('http') ? property.images[0].image_path : `/storage/${property.images?.[0]?.image_path}`} 
                                                    className="w-full h-full object-cover" 
                                                    alt="" 
                                                />
                                            </div>
                                            <h4 className="text-xs font-black text-gray-900 line-clamp-1 mb-1">{property.title}</h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black text-[#3D74B6]">৳{Number(property.price || property.rent_price).toLocaleString()}</span>
                                                <Link href={route('properties.show', property.slug)} className="text-[9px] font-bold text-gray-400 hover:text-[#3D74B6]">Details →</Link>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        ))}
                    </MapContainer>

                    {/* Floating Quick Search Overlay */}
                    <div className="absolute top-6 left-6 z-[1000] w-full max-w-sm hidden sm:block">
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-4 space-y-3">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search global assets..." 
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:border-[#3D74B6] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-400"
                                />
                            </div>
                            <div className="flex gap-2">
                                <FilterControl label="For Sale" active />
                                <FilterControl label="Rent" />
                                <FilterControl label="Price Range" icon={<SlidersHorizontal size={12} />} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: List/Selection Side (350px) */}
                <aside className="w-[380px] border-l border-gray-100 bg-white flex flex-col hidden lg:flex">
                    <div className="p-6 border-b border-gray-50">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-black text-gray-900">Featured Near View</h2>
                            <span className="text-[10px] font-black uppercase text-[#3D74B6] bg-blue-50 px-2 py-0.5 rounded">Market Pulse</span>
                        </div>
                        <p className="text-xs font-bold text-gray-400">Discover properties in the current map selection area.</p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
                        {selectedProperty ? (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <button 
                                    onClick={() => setSelectedProperty(null)}
                                    className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft size={12} /> Back to Listings
                                </button>
                                <div className="space-y-6">
                                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                        <img 
                                            src={selectedProperty.images?.[0]?.image_path.startsWith('http') ? selectedProperty.images[0].image_path : `/storage/${selectedProperty.images?.[0]?.image_path}`} 
                                            className="w-full h-full object-cover" 
                                            alt="" 
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{selectedProperty.title}</h3>
                                            <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                                                <MapPin size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{selectedProperty.city}, {selectedProperty.country}</span>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-black text-[#3D74B6]">
                                            ৳{Number(selectedProperty.price || selectedProperty.rent_price).toLocaleString()}
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <MiniSpec icon={<Bed size={12} />} label="Bed" val={selectedProperty.bedrooms} />
                                            <MiniSpec icon={<Bath size={12} />} label="Bath" val={selectedProperty.bathrooms} />
                                            <MiniSpec icon={<Move size={12} />} label="Area" val={selectedProperty.area} />
                                        </div>
                                        <Link 
                                            href={route('properties.show', selectedProperty.slug)}
                                            className="block w-full py-3.5 bg-black text-white rounded-2xl text-center text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/10 hover:translate-y-[-1px] transition-all"
                                        >
                                            View Full Assets
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            properties.slice(0, 10).map(property => (
                                <div 
                                    key={property.id}
                                    onClick={() => setSelectedProperty(property)}
                                    className="group cursor-pointer flex gap-4 p-3 rounded-2xl border border-gray-50 hover:bg-gray-50 hover:border-gray-200 transition-all duration-300"
                                >
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                        <img 
                                            src={property.images?.[0]?.image_path.startsWith('http') ? property.images[0].image_path : `/storage/${property.images?.[0]?.image_path}`} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                            alt="" 
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <span className="text-[8px] font-black uppercase text-[#3D74B6] mb-1">{property.category?.name || 'Asset'}</span>
                                        <h4 className="text-xs font-black text-gray-900 line-clamp-2 mb-2 group-hover:text-[#3D74B6] transition-colors">{property.title}</h4>
                                        <div className="text-sm font-black text-gray-900 tracking-tight">৳{Number(property.price || property.rent_price).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </aside>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
                .leaflet-container { font-family: 'Inter', sans-serif !important; border-radius: 0px !important; }
                .premium-popup .leaflet-popup-content-wrapper { border-radius: 16px; padding: 4px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; }
                .premium-popup .leaflet-popup-tip { box-shadow: none; border: 1px solid #f1f5f9; }
            ` }} />
        </div>
    );
}

const FilterControl = ({ label, active = false, icon = null }) => (
    <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
        active 
            ? 'bg-[#3D74B6] text-white shadow-lg shadow-blue-100' 
            : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-300 hover:text-gray-900'
    }`}>
        {icon}
        {label}
    </button>
);

const MiniSpec = ({ icon, label, val }) => (
    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 text-center">
        <div className="flex justify-center text-[#3D74B6] mb-1">{icon}</div>
        <div className="text-[9px] font-bold text-gray-900">{val || 0} <span className="text-[8px] text-gray-400 font-medium">{label}</span></div>
    </div>
);
