import React from 'react';
import { Popup,Marker } from 'react-leaflet'
export{MapMarker}
 const MapMarker = (props:any) => {

    return (

    <Marker key={props.index} position={[props.x._latitude / 100000, props.x._longitude / 100000]}
                        icon={props.icon}>
                        <Popup>
                            <h2>
                                {props.x._adresse}
                                {props.index}
                            </h2>
                            <h2>
                                {props.x._nom}
                            </h2>
                            <h2>
                                {props.x._valeur}
                            </h2>
                        </Popup>
                    </Marker>
    );
};