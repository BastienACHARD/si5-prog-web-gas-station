import { FC, useContext, useEffect } from "react";
import { StationCtx } from "../Contexts/stationContext";
import {FormFilterComponent} from './FormFilterComponent';


const ListStationsComponent : FC = () => {
    const context = useContext(StationCtx);
    useEffect(()=> context!.updateStations());
    const data = context!.stations;
    const stations = data.map(station => station);
    return (
    <div>
        <FormFilterComponent/>
        <table>
            <tbody>
                {stations.map((item, index) => {
                    return (
                        <tr>
                            <td>{index}</td>
                            <td>{item.adresse}</td>
                            <td>{item.ville}</td>
                            <td>{item.latitude}</td>
                            <td>{item.longitude}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    );
}

export default ListStationsComponent;