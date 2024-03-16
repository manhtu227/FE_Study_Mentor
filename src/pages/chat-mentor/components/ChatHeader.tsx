import images from '@assets/images';
import { Avatar } from 'antd';

export default function ChatHeader() {
    return (
        <div>
            <div className='flex flex-col mb-4'>
                <span className='font-bold text-lg text-black-800 mb-4'>Lập trình JavaScript</span>
                <span className='font-bold text-[15px] text-primary-800'>Xem chi tiết</span>
            </div>
            <div className='flex gap-4 pb-4 pack-border-b-primary-400'>
                <Avatar size={48} src={images.mentorMethod.src} />
                <div>
                    <h1 className='m-0 font-bold text-lg text-black-800'>Jacky</h1>
                    <span className='text-primary-600 font-bold text-sm'>Hoạt động</span>
                </div>
            </div>
        </div>
    );
}
