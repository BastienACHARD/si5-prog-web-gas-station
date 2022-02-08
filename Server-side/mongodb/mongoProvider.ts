// Envoie/supprime/modifie les données de MongoDB

import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function insertMongo(jsonContent: string) {
    try {
      await client.connect();
      
      const db = client.db('current_data');
      const collection = db.collection('test');
      const insertResult = await collection.insertOne(JSON.parse(jsonContent));
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

export {insertMongo};