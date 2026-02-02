import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, MapPin, Home, Building2, 
    ArrowRight, Star, Bed, Bath, Move, Users,
    Filter, ChevronDown, Heart, Mail, 
    Phone, Landmark, TreePine, ShieldCheck, 
    Briefcase, Bookmark, Share2, MoreHorizontal,
    Plus, Sparkles, Zap, Award, Globe, 
    ArrowUpRight, LayoutGrid, ListFilter, PlayCircle,
    Check, Activity, Shield, Calendar, Target,
    BarChart3, TrendingUp, DollarSign, CheckCircle,
    Eye, Clock, Maximize2, Compass, Building,
    ChevronLeft, ChevronRight, X, Menu
} from 'lucide-react';

export default function Welcome({ auth, categories = [], properties = [], filters = {} }) {
    const [scrolled, setScrolled] = useState(false);
    const [locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState(filters.location || '');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const suggestionsRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = async (query) => {
        if (!query) {
            setLocations([]);
            return;
        }
        try {
            const response = await fetch(`/api/locations/suggest?query=${query}`);
            const data = await response.json();
            setLocations(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('welcome'), {
            location: searchQuery,
            category: selectedCategory
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const isSearching = filters.location || filters.category;

    // Grouping logic for Market Node section - Grouped by Division (State)
    const groupedByDivision = properties.reduce((acc, property) => {
        const division = property.state || 'Primary Markets';
        if (!acc[division]) acc[division] = [];
        acc[division].push(property);
        return acc;
    }, {});

    // Statistics data
    const stats = [
        { value: '5,000+', label: 'Properties Listed', icon: Building2 },
        { value: '2,500+', label: 'Happy Clients', icon: Users },
        { value: '98%', label: 'Satisfaction Rate', icon: Star },
        { value: '24h', label: 'Avg. Response Time', icon: Clock }
    ];

    return (
        <div className="bg-white min-h-screen font-['Inter',sans-serif] text-gray-800 antialiased">
            <Head title="Almamon | Premium Real Estate Platform" />

            {/* Professional Navigation - Fully Responsive */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-2' : 'bg-transparent py-3'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white shadow-md">
                                <Building size={16} className="sm:w-5 sm:h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">ALMAMON</span>
                                <span className="text-[8px] sm:text-[10px] font-medium text-blue-600 tracking-widest uppercase hidden sm:block">
                                    REAL ESTATE
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                            {['Buy', 'Rent', 'Commercial', 'Insights', 'Agents', 'About'].map((item) => (
                                <Link 
                                    key={item} 
                                    href="#" 
                                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {auth.user ? (
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <Link 
                                        href={route('dashboard')} 
                                        className="hidden md:flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all font-medium text-sm text-gray-700"
                                    >
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                                            {auth.user.name.charAt(0)}
                                        </div>
                                        <span className="hidden sm:inline">{auth.user.name}</span>
                                    </Link>
                                    <Link 
                                        href={route('dashboard')} 
                                        className="md:hidden w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold"
                                    >
                                        {auth.user.name.charAt(0)}
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                        className="lg:hidden p-1.5 text-gray-600 hover:text-blue-600"
                                    >
                                        <Menu size={20} className="sm:w-6 sm:h-6" />
                                    </button>
                                    <div className="hidden lg:flex items-center gap-3">
                                        <Link href={route('login')} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                            Sign In
                                        </Link>
                                        <Link 
                                            href={route('register')} 
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                            <div className="flex flex-col space-y-3">
                                {['Buy', 'Rent', 'Commercial', 'Market Insights', 'Agents', 'About'].map((item) => (
                                    <Link 
                                        key={item} 
                                        href="#" 
                                        className="text-sm font-medium text-gray-600 hover:text-blue-600 py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}
                                <div className="pt-3 border-t border-gray-100 space-y-3">
                                    <Link 
                                        href={route('login')} 
                                        className="block text-sm font-medium text-gray-600 hover:text-blue-600 py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        href={route('register')} 
                                        className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Premium Hero Section - Fully Responsive */}
            <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-10 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-4 sm:left-10 w-56 h-56 sm:w-80 sm:h-80 bg-blue-600/3 rounded-full blur-3xl"></div>
                
                <div className="max-w-7xl mx-auto relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-100">
                                <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 text-blue-600" />
                                <span className="text-[10px] sm:text-xs font-semibold text-blue-700 tracking-wider uppercase">
                                    Trusted Real Estate Network
                                </span>
                            </div>
                            
                            <div className="space-y-4 sm:space-y-6">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Find Your <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Perfect</span> Property
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                                    Discover premium residential and commercial properties across Bangladesh. 
                                    Expert guidance, verified listings, and seamless transactions.
                                </p>
                            </div>

                            {/* Professional Search Module - Responsive */}
                            <form onSubmit={handleSearch} className="space-y-3 sm:space-y-4" ref={searchRef}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 p-1.5 sm:p-2 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg">
                                    <div className="relative" ref={suggestionsRef}>
                                        <div className="flex items-center px-3 py-2.5 sm:px-4 sm:py-3.5">
                                            <MapPin size={16} className="sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                                            <input 
                                                type="text" 
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    fetchSuggestions(e.target.value);
                                                }}
                                                onFocus={() => searchQuery && setShowSuggestions(true)}
                                                placeholder="City, area or landmark" 
                                                className="w-full bg-transparent border-none text-xs sm:text-sm font-medium text-gray-900 focus:outline-none placeholder:text-gray-400"
                                            />
                                        </div>
                                        {showSuggestions && locations.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 mt-1 sm:mt-2 bg-white rounded-lg sm:rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                                                {locations.map((loc, idx) => (
                                                    <button 
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            setSearchQuery(loc.name);
                                                            setShowSuggestions(false);
                                                        }}
                                                        className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 hover:bg-blue-50 transition-colors flex items-center gap-2 sm:gap-3 border-b border-gray-50 last:border-none"
                                                    >
                                                        <MapPin size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                                                        <div className="flex-1">
                                                            <p className="text-xs sm:text-sm font-semibold text-gray-900">{loc.name}</p>
                                                            <p className="text-[10px] sm:text-xs text-gray-500">{loc.region || 'Bangladesh'}</p>
                                                        </div>
                                                        <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 text-gray-400" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="border-l border-gray-100 pl-3">
                                        <div className="flex items-center px-2 py-2.5 sm:px-2 sm:py-3.5">
                                            <Building size={16} className="sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                                            <select 
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full bg-transparent border-none text-xs sm:text-sm font-medium text-gray-900 focus:outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="">Property Type</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={14} className="sm:w-4 sm:h-4 text-gray-400 ml-2" />
                                        </div>
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white h-full px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 group col-span-1 sm:col-span-2 lg:col-span-1"
                                    >
                                        <Search size={16} className="sm:w-5 sm:h-5" />
                                        <span className="hidden sm:inline">Search Properties</span>
                                        <span className="sm:hidden">Search</span>
                                        <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </form>

                            {/* Stats - Responsive Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                            <stat.icon size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm sm:text-xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-[10px] sm:text-xs text-gray-500">{stat.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Image - Hidden on small mobile, shown from tablet up */}
                        <div className="relative hidden md:block lg:hidden xl:block">
                            <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                <div className="space-y-3 sm:space-y-4 lg:space-y-6 pt-4 sm:pt-6 lg:pt-10">
                                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500">
                                        <img 
                                            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600" 
                                            className="w-full h-40 sm:h-48 lg:h-56 xl:h-64 object-cover"
                                            alt="Luxury Villa"
                                        />
                                        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 lg:px-3 lg:py-2 rounded-lg">
                                            <p className="text-xs sm:text-sm font-bold text-gray-900">Luxury Villas</p>
                                            <p className="text-[10px] sm:text-xs text-gray-600">From $500K</p>
                                        </div>
                                    </div>
                                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-lg">
                                        <img 
                                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600" 
                                            className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                                            alt="Modern Apartment"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-lg">
                                        <img 
                                            src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&q=80&w=600" 
                                            className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                                            alt="Office Space"
                                        />
                                    </div>
                                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500">
                                        <img 
                                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600" 
                                            className="w-full h-40 sm:h-48 lg:h-56 xl:h-64 object-cover"
                                            alt="Commercial Property"
                                        />
                                        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 lg:px-3 lg:py-2 rounded-lg">
                                            <p className="text-xs sm:text-sm font-bold text-gray-900">Commercial Spaces</p>
                                            <p className="text-[10px] sm:text-xs text-gray-600">Prime Locations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Card */}
                            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 max-w-[180px] sm:max-w-xs">
                                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                                        <Award size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm font-bold text-gray-900">Award Winning</p>
                                        <p className="text-[10px] sm:text-xs text-gray-500">Real Estate 2024</p>
                                    </div>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-600">
                                    Recognized for excellence in property management.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Results Header */}
            {isSearching && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                            <div>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                                    Search Results
                                </h2>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                    <CheckCircle size={12} className="sm:w-4 sm:h-4 text-green-500" />
                                    <span>Found {properties.length} properties matching your criteria</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <button className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors">
                                    <Filter size={14} className="sm:w-4 sm:h-4" />
                                    Filter
                                </button>
                                <Link 
                                    href={route('welcome')} 
                                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 sm:gap-2"
                                >
                                    <X size={14} className="sm:w-4 sm:h-4" />
                                    Clear Filters
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Properties Section - Responsive Grid */}
            <main className="py-8 sm:py-12 lg:py-16">
                {properties.length === 0 ? (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Search size={24} className="sm:w-8 sm:h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">No Properties Found</h3>
                            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-4 sm:mb-6">
                                We couldn't find any properties matching your search criteria. Try adjusting your filters.
                            </p>
                            <Link 
                                href={route('welcome')} 
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-blue-800 transition-all"
                            >
                                <Home size={16} className="sm:w-5 sm:h-5" />
                                Browse All Properties
                            </Link>
                        </div>
                    </div>
                ) : (
                    Object.keys(groupedByDivision).map((division) => (
                        <div key={division} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                        <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full"></div>
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                                            Properties in {division}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Discover premium properties in {division}
                                    </p>
                                </div>
                                <Link 
                                    href={route('properties.index', { state: division })} 
                                    className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm sm:text-base hover:gap-2 transition-all"
                                >
                                    View All
                                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {groupedByDivision[division].map((property) => (
                                    <ProfessionalCard key={property.id} property={property} />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </main>

            {/* CTA Section - Responsive */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                        Ready to Find Your Dream Property?
                    </h2>
                    <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto">
                        Join thousands of satisfied clients who found their perfect home or investment property with Almamon.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link 
                            href={auth.user ? route('dashboard') : route('register')}
                            className="bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-gray-50 transition-all shadow-lg"
                        >
                            Start Your Search
                        </Link>
                        <Link 
                            href="#"
                            className="bg-transparent border border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-white/10 transition-all"
                        >
                            Schedule Consultation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Professional Footer - Responsive */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center">
                                    <Building size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <span className="text-xl sm:text-2xl font-bold tracking-tight">ALMAMON</span>
                                    <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Real Estate Excellence</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
                                A premier real estate platform connecting buyers, sellers, and investors with premium properties across Bangladesh.
                            </p>
                        </div>
                        
                        <div>
                            <h6 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-6 text-white">Quick Links</h6>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Buy Property</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Rent Property</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Commercial</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Valuation</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h6 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-6 text-white">Company</h6>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                        <p className="text-xs sm:text-sm text-gray-400">
                            ┬⌐ 2024 Almamon Real Estate. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 sm:gap-6">
                            <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Privacy</Link>
                            <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Terms</Link>
                            <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function ProfessionalCard({ property }) {
    const price = Number(property.purpose === 'rent' ? property.rent_price : property.price).toLocaleString();

    return (
        <Link 
            href={route('properties.show', property.slug || property.id)}
            className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:shadow-lg"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                    src={property.images && property.images.length > 0 ? `/storage/${property.images[0].image_path}` : 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'} 
                    alt={property.address} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            <div className="p-2.5 sm:p-3.5">
                {/* Location - Primary Text from DB */}
                <div className="flex items-start gap-1.5 mb-3">
                    <MapPin size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[13px] sm:text-sm font-bold text-gray-800 leading-snug line-clamp-2">
                        {property.address}
                        {property.city && `, ${property.city}`}
                    </p>
                </div>

                {/* Features and Price Row - Minimalized */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                        {/* Bed */}
                        <div className="flex items-center gap-1 text-gray-500 flex-shrink-0">
                            <Bed size={14} className="text-gray-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold">{property.bedrooms || 0}</span>
                        </div>
                        
                        <div className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0"></div>

                        {/* Bath */}
                        <div className="flex items-center gap-1 text-gray-500 flex-shrink-0">
                            <Bath size={14} className="text-gray-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold">{property.bathrooms || 0}</span>
                        </div>

                        <div className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0"></div>

                        {/* Area */}
                        <div className="flex items-center gap-1 text-gray-500 flex-shrink-0">
                            <Maximize2 size={13} className="text-gray-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold">{property.area || 0}</span>
                        </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                        <p className="text-sm sm:text-base font-extrabold text-gray-900 leading-none">
                            ${Math.min(Number(property.purpose === 'rent' ? property.rent_price : property.price), 500).toLocaleString()}
                            {property.purpose === 'rent' && (                                <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 ml-0.5">/mo</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
