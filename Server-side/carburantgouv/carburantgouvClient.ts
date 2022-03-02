const fs = require('fs').promises;
import fetch from 'cross-fetch';
import { xmlToJson } from '../utils/xmlToJson';
import { unzip } from './../utils/unzip';
import { insertMongo, dropMongo, dropPriceHistory, insertPriceHistory } from './../mongodb/mongoProvider';
import { gouvJsonToStation } from '../mapper/gouvJsonToStation';
import { averagePrice } from '../utils/averagePrice';
import { fuels_name } from '../utils/fuels_name';
import { todayDateAsNumber } from '../utils/dateAsNumber';

async function fetchFromGouv(){
    const today = todayDateAsNumber();

    console.log("Updating mongo data with government data")
    // récupérer le .zip du gouvernement correspondant aux dernières donnée

    try {
        await fetch('https://donnees.roulez-eco.fr/opendata/instantane')
        .then(async (res) => {
            await fs.writeFile('zip_xml_file/PrixCarburants_instantane.zip', res.body); 
        })
    } catch (error) {
        console.log(error);
    };


    // dezip
    await unzip('zip_xml_file/PrixCarburants_instantane.zip');
    // xml => json, puis transformation des données en Array de l'objet "Station"
    const jsonContent = await xmlToJson(`zip_xml_file/PrixCarburants_instantane.xml`);
    const stations = gouvJsonToStation(jsonContent);
    
    // supprimer les anciennes données
    await dropMongo();
    
    // insérer les nouvelles données
    await insertMongo(JSON.stringify(stations));
    
    // supprimer les données de prix du jour
    await dropPriceHistory(today);
    
    // insérer les données de prix du jour
    await insertPriceHistory(today, averagePrice(stations, fuels_name));

}

export { fetchFromGouv };