
import { FC } from 'react';
import { useContext } from 'react';
import { GraphCtx } from '../../Contexts/graphContext';

export const GraphComponent : FC = () => {
    const context = useContext(GraphCtx);

    return (
        <h1>{context!.graphData.map((data, index) => {
            return(
                ` ${index} : ${data.E10}`
            );
        })}</h1>
    );
}