import axios from "axios";

    const instance = axios.create({
        baseURL: 'http://localhost:8080/api/',
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
      });

    export const getAllData = async () => {
        try {
            const response = await instance.get('stations/current/byCity/Metz');
            console.log(response);
          } catch (error) {
            console.error(error);
          }
    }
