import images from '@assets/images';
import { Avatar } from 'antd';

export default function ChatHeader() {
    return (
        <div className='flex gap-4 pb-4 pack-border-b-primary-400'>
            <Avatar size={48} src={images.mentorMethod.src} />
            <div>
                <h1 className='m-0 font-bold text-lg text-black-800'>Mentor AI</h1>
                <span className='text-primary-600 font-bold text-sm'>Hoạt động</span>
            </div>
        </div>
    );
}
