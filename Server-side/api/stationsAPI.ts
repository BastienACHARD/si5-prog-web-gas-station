import express, { Router } from 'express';
import { Station } from '../models/Station';
import { getStationCollection } from '../mongodb/mongoClient';
import { getPath } from '../openroute/openrouteClient';
import { getStationInPerimeters } from '../utils/geography';

const stationApi = Router();

stationApi.get('/current/all', async (req, res) => {
  try {
    res.status(200).json((await getStationCollection()?.find({}).toArray()) as unknown as Station[]);
  } catch (err) {
    res.status(404).json(err);
  }
});

stationApi.post('/current/byCity', async (req, res) => {
  try {
    let city = req.body.city;
    //req.params.city
    res.status(200).json(await getStationCollection()?.find({"ville" : { $regex: `.*${city}.*` }}).toArray() as unknown as Station[]);
  } catch (err) {
    res.status(404).json(err);
  }
});

stationApi.post('/current/byDistance/', async (req, res) => {
  try{
    let allStations = (await getStationCollection()?.find({}).toArray()) as unknown as Station[];
    let resultStations = getStationInPerimeters(allStations, req.body.latitude, req.body.longitude, req.body.radiusInMeter);
    res.status(200).json(JSON.stringify(resultStations));
  } catch (err) {
    res.status(404).json(err);
  }
});

stationApi.get('/test', (req, res) => {
  try{
    res.status(200).json(getPath("43.5834188,7.1208154", "43.5834188,7.1208159"));
  } catch (err) {
    res.status(404).json(err);
  }
});

export { stationApi };