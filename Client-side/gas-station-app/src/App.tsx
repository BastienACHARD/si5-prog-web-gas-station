import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup,Marker } from 'react-leaflet'
import './App.css';
import "leaflet/dist/leaflet.css"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
headers.append('Access-Control-Allow-Credentials', 'true');



function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([] as any[]);
  const [dataa, setDataa] = useState();


  function getData(val:any)
  {
    setDataa(val.target.value)
  }
  console.log(data);
  console.log(dataa);


function gett(d:any){
 return () => {
    fetch('http://localhost:3000/api/stations/current/byCity/'+d).then((res)=>{
      return res.json()})
      .then((result)=> {
        setData(result)
      })
  };}
  return (
    <>
    <MapContainer style={{height: '650px', width: '2000px'}} center={[42.585444, 13.257684]} zoom={6} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

{ data.map((x)=>(

  <Marker  icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} key={x._id }  position= {[x._latitude/100000, x._longitude/100000]}>
     <Popup 
    
      >
           { x.adresse}
          </Popup>
          </Marker>

)) }
    </MapContainer>


     <input type="text" onChange={getData}/>
     <button onClick={gett(dataa)
    } >display stations by city</button> </>

  );
}




export default App;