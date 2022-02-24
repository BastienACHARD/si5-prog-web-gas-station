import React, {  useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css"
import {Map} from './Map';
import Select from 'react-select';

import Station from './Stations';
import SearchBar from './SearchBar'
import Cities from './Cities.json';
import Header from './Header';



function App() {
  const [data, setData] = useState([] as Station[]);
  let [dataByType, setDataByType] = useState([] as Station[]);
  let [moins, setMoins] = useState( new Station() );
  const [data1, setData1] = useState([] as Station[]);

  const [dataa, setDataa] = useState();
  const [type, setType] = useState();
    const [price, setPrice] = useState([] as any[]);

  let [selectedOption, setSelectedOption] = useState<any>('');



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
        console.log(d)
  try {
    let response = await fetch(
      'http://localhost:8080/api/stations/current/byCity/'+d.value
    );
     
          let responseJson = await response.json();
  console.log(responseJson)
  responseJson.map((x:any)=>{
      let station: Station=new Station();
      station._latitude=x.latitude;
      station._id=x._id;
      station._longitude=x.longitude;
      station._adresse=x.adresse;
      station._ville=x.ville;
      if(x.listeDePrix!=undefined){
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
console.log(dataByType)
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
    < div style={{backgroundColor: "#abbdff",height:"1000px"}}>

    <Header />




             <div style={{  float:"left",width:"900px", marginTop:'50px'}} >
               <div style={{marginBottom:'50px'}} >
               <SearchBar setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
               <div style={{ width:"300px" ,marginBottom:'50px'}}>
               <Select onChange={getType} placeholder="Types" options={options}  />
               </div>

               <button  onClick={ (()=> getByCity(selectedOption))}>OK</button> 
               <button  onClick={ cancelAll()} >X</button> 
               </div>


       
 <button onClick={ getByType(type)} >display stations by type</button> 
 <button onClick={ getByPrice(type)} >display stations by price</button> 

      </div>
           <Map  style={{  float:"right"}} list={data} list1={moins} >

             </Map>
         

     </div>


  );
}




export default App;

