import { Horaire } from "./Horaire";
import { Prix } from "./Prix";

export interface Station {
    id: number,
    latitude: number,
    longitude: number,
    adresse: string,
    ville: string,
    automateH24: 1 | null,
    horaires: Horaire[],
    services: string[],
    listeDePrix: Prix[],
}