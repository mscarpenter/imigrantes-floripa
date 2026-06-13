"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { LocateFixed, Navigation, Bus } from "lucide-react";
import type { Contact } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCategoryBySlug } from "@/lib/data/queries";

declare module "leaflet" {
  interface MapOptions {
    gestureHandling?: boolean;
    gestureHandlingOptions?: {
      text?: { touch?: string; scroll?: string; scrollMac?: string };
      duration?: number;
    };
  }
}

// Cooperative gestures: scroll zoom only with Ctrl/⌘ on desktop, two fingers on
// touch — so scrolling the page never zooms the map by accident.
if (typeof window !== "undefined") {
  L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
}

export const FLORIPA_CENTER: [number, number] = [-27.5954, -48.548];
export const DEFAULT_ZOOM = 12;

// Tailwind 500 hex values, matched to each category color name.
const CATEGORY_HEX: Record<string, string> = {
  blue: "#3b82f6",
  rose: "#f43f5e",
  orange: "#f97316",
  emerald: "#10b981",
  violet: "#8b5cf6",
  teal: "#14b8a6",
  amber: "#f59e0b",
  red: "#ef4444",
};

function pinIcon(hex: string): L.DivIcon {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 32 42">
      <path d="M16 0 C7.16 0 0 7.16 0 16 C0 28 16 42 16 42 S32 28 32 16 C32 7.16 24.84 0 16 0Z"
            fill="${hex}" stroke="white" stroke-width="1.5" />
      <circle cx="16" cy="15" r="5.5" fill="white" />
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "contact-pin",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -38],
  });
}

const userIcon = L.divIcon({
  html: `<span class="block size-4 rounded-full bg-blue-500 ring-4 ring-blue-500/30"></span>`,
  className: "user-location-pin",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Sign-only stop: small round dot. Sheltered stop: larger rounded square.
const busSignIcon = L.divIcon({
  html: `<span class="block size-2.5 rounded-full bg-sky-500 ring-2 ring-white"></span>`,
  className: "bus-stop-pin",
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

const busShelterIcon = L.divIcon({
  html: `<span class="block size-3 rounded-sm bg-sky-700 ring-2 ring-white"></span>`,
  className: "bus-stop-pin",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function navigationUrl(lat: number, lng: number): string {
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const base = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return isMobile ? `${base}&travelmode=walking` : base;
}

interface FlyToSelectedProps {
  selected: Contact | null;
  markerRefs: React.RefObject<Record<string, L.Marker | null>>;
}

function FlyToSelected({ selected, markerRefs }: FlyToSelectedProps) {
  const map = useMap();
  useEffect(() => {
    if (!selected || selected.lat == null || selected.lng == null) return;
    map.flyTo([selected.lat, selected.lng], 16, { duration: 0.8 });
    const marker = markerRefs.current[selected.id];
    if (marker) {
      // Open after the fly animation settles.
      const timer = setTimeout(() => marker.openPopup(), 850);
      return () => clearTimeout(timer);
    }
  }, [selected, map, markerRefs]);
  return null;
}

interface GeolocationLayerProps {
  nonce: number;
  onStatus: (status: "idle" | "locating" | "error") => void;
}

function GeolocationLayer({ nonce, onStatus }: GeolocationLayerProps) {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (nonce === 0) return;
    onStatus("locating");
    map.locate({ setView: true, maxZoom: 15, enableHighAccuracy: true });

    const onFound = (e: L.LocationEvent) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onStatus("idle");
    };
    const onError = () => onStatus("error");

    map.on("locationfound", onFound);
    map.on("locationerror", onError);
    return () => {
      map.off("locationfound", onFound);
      map.off("locationerror", onError);
    };
  }, [nonce, map, onStatus]);

  if (!position) return null;
  return <Marker position={position} icon={userIcon} />;
}

interface BusStopFeature {
  geometry: { coordinates: [number, number] };
  properties: { name: string | null; regiao: string | null; tipo: string };
}

interface BusStopLabels {
  fallback: string;
  shelter: string;
  sign: string;
  howToGet: string;
}

interface BusStopsLayerProps {
  show: boolean;
  labels: BusStopLabels;
  onStatus: (status: "idle" | "loading") => void;
}

const BUS_STOPS_ATTRIBUTION =
  'Paradas: &copy; <a href="https://geoportal.pmf.gov.br" target="_blank" rel="noreferrer">Prefeitura de Florianópolis — GeoPortal</a> (CC BY 4.0)';

function busStopPopup(f: BusStopFeature, labels: BusStopLabels): string {
  const [lng, lat] = f.geometry.coordinates;
  const title = f.properties.name ? escapeHtml(f.properties.name) : labels.fallback;
  const tipo = f.properties.tipo === "abrigo" ? labels.shelter : labels.sign;
  const meta = f.properties.regiao
    ? `${tipo} · ${escapeHtml(f.properties.regiao)}`
    : tipo;
  const nav = navigationUrl(lat, lng);
  return `
    <div class="space-y-1">
      <p class="text-sm font-semibold text-neutral-900">${title}</p>
      <p class="text-xs text-neutral-500">${meta}</p>
      <a href="${nav}" target="_blank" rel="noreferrer" class="text-xs font-semibold text-blue-600 hover:underline">↪ ${labels.howToGet}</a>
    </div>`;
}

function BusStopsLayer({ show, labels, onStatus }: BusStopsLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!show) return;
    let cancelled = false;
    let group: L.MarkerClusterGroup | null = null;

    onStatus("loading");
    (async () => {
      try {
        const res = await fetch("/data/bus-stops.geojson");
        const geo: { features: BusStopFeature[] } = await res.json();
        if (cancelled) return;

        group = L.markerClusterGroup({
          chunkedLoading: true,
          maxClusterRadius: 60,
          showCoverageOnHover: false,
          disableClusteringAtZoom: 17,
          attribution: BUS_STOPS_ATTRIBUTION,
          // Plain circles without the child-count number.
          iconCreateFunction: (cluster) => {
            const count = cluster.getChildCount();
            const size =
              count < 10 ? 22 : count < 50 ? 28 : count < 200 ? 36 : 44;
            return L.divIcon({
              html: `<span class="block rounded-full bg-sky-500/70 ring-2 ring-white" style="width:${size}px;height:${size}px"></span>`,
              className: "bus-cluster",
              iconSize: [size, size],
              iconAnchor: [size / 2, size / 2],
            });
          },
        });

        const markers = geo.features.map((f) => {
          const [lng, lat] = f.geometry.coordinates;
          const marker = L.marker([lat, lng], {
            icon: f.properties.tipo === "abrigo" ? busShelterIcon : busSignIcon,
          });
          marker.bindPopup(busStopPopup(f, labels));
          return marker;
        });

        group.addLayers(markers);
        map.addLayer(group);
      } catch {
        // Network/parse failure: keep the rest of the map usable.
      } finally {
        if (!cancelled) onStatus("idle");
      }
    })();

    return () => {
      cancelled = true;
      if (group) map.removeLayer(group);
    };
  }, [show, map, labels, onStatus]);

  return null;
}

interface MapCanvasProps {
  contacts: Contact[];
  selected: Contact | null;
  locale: Locale;
  dict: Dictionary;
}

export default function MapCanvas({
  contacts,
  selected,
  locale,
  dict,
}: MapCanvasProps) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const [locateNonce, setLocateNonce] = useState(0);
  const [locateStatus, setLocateStatus] = useState<
    "idle" | "locating" | "error"
  >("idle");
  const [showBusStops, setShowBusStops] = useState(false);
  const [busStatus, setBusStatus] = useState<"idle" | "loading">("idle");
  const onBusStatus = useCallback(
    (status: "idle" | "loading") => setBusStatus(status),
    [],
  );
  const busLabels = useMemo(
    () => ({
      fallback: dict.map.busStop,
      shelter: dict.map.busStopShelter,
      sign: dict.map.busStopSign,
      howToGet: dict.map.howToGet,
    }),
    [dict],
  );

  return (
    <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-xl border lg:h-[72vh]">
      <MapContainer
        center={FLORIPA_CENTER}
        zoom={DEFAULT_ZOOM}
        className="size-full"
        gestureHandling
        gestureHandlingOptions={{
          text: {
            touch: dict.map.gestureTouch,
            scroll: dict.map.gestureScroll,
            scrollMac: dict.map.gestureScrollMac,
          },
          duration: 2200,
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />

        {contacts.map((contact) => {
          if (contact.lat == null || contact.lng == null) return null;
          const category = getCategoryBySlug(contact.categorySlug);
          const hex = CATEGORY_HEX[category?.color ?? "blue"] ?? "#3b82f6";
          const t = contact.translations[locale];
          return (
            <Marker
              key={contact.id}
              position={[contact.lat, contact.lng]}
              icon={pinIcon(hex)}
              ref={(m) => {
                markerRefs.current[contact.id] = m;
              }}
            >
              <Popup>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-neutral-900">
                    {t.name}
                  </p>
                  {category && (
                    <p className="text-xs font-medium text-neutral-500">
                      {category.translations[locale].name}
                    </p>
                  )}
                  {contact.address && (
                    <p className="text-xs text-neutral-600">
                      {contact.address}
                    </p>
                  )}
                  {contact.phone && (
                    <p className="text-xs text-neutral-600">
                      {dict.contacts.phone}: {contact.phone}
                    </p>
                  )}
                  <a
                    href={navigationUrl(contact.lat, contact.lng)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    <Navigation className="size-3" />
                    {dict.map.howToGet}
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <FlyToSelected selected={selected} markerRefs={markerRefs} />
        <GeolocationLayer nonce={locateNonce} onStatus={setLocateStatus} />
        <BusStopsLayer
          show={showBusStops}
          labels={busLabels}
          onStatus={onBusStatus}
        />
      </MapContainer>

      <button
        type="button"
        onClick={() => setShowBusStops((v) => !v)}
        aria-pressed={showBusStops}
        className={`absolute left-3 top-3 z-[1000] inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium shadow-md backdrop-blur transition-colors ${
          showBusStops
            ? "border-sky-600 bg-sky-600 text-white hover:bg-sky-700"
            : "border-border bg-background/95 hover:bg-background"
        }`}
      >
        <Bus className={`size-4 ${busStatus === "loading" ? "animate-pulse" : ""}`} />
        {busStatus === "loading"
          ? dict.map.busStopsLoading
          : showBusStops
            ? dict.map.busStopsHide
            : dict.map.busStopsShow}
      </button>

      <button
        type="button"
        onClick={() => setLocateNonce((n) => n + 1)}
        className="absolute right-3 top-3 z-[1000] inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/95 px-3 py-2 text-xs font-medium shadow-md backdrop-blur transition-colors hover:bg-background"
        aria-label={dict.map.locateMe}
      >
        <LocateFixed
          className={`size-4 ${locateStatus === "locating" ? "animate-pulse" : ""}`}
        />
        {locateStatus === "locating"
          ? dict.map.locating
          : locateStatus === "error"
            ? dict.map.locateError
            : dict.map.locateMe}
      </button>
    </div>
  );
}
