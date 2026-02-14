'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface CityPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population: number | null;
  feeStructureType: string;
  isHighlighted: boolean;
  description: string;
  benchmarkFees: {
    residential250k: { total: number };
    commercial1m: { total: number };
  };
  highlights: { title: string; type: string; description: string }[];
}

interface MapProps {
  cities: CityPin[];
  onCitySelect?: (cityId: string | null) => void;
}

const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#f5f2e8' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#566560' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f2e8' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c8d4cc' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#889a90' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#dce5df' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#c8d4cc' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#c8d4cc' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#e8eeea' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dce5df' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#a8bab0' }] },
];

export default function Map({ cities, onCitySelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const createInfoContent = useCallback((city: CityPin) => {
    const pop = city.population ? city.population.toLocaleString() : 'N/A';
    const fee250k = city.benchmarkFees.residential250k.total.toLocaleString();
    const fee1m = city.benchmarkFees.commercial1m.total.toLocaleString();
    const highlightsList = city.highlights
      .slice(0, 3)
      .map((h) => `<li style="margin:2px 0;font-size:12px;color:#243040;">${h.title}</li>`)
      .join('');

    return `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:320px;padding:4px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <h3 style="margin:0;font-size:16px;font-weight:600;color:#0B0F19;">${city.name}</h3>
          ${city.isHighlighted ? '<span style="background:#e8f0e8;color:#2d5a2d;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:500;">Subject City</span>' : ''}
        </div>
        <p style="margin:0 0 10px;font-size:12px;line-height:1.5;color:#4B5563;">${city.description}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
          <div style="background:#f4f7f5;border-radius:6px;padding:8px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7d73;margin-bottom:2px;">Population</div>
            <div style="font-size:14px;font-weight:600;color:#0B0F19;">${pop}</div>
          </div>
          <div style="background:#f4f7f5;border-radius:6px;padding:8px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7d73;margin-bottom:2px;">Fee Type</div>
            <div style="font-size:12px;font-weight:500;color:#0B0F19;">${city.feeStructureType}</div>
          </div>
          <div style="background:#f4f7f5;border-radius:6px;padding:8px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7d73;margin-bottom:2px;">$250K Home</div>
            <div style="font-size:14px;font-weight:600;color:#0B0F19;">$${fee250k}</div>
          </div>
          <div style="background:#f4f7f5;border-radius:6px;padding:8px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7d73;margin-bottom:2px;">$1M Commercial</div>
            <div style="font-size:14px;font-weight:600;color:#0B0F19;">$${fee1m}</div>
          </div>
        </div>
        ${highlightsList ? `
        <div style="border-top:1px solid #E7E5DE;padding-top:8px;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7d73;margin-bottom:4px;">Recent Development</div>
          <ul style="margin:0;padding-left:16px;">${highlightsList}</ul>
        </div>
        ` : ''}
      </div>
    `;
  }, []);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 30.0, lng: -84.5 },
      zoom: 7,
      styles: MAP_STYLES,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      mapId: 'destin-permit-study',
    });

    mapInstanceRef.current = map;
    const infoWindow = new google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;

    // Fit bounds to show all cities
    const bounds = new google.maps.LatLngBounds();
    cities.forEach((city) => bounds.extend({ lat: city.lat, lng: city.lng }));
    map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });

    // Create markers
    cities.forEach((city) => {
      const pinColor = city.isHighlighted ? '#11827A' : '#566560';
      const pinScale = city.isHighlighted ? 1.3 : 1;

      const pinElement = document.createElement('div');
      pinElement.innerHTML = `
        <div style="
          width:${city.isHighlighted ? 40 : 32}px;
          height:${city.isHighlighted ? 40 : 32}px;
          background:${pinColor};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg) scale(${pinScale});
          border:2px solid white;
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
        ">
          <span style="transform:rotate(45deg);color:white;font-size:${city.isHighlighted ? 14 : 12}px;font-weight:bold;">
            ${city.isHighlighted ? '★' : '●'}
          </span>
        </div>
        <div style="
          text-align:center;
          margin-top:4px;
          font-size:11px;
          font-weight:${city.isHighlighted ? 700 : 500};
          color:${pinColor};
          text-shadow:0 0 3px white, 0 0 3px white, 0 0 3px white;
          white-space:nowrap;
        ">${city.name}</div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: city.lat, lng: city.lng },
        content: pinElement,
        title: city.name,
      });

      marker.addListener('click', () => {
        infoWindow.setContent(createInfoContent(city));
        infoWindow.open(map, marker);
        setSelectedCity(city.id);
        onCitySelect?.(city.id);
      });

      markersRef.current.push(marker);
    });

    infoWindow.addListener('closeclick', () => {
      setSelectedCity(null);
      onCitySelect?.(null);
    });

    return () => {
      markersRef.current.forEach((m) => (m.map = null));
      markersRef.current = [];
    };
  }, [isLoaded, cities, createInfoContent, onCitySelect]);

  return (
    <div className="relative w-full" style={{ height: '70vh', minHeight: '500px' }}>
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ border: '1px solid var(--color-line)' }} />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-sage-50 rounded-lg">
          <div className="text-sage-500 text-sm">Loading map...</div>
        </div>
      )}
    </div>
  );
}
