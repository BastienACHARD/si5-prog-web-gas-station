import { Station } from "../models/Station";

export function averagePrice(stations : Station[], fuels : string[]){
    let averagePrices : (string|number)[][] = [];
    fuels.forEach((fuel) => {
        let score = 0;
        let nbStation = 0;
        stations.forEach((station) => {
            station.listeDePrix.forEach((p) => {
                if (p.nom == fuel){
                    score += p.valeur;
                    nbStation += 1;
                }
            });
        });
        averagePrices.push([fuel, score/nbStation]);
    });
    return averagePrices;
}