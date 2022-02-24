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

    // filter nightmare to build mongo request, made by Lucas AUBRON
    // recommended to drink 2 to 3 cup of strong coffee before reading this
    const filter = req.body.filter;
    let filterString = '{"$and": [';
    if (filter !==undefined){
      if (filter.fuels !== undefined){
        filterString+='{"$and" :[';
        filter.fuels.forEach((fuel : string) => {
          filterString+=`{"listeDePrix.nom" : "${fuel}"},`
        });
        filterString = filterString.slice(0, -1);
        filterString+="]},";
      }
      if (filter.services !== undefined){
        filterString+='{"$and" :['
        filter.services.forEach((service : string) => {
          filterString+=`{"services" : "${service}"},`
        });
        filterString = filterString.slice(0, -1);
        filterString+="]},"
      }
      if (filter.prices !== undefined){
        filterString+='{"$and" :['
        filter.prices.forEach((arr : any) => {
          filterString+=`{"listeDePrix" : {"$elemMatch" : {"nom" : "${arr[0]}", "valeur" : {"$lt" : ${arr[1]}}}}},`;
        });
        filterString = filterString.slice(0, -1);
        filterString+="]},"
      }
    }
    filterString = filterString.slice(0, -1);
    filterString+="]}";

    // filter with mongoDB
    let filteredStations = (await getStationCollection()?.find(JSON.parse(filterString)).toArray()) as unknown as Station[];

    // filter the survivors by distance with hand made tools and a bit of trigonometry
    let resultStations = getStationInPerimeters(filteredStations, req.body.latitude, req.body.longitude, req.body.radiusInMeter);

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