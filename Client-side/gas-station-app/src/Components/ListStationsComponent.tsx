import { FC, useContext, useEffect } from "react";
import { StationCtx } from "../Contexts/stationContext";
import { FormFilterComponent } from './FormFilterComponent';
import { StationComponent } from './StationComponent';


const ListStationsComponent: FC = () => {
    // Hooks
    const context = useContext(StationCtx);
    useEffect(() => context!.updateStations());

    // Variables
    const data = context!.stations;
    const stations = data.map(station => station);

    return (
        <div>
            <FormFilterComponent />
            <table>
                <tbody>
                    {stations.map((station) => {
                        return (
                            <tr>
                                <td><StationComponent
                                    latitude={station.latitude}
                                    longitude={station.longitude}
                                    adresse={station.adresse}
                                    ville={station.ville}
                                    listeDePrix={station.listeDePrix} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListStationsComponent;