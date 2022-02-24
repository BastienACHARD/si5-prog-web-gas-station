import { Station } from "../Models/Stations";
import { getAllData } from "../API/api";
import { createContext, useState, FC } from "react";

interface contextType {
    stations : Station[] | undefined,
    updateStations: () => void
}

export const StationCtx = createContext<contextType | null>(null);

export const StationProvider : FC = ( { children } ) => {
    const [stations, setStations] = useState<Station[]>();

    const updateStations = () => {
        getAllData().then(res => {
            setStations(res);
        });
      }

      const value: contextType = {stations, updateStations};

    return (
        <StationCtx.Provider value={value}>
            {children}
        </StationCtx.Provider>
    );
  };


