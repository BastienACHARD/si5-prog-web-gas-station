import { Prix } from "../models/Prix";
import { Station } from "../models/Station";

export function gouvJsonToStation(gouvJsonData : string){
    let stations : Station[] = [];

    JSON.parse(gouvJsonData).pdv_liste.pdv.forEach((e: { prix: { _nom: string; _maj: Date; _valeur: number; }[]; _latitude: number; _longitude: number; adresse: string; ville: string; services: { service: string[]; }; }) => {
        let listeDePrix : Prix[] = [];
        if (e.prix !== undefined){
            if (e.prix instanceof Array){
                e.prix.forEach((o: { _nom: string; _maj: Date; _valeur: number; }) => {
                    listeDePrix.push(new Prix(
                        o._nom,
                        o._maj,
                        o._valeur
                    ));
                });
            } else {
                listeDePrix.push(e.prix);
            }
        }
        stations.push(
            new Station(
                e._latitude,
                e._longitude,
                e.adresse,
                e.ville,
                e.services.service,
                listeDePrix
            )
        );
    });
    return stations;
}