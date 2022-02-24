import React, { useEffect, useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css"
import {Map} from './Map';

import Station from './Stations';

import Header from './Header'



function App() {
  const [data, setData] = useState([] as Station[]);
  let [dataByType, setDataByType] = useState([] as Station[]);
  let [moins, setMoins] = useState( new Station() );
  const [data1, setData1] = useState([] as Station[]);

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


async function  getByCity(d:any)  {


            let stations= await fetchUpcoming(d);
   return stations;
   }

  





async function fetchUpcoming(d:any)  {
        let stations:Station[]=[];

  try {
    let response = await fetch(
      'http://localhost:8080/api/stations/current/byCity/'+d
    );
     
          let responseJson = await response.json();

  responseJson.map((x:any)=>{
      let station: Station=new Station();
      station._latitude=x._latitude;
      station._id=x._id;
      station._longitude=x._longitude;
      station._adresse=x.adresse;
      station._ville=x.ville;
      if(x.prix!=undefined){
      x.prix.map((price:any)=> {     
          station._valeur=price._valeur;
          station._nom=price._nom;


      } )}
            stations.push(station)

       })
    setDataByType(stations)
    return setData(stations);
  } catch (error) {
    console.error(error);
  }
  }










  function getByType(typee:any){
        let stationsByType:Station[]=[];

     return () => {

    dataByType.map((x:any)=>{
      if(x._nom===typee){
      let station: Station=new Station();
      station._latitude=x._latitude;
      station._longitude=x._longitude;
      station._adresse=x._adresse;
      station._ville=x._ville;
      station._valeur=x._valeur;
      station._nom=x._nom;
      station._id=x._id;

      stationsByType.push(station);

      }

            setData(stationsByType)

    })

    
    
    }


  }

  function cancelAll(){
         return () => {

    setMoins(new Station())
    setData(dataByType)
         }
  }


   function getByPrice(type:any){
   let stationsByPrice:Station[]=[];
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
    console.log(stationsByPrice[0])
    setMoins(stationsByPrice[0])
    setData(stationsByPrice)





  
  }
  
  }

    

      
  
  return (
    <>
<Header />
     <input type="text" onChange={getData}/>
     <button onClick={ (()=> getByCity(dataa))} >display stations by city</button> 
     <select onChange={getType}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
      </select>
      <button onClick={ getByType(type)} >display stations by type</button> 
      <button onClick={ getByPrice(type)} >display stations by price</button> 
      <button onClick={ cancelAll()} >Cancel all</button> 
      
       <Map list={data} list1={moins} />

     </>


  );
}




export default App;
