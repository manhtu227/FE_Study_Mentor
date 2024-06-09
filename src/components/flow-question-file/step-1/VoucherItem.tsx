import dayjs from 'dayjs';

type Props = {
    percent: number;
    quantity: number;
    time: string;
    onClick?: () => void;
};
export function VoucherItem({ percent, quantity, time, onClick }: Props) {
    const hours = dayjs(time).diff(dayjs(), 'hours');
    return (
        <div
            className='h-28 w-full flex bg-white-800 cursor-pointer hover:shadow-2xl'
            onClick={onClick}
        >
            <div className='h-full w-28 bg-red-500 relative'>
                <div className='absolute w-3 h-full left-[-6px] flex flex-col justify-around'>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                    <div className='w-2 h-2 rounded-full bg-white-900'></div>
                </div>
                <div className='h-full w-full flex justify-center items-center font-bold text-white-900 shadow-lg'>
                    Giảm giá
                </div>
            </div>
            <div className='h-28 gap-1 px-2 flex flex-col justify-center'>
                <div>mã giảm giá {percent}%</div>
                <div>Số lượng mã giảm giá bạn đang có: {quantity}</div>
                <div>Sắp hết hạn: Còn {hours} giờ</div>
            </div>
        </div>
    );
}
