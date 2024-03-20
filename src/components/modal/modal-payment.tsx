import images from '@assets/images';
import { Divider, Tabs, TabsProps } from 'antd';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: (
            <div className='text-base font-bold text-gray-700 flex items-center gap-2'>
                <img src={images.momo.src} alt='' />
                Momo
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div className='text-base font-bold text-gray-700 flex items-center gap-2'>
                <img src={images.zalo.src} alt='' />
                Zalo
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div className='text-base font-bold text-gray-700 flex items-center gap-2'>
                <img src={images.credit.src} alt='' />
                Debit/ Credit card
            </div>
        ),
    },
    {
        key: '4',
        label: (
            <div className='text-base font-bold text-gray-700 flex items-center gap-2'>
                <img src={images.napas.src} alt='' />
                NAPAS card
            </div>
        ),
    },
];

export function ModalPayment() {
    return (
        <div className='flex flex-col items-center px-10'>
            <span className='font-bold text-lg text-black-800'>Thanh toán</span>
            <span className='mt-6 mb-4 text-base font-normal flex gap-2 items-center'>
                Số tiền cần thanh toán:
                <span className='text-2xl text-primary-600 font-bold'>300.000 VNĐ</span>
            </span>
            <Tabs defaultActiveKey='1' items={items} className='mx-[260px]' />
            <div className='w-full flex'>
                <div style={{ flex: `0 0 300px` }} className='bg-[#AF2070] rounded-lg'>
                    <div className='p-6 text-white-900 font-bold flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <span className='text-base'>Đơn hàng hết hạn sau</span>
                            <span className='text-2xl'>25:32</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-base'>Nhà cung cấp</span>
                            <span className='text-2xl'>Momo</span>
                        </div>
                        <div className='flex flex-col mt-[34px]'>
                            <span className='text-base'>Số tiền</span>
                            <span className='text-base'>300.000đ</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-base'>Thông tin</span>
                            <span className='text-base'>thanh-toan-ma-don-hang-10102002</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-base'>Đơn hàng</span>
                            <span className='text-base'>123123123123123</span>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col p-6'>
                    <div className='flex justify-between'>
                        <img src={images.momo.src} width={50} alt='' />
                        <img src={images.momo.src} width={50} alt='' />
                    </div>
                    <Divider className='my-[10px]' />
                    <div className='w-full flex flex-col items-center gap-[10px] py-6 text-base font-normal text-black-800'>
                        <span className='text-[#AF2070] text-2xl font-bold'>
                            Quét mã để thanh toán
                        </span>
                        <img src={images.qrImage.src} width={224} alt='' />
                        <span>Sử dụng App MoMo hoặc</span>
                        <span>ứng dụng Camera hỗ trợ QR code để quét mã.</span>
                        <span>Đang chờ bạn quét...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
