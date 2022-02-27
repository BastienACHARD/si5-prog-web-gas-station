import Station from './Models/Stations';
import React, {  useState } from 'react';
import stationService from "./Services/StationService";
import { Button } from 'react-bootstrap';
import Charts from './charts'
import SearchBar from './SearchBar'
import { AiOutlineSearch } from "react-icons/ai";


export {Stats}
function Stats() {
  const [type, setType] = useState();

     const [av1, setav1] = useState<number>();
     const [av2, setav2] = useState<number>();
      const [av4, setav4] = useState<number>();

  let [selectedOption, setSelectedOption] = useState<any>(localStorage.getItem("city"));

  let [dataByType, setDataByType] = useState([] as Station[]);
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


async function  getByCity(city:any)  {
    
   let stations= await getStationsByCity(city);

   return stations;
   }




function getType(type:any){
    setType(type.value)
}


async function getStationsByCity(city:any)  {
let stations:Station[]=[];    
  try {
    stations= await stationService.getStationsByCities(city)
    return setDataByType(stations);
  } catch (error) {
    console.error(error);
  }
  }




  function getAv(typee:any){
         let sum:number[]=[];

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
  if( station._valeur!==undefined){
          sum.push(x._valeur)

        }      }

    })
    return stationService.calculateAveragePrice(sum);

    

  }


  function getTypes(){
     let stationsByType:Station[]=[];
         let sum:number[]=[];

     return () => {
   
    setav1(getAv("SP98") )
    setav2(getAv("E10") )
setav4(getAv("SP95") )

    }

  }


        
 return (


<div  style={{width:"100%",marginTop:"50px"}}>
<div style={{marginLeft:"200px",float:"left"}}>
               <SearchBar  setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
              
                  
</div>
<div style={{marginRight:"1100px"}}>
 <Button  variant="light"   onClick={ (()=> getByCity(selectedOption))}><AiOutlineSearch/></Button> 
                <Button variant="light"   onClick={ getTypes()} >Go</Button> 
                </div >
               <Charts  v1={av1} v2={av2}  v4={av4}/>
</div >
 )

}
export default Stats;

