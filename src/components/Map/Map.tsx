"use client";

import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const ZOOM = 13;
const CENTER_LAT = 52.5;
const CENTER_LONG = 13.38;

type MapProps = {
  data: StoryData[];
};

const MarkerIcon = new Icon({
  iconUrl: "marker-icon-2x.png",
  iconSize: [50, 50],
  iconAnchor: [40, 40],
});

export const Map: FC<MapProps> = ({ data }) => {
  return (
    <MapContainer
      style={{ height: "100vh", marginLeft: "auto", width: "80vw" }}
      center={[CENTER_LAT, CENTER_LONG]}
      zoom={ZOOM}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item) => {
        const { name, lat_long, id, industry, gender } = item;
        const [lat, long] = lat_long;
        return (
          <Marker
            key={id}
            position={[Number(lat), Number(long)]}
            icon={MarkerIcon}
          >
            <Popup>
              <div className="font-bold text-lg">{name}</div>
              <div className="mt-4">Industry: {industry.label}</div>
              <div>Owner's gender: {gender.label}</div>
              <button className="underline mt-4">Details</button>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
