"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { CONTACT_MAP_LAT, CONTACT_MAP_LNG, CONTACT_MAP_ZOOM } from "@/lib/contact-map-location";

const DEFAULT_LAT = CONTACT_MAP_LAT;
const DEFAULT_LNG = CONTACT_MAP_LNG;
const DEFAULT_ZOOM = CONTACT_MAP_ZOOM;

interface ContactMapProps {
  centerLat?: string;
  centerLng?: string;
  zoom?: string;
  markerLat?: string;
  markerLng?: string;
  loadingText?: string;
}

export function ContactMap({
  centerLat,
  centerLng,
  zoom,
  markerLat,
  markerLng,
  loadingText = "Loading map...",
}: ContactMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-100 animate-pulse" />
    );
  }

  const lat = parseFloat(centerLat || "");
  const lng = parseFloat(centerLng || "");
  const center: [number, number] = [
    !isNaN(lat) && lat >= -90 && lat <= 90 ? lat : DEFAULT_LAT,
    !isNaN(lng) && lng >= -180 && lng <= 180 ? lng : DEFAULT_LNG,
  ];
  const zoomLevel = (() => {
    const z = parseInt(zoom || "", 10);
    return !isNaN(z) && z >= 1 && z <= 20 ? z : DEFAULT_ZOOM;
  })();
  const hasMarker =
    markerLat !== undefined &&
    markerLng !== undefined &&
    markerLat !== "" &&
    markerLng !== "";
  const markerLatNum = parseFloat(markerLat || "");
  const markerLngNum = parseFloat(markerLng || "");
  const markerPos: [number, number] | null =
    hasMarker &&
    !isNaN(markerLatNum) &&
    markerLatNum >= -90 &&
    markerLatNum <= 90 &&
    !isNaN(markerLngNum) &&
    markerLngNum >= -180 &&
    markerLngNum <= 180
      ? [markerLatNum, markerLngNum]
      : null;

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
      <ContactMapInner
        center={center}
        zoom={zoomLevel}
        markerPosition={markerPos}
        loadingText={loadingText}
      />
    </div>
  );
}

function ContactMapInner({
  center,
  zoom,
  markerPosition,
  loadingText,
}: {
  center: [number, number];
  zoom: number;
  markerPosition: [number, number] | null;
  loadingText: string;
}) {
  const [MapContainer, setMapContainer] = useState<React.ComponentType<any> | null>(null);
  const [TileLayer, setTileLayer] = useState<React.ComponentType<any> | null>(null);
  const [Marker, setMarker] = useState<React.ComponentType<any> | null>(null);
  const [Popup, setPopup] = useState<React.ComponentType<any> | null>(null);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([mod, leaflet]) => {
      setMapContainer(mod.MapContainer);
      setTileLayer(mod.TileLayer);
      setMarker(mod.Marker);
      setPopup(mod.Popup);
      setL(leaflet.default);
    });
  }, []);

  if (!MapContainer || !TileLayer || !L) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">{loadingText}</p>
      </div>
    );
  }

  const markerIcon = L.divIcon({
    html: '<div style="background:#2563eb;width:24px;height:24px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerPosition && Marker && Popup && (
        <Marker position={markerPosition} icon={markerIcon}>
          <Popup>Our location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
