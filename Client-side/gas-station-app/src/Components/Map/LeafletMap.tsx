import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./LeafletMap.css";
import { StationCtx } from '../../Contexts/stationContext';

const LeafletMap: React.FC = () => {
    const context = useContext(StationCtx);
    const filter = context!.filter;
    const data = context!.stations;
    const stations = data.map(station => station);

    const zoom: number = 12;

    return (
        <MapContainer center={[filter.latitude, filter.longitude]} zoom={zoom}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations.map((station, index) => {
                return (
                    <Marker position={[station.latitude, station.longitude]} key={index}>
                        <Popup key={index}>
                            {station.adresse}
                            <br />
                            {station.ville}
                            <br />
                            {station.listeDePrix.map(price => {
                                if (filter.fuels && filter.fuels[0] === price.nom) {
                                    return (
                                        `${price.nom} : ${price.valeur} €`
                                    );
                                }
                                return ('');
                            })}
                        </Popup>
                    </Marker>
                );
            })}

        </MapContainer>
    )
}

export default LeafletMap;