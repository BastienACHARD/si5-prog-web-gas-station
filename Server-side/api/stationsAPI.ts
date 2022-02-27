import express, { Router } from 'express';
import { HistoryPrice } from '../models/HistoryPrice';
import { Station } from '../models/Station';
import { getPriceCollection, getStationCollection } from '../mongodb/mongoClient';
import { insertPriceHistory } from '../mongodb/mongoProvider';
import { getPath } from '../openroute/openrouteClient';
import { averagePrice } from '../utils/averagePrice';
import { dateAsNumber } from '../utils/dateAsNumber';
import { fuels_name } from '../utils/fuels_name';
import { getStationInPerimeters } from '../utils/geography';
import { sortStationsByDistance, sortStationsByPrice } from '../utils/sort';

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

stationApi.post('/current/filter', async (req, res) => {
  try{
    // filter nightmare to build mongo request, made by Lucas AUBRON
    // recommended to drink 2 to 3 cup of strong coffee before reading this
    const filter = req.body.filter;
    let filterString = '{"$and": [';
    let atLeastOneFilter = false;
    if (filter !==undefined){
      if (filter.fuels !== undefined && filter.fuels.length > 0){
        atLeastOneFilter = true;
        filterString+='{"$and" :[';
        filter.fuels.forEach((fuel : string) => {
          filterString+=`{"listeDePrix.nom" : "${fuel}"},`
        });
        filterString = filterString.slice(0, -1);
        filterString+="]},";
      }
      if (filter.services !== undefined && filter.services.length > 0){
        atLeastOneFilter = true;
        filterString+='{"$and" :['
        filter.services.forEach((service : string) => {
          filterString+=`{"services" : "${service}"},`
        });
        filterString = filterString.slice(0, -1);
        filterString+="]},"
      }
      if (filter.prices !== undefined &&  filter.prices.length > 0){
        atLeastOneFilter = true;
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
    if (!atLeastOneFilter){
      filterString="{}";
    };

    // filter with mongoDB
    let filteredStations = (await getStationCollection()?.find(JSON.parse(filterString)).toArray()) as unknown as Station[];

    // filter the survivors by distance with hand made tools and a bit of trigonometry
    let resultStations = getStationInPerimeters(filteredStations, req.body.latitude, req.body.longitude, req.body.radiusInMeter);

    if (filter.sortByPrice){
      resultStations = sortStationsByPrice(resultStations, filter.fuels);
    } else {
      resultStations = sortStationsByDistance(resultStations, req.body.latitude, req.body.longitude)
    }

    res.status(200).json(resultStations);
  } catch (err) {
    res.status(404).json(err);
  }
});

stationApi.get('/history/prices', async (req, res) => {
  let tenLastDays = [];
  var today = new Date();
  for (let i=10; i>0; i--){
    tenLastDays.push(dateAsNumber(new Date(new Date().setDate(today.getDate() - i))));
  }
  let filterString = '{"$or": [';
  tenLastDays.forEach((d) => {
    filterString += `{"date" : ${d}},`; 
  });
  filterString = filterString.slice(0, -1);
  filterString += "]}";
  res.status(200).json(await getPriceCollection()?.find(JSON.parse(filterString)).toArray() as unknown as HistoryPrice[]);
});

stationApi.get('/test', async (req, res) => {
  try{
    let stations = ((await getStationCollection()?.find({}).toArray()) as unknown as Station[]);
    insertPriceHistory(20220227, averagePrice(stations, fuels_name));
    res.status(200).json("Ok");
  } catch (err) {
    res.status(404).json(err);
  }
});

export { stationApi };