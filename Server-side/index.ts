import express from 'express';
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import {api} from './api/essence';
import { updateMongo } from './mongodb/mongoClock';

const app: express.Application = express();
 
const port: number = 3000;

app.use('/api', api)

app.use('*', (req, res) => res.status(404).end())

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});