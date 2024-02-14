import images from '@assets/images';
import MethodItem from '@components/study-method/StudyMethod';
import { Button, Avatar, Image, Tag } from 'antd';
import { CopyOutlined, MoreOutlined, StarFilled, RightOutlined } from '@ant-design/icons';
export default function FindMentor() {
    return (
        <div className='relative fill-[#838B8F]'>
            <img src={images.frame.src} className='w-full' />
            <div className='absolute top-[64px] right-0 left-0'>
                <div className='flex items-start w-full justify-center gap-16'>
                    <div className='w-[435px] h-[875px] flex flex-col gap-y-8'>
                        <div className='w-full h-[306px] bg-white p-4 rounded-md'>
                            <h3 className='font-bold text-[18px] leading-[27px] mt-2'>
                                Thông tin buổi trao đổi
                            </h3>
                            <div className='gap-y-4'>
                                <div className='flex items-center gap-x-3'>
                                    <img src={images.clock.src} className='w-6 h-6' />
                                    <h4 className='text-sm text-[#838B8F] font-thin'>Thời gian:</h4>
                                    <p className='text-base font-bold'>1 giờ 15 phút </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <img src={images.anchor.src} className='w-6 h-6' />
                                    <h4 className='text-sm text-[#838B8F] font-thin'>Chủ đề:</h4>
                                    <p className='text-base font-bold'>Lập trình </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <img src={images.layer.src} className='w-6 h-6' />
                                    <h4 className='text-sm text-[#838B8F] font-thin'>
                                        Lớp / Cấp độ:
                                    </h4>
                                    <p className='text-base font-bold'>Đại học </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <img src={images.cardCredit.src} className='w-6 h-6' />
                                    <h4 className='text-sm text-[#838B8F] font-thin'>
                                        Thanh toán:
                                    </h4>
                                    <p className='text-base font-bold'>Tài khoản ngân hàng </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <img src={images.cardCredit.src} className='w-6 h-6' />
                                    <h4 className='text-sm text-[#838B8F] font-thin'>Giá:</h4>
                                    <p className='text-base font-bold'>130 Xu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[901px] flex flex-col items-center text-center '>
                        <div className='w-full h-[533px] bg-white p-2 rounded-md border-2 border-red'>
                            <h3 className='font-bold text-[18px] leading-[27px] mt-2'>
                                This is title for questions
                            </h3>
                            <p className='text-[16px] leading-[24px] text-[#838B8F]'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            <div className='flex gap-x-8 justify-around'>
                                <div className='flex flex-col items-center gap-4 w-[402.5px] h-[386px] bg-white shadow-lg rounded-lg'>
                                    <img
                                        src={images.systemFindings.src}
                                        className='w-[402.5px] h-[200px]'
                                    />
                                    <h3 className='text-[18px] leading-[27px]'>
                                        Nhờ hệ thống tìm kiếm người hướng dẫn phù hợp
                                    </h3>
                                    <Button className='flex items-center justify-around w-[250px] rounded-b-lg h-[52px] bg-[#3D64EE] text-white font-bold p-1 px-10 gap-4'>
                                        Hệ thống tìm kiếm
                                        <span className='text-[14px] text-white '>
                                            <RightOutlined />
                                        </span>
                                    </Button>
                                </div>
                                <div className='flex flex-col items-center gap-4 w-[402.5px] h-[386px] bg-white shadow-lg rounded-lg'>
                                    <img
                                        src={images.userFindings.src}
                                        className='w-[402.5px] h-[200px]'
                                    />
                                    <h3 className='text-[18px] leading-[27px]'>
                                        Tự tìm kiếm người hướng dẫn theo tiêu chí của mình
                                    </h3>
                                    <Button className='flex items-center justify-around w-[250px] rounded-b-lg h-[52px] bg-[#3D64EE] text-white font-bold p-1 px-10 gap-4'>
                                        Tự tìm kiếm
                                        <span className='text-[14px] text-white '>
                                            <RightOutlined />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[435px] h-[875px] flex flex-col gap-y-2 mt-28 ml-[66px]'>
                <h3 className='text-[18px] leading-[27px]'>
                    Đây là đường liên kết cuộc họp của bạn
                </h3>
                <p className='text-sm text-[#838B8F]'>
                    Sau khi người hướng dẫn đầu tiên đồng ý trao đổi với bạn họ sẽ nhận được đường
                    link này. Nhớ lưu lại đường link này để sử dụng sau.
                </p>
                <input
                    type='text'
                    className='w-full h-12 border-2 border-[#E0E0E0] rounded-md px-5 bg-white'
                    placeholder='https://meet.google.com/pjh-figq-dsz'
                />
                <h3 className='text-[18px] leading-[27px] font-bold'>Người hướng dẫn</h3>
                <div className='w-[435px] h-[132px] border-solid bg-white px-5 border-[2px] rounded-lg border-[#D9D9D9]'>
                    <div className='p-3'>
                        <div className='flex items-start gap-2 mt-1'>
                            <img src={images.charac1.src} className='w-[100px] h-[100px] rounded' />
                            <div className='flex flex-col'>
                                <div className='flex w-[370px]'>
                                    <span className='text-[18px] leading-[27px] font-bold items-start'>
                                        Nguyễn Hưng
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-bold text-[#838B8F] ml-[140px] mt-1'>
                                        | Tuổi 23
                                    </span>
                                </div>

                                <div className='flex items-center gap-1'>
                                    <StarFilled className='text-[#f2c94c]' />
                                    <StarFilled className='text-[#f2c94c]' />
                                    <StarFilled className='text-[#f2c94c]' />
                                    <StarFilled className='text-[#f2c94c]' />
                                    <StarFilled className='text-[#f2c94c]' />
                                </div>
                                <div>
                                    <Tag className='p-2 bg-white rounded-md items-center text-[14px] leading-[21px] mt-4 w-[81px]'>
                                        This is tag
                                    </Tag>
                                    <MoreOutlined className='ml-[204px]' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className='w-[480px] rounded-b-lg h-[40px] bg-[#3D64EE] text-white font-bold p-1 px-10'>
                    Xem câu hỏi
                </Button>
            </div>
        </div>
    );
}
