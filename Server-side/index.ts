import express from 'express';
import {stationApi} from './api/stationsAPI';
import { fetchAll } from './mongodb/mongoClock';
import cors from 'cors';

const app: express.Application = express();
 
const port: number = 8080;

fetchAll();

app.use(cors()); //Pour accepter tout le monde en mode macdonald (venez comme vous êtes)

//app.use(cors({
//    origin: 'http://xyz.com' //Pour accepter une liste
//  }));

app.use('/api/stations', stationApi)

// Si le client arrive à cet endroit, la route n'a pas été reconnue, dommage :/ => 404
app.use('*', (req, res) => res.status(404).end())

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});