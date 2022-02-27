import { Station } from "../Models/Stations";
import { getFilterData } from "../API/api";
import { createContext, useState, FC } from "react";
import { Filter } from "../Models/Filter";

interface contextType {
    stations: Station[],
    filter: Filter,
    updateStations: () => void,
    updateFilter: (filter: Filter) => void
}

export const StationCtx = createContext<contextType | null>(null);

export const StationProvider: FC = ({ children }) => {
    const [stations, setStations] = useState<Station[]>([]);
      
    const filt = {
        latitude: 48.856614,
        longitude: 2.3522219,
        radiusInMeter: 5000,
        fuels: [],
        services: [],
        sortByPrice: false
    }
    
    const [filter, setFilter] = useState<Filter>(filt);

    const updateStations = () => {
        console.log(filter);
        getFilterData(
            filter.latitude, filter.longitude, filter.radiusInMeter, filter.fuels,
            filter.services, filter.sortByPrice
        ).then(res => {
            setStations(res ? res : []);
        });
    }

    const updateFilter = (filter: Filter) => {
        setFilter(filter);
    }

    const value: contextType = { stations, filter, updateStations, updateFilter };

    return (
        <StationCtx.Provider value={value}>
            {children}
        </StationCtx.Provider>
    );
};


