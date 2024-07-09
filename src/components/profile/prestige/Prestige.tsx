function Prestige(averageRate: { averageRate: number }) {
    return (
        <div className='p-8 pb-14 flex flex-col items-start gap-4 bg-white-900 rounded-md'>
            <div className='font-semibold text-xl text-black-800'>Độ uy tín của bạn</div>
            <div className='text-md'>
                Mỗi lượt đánh giá 5 sao sẽ tăng độ uy tín của bạn. Bạn sẽ được ứng viên tìm đến
                nhiều hơn.
            </div>
            <div className='flex items-center gap-4'>
                <div className='rounded-full bg-primary-600 flex flex-col h-[120px] min-w-[120px] items-center justify-center'>
                    <span className='font-bold text-white-800 text-[48px]'>
                        {+averageRate.averageRate}
                    </span>
                    <span className='text-white-800 font-bold text-xs'>Sao</span>
                </div>
                <div className='text-md'>
                    Hãy tích cực và nhiệt tình trao đổi, hướng dẫn cho học sinh của bạn nhé. Nhận
                    được đánh giá tốt là một cách tiếp cận và nâng cao độ uy tín của bản thân nhé!
                </div>
            </div>
        </div>
    );
}

export default Prestige;
