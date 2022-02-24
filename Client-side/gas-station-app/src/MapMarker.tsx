import React from 'react';
import { Popup,Marker } from 'react-leaflet'
export{MapMarker}
 const MapMarker = (props:any) => {

    return (

    <Marker key={props.index} position={[props.x._latitude , props.x._longitude]}
                        icon={props.icon}>
                        <Popup>
                            <h2>
                                {props.x._adresse}
                            
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