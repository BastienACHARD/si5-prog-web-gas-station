import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngTuple } from 'leaflet';
import "./LeafletMap.css";
import { StationCtx } from '../Contexts/stationContext';

const LeafletMap: React.FC = () => {

    const context = useContext(StationCtx);
    const stations = context ? context.stations : undefined;
    const data = stations ? stations.map(item => item) : [];

    const defaultLatLng: LatLngTuple[] = data.map(station => {
        return ([station.latitude, station.longitude]);
    });

    const zoom: number = 12;

    return (
        <MapContainer center={[49.11000, 6.17100]} zoom={zoom}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {defaultLatLng.map((tuple, index) => {
                return (
                    <Marker position={tuple} key={index}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                );
            })}

        </MapContainer>
    )
}

export default LeafletMap;