import React from "react";
import {Map, TileLayer, ScaleControl} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapLeaflet({center}) {
    return (
        <Map
            center={center ? center : [50.64, 5.57]}
            zoom={17}
            maxZoom={19}
            minZoom={16}>
            <ScaleControl position={"bottomleft"} imperial={false} />

            <TileLayer
                url={
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
                maxZoom={20}
                attribution={
                    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                }
            />
        </Map>
    );
}
