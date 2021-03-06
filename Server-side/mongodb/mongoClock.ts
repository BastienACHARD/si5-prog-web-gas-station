// Met à jour les données de MongoDB de façon régulière et met à jour les données dynamiques du serveur en conséquence
import { fetchFromGouv } from '../carburantgouv/carburantgouvClient';
import { fetchFromMongo } from './mongoClient';

function fetchAll(){
    console.log("Updating ...");
    //fetchFromGouv();
    fetchFromMongo();
    setTimeout(fetchAll, process.env.CLOCK_TICK_IN_MS as number|undefined);
}

export { fetchAll };