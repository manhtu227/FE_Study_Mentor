'use client';
'use client';
import { RightOutlined } from '@ant-design/icons';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CardInfoExchange } from '@components/card/CardInfoExchange';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { USER_ID } from '@core/constants/commons.constant';
import { MentorType } from '@core/models/profile.model';
import { RatingInput, RatingReq } from '@core/models/question.model';
import {
    getInfoDiscussApi,
    infoDiscusKeys,
    updateRatingApi,
} from '@core/services/questions.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Divider, Form, Image, Input, message, Rate, Spin } from 'antd';

const mentor: MentorType = {
    id: '1',
    image: images.feedback.src,
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
    const [form] = Form.useForm<RatingInput>();

    const mutateCreate = useMutation({
        mutationFn: (data: RatingReq) => updateRatingApi(data, USER_ID),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
        },
    });

    const infoDiscussQuery = useQuery({
        queryKey: infoDiscusKeys.all,
        queryFn: () =>
            getInfoDiscussApi({
                questionId: '65974321-27ff-47f1-8513-8696930c76f5',
            }),
        select: (resp) => resp.data.data[0],
    });

    const handleFinish = (values: RatingInput) => {
        mutateCreate.mutate({
            ...values,
            tutorId: '8d116df8-29f3-40d2-b3c0-9b554c78f59e',
            answerId: '4d6350fd-5f44-4b52-8ac7-3d03be8e63c4',
        });
    };

    return (
        <Spin spinning={mutateCreate.isPending} size='large'>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[561px]'>
                    <CardInfoExchange data={infoDiscussQuery.data} />
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
                                        src={subject.teacher.image || ''}
                                    />
                                }
                            />
                        </div>
                        <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0'>
                            {subject.teacher.name}
                        </h3>

                        <Form
                            name='rating'
                            form={form}
                            onFinish={handleFinish}
                            autoComplete='off'
                            className='w-full'
                        >
                            <Form.Item<RatingInput>
                                name='starNumber'
                                rules={[{ required: true, message: 'please rating' }]}
                                className='flex  justify-center'
                            >
                                <Rate />
                            </Form.Item>
                            <div className='font-bold text-base mb-2'>Chi tiết</div>
                            <Form.Item<RatingInput>
                                name='comment'
                                rules={[{ required: true, message: 'Please input!' }]}
                                className='w-full text-left'
                            >
                                <Input
                                    className='h-[150px] font-medium text-base text-gray-700'
                                    placeholder='Nhập đánh giá chi tiết'
                                />
                            </Form.Item>
                            <ButtonPrimary
                                title='Gửi đánh giá'
                                htmlType='submit'
                                className='w-full pt-0 rounded-lg'
                                isRightIcon
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </Spin>
    );
}
