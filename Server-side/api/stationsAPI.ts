import express, { Router } from 'express';
import { Station } from '../models/Station';
import { getStationCollection } from '../mongodb/mongoClient';

const stationApi = Router();

stationApi.get('/current/all', async (req, res) => {
  try {
    res.status(200).json((await getStationCollection()?.find({}).toArray()) as unknown as Station[]);
  } catch (err) {
    res.status(404).json(err)
  }
});

stationApi.get('/current/byCity/:city', async (req, res) => {
  try {
    res.status(200).json(await getStationCollection()?.find({"ville" : { $regex: `.*${req.params.city}.*` }}).toArray() as unknown as Station[]);;
  } catch (err) {
    res.status(404).json(err)
  }
});

stationApi.get('/current/filter/:filter', async (req, res) => {
  try {
    res.status(200).json(await getStationCollection()?.find((JSON.parse(req.params.filter))));
  } catch (err) {
    res.status(404).json(err)
  }
});

export { stationApi };