// Imports
import { FC, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Contexts
import { StationCtx } from "../Contexts/stationContext";

// Models
import { Filter } from "../Models/Filter";

interface FormModel {
    fuels: string,
    services: string,
    sortByPrice: boolean
}


export const FormFilterComponent: FC = () => {
    // Hooks
    const context = useContext(StationCtx);
    const { register, handleSubmit } = useForm<FormModel>();

    // Handler
    const onSubmit: SubmitHandler<FormModel> = data => updateFilter(data);

    // update filter in the context
    const updateFilter = (formData: FormModel) => {
        const filter: Filter = {
            latitude: 48.856614,
            longitude: 2.3522219,
            raduisInMeter: 30000,
            fuels: [formData.fuels],
            services: [formData.services],
            sortByPrice: formData.sortByPrice ? true : false
        };
        context!.updateFilter(filter);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Fuel Selection : </label>
            <select {...register("fuels")} >
                <option value="">--- select ---</option>
                <option value="Gazole">Gazole</option>
                <option value="SP95">SP95</option>
                <option value="E85">E85</option>
                <option value="GPLc">GPLc</option>
                <option value="E10">E10</option>
                <option value="SP98">SP98</option>
            </select>
            <br />
            <label>Services Selection : </label>
            <select {...register("services")} >
                <option value="">--- select ---</option>
                <option value="Station de gonflage">Station de gonflage</option>
                <option value="Laverie">Laverie</option>
                <option value="Lavage automatique">Lavage automatique</option>
                <option value="Automate CB 24/24">Automate CB 24/24</option>
                <option value="Boutique alimentaire">Boutique alimentaire</option>
                <option value="Vente de gaz domestique (Butane, Propane)">Vente de gaz domestique</option>
                <option value="Vente d'additifs carburants">Vente d'additifs carburants</option>
                <option value="Relais colis">Relais colis</option>
                <option value="Piste poids lourds">Piste poids lourds</option>
            </select>
            <br />
            <label>Filter Selection : </label>
            <select {...register("sortByPrice")} >
                <option value="">By Distance</option>
                <option value="true">By Price</option>
            </select>
            <br />
            <input type="submit" />
        </form>
    );

}