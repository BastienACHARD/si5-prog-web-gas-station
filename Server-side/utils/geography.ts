import { Station } from "../models/Station";

function measureDistance(lat1 : number, lon1 : number, lat2 : number, lon2 : number) {
  var R = 6371; // rayon de la terre en km #science #decouverte #geologie
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d * 1000;
}

function toRad(degrees : number){
    return degrees * (Math.PI/180);
}

function getStationInPerimeters(stations : Station[], lat : number, long : number, radius : number){
    let resStations : Station[] = [];
    stations.forEach((station) => {
        if (measureDistance(lat, long, parseFloat(station.latitude), parseFloat(station.longitude)) < radius){
            resStations.push(station);
        }
    });
    return resStations;
}

export { measureDistance, getStationInPerimeters }