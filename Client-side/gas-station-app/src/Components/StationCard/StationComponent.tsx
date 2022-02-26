import { FC } from "react";
import { Station } from "../../Models/Stations";
import { CardContainer } from "./styles";

export const StationComponent: FC<Station> = ({ latitude, longitude, adresse, ville, listeDePrix }: Station) => {
    return (
        <CardContainer>
            <table>
                <body>
                    <tr>
                        <td>{adresse}</td>
                    </tr>
                    <tr>
                        <td>{ville}</td>
                    </tr>
                    {listeDePrix.map((price) => {
                        return (
                            <tr>
                                <td>
                                    {price.nom} : {price.valeur}€
                                </td>
                            </tr>
                        );
                    })}
                </body>
            </table>
        </CardContainer>
    );
};
