import {Icon} from 'leaflet'
import {MapMarker} from './MapMarker';
import {TileLayer,MapContainer } from 'react-leaflet'

// import React in our code
import React, { useState, useEffect } from 'react';
export {Map}
const greenIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const blueIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


 const Map = (props:any) => {
     console.log(props.list1)

    return (
        <MapContainer style={{ height: '650px', width: '1500px' }} center={[42.585444, 13.257684]} zoom={6} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {props.list.map((x:any, index:any) => (
                (props.list1._id!== undefined && index === 0 ?
                    ( 
                        <MapMarker  x={x} index={index} icon={blueIcon}/>
                    ) : (
                        <MapMarker  x={x} index={index} icon={greenIcon} />
                    ))))}
        </MapContainer>
    );
};