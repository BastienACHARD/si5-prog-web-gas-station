import { Prix } from "./Prix";

export interface Station {
    latitude: number,
    longitude: number,
    adresse : string,
    ville : string,
    services? : string[],
    listeDePrix : Prix[],
}