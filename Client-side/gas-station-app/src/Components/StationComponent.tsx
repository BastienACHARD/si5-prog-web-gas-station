import { FC } from "react";
import { Station } from "../Models/Stations";

export const StationComponent: FC<Station> = ({ latitude, longitude, adresse, ville, listeDePrix }: Station) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Adresse</th>
                    <th>Ville</th>
                    {listeDePrix.map(price => {
                        return (
                            <th>{price.nom}</th>
                        );
                    })}
                </tr>
            </thead>
            <body>
                <tr>
                    <td>{adresse}</td>
                    <td>{ville}</td>
                    {listeDePrix.map(price => {
                        return (
                            <td>{price.valeur}</td>
                        );
                    })}
                </tr>
            </body>
        </table>
    );
}