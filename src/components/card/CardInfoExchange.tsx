import images from '@assets/images';
import { Image } from 'antd';

export function CardInfoExchange() {
    return (
        <div className='w-full bg-white-900 rounded-lg'>
            <div className='p-6'>
                <h3 className='font-bold text-lg m-0 mb-8'>Thông tin buổi trao đổi</h3>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-x-3'>
                        <Image preview={false} src={images.clock.src} />
                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>Thời gian:</h4>
                        <p className='text-base font-bold m-0'>1 giờ 15 phút </p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <Image preview={false} src={images.anchor.src} />
                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>Chủ đề:</h4>
                        <p className='text-base font-bold m-0'>Lập trình </p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <Image preview={false} src={images.layer.src} />
                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>Lớp / Cấp độ:</h4>
                        <p className='text-base font-bold m-0'>Đại học </p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <Image preview={false} src={images.cardCredit.src} />
                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>Thanh toán:</h4>
                        <p className='text-base font-bold m-0'>Tài khoản ngân hàng </p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <Image preview={false} src={images.cardCredit.src} />
                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>Giá:</h4>
                        <p className='text-base font-bold m-0'>130 Xu</p>
                    </div>
                </div>
            </div>
        </div>
    );
}