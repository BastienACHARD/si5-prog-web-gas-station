import React from 'react';
import { Popup,Marker } from 'react-leaflet'
import styled from 'styled-components';
export{MapMarker}
 const MapMarker = (props:any) => {
    const StyledPop = styled(Popup)`
    background-color: red;
    border-radius: 0;
    .leaflet-popup-content-wrapper {
      border-radius: 0;
    }
  
    .leaflet-popup-tip-container {
      visibility: hidden;
    }
  `;
    return (

    <Marker key={props.index} position={[props.x._latitude , props.x._longitude]}
                        icon={props.icon}>
                        <StyledPop>
                             Adresse: {props.x._adresse}
                            
                            <br/>

                               Nom: {props.x._nom}
                            <br/>
                              Price: {props.x._valeur}
                        </StyledPop>
                    </Marker>
    );
};