
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
import { useEffect } from 'react';
import stationService from "./Services/StationService";

export {HomeCom}
function HomeCom() {

  const [data, setData] = useState([] as Station[]);
  let [dataByType, setDataByType] = useState([] as Station[]);
  let [moins, setMoins] = useState( new Station() );
  const [type, setType] = useState();
  let [selectedOption, setSelectedOption] = useState<any>('');
  const { theme, isDark , toggleTheme} = useContext(ThemeContext);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');


  const Toggle = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;   
  border-radius: 50%;
  border: none;
  background-color: ${isDark ? "#282c36": "#abbdff"};
  color: ${isDark ? "#abbdff": "#282c36"};

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



useEffect(() => { 
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(getPosition);  }, 2000);   
});

function getType(type:any){
    setType(type.value)
}

async function fetchClosestStations()  {
  let closestStations:Station[]=[];    
  try {
      closestStations=await stationService.getClosestStations(lat, long);
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

async function  getByCity(city:any)  {   
   let stations= await getStationsByCity(city);
   return stations;
   }






async function getStationsByCity(city:any)  {
let stations:Station[]=[];    
  try {
    localStorage.setItem("city",JSON.stringify(city.label))
    stations= await stationService.getStationsByCities(city)
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
stationsByPrice.push(station);
 })
 console.log(stationsByPrice)
stationsByPrice=stationsByPrice.sort((a:Station, b:Station) => a._valeur - b._valeur);
setMoins(stationsByPrice[0])
setData(stationsByPrice) 
}
  
  }

 return (

    
             <div style={{height:"1000px", width:'80%'}}>

     
<Toggle  className="click" style={{marginLeft:"120%",marginTop:"50px"}}  onClick={toggleTheme}>
      {isDark ? <HiMoon size={30} /> : <CgSun   size={30} />}
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
          <Map style={{marginTop:'-100px'}} list={data} list1={moins} lat={lat} long={long} ></Map>
     </div>
        )

}

export default HomeCom;


