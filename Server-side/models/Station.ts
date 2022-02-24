import { ObjectId } from "mongodb";
import { Prix } from "./Prix";

export class Station{
    constructor(
        public latitude: string,
        public longitude: string,
        public adresse : string,
        public ville : string,
        public services : string[],
        public listeDePrix : Prix[],
        public id?: ObjectId
    ){}
}