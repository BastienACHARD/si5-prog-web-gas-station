import { FC } from 'react';
import { useContext } from 'react';
import { GraphCtx } from '../../Contexts/graphContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Le prix moyen des carburants lors des 10 derniers jours',
        },
    },
};

export const GraphComponent: FC = () => {
    const context = useContext(GraphCtx);
    const Gazole = context!.graphData.map(item => item.Gazole);
    const E10 = context!.graphData.map(item => item.E10);
    const E85 = context!.graphData.map(item => item.E85);
    const SP98 = context!.graphData.map(item => item.SP98);
    const GPLc = context!.graphData.map(item => item.GPLc);

    const date = context!.graphData.map(item => item.date);



    const dataGraph = {
        labels: date,
        datasets: [{
            label: 'Gazole',
            data: Gazole,
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            tension: 0.1
        }, {
            label: 'E10',
            data: E10,
            fill: false,
            borderColor: 'rgb(0, 255, 0)',
            tension: 0.1
        }, {
            label: 'E85',
            data: E85,
            fill: false,
            borderColor: 'rgb(0, 0, 255)',
            tension: 0.1
        }, {
            label: 'SP98',
            data: SP98,
            fill: false,
            borderColor: 'rgb(255, 128, 0)',
            tension: 0.1
        }, {
            label: 'GPLc',
            data: GPLc,
            fill: false,
            borderColor: 'rgb(255, 0, 255)',
            tension: 0.1
        }]
    };

    return (
        <div>
            <Line options={options} data={dataGraph} />
        </div>
    );
}