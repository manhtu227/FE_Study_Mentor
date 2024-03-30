import images from '@assets/images';
import { Image } from 'antd';
export default function MentorItem() {
    return (
        <div className='w-full h-[138px] bg-white-900 p-4 flex gap-4 items-center'>
            <div className='w-1/4'>
                <Image src={images.feedback.src} preview={false} className='!w-full' />
            </div>
            <div className='flex flex-col justify-between w-3/4'>
                <div className='flex flex-col'>
                    <div className='text-xl font-bold'>Nguyễn Văn A</div>
                    <div className='text-lg'>Kinh nghiệm: 2 năm</div>
                    <div className='text-lg'>Giới tính: Nam</div>
                    <div className='text-lg'>Địa chỉ: Hà Nội</div>
                    <div className='text-lg'>Mô tả: Mô tả ngắn</div>
                </div>
                <div className='flex justify-end'>
                    <button className='bg-blue-900 text-white-900 rounded-md px-4 py-2'>
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
}
