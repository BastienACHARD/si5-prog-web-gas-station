import { createContext, useState, FC } from "react";
import { getPricesForGraph } from '../API/api';
import { GraphModel } from '../Models/GraphModel';

interface graphContextType {
    graphData: GraphModel[],
    updateGraphData: () => void
}

export const GraphCtx = createContext<graphContextType | null>(null);

export const GraphProvider: FC = ({ children }) => {
    const [graphData, setGraphData] = useState<GraphModel[]>([]);


    const updateGraphData = () => {
        getPricesForGraph().then(res => setGraphData(res ? res : []));
    }

    const value = {graphData, updateGraphData};
    return (
        <GraphCtx.Provider value={value}>
            {children}
        </GraphCtx.Provider>
    );
};