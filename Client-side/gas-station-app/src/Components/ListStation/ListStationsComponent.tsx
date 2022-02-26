import { FC, useContext, useEffect } from "react";
import { StationCtx } from "../../Contexts/stationContext";
import { FormFilterComponent } from '../FormFilter/FormFilterComponent';
import { StationComponent } from '../StationCard/StationComponent';


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
                    {stations.map((station, index) => {
                        return (
                            <tr>
                                <td><StationComponent key={index}
                                    latitude={station.latitude}
                                    longitude={station.longitude}
                                    adresse={station.adresse}
                                    ville={station.ville}
                                    listeDePrix={station.listeDePrix} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListStationsComponent;