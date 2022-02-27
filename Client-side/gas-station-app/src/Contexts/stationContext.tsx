import { Station } from "../Models/Stations";
import { getFilterData } from "../API/api";
import { createContext, useState, FC } from "react";
import { Filter } from "../Models/Filter";

// interface pour le context 
interface contextType {
    stations: Station[],
    filter: Filter,
    updateStations: () => void,
    updateFilter: (filter: Filter) => void
}

// création du context
export const StationCtx = createContext<contextType | null>(null);

// Component qui sert de context provider
export const StationProvider: FC = ({ children }) => {
    // Hooks
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

    // update les données (la liste des stations)
    const updateStations = () => {
        console.log(filter);
        getFilterData(
            filter.latitude, filter.longitude, filter.radiusInMeter, filter.fuels,
            filter.services, filter.sortByPrice
        ).then(res => {
            setStations(res ? res : []);
        });
    }

    // update les données (les filtres)
    const updateFilter = (filter: Filter) => {
        setFilter(filter);
    }

    // les données qui sont passé dans le context
    const value: contextType = { stations, filter, updateStations, updateFilter };

    return (
        <StationCtx.Provider value={value}>
            {children}
        </StationCtx.Provider>
    );
};


