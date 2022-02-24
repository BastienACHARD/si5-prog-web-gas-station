import React, {  useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css"
import {Map} from './Map';
import Select from 'react-select';
import Station from './Stations';
import SearchBar from './SearchBar'
import { AiOutlineSearch } from "react-icons/ai";
import Header from './Header';
import { Button } from 'react-bootstrap';



function App() {
  const [data, setData] = useState([] as Station[]);
  let [dataByType, setDataByType] = useState([] as Station[]);
  let [moins, setMoins] = useState( new Station() );
  const [dataa, setDataa] = useState();
  const [type, setType] = useState();
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
  
    setType(type.value)
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
  console.log(responseJson)
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
    setMoins(stationsByPrice[0])
    setData(stationsByPrice)





  
  }
  
  }

    

      
  
  return (
    < div style={{backgroundColor: "#abbdff",height:"1200px", width:'1700px'}}>

    <Header />




             <div style={{  marginLeft:"100px" , marginTop:'50px',  width:'1150px',marginBottom:'200px'}} >
             <div style={{  width:'400px',float:"left"}} >

               <SearchBar  style={{ float:"left"}}  setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
               <div style={{ float:"right", width:'200px',marginTop:'-38px'}} >
               <Button  variant="light"  onClick={ (()=> getByCity(selectedOption))}><AiOutlineSearch/></Button> 

               </div>
               </div>

               <div style={{  width:'750px',float:"right"}} >
               <div style={{  width:'200px',float:"left"}} >

               <Select onChange={getType} placeholder="Types" options={options}  className="App" />
               </div>
               <div style={{  width:'550px',float:"right"}} >
                <  Button   variant="light" onClick={ getByType(type)} >GO</Button> 
                    <Button style={{  marginLeft:"100px"}} variant="light"  onClick={ getByPrice(type)} >display stations by price</Button> 
                    <Button style={{  marginLeft:"100px"}} variant="light"  onClick={ cancelAll()} >Clear All</Button> 


 </div>
 </div>




      </div>
      <div >

          <Map list={data} list1={moins} >   </Map>
         
          </div>
     </div>


  );
}




export default App;

