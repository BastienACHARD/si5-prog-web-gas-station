import { ObjectId } from "mongodb";

export class HistoryPrice{
    constructor(
        public Gazole : number,
        public E85 : number,
        public E10 : number,
        public SP98  : number,
        public GPLc : number,
        public date : number,
        public id?: ObjectId
    ){}
}