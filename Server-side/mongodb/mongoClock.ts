// Met à jour les données de MongoDB de façon régulière et met à jour les données dynamiques du serveur en conséquence
import { fetchFromGouv } from '../carburantgouv/carburantgouvClient';
import { fetchFromMongo } from './mongoClient';

const interval = 3600000; //1 hour;
//let interval = 10000; //10sec

function fetchAll(){
    console.log("Updating ...");
    //fetchFromGouv();
    fetchFromMongo();
    setTimeout(fetchAll, interval);
}

export { fetchAll };