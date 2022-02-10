const fs = require('fs').promises;
import fetch from 'cross-fetch';
import { xmlToJson } from '../utils/xmlToJson';
import { unzip } from './../utils/unzip';
import { insertMongo, dropMongo } from './../mongodb/mongoProvider';

async function fetchGouvData(){
    // get current gouv data
    try {
        fetch('https://donnees.roulez-eco.fr/opendata/instantane')
        .then(res => {
            fs.writeFile('zip_file/PrixCarburants_instantane.zip', res.body); 
        })
    } catch (error) {
        console.log(error);
    };
    //unzip
    await unzip('zip_file/PrixCarburants_instantane.zip');
    // xml (stored in local file) to json
    const jsonContent = await xmlToJson('zip_file/PrixCarburants_instantane.xml');
    // delete mongo data
    dropMongo();
    // insert new data from local json variable
    insertMongo(jsonContent);
}

export { fetchGouvData };