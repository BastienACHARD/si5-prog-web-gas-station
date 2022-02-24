const fs = require('fs').promises;
import fetch from 'cross-fetch';
import { xmlToJson } from '../utils/xmlToJson';
import { unzip } from './../utils/unzip';
import { insertMongo, dropMongo } from './../mongodb/mongoProvider';
import { gouvJsonToStation } from '../mapper/gouvJsonToStation';

async function fetchFromGouv(){
    /*
    // récupérer le .zip du gouvernement correspondant aux dernières données
    try {
        fetch('https://donnees.roulez-eco.fr/opendata/instantane')
        .then(res => {
            fs.writeFile('zip_file/PrixCarburants_instantane.zip', res.body); 
        })
    } catch (error) {
        console.log(error);
    };

    // dezip
    await unzip('zip_file/PrixCarburants_instantane.zip');
    */
    // xml => json, puis transformation des données en Array de l'objet "Station"
    const jsonContent = await xmlToJson('zip_file/PrixCarburants_instantane.xml');
    const stations = gouvJsonToStation(jsonContent);
/*
    // supprimer les anciennes données
    await dropMongo();

    // insérer les nouvelles données
    await insertMongo(JSON.stringify(stations));
*/
}

export { fetchFromGouv };