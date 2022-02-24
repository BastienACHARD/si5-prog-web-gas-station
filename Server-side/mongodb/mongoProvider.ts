// Envoie/supprime/modifie les données de MongoDB

import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let client = new MongoClient(uri);

async function insertMongo(jsonContent: string){
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME_TEST as string);
    const insertResult = await collection.insertMany(JSON.parse(jsonContent));
    console.log(`Inserted ${insertResult.insertedCount} documents`);
  } finally {
    await client.close();
  }
}

async function dropMongo(){
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME_TEST as string);
    const deleteResult = await collection.deleteMany({});
    console.log("Deleted " + deleteResult.deletedCount + " documents");
  } finally {
    await client.close();
  }
}

export { insertMongo, dropMongo };