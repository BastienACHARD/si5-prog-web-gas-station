
import React, {  useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css"
import {Map} from './Map';
import Select from 'react-select';
import Station from './Models/Stations';
import SearchBar from './SearchBar'
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { ThemeContext } from "./theme";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import styled from "styled-components";
import  geolocation from "react-geolocated"
import { useEffect } from 'react';

export {HomeCom}
function HomeCom() {

  const [data, setData] = useState([] as Station[]);
  let [dataByType, setDataByType] = useState([] as Station[]);
  let [moins, setMoins] = useState( new Station() );
  const [type, setType] = useState();
  let [selectedOption, setSelectedOption] = useState<any>('');
  const { theme, toggleTheme ,isDark} = useContext(ThemeContext);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "latitude":lat,
      "longitude":long,
      "radiusInMeter":1200
  })
};

  const Toggle = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;   
  border-radius: 50%;
  border: none;
  background-color: ${theme === 'light' ? "#282c36": "#abbdff"};
  color: ${theme === 'light' ? "#abbdff": "#282c36"};

  &:focus {
      outline: none;
  }
  transition: all .5s ease;
  position: 'relative';`;

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
    setType(type.value)
}
useEffect(() => {
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(getPosition);  }, 2000);
   
});


async function fetchClosestStations()  {

  let closestStations:Station[]=[];    

    

  try {
    
    let response = await fetch(
      'http://localhost:8080/api/stations/current/byDistance/',requestOptions
    );
  
          let responseJson = await response.json();
          let listOfStations=JSON.parse(responseJson);

          listOfStations.map((x:any)=>{
            let station: Station=new Station();
            station._latitude=x.latitude;
            station._id=x._id;
            station._longitude=x.longitude;
            station._adresse=x.adresse;
            station._ville=x.ville;
            if(x.listeDePrix!==undefined){
            x.listeDePrix.map((price:any)=> {     
                station._valeur=price.valeur;
                station._nom=price.nom;
      
      
            } )}
            closestStations.push(station)
      
             })
          setDataByType(closestStations)
          return setData(closestStations);
  } catch (error) {
    console.error(error);
  }
  }
  function getPosition(position:any) {
    setLat(position.coords.latitude);
    setLong( position.coords.longitude);
     localStorage.setItem("latitude",JSON.stringify(lat));
     localStorage.setItem("longitude",JSON.stringify(long));


  }
async function  getByCity(d:any)  {
   let stations= await fetchUpcoming(d);
   return stations;
   }

async function fetchUpcoming(d:any)  {
  let stations:Station[]=[];    

  const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city: d.value })
      };
  try {
    let response = await fetch(
      'http://localhost:8080/api/stations/current/byCity/',requestOptions
    );
     
    let responseJson = await response.json();
     responseJson.map((x:any)=>{
      let station: Station=new Station();
      station._latitude=x.latitude;
      station._id=x._id;
      station._longitude=x.longitude;
      station._adresse=x.adresse;
      station._ville=x.ville;
      if(x.listeDePrix!==undefined){
      x.listeDePrix.map((price:any)=> {     
          station._valeur=price.valeur;
          station._nom=price.nom;


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
    setMoins(stationsByPrice[0])
    setData(stationsByPrice)





  
  }
  
  }

 return (

    
             <div style={{height:"1000px", width:'80%'}}>

     
<Toggle style={{marginLeft:"120%",marginTop:"50px"}}  onClick={toggleTheme}>
      {theme === 'light' ? <HiMoon size={30} /> : <CgSun   size={30} />}
      </Toggle> 
             <div style={{   width:'100%',marginBottom:'130px',marginLeft:'200px',marginTop:"-160px"}} >

             <div style={{  width:'320px',float:"left"}} >

               <SearchBar  style={{ float:"left"}}  setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
               <div style={{ float:"right", width:'200px',marginTop:'-38px',marginBottom:'100px'}} >
               <Button  variant="light"   onClick={ (()=> getByCity(selectedOption))}><AiOutlineSearch/></Button> 

               </div>
               </div>

               <div style={{  width:'1400px' ,marginTop:"200px"}} >
               <div style={{  width:'200px',float:"left",zIndex:10,position:"relative"}} >

               <Select  onChange={getType} placeholder="Types" options={options}  className="App" />
               </div>

               <div style={{  width:'700px',float:"right"}} >
                <Button variant="light" style={{  marginLeft:"-410px"}}   onClick={ getByType(type)} >Go</Button> 
                    <Button variant="light" style={{  marginLeft:"80px"}}  onClick={ getByPrice(type)} >Stations by price</Button> 
                    <Button  variant="light"  style={{  marginLeft:"80px"}}  onClick={ cancelAll()} >Clear All</Button> 
                    <Button  variant="light"  style={{  marginLeft:"80px"}}  onClick={ (()=> fetchClosestStations())} >Closest Station</Button> 

                </div>


 </div>




      </div>

          <Map tyle={{marginTop:'-100px'}} list={data} list1={moins} lat={lat} long={long} ></Map>
         
     </div>
        )

}

export default HomeCom;
