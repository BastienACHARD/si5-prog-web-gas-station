// Envoie/supprime/modifie les données de MongoDB

import {MongoClient, ObjectId} from 'mongodb';

let client = new MongoClient(process.env.DB_CONN_STRING as string);

async function insertMongo(jsonContent: string){
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME_PROD as string);
    const insertResult = await collection.insertMany(JSON.parse(jsonContent));
    console.log(`Inserted ${insertResult.insertedCount} current_data documents`);
  } finally {
    await client.close();
  }
}

async function dropMongo(){
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME_PROD as string);
    const deleteResult = await collection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} current_data documents`);
  } finally {
    await client.close();
  }
}

async function insertPriceHistory(date : number, prices : (string|number)[][]) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME_PRICE_HISTORY);
    const collection = db.collection(process.env.COLLECTION_NAME_DAILY_PRICE as string);
    let query = Object.fromEntries(
      prices.map(price => [price[0], (price[1] as number).toFixed(2)])
    );
    query = Object.assign({}, query, {"date" : date});
    const insertResult = await collection.insertOne(JSON.parse(JSON.stringify(query)));
    console.log(`Inserted 1 price_history document`);

  } finally {
    await client.close();
  }
}

async function dropPriceHistory(date : number){
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME_PRICE_HISTORY);
    const collection = db.collection(process.env.COLLECTION_NAME_DAILY_PRICE as string);
    const deleteResult = await collection.deleteMany({"date" : date});
    console.log(`Deleted ${deleteResult.deletedCount} price_history documents`);
  } finally {
    await client.close();
  }
}

export { insertMongo, insertPriceHistory, dropMongo, dropPriceHistory};