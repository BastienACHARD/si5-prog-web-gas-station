import {Icon} from 'leaflet'
import {MapMarker} from './MapMarker';
import {TileLayer,MapContainer } from 'react-leaflet'
import FloatButton from './FloatButton';

// import React in our code
import React from 'react';
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
    return (
        <MapContainer style={{ height: '500px', width: '1500px' ,marginLeft:'80px'}} center={[43.697745, 7.269276]} zoom={8} >
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

<FloatButton
        title={"My Position"}
        markerPosition={[props.lat, props.long]}
        description="This is a custom description!"
      />
        </MapContainer>
    );
};