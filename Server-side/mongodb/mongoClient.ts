// Requête les données de MongoDB

import * as mongoDB from "mongodb";
import { Station } from "../models/Station";

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new mongoDB.MongoClient(uri);

let stationCollection: { stations?: mongoDB.Collection } = {}

async function fetchFromMongo(query?: object) {
  try {
    await client.connect();
    const db = await client.db(process.env.DB_NAME);
    const collection = await db.collection(process.env.COLLECTION_NAME_TEST as string);
    stationCollection.stations = collection;
  } finally {
  }
}

function getStationCollection(){
  return stationCollection.stations;
}

export { fetchFromMongo, getStationCollection };