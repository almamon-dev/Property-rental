import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    MapPin, Bed, Bath, Move, 
    Calendar, CheckCircle2, Building, 
    Share2, Heart, MessageSquare, 
    Phone, Mail, ArrowLeft, ArrowUpRight,
    Building2, Square, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Show({ auth, property, related_properties }) {
    const [activeImage, setActiveImage] = useState(0);

    const nextImage = () => {
        if (property.images?.length > 0) {
            setActiveImage((prev) => (prev + 1) % property.images.length);
        }
    };

    const prevImage = () => {
        if (property.images?.length > 0) {
            setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
        }
    };

    const displayPrice = property.purpose === 'rent' ? property.rent_price : property.price;

    return (
        <div className="bg-white min-h-screen font-['Inter',sans-serif] text-gray-900 antialiased">
            <Head title={`${property.title} | Almamon Premium`} />

            {/* Simple Navigation */}
            <header className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 py-3">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href={route('properties.index')} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#3D74B6] hover:border-blue-100 transition-all">
                            <ArrowLeft size={16} />
                        </Link>
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-[#3D74B6] rounded-lg flex items-center justify-center text-white">
                                <Building size={16} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900">ALMAMON</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                            <Heart size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#3D74B6] transition-all">
                            <Share2 size={16} />
                        </button>
                    </div>
                </nav>
            </header>

            <main className="pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Compact Image Gallery Overlay */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                        {/* Main Image Viewport */}
                        <div className="lg:col-span-8 relative group rounded-3xl overflow-hidden bg-gray-100 aspect-[16/9]">
                            {property.images && property.images.length > 0 ? (
                                <>
                                    <img 
                                        src={property.images[activeImage].image_path.startsWith('http') 
                                            ? property.images[activeImage].image_path 
                                            : `/storage/${property.images[activeImage].image_path}`}
                                        className="w-full h-full object-cover transition-all duration-700"
                                        alt={property.title}
                                    />
                                    {property.images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur hover:bg-white/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <ChevronLeft size={24} />
                                            </button>
                                            <button 
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur hover:bg-white/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <ChevronRight size={24} />
                                            </button>
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                                {property.images.map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`h-1.5 rounded-full transition-all ${activeImage === i ? 'w-8 bg-white' : 'w-1.5 bg-white/40'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                    <Building2 size={64} strokeWidth={1} />
                                    <p className="text-xs font-bold uppercase tracking-widest mt-4">No Visuals Available</p>
                                </div>
                            )}
                        </div>

                        {/* Property Snapshot Info */}
                        <div className="lg:col-span-4 flex flex-col">
                            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex-1 flex flex-col">
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <div className="inline-flex items-center gap-2 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#3D74B6] animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#3D74B6]">
                                                {property.purpose === 'rent' ? 'Rental Opportunity' : 'Investment Grade'}
                                            </span>
                                        </div>
                                        <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2">
                                            {property.title}
                                        </h1>
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <MapPin size={14} />
                                            <span className="text-xs font-bold uppercase tracking-widest">{property.address}, {property.city}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <p className="text-3xl font-black text-[#3D74B6] tracking-tighter">
                                            ৳{Number(displayPrice).toLocaleString()}
                                            {property.purpose === 'rent' && <span className="text-sm text-gray-400 font-bold ml-1">/ Month</span>}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-6">
                                        <div className="bg-white p-4 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Total Space</p>
                                            <div className="flex items-center gap-2">
                                                <Move size={16} className="text-[#3D74B6]" />
                                                <span className="text-sm font-black text-gray-900">{property.area} <span className="text-[10px] text-gray-400">Sqft</span></span>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl border border-gray-100">
                                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Architecture</p>
                                            <div className="flex items-center gap-2">
                                                <Building2 size={16} className="text-[#3D74B6]" />
                                                <span className="text-sm font-black text-gray-900">{property.category?.name || 'Asset'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-gray-400 uppercase tracking-widest">Bedrooms</span>
                                            <span className="font-black text-gray-900">{property.bedrooms} Units</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-gray-400 uppercase tracking-widest">Bathrooms</span>
                                            <span className="font-black text-gray-900">{property.bathrooms} Units</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-gray-400 uppercase tracking-widest">Property ID</span>
                                            <span className="font-black text-gray-900 text-[#3D74B6]">#{property.id.toString().padStart(5, '0')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <button className="w-full bg-gradient-to-r from-[#3D74B6] to-[#2b5382] text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:translate-y-[-1px] transition-all shadow-lg shadow-blue-100/50">
                                        Secure This Property
                                    </button>
                                    <button className="w-full bg-white border border-gray-100 text-gray-900 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                        <Phone size={14} /> Request Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                            {/* Descriptive Section */}
                            <section className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3D74B6]">The Dossier</h3>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight text-[#3D74B6]">Executive Property Summary</h2>
                                <div 
                                    className="text-gray-500 leading-relaxed text-sm lg:text-base font-medium"
                                    dangerouslySetInnerHTML={{ __html: property.description }}
                                />
                            </section>

                            {/* Amenities - Minimalist */}
                            {property.amenities && property.amenities.length > 0 && (
                                <section className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3D74B6]">Facilities</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {property.amenities.map((amenity, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[#3D74B6] shadow-sm">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">{amenity.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Location View */}
                            <section className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3D74B6]">District</h3>
                                <div className="bg-gray-100 rounded-[2rem] aspect-[21/9] flex items-center justify-center border border-gray-100 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 grayscale" />
                                    <div className="relative z-10 text-center space-y-2">
                                        <div className="w-12 h-12 bg-white rounded-2xl mx-auto flex items-center justify-center text-[#3D74B6] shadow-xl border border-blue-50">
                                            <MapPin size={24} />
                                        </div>
                                        <p className="text-xl font-black text-gray-900 tracking-tight">{property.city}, Bangladesh</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Precision Coordinate Mapping</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sticky Sidebar (Contact) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 space-y-6">
                                {/* Agent/Owner Card */}
                                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Acquisition Specialist</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                                            <img src={`https://i.pravatar.cc/150?u=${property.user?.id}`} alt="Agent" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 tracking-tight">{property.user?.name || 'Elite Agent'}</h4>
                                            <p className="text-[10px] font-bold text-[#3D74B6] uppercase tracking-widest">Verified Partner</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#3D74B6] hover:bg-blue-50/10 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <Mail size={14} className="text-gray-400 group-hover:text-[#3D74B6]" />
                                                <span className="text-xs font-bold text-gray-600">{property.user?.email || 'contact@almamon.com'}</span>
                                            </div>
                                            <ArrowUpRight size={14} className="text-gray-300 group-hover:text-[#3D74B6]" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#3D74B6] hover:bg-blue-50/10 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <MessageSquare size={14} className="text-gray-400 group-hover:text-[#3D74B6]" />
                                                <span className="text-xs font-bold text-gray-600">Direct Consultation</span>
                                            </div>
                                            <ArrowUpRight size={14} className="text-gray-300 group-hover:text-[#3D74B6]" />
                                        </button>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-gray-900 uppercase">Verified Exchange</p>
                                        <p className="text-[9px] font-bold text-gray-400 tracking-tighter">This listing has passed 12-point authentication.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Properties */}
                    {related_properties && related_properties.length > 0 && (
                        <section className="mt-24 pt-24 border-t border-gray-100">
                            <div className="flex items-end justify-between mb-10">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3D74B6]">Suggestions</p>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Properties You May Curate</h2>
                                </div>
                                <Link href={route('properties.index')} className="text-xs font-bold text-gray-400 hover:text-[#3D74B6] transition-colors uppercase tracking-widest">
                                    View Full Archive
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {related_properties.map((rel) => (
                                    <Link 
                                        key={rel.id}
                                        href={route('properties.show', rel.slug)}
                                        className="group space-y-4"
                                    >
                                        <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm hover:shadow-xl transition-all duration-500">
                                            <img 
                                                src={rel.images?.[0] 
                                                    ? (rel.images[0].image_path.startsWith('http') ? rel.images[0].image_path : `/storage/${rel.images[0].image_path}`)
                                                    : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                alt={rel.title}
                                            />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="bg-white/80 backdrop-blur p-3 rounded-xl border border-white/40 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{rel.city}</p>
                                                        <p className="text-xs font-black text-gray-900 line-clamp-1">{rel.title}</p>
                                                    </div>
                                                    <div className="w-6 h-6 bg-[#3D74B6] rounded-lg flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                                                        <ArrowUpRight size={12} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Compact Footer */}
            <footer className="py-8 border-t border-gray-50 bg-gray-50/30">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-300">© 2026 Almamon Real Estate Network • Private & Confidential</p>
                 </div>
            </footer>
        </div>
    );
}
