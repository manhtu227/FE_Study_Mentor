import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import faker from 'faker';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler, // 1. Register Filler plugin
);

export const options = {
    plugins: {
        legend: {
            display: false, // Set to false to hide the legend
        },
    },
    responsive: true,
    tension: 0.3, // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
    scales: {
        y: {
            border: {
                dash: [2, 4],
            },
        },
    },
};

const labels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 0, 0)',
            fill: {
                target: 'origin', // Set the fill options
                above: 'rgba(255, 0, 0, 0.3)',
            },
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.3)',
            fill: 'origin', // Set the fill options
        },
    ],
};

export function AreaChart() {
    return (
        <div className='px-[9.5px] bg-white-900 '>
            <div className='flex flex-col mt-[34px] mb-14'>
                <span className='text-lg font-bold text-black-500'>Doanh thu</span>
                <span className='text-sm font-bold text-green-900'>
                    (+500 xu) so với tuần trước
                </span>
            </div>
            <Line options={options} data={data} className='!h-[300px] w-full' />
        </div>
    );
}
