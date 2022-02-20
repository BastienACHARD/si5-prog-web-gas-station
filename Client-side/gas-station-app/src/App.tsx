import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup,Marker } from 'react-leaflet'
import './App.css';
import "leaflet/dist/leaflet.css"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {Icon} from 'leaflet'
import Station from './Stations';


let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
headers.append('Access-Control-Allow-Credentials', 'true');



function App() {
  const [data, setData] = useState([] as Station[]);
  let [dataByType, setDataByType] = useState([] as Station[]);
  let [moins, setMoins] = useState( new Station() );

  const [dataa, setDataa] = useState();
  const [type, setType] = useState();
    const [price, setPrice] = useState([] as any[]);




  const options = [
  {
    label: "Gazole",
    value: "Gazole",
  },
  {
    label: "E10",
    value: "E10",
  },
  {
    label: "SP98",
    value: "SP98",
  },
  {
    label: "SP95",
    value: "SP95",
  },
];

function getType(type:any){
    setType(type.target.value)
}


  function getData(val:any)
  {
        setDataa(val.target.value)

 }


function  getByCity(d:any)  {
      let stations:Station[]=[];

 return () => {
   if(d){
    fetch('http://localhost:8080/api/stations/current/byCity/'+d).then((res)=>{

      return res.json()})
      .then((result)=> {
       result.map((x:any)=>{
      let station: Station=new Station();
      station._latitude=x._latitude;
      station._id=x._id;
      station._longitude=x._longitude;
      station._adresse=x.adresse;
      station._ville=x.ville;
      x.prix.map((price:any)=> {     
          station._valeur=price._valeur;
          station._nom=price._nom;


      })
            stations.push(station)

      
      })

      setData(stations);
      setDataByType(stations)
      
       
        
      })

  }}}



  function getByType(typee:any){
        let stationsByType:Station[]=[];

     return () => {

     console.log(moins)
    dataByType.map((x:any)=>{
      if(x._nom===typee){
      let station: Station=new Station();
      station._latitude=x._latitude;
      station._longitude=x._longitude;
      station._adresse=x._adresse;
      station._ville=x._ville;
      station._valeur=x._valeur;
      station._nom=x._nom;
      stationsByType.push(station);

      }

            setData(stationsByType)

    })

    
    
    }


  }

  function cancelAll(){
         return () => {

    setData(dataByType);
         }
  }


   function getByPrice(type:any){
   let stationsByPrice:Station[]=[];
   let moinsCher:any[]=[];
     return () => {

  dataByType.map((x:any)=>{
       let station: Station=new Station();
      station._latitude=x._latitude;
      station._id=x._id;
      station._longitude=x._longitude;
      station._adresse=x._adresse;
      station._ville=x._ville;
        if(x._nom===type){
          station._valeur=x._valeur;
          station._nom=x._nom;
        }
stationsByPrice.push(station)

     })
    stationsByPrice=stationsByPrice.sort((a:Station, b:Station) => a._valeur - b._valeur);
    setMoins(stationsByPrice[0])
    setData(stationsByPrice)





  
  }
  
  }

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

   

      
  
  return (
    <>
    <MapContainer style={{height: '650px', width: '2000px'}} center={[42.585444, 13.257684]} zoom={6} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
 {data.map((x,index) =>(
(moins._adresse!==undefined && index===0 ?
             (  <Marker  key={index}  position= {[x._latitude/100000, x._longitude/100000]}
                icon={blueIcon}>
                    <Popup 
    
      >

      <h2>
           {x._adresse}
            
                {index}
 
           </h2>

          
 <h2>
           {x._nom}

           </h2>
            <h2>
           { x._valeur}

           </h2>

          </Popup>
                </Marker>
            
 ):(
<Marker  key={index}  position= {[x._latitude/100000, x._longitude/100000]}
                icon={greenIcon}>
                    <Popup 
    
      >

      <h2>
           {x._adresse}
            
                {index}
 
           </h2>

          
 <h2>
           { x._nom}

           </h2>
            <h2>
           { x._valeur}

           </h2>

          </Popup>
                </Marker>

 )))) }
    </MapContainer>


     <input type="text" onChange={getData}/>
     <button onClick={ getByCity(dataa)} >display stations by city</button> 
     <select onChange={getType}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
      </select>
      <button onClick={ getByType(type)} >display stations by type</button> 
      <button onClick={ getByPrice(type)} >display stations by price</button> 
      <button onClick={ cancelAll()} >Cancel all</button> 

 
     </>


  );
}




export default App;
