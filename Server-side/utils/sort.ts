import { Station } from "../models/Station";
import { measureDistance } from "./geography";

function sortStationsByDistance(stations : Station[], lat : number, long : number){
    return stations.sort((s1, s2) => {
        return measureDistance(lat, long, parseFloat(s1.latitude), parseFloat(s1.longitude)) - measureDistance(lat, long, parseFloat(s2.latitude), parseFloat(s2.longitude));
    });
}

function sortStationsByPrice(stations : Station[], fuels : string[]){
    return stations.sort((s1, s2) => {
        let winner = 1;
        fuels.forEach((fuel)=>{
            let s1Challenger = Infinity;
            let s2Challenger = Infinity;
            s1.listeDePrix.forEach((s1Fuel) =>{
                if (s1Fuel.nom == fuel){
                    s1Challenger = s1Fuel.valeur;
                }
            });
            s2.listeDePrix.forEach((s2Fuel) =>{
                if (s2Fuel.nom == fuel){
                    s2Challenger = s2Fuel.valeur;
                }
            });

            if (s1Challenger != s2Challenger){
                winner = s1Challenger>s2Challenger ? 1 : -1;
                return ;
            }
        });
        return winner;
    });
}

export {sortStationsByDistance, sortStationsByPrice}