import express, { Router } from 'express';
import { getCurrentMongoData } from '../mongodb/mongoClient';
const api = Router();

api.get('/current', (req, res) => {
    try {
      getCurrentMongoData().then((res) => console.log(res));
      res.status(200).json('{}');
    } catch (err) {
      res.status(404).json(err)
    }
  })

  export {api};