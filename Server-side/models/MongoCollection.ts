import { Station } from "./Station";

interface Pdv_liste{
    pdv: Station[];
}

export interface BaseCollection{
    pdv_liste: Pdv_liste
} 