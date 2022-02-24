import { FC, useContext, useEffect } from "react";
import { StationCtx } from "../Contexts/stationContext";


const ListStationsComponent : FC = () => {
    const context = useContext(StationCtx);
    useEffect(()=> context!.updateStations());
    const stations = context ? context.stations : undefined;
    const data = stations ? stations.map(item => item) : [];
    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => {
                    return (
                        <tr>
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