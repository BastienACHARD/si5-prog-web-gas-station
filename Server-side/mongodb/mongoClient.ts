// Requête les données de MongoDB

// Fonction de base pour se connecter à MongoDB

import * as mongoDB from "mongodb";
import { Station } from "../models/Station";

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new mongoDB.MongoClient(uri);

async function getCurrentMongoData() {
    try {
      await client.connect();
      const db = await client.db('current_data');
      const collection = await db.collection('test');
      const res = (await collection.find({}).toArray())[0];
      const castedRes: Station[] = res.pdv_liste;
      return castedRes;
    } finally {
      await client.close();
    }
  }

export { getCurrentMongoData };