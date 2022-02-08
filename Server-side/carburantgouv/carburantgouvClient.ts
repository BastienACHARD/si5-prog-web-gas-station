const fs = require('fs').promises;
import fetch from 'cross-fetch';
import { xmlToJson } from '../utils/xmlToJson';
import { unzip } from './../utils/unzip';
import { insertMongo } from './../mongodb/mongoProvider';

async function fetchCurrentGouvData(){
    /*
    try {
        fetch('https://donnees.roulez-eco.fr/opendata/instantane')
        .then(res => {
            fs.writeFile('zip_file/PrixCarburants_instantane.zip', res.body); 
        })
    } catch (error) {
        console.log(error);
    }
    await unzip('zip_file/PrixCarburants_instantane.zip');
    */
    const jsonContent = await xmlToJson('zip_file/PrixCarburants_instantane.xml');
    insertMongo(jsonContent);
}

export { fetchCurrentGouvData };