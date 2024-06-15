import { Select } from 'antd';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
// import faker from 'faker';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const optionsChart = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#FFFFFF',
            },
        },
        y: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#FFFFFF',
            },
        },
    },
};

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateRandomData = () => {
    return daysOfWeek.map(() => Math.floor(Math.random() * 1000));
};

const currentWeekData = generateRandomData(); // Dữ liệu của tuần hiện tại
const previousWeekData = generateRandomData(); // Dữ liệu của tuần trước

export const data = {
    labels: daysOfWeek, // Sử dụng các ngày trong tuần làm nhãn trục Ox
    datasets: [
        {
            label: 'Tuần này',
            data: currentWeekData,
            backgroundColor: '#FFFFFF',
            borderRadius: 500,
            borderSkipped: false,
            width: 10,
            barPercentage: 0.4,
        },
        {
            label: 'Tuần trước',
            data: previousWeekData,
            backgroundColor: '#FF0000', // Màu của dataset tuần trước (ví dụ: đỏ)
            borderRadius: 500,
            borderSkipped: false,
            width: 10,
            barPercentage: 0.4,
        },
    ],
};

export function BarChart() {
    const optionsFilter = [
        { value: 7, label: '7 ngày' },
        { value: 30, label: '30 ngày' },
        { value: 7, label: '7 ngày' },
        { value: 7, label: '7 ngày' },
    ];
    return (
        <div className=' bg-white-900 p-4 rounded-md flex flex-col justify-between'>
            <div>
                <Select />
            </div>
            <div className='h-3/5 bar-chart px-4 pt-4'>
                <Bar options={optionsChart} data={data} />
            </div>
        </div>
    );
}
