'use client';
import { CopyOutlined } from '@ant-design/icons';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { Image } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function FindMentorPage() {
    return (
        <div className='relative '>
            <div className='absolute top-0'>
                <Image preview={false} src={images.frame.src} height={350} />
            </div>
            <div className='relative max-w-[1369px] mx-auto pt-[69px] px-4'>
                <div className='flex items-start w-full gap-8'>
                    <div className='w-[435px]'>
                        <div className='w-full bg-white-900 rounded-lg'>
                            <div className='p-6'>
                                <h3 className='font-bold text-lg m-0 mb-8'>
                                    Thông tin buổi trao đổi
                                </h3>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-x-3'>
                                        <Image preview={false} src={images.clock.src} />
                                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                            Thời gian:
                                        </h4>
                                        <p className='text-base font-bold m-0'>1 giờ 15 phút </p>
                                    </div>
                                    <div className='flex items-center gap-x-3'>
                                        <Image preview={false} src={images.anchor.src} />
                                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                            Chủ đề:
                                        </h4>
                                        <p className='text-base font-bold m-0'>Lập trình </p>
                                    </div>
                                    <div className='flex items-center gap-x-3'>
                                        <Image preview={false} src={images.layer.src} />
                                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                            Lớp / Cấp độ:
                                        </h4>
                                        <p className='text-base font-bold m-0'>Đại học </p>
                                    </div>
                                    <div className='flex items-center gap-x-3'>
                                        <Image preview={false} src={images.cardCredit.src} />
                                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                            Thanh toán:
                                        </h4>
                                        <p className='text-base font-bold m-0'>
                                            Tài khoản ngân hàng{' '}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-x-3'>
                                        <Image preview={false} src={images.cardCredit.src} />
                                        <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                            Giá:
                                        </h4>
                                        <p className='text-base font-bold m-0'>130 Xu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='flex flex-col py-8 gap-8'>
                                <div>
                                    <h3 className='text-lg m-0'>
                                        Đây là đường liên kết cuộc họp của bạn
                                    </h3>
                                    <p className='text-sm text-[#838B8F]'>
                                        Sau khi người hướng dẫn đầu tiên đồng ý trao đổi với bạn họ
                                        sẽ nhận được đường link này. Nhớ lưu lại đường link này để
                                        sử dụng sau.
                                    </p>
                                </div>

                                <div className='w-full h-12 border-[1px] border-solid border-[#D9D9D9] rounded-lg bg-white-900'>
                                    <div className='flex items-center justify-between h-full px-4 text-[#838B8F] text-base '>
                                        https://meet.google.com/abc-def-ghi
                                        <CopyToClipboard
                                            text={'https://meet.google.com/abc-def-ghi'}
                                        >
                                            <CopyOutlined />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold'>Người hướng dẫn</h3>
                                    <CardMentorInfo />
                                </div>

                                <ButtonPrimary title='Tham gia' className='h-12' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white-900 p-8 rounded-md text-center flex flex-col gap-8'>
                        <div>
                            <h3 className='font-bold text-lg m-0'>This is title for questions</h3>
                            <p className='text-[16px] leading-6 text-[#838B8F] m-0'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>

                        <div className='flex gap-x-8 justify-between'>
                            <div className='flex flex-col items-center max-w-[402px] bg-white-900 shadow-lg rounded-lg overflow-hidden'>
                                <Image
                                    height={200}
                                    preview={false}
                                    src={images.systemFindings.src}
                                    className='w-full'
                                />
                                <div className='px-4 pb-4'>
                                    <p className='text-lg m-0 w-full py-6'>
                                        Nhờ hệ thống tìm kiếm người hướng dẫn phù hợp
                                    </p>
                                    <ButtonPrimary
                                        title='Hệ thống tìm kiếm'
                                        className='max-w-60'
                                        isRightIcon
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col items-center max-w-[402px] bg-white-900 shadow-lg rounded-lg overflow-hidden'>
                                <Image
                                    preview={false}
                                    src={images.userFindings.src}
                                    className='w-full'
                                    height={200}
                                />
                                <div className='px-4 pb-4'>
                                    <p className='text-lg m-0 w-full py-6'>
                                        Tự tìm kiếm người hướng dẫn theo tiêu chí của mình
                                    </p>
                                    <ButtonPrimary
                                        title='Tự tìm kiếm'
                                        className='max-w-60'
                                        isRightIcon
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
