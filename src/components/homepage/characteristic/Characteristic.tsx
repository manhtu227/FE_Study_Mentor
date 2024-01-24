import React from 'react';
import Image, { StaticImageData } from 'next/image';

const Characteristic = ({
    image,
    title,
    description,
}: {
    image: StaticImageData;
    title: string;
    description: string;
}) => {
    return (
        <div className='items-center self-stretch flex w-1/3 flex-col pt-9 px-6'>
            <Image
                loading='lazy'
                src={image}
                className='aspect-[0.88] object-contain object-center w-[202px] overflow-hidden max-w-full'
                alt={title}
                height={300}
            />
            <div className='self-stretch text-neutral-700 text-center font-bold leading-9 text-2xl tracking-wide mt-9'>
                {title}
            </div>
            <div className='self-stretch text-gray-500 text-base leading-6 tracking-normal mt-4'>
                {description}
            </div>
        </div>
    );
};

export default Characteristic;
