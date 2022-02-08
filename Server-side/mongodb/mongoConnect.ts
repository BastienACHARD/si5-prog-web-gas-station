// Fonction de base pour se connecter à MongoDB

import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://Lucas:Macrondemission@essencinator.bcekz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function connectMongo() {
    try {
      await client.connect();
      
      const database = client.db('Essencinator');
      /*
      const movies = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
      const query = { title: 'Back to the Future' };
      const movie = await movies.findOne(query);
      console.log(movie);
      */
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

export {connectMongo};