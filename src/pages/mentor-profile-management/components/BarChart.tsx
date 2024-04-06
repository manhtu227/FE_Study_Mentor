import WalletIcon from '@assets/icons/wallet-icon';
import { Progress } from 'antd';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import faker from 'faker';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
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
    return daysOfWeek.map(() => faker.datatype.number({ min: 0, max: 1000 }));
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
    return (
        <div className=' bg-white-900 p-4 rounded-md'>
            <div className='h-[210px] bar-chart px-4 pt-4'>
                <Bar options={options} data={data} />
            </div>
            <div className='flex flex-col mt-[10px] mb-8'>
                <span className='text-lg font-bold text-black-500'>Câu hỏi trả lời theo tuần</span>
                <span className='text-sm font-bold text-green-900'>
                    (+23) <span className='text-gray-500'>so với tuần trước</span>
                </span>
            </div>
            <div className='flex gap-[2px] justify-between'>
                <ItemRate />
                <ItemRate />
                <ItemRate />
                <ItemRate />
            </div>
        </div>
    );
}

function ItemRate() {
    return (
        <div className='w-[100px]'>
            <div className='flex gap-[5.5px]'>
                <div className='w-[25px] h-[25px] bg-primary-600 flex items-center justify-center rounded-[6px]'>
                    <WalletIcon className='w-3 h-3' />
                </div>
                <span className='font-bold text-xs text-gray-500'>
                    Doanh
                    <br /> thu
                </span>
            </div>
            <span className='font-normal text-lg'>1.200k</span>
            <Progress percent={50} size='small' showInfo={false} />
        </div>
    );
}
