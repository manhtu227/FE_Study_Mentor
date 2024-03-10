'use client';
'use client';
import { RightOutlined } from '@ant-design/icons';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { Avatar, Divider, Form, Image, Input, Rate } from 'antd';

const mentor = {
    id: 1,
    image: images.feedback,
    name: 'Nguyễn Hưng',
    age: 23,
    rating: 5,
    tags: ['tag1'],
};
const subject = {
    id: 1,
    name: 'Lập trình Javascript',
    level: 'Đại học',
    time: '1 giờ 15 phút',
    price: '130 Xu',
    teacher: mentor,
};
export default function RatingAnswerPage() {
    return (
        <div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[561px]'>
                    <div className='w-full bg-white-900 rounded-lg text-black-800'>
                        <div className='p-8'>
                            <h3 className='font-bold text-lg m-0 mb-8'>Thông tin buổi trao đổi</h3>
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
                                    <p className='text-base font-bold m-0'>Tài khoản ngân hàng </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <Image preview={false} src={images.cardCredit.src} />
                                    <h4 className='text-sm text-[#838B8F] font-thin m-0'>Giá:</h4>
                                    <p className='text-base font-bold m-0'>130 Xu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='flex flex-coltext-lg font-bold text-black-800'>
                            Người hướng dẫn
                        </h3>
                        <CardMentorInfo mentor={mentor} />
                        <ButtonPrimary
                            title='Quay lại đoạn chat'
                            className='w-full pt-3'
                            isRightIcon
                        />
                    </div>
                </div>
                <div className='w-full bg-white-900 rounded-md flex flex-col gap-8 p-8'>
                    <div className='flex flex-col text-left gap-x-4'>
                        <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0'>
                            {subject.name}
                        </h3>
                        <p className='text-[15px] leading-[22.5px] text-primary-800 m-0 font-bold'>
                            Xem chi tiết <RightOutlined />
                        </p>
                        <Divider />
                    </div>

                    <div className='flex flex-col items-center gap-y-4 justify-between'>
                        <div className='w-[100px] h-[100px]'>
                            <Avatar
                                size={100}
                                icon={
                                    <Image
                                        alt={'image of question'}
                                        loading='lazy'
                                        src={subject.teacher.image.src}
                                    />
                                }
                            />
                        </div>
                        <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0'>
                            {subject.teacher.name}
                        </h3>

                        <Rate />

                        <Form.Item
                            name='detail'
                            // rules={[{ required: true, message: 'Please input!' }]}
                            className='w-full text-left'
                        >
                            <div className='font-bold text-base mb-2'>Chi tiết</div>
                            <Input
                                className='h-[150px] font-medium text-base text-gray-700'
                                placeholder='Nhập đánh giá chi tiết'
                            />
                        </Form.Item>
                        <ButtonPrimary
                            title='Gửi đánh giá'
                            className='w-full pt-0 rounded-lg'
                            isRightIcon
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
