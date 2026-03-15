import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./StopMap.module.css";
import {
  getStopDataSet,
  setSelectedStop,
  fetchStopMonitoringData,
} from "../stopSearch/stopSearchSlice";

// Coordinates for central Tampere as the default map center
const TAMPERE_CENTER = [61.4978, 23.761];
const DEFAULT_ZOOM = 14;

// Custom bus stop marker — yellow circle with black border
const busStopIcon = L.divIcon({
  className: "",
  html: '<div style="width:12px;height:12px;background:#ffda0f;border:2px solid #2c2c2a;border-radius:50%;cursor:pointer;"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -10],
});

// User location marker — blue circle
const userLocationIcon = L.divIcon({
  className: "",
  html: '<div style="width:14px;height:14px;background:#1c57cf;border:2px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(28,87,207,0.25);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// Inner component that requests geolocation and flies the map to the user's position
function UserLocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        setPosition(latlng);
        map.flyTo(latlng, 16);
      },
      () => null, // silently ignore denied/unavailable geolocation
    );
  }, [map]);

  return position ? (
    <Marker position={position} icon={userLocationIcon} />
  ) : null;
}

// Parses the API location string "lat,lon" into [lat, lon] numbers.
function parseLocation(locationStr) {
  if (!locationStr) return null;
  const parts = locationStr.split(",").map(Number);
  if (parts.length !== 2 || parts.some(isNaN)) return null;
  return parts;
}

// Renders a marker for each stop that has location data.
// Clicking a marker calls onSelectStop with the full stop object,
// matching the same flow as selecting a stop from the search list.
function StopMarkers({ stops, onSelectStop }) {
  const markers = stops.map((stop) => {
    const position = parseLocation(stop.location);
    if (!position) return null;
    return (
      <Marker
        key={stop.shortName}
        position={position}
        icon={busStopIcon}
        eventHandlers={{
          click: () => onSelectStop(stop),
        }}
      />
    );
  });
  return (
    <MarkerClusterGroup disableClusteringAtZoom={16}>
      {markers}
    </MarkerClusterGroup>
  );
}

export default function StopMap() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stops = useSelector(getStopDataSet);

  const onSelectStop = (stop) => {
    dispatch(setSelectedStop(stop));
    dispatch(fetchStopMonitoringData(stop.shortName));
    navigate({ pathname: "/", search: `?stop=${stop.shortName}` });
  };

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={TAMPERE_CENTER}
        zoom={DEFAULT_ZOOM}
        className={styles.map}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UserLocationMarker />
        <StopMarkers stops={stops} onSelectStop={onSelectStop} />
      </MapContainer>
    </div>
  );
}
