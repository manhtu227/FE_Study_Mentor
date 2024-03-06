import images from '@assets/images';
import ButtonOutlined from '@components/button/ButtonOutlined';

export const CardBankAccount = () => {
    return (
        <div className='w-full'>
            <div className='p-8 flex flex-col items-start gap-4 bg-white-900 rounded-md'>
                <div className='font-bold text-lg text-black-800'>Tài khoản ngân hàng</div>
                <div className='text-sm font-normal'>
                    StudyMentor khuyến khích sử dụng dịch vụ của VietQR.
                </div>
                <div className='flex items-center w-full h-[150px]'>
                    <div className='!w-[150px] px-[9.25px]'>
                        <img src={images.qrImage.src} alt='' className='object-cover' />
                    </div>

                    <div className='flex flex-col justify-between h-full ml-4'>
                        <div className='flex flex-col'>
                            <span className='text-sm font-normal text-gray-700'>
                                Tên chủ tài khoản:
                            </span>
                            <span className='text-base font-bold text-black-800'>
                                Nguyen Dang Manh Tu
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm font-normal text-gray-700'>Số tài khoản:</span>
                            <span className='text-base font-bold text-black-800'>101******876</span>
                        </div>
                        <span className='font-normal text-sm text-black-800'>
                            Ngân hàng: TMCP Ngoại Thương Việt Nam
                        </span>
                    </div>
                </div>
                <ButtonOutlined title={'Chỉnh sửa thông tin'} />
            </div>
        </div>
    );
};
