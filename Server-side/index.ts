import express from 'express';
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import {api} from './api/stations';
import { updateMongo } from './mongodb/mongoClock';

const app: express.Application = express();
 
const port: number = 3000;

//updateMongo();

app.use('/api/stations', api)

app.use('*', (req, res) => res.status(404).end())

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});