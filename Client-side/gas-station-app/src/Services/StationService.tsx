import Station from '../Models/Stations';



const StationService = {
    getStationsByCities: async function(d:any) {
        let stations:Station[]=[];    

  const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city: d.value })
      };

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
    return stations;git
    },

    getClosestStations: async function(lat:any, long:any) {
          let closestStations:Station[]=[]; 
            const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "latitude":lat,
      "longitude":long,
      "radiusInMeter":1200
  })
};

            let response = await fetch(
      'http://localhost:8080/api/stations/current/byDistance/',requestOptions
    );
console.log(response)
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
             console.log(closestStations)
             return closestStations;
    },

 calculateAveragePrice:function(arr:number[]) {
     var sum = 0;
  for(var i = 0; i < arr.length; i++) {
    sum += Number(arr[i]);
  }

  return sum / arr.length;
}


};

export default StationService; 