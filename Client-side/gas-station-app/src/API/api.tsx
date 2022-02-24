import axios from "axios";
import { Prix } from "../Models/Prix";
import { Station } from "../Models/Stations";

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const getAllData = async () => {
  try {
    const body = { 'city': 'Metz' };
    const response = await instance.post('stations/current/byCity', body);
    //console.log(response.data);
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
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
