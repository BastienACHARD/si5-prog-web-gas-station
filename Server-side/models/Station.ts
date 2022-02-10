import { Horaire } from "./Horaire";
import { Prix } from "./Prix";
import { Service } from "./Service";

export interface Station {
    _id: number,
    _lattitude: number,
    _longitude: number,
    _cp: number,
    _pop: string,
    adresse: string,
    ville: string,
    horaires: Horaire[],
    services: Service[],
    prix: Prix[]
}