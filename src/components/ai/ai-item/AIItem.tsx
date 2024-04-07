import Image, { StaticImageData } from 'next/image';

function AIItem({
    image,
    title,
    description,
    onClick,
}: {
    image: StaticImageData;
    title: string;
    description: string;
    onClick: () => void;
}) {
    return (
        <div
            className='w-full flex items-center gap-3 mb-3 hover:bg-gray-200 cursor-pointer'
            onClick={onClick}
        >
            <div className='w-1/4 h-14 pl-2'>
                <Image src={image} alt={title} className='w-full h-full' />
            </div>
            <div>
                <div className='font-bold text-2xl'>{title}</div>
                <div className='text-sm- text-gray-400'>{description}</div>
            </div>
        </div>
    );
}

export default AIItem;
