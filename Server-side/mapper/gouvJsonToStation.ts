import { Prix } from "../models/Prix";
import { Station } from "../models/Station";

export function gouvJsonToStation(gouvJsonData : string){
    let stations : Station[] = [];
    // Miam miam les données pas uniformes et pas normalisées 😋
    JSON.parse(gouvJsonData).pdv_liste.pdv.forEach((e: { prix: { _nom: string; _maj: Date; _valeur: number; }[]; _latitude: string; _longitude: string; adresse: string; ville: string; services: { service: string[]; }; }) => {
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
                e._latitude.replace(".", "").replace(",", "").substring(0,2) + "." + e._latitude.replace(".", "").replace(",", "").substring(2),
                e._longitude.startsWith("-") ? e._longitude.replace(".", "").replace(",", "").substring(0,2) + "." + e._longitude.replace(".", "").replace(",", "").substring(2) : e._longitude.replace(".", "").replace(",", "").substring(0,1) + "." + e._longitude.replace(".", "").replace(",", "").substring(1),
                e.adresse,
                e.ville,
                e.services.service,
                listeDePrix
            )
        );
    });
    return stations;
}