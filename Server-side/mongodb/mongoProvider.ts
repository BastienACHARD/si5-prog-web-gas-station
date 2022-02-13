// Envoie/supprime/modifie les données de MongoDB

import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let client = new MongoClient(uri);

async function insertMongo(jsonContent: string){
  try {
    let client = new MongoClient(uri);
    await client.connect();
    const db = client.db('current_data');
    const collection = db.collection('test');
    const insertResult = await collection.insertMany(JSON.parse(jsonContent).pdv_liste.pdv);
    console.log(`${insertResult.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

async function dropMongo(){
  try {
    let client = new MongoClient(uri);
    await client.connect();
    const db = client.db('current_data');
    const collection = db.collection('test');
    const deleteResult = await collection.deleteMany({});
    console.log("Deleted " + deleteResult.deletedCount + " documents");
  } finally {
    await client.close();
  }
}

export { insertMongo, dropMongo };