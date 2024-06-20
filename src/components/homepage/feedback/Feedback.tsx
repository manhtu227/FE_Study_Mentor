import images from '@assets/images';
import { Image } from 'antd';

function Feedback() {
    return (
        <div className='rounded max-w-[500px] py-3 bg-white-900 my-6 gap-4 flex items-center shadow-md mr-4'>
            <div className='max-w-[286px] pl-6'>
                <div className='text-lg font-bold text-[#0A2277]'>Tom Smith</div>
                <div className='text-xs font-bold text-gray-500 mb-4'>Doctor</div>
                <div className='font-bold text-base line-clamp-3'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                </div>
            </div>
            <Image
                src={images.teacher.src}
                preview={false}
                alt='feedback'
                width={150}
                height={100}
                // over fit
                className='rounded-md object-contain w-[150px] h-[100px]'
            />
        </div>
    );
}

export default Feedback;
