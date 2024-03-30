type CardTitleIconProps = {
    title: string;
    icon: React.ReactNode;
    value: string;
    percent: string;
};

export function CardTitleIcon({ title, icon, value, percent }: CardTitleIconProps) {
    return (
        <div className='bg-white-900 rounded-lg w-full'>
            <div className='px-6 py-3 flex justify-between text-black-800'>
                <div className='flex flex-col'>
                    <span className='font-bold text-sm text-gray-700'>{title}</span>
                    <div className='flex items-center gap-[2px]'>
                        <span className='text-lg font-bold'>{value}</span>
                        <span className='text-sm font-normal text-primary-800'>{percent}</span>
                    </div>
                </div>
                <div className='w-[45px] h-[45px] bg-primary-600 flex items-center justify-center rounded-lg'>
                    {icon}
                </div>
            </div>
        </div>
    );
}
