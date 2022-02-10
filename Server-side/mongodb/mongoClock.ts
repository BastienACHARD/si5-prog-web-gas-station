// Met à jour les données de MongoDB de façon régulière
import { fetchGouvData } from '../carburantgouv/carburantgouvClient';

let interval = 3600000; //1 hour;
//let interval = 10000; //10sec

function updateMongo(){
    console.log("Updating mongo database");
    fetchGouvData();
    setTimeout(updateMongo, interval);
}

export {updateMongo};