import ButtonOutlined from '@components/button/ButtonOutlined';

export const CardRate = () => {
    return (
        <div className='p-8 flex flex-col items-start gap-4 bg-white-900 rounded-md'>
            <div className='font-bold text-lg text-black-800'>Độ uy tín của bạn</div>
            <div className='text-sm font-normal'>
                Mỗi lượt đánh giá 5 sao sẽ tăng độ uy tín của bạn. Bạn sẽ được ứng viên tìm đến
                nhiều hơn.
            </div>
            <div className='flex items-center gap-4'>
                <div className='rounded-full bg-primary-600 flex flex-col h-[120px] min-w-[120px] items-center justify-center'>
                    <span className='font-bold text-white-800 text-[40px]'>32</span>
                    <span className='text-white-800 font-bold text-xs'>Lượt đánh giá</span>
                </div>
                <div className='text-sm font-normal text-black-800'>
                    Hãy tích cực và nhiệt tình trao đổi, hướng dẫn cho học sinh của bạn nhé. Nhận
                    được đánh giá tốt là một cách tiếp cận và nân cao độ uy tín của bản thân nhé!
                </div>
            </div>
            <ButtonOutlined title={'Xem nhận xét'} />
        </div>
    );
};
