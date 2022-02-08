// Requête les données de MongoDB

// Fonction de base pour se connecter à MongoDB

import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function getCurrentMongoData() {
    try {
      await client.connect();
      const db = client.db('Essencinator');
      const stationList = db.collection('test');
      const res = await stationList.find({});
      return res;
    } finally {
      await client.close();
    }
  }

export {getCurrentMongoData};