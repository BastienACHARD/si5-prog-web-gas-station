import { Station } from "../Models/Stations";
import { getFilterData } from "../API/api";
import { createContext, useState, FC } from "react";
import { Filter } from "../Models/Filter";

interface contextType {
    stations : Station[],
    filter : Filter,
    updateStations: () => void,
    updateFilter: (filter: Filter) => void
}

export const StationCtx = createContext<contextType | null>(null);

export const StationProvider : FC = ( { children } ) => {
    const [stations, setStations] = useState<Station[]>([]);
    const [filter, setFilter] = useState<Filter>({
        latitude: 48.856614,
        longitude: 2.3522219,
        raduisInMeter: 30000,
        fuels: [],
        services: [],
        prices: [],
        sortByPrice: false
    });

    const updateStations = () => {
        /*getFilterData(
            filter.latitude, filter.longitude, filter.raduisInMeter, filter.fuels, 
            filter.services, filter.prices, filter.sortByPrice
            ).then(res => {
            setStations(res ? res : []);
        });*/
      }

    const updateFilter = (filter: Filter) => {
        console.log(filter);
        setFilter(filter);
    }

      const value: contextType = {stations, filter, updateStations, updateFilter};

    return (
        <StationCtx.Provider value={value}>
            {children}
        </StationCtx.Provider>
    );
  };


