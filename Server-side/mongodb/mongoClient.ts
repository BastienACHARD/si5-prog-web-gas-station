// Requête les données de MongoDB

import * as mongoDB from "mongodb";

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new mongoDB.MongoClient(uri);

async function getStations(query?: object) {
    try {
      await client.connect();
      const db = await client.db('current_data');
      const collection = await db.collection('test');
      const res = await collection.find(query||{}).toArray();
      return res;
    } finally {
      await client.close();
    }
  }

export { getStations };