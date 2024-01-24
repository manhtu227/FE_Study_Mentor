import images from '@assets/images';
import { Card } from 'antd';
import Image from 'next/image';

function Feedback() {
    return (
        <div className='rounded max-w-[500px] h-[210px] bg-white py-6 gap-4 flex items-center shadow-md'>
            <div className='max-w-[286px] pl-6'>
                <div className='text-lg font-bold text-[#0A2277]'>Tom Smith</div>
                <div className='text-xs font-bold text-gray-500 mb-4'>Doctor</div>
                <div className='font-bold text-base'>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, labore. Ipsa
                    molestiae commodi ipsam debitis, eius unde est itaque quos voluptatem. Corrupti,
                    quam asperiores. Ratione quo accusantium voluptatem molestias officia?
                </div>
            </div>
            <Image
                src={images.feedback}
                alt='feedback'
                width={150}
                height={100}
                objectFit='cover'
                className='rounded-md'
            />
        </div>
    );
}

export default Feedback;
