// Requête les données de MongoDB

import * as mongoDB from "mongodb";

let client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);

let stationCollection: { stations?: mongoDB.Collection } = {}
let historyPriceCollection: { prices?: mongoDB.Collection } = {}

async function fetchFromMongo(query?: object) {
  console.log("Updating local data with mongo data");
  try {
    await client.connect();
    let dbStation = await client.db(process.env.DB_NAME);
    let collectionStation = await dbStation.collection(process.env.COLLECTION_NAME_PROD as string);
    stationCollection.stations = collectionStation;
    const dbPrice = await client.db(process.env.DB_NAME_PRICE_HISTORY);
    let collectionPrice = await dbPrice.collection(process.env.COLLECTION_NAME_DAILY_PRICE as string);
    historyPriceCollection.prices = collectionPrice;
  } finally {
    //nothing
  }
}

function getStationCollection(){
  return stationCollection.stations;
}

function getPriceCollection(){
  return historyPriceCollection.prices;
}

export { fetchFromMongo, getStationCollection, getPriceCollection };