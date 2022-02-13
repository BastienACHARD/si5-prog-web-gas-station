import express, { Router } from 'express';
import { getStations } from '../mongodb/mongoClient';

const api = Router();

api.get('/current/all', async (req, res) => {
  try {
    res.status(200).json(await getStations());
  } catch (err) {
    res.status(404).json(err)
  }
});

api.get('/current/byCity/:city', async (req, res) => {
  try {
    res.status(200).json(await getStations({"ville" : { $regex: `.*${req.params.city}.*` }}));
  } catch (err) {
    res.status(404).json(err)
  }
});

api.get('/current/filter/:filter', async (req, res) => {
  try {
    res.status(200).json(await getStations(JSON.parse(req.params.filter)));
  } catch (err) {
    res.status(404).json(err)
  }
});

export { api };