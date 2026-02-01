
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// CSS must be imported
import 'leaflet/dist/leaflet.css';

// Fix for marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Separate component for map events
function MapEvents({ onLocationSelect, setPosition }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            onLocationSelect(lat, lng);
        }
    });
    return null;
}

// Separate component for updating view
function ViewUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}

export default function GoogleMapSelector({ lat, lng, onLocationSelect }) {
    const [position, setPosition] = useState(lat && lng ? [parseFloat(lat), parseFloat(lng)] : null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync position if changed from outside (manual input or initial value)
    useEffect(() => {
        if (lat && lng) {
            setPosition([parseFloat(lat), parseFloat(lng)]);
        }
    }, [lat, lng]);

    const defaultCenter = [23.8103, 90.4125]; // Dhaka

    if (!mounted) return <div className="h-[400px] w-full bg-gray-100 rounded-lg animate-pulse" />;

    return (
        <div className="mt-2 space-y-4">
            <div className="border border-[#e3e4e8] rounded-[8px] overflow-hidden shadow-sm h-[400px]">
                <MapContainer 
                    center={position || defaultCenter} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapEvents onLocationSelect={onLocationSelect} setPosition={setPosition} />
                    {position && (
                        <>
                            <Marker position={position} icon={DefaultIcon} />
                            <ViewUpdater center={position} />
                        </>
                    )}
                </MapContainer>
            </div>
            <p className="text-[12px] text-[#727586] p-3 bg-gray-50 border-t border-[#e3e4e8]">
                Click anywhere on the map to pin the exact property location.
            </p>
        </div>
    );
}
