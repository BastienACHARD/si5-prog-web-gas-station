// Requête les données de MongoDB

import * as mongoDB from "mongodb";

const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);

let stationCollection: { stations?: mongoDB.Collection } = {}

async function fetchFromMongo(query?: object) {
  console.log("Updating local data with mongo data");
  try {
    await client.connect();
    const db = await client.db(process.env.DB_NAME);
    const collection = await db.collection(process.env.COLLECTION_NAME_PROD as string);
    stationCollection.stations = collection;
  } finally {
    // nothing
  }
}

function getStationCollection(){
  return stationCollection.stations;
}

export { fetchFromMongo, getStationCollection };