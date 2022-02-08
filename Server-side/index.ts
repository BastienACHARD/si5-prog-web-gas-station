import express from 'express';
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import {api} from './api/essence';
import { updateMongo } from './mongodb/mongoClock';

// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3000;

// Handling '/' Request
//app.get('/', (_req, _res) => {
//    _res.send("TypeScript With Expresss");
//});


app.use('/api', api)
app.use('*', (req, res) => res.status(404).end())


// Server setup
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});