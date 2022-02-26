import axios from "axios";
import { Prix } from "../Models/Prix";
import { Station } from "../Models/Stations";

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: { 'X-Custom-Header': 'foobar' }
});

// à modifier car on ne prend jamais toute les données
export const getAllData = async () => {
  try {
    const body = { 'city': 'Metz' };
    const response = await instance.post('stations/current/byCity', body);
    const data: Station[] = response.data.map((item: { latitude: number; longitude: number; adresse: string; ville: string; services: string[]; listeDePrix: Prix[] }) => {
      return ({
        latitude: item.latitude,
        longitude: item.longitude,
        adresse: item.adresse,
        ville: item.ville,
        services: item.services,
        listeDePrix: item.listeDePrix
      });
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

// filtrer les données : sous la forme d'un post
export const getFilterData = async (lat: number, long: number, radius: number, fuel: string[], services: string[], sortByPrice: boolean) => {
  try {
    const body = { 
      'latitude': lat,
      'longitude': long,
      'radiusInMeter': radius,
      'filter': {
        'fuels': fuel,
        'services': services,
        'sortByPrice': sortByPrice
      }
    };
    const response = await instance.post('stations/current/filter', body);
    console.log(response.data);
    const result = JSON.parse(response.data);
    const data: Station[] = result.map((item: { latitude: number; longitude: number; adresse: string; ville: string; services: string[]; listeDePrix: Prix[] }) => {
      return ({
        latitude: item.latitude,
        longitude: item.longitude,
        adresse: item.adresse,
        ville: item.ville,
        services: item.services,
        listeDePrix: item.listeDePrix
      });
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
