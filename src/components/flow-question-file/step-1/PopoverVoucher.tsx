import { formatPriceVND } from '@core/utilities/caculate-price.utility';
import { Divider } from 'antd';

type Props = {
    priceTotal: number;
    priceDiscount: number;
};

export default function PopoverVoucher({ priceTotal, priceDiscount }: Props) {
    return (
        <div className='w-[400px]'>
            <div className='flex justify-between py-2'>
                <span className='text-base font-normal text-gray-900'>Tổng tiền</span>
                <span className='text-base font-semibold'>{formatPriceVND(priceTotal)}</span>
            </div>
            <Divider type='horizontal' />
            <div className='flex justify-between '>
                <span className='text-base font-normal text-gray-900'>Voucher giảm giá</span>
                <span className='text-base font-semibold'>
                    - {formatPriceVND(priceTotal - priceDiscount)}
                </span>
            </div>
            <Divider />
            <div className='flex justify-between py-2'>
                <span className='text-base font-medium'>Tiết kiệm</span>
                <span className='text-base font-semibold text-red-600'>
                    - {formatPriceVND(priceTotal - priceDiscount)}
                </span>
            </div>
            <div className='flex justify-between py-2'>
                <span className='text-base font-medium'>Tổng tiền</span>
                <span className='text-base font-semibold'>{formatPriceVND(priceDiscount)}</span>
            </div>
        </div>
    );
}
