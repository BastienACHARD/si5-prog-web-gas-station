// Imports
import { FC, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Contexts
import { StationCtx } from "../../Contexts/stationContext";

// Models
import { Filter } from "../../Models/Filter";

// styles
import { FormFilterContainer, ItemContainer } from './styles';


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
            latitude: context!.filter.latitude,
            longitude: context!.filter.longitude,
            radiusInMeter: context!.filter.radiusInMeter,
            fuels: formData.fuels ? [formData.fuels] : [],
            services: formData.services ? [formData.services] : [],
            sortByPrice: formData.sortByPrice ? true : false
        };
        context!.updateFilter(filter);
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            
          } else {
            navigator.geolocation.getCurrentPosition((position) => {
                const filter: Filter = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    radiusInMeter: context!.filter.radiusInMeter,
                    fuels: context!.filter.fuels,
                    services: context!.filter.services,
                    sortByPrice: context!.filter.sortByPrice
                };
                context!.updateFilter(filter);
            }, () => {
                
            });
          }
    }

    return (
        <FormFilterContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ItemContainer>
                    <label>Fuel Selection : </label>
                    <select {...register("fuels")}>
                        <option value="">--- select ---</option>
                        <option value="Gazole">Gazole</option>
                        <option value="SP95">SP95</option>
                        <option value="E85">E85</option>
                        <option value="GPLc">GPLc</option>
                        <option value="E10">E10</option>
                        <option value="SP98">SP98</option>
                    </select>
                </ItemContainer>
                <ItemContainer>
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
                </ItemContainer>
                <ItemContainer>
                    <label>Filter Selection : </label>
                    <select {...register("sortByPrice")} >
                        <option value="">By Distance</option>
                        <option value="true">By Price</option>
                    </select>
                </ItemContainer>
                <ItemContainer>
                <input type="submit" />
                <button onClick={getLocation}>Get Location</button>
                </ItemContainer>
            </form>
        </FormFilterContainer>
    );

}