'use client';
'use client';
import { RightOutlined } from '@ant-design/icons';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { MentorType } from '@core/models/profile.model';
import { RatingInput, RatingReq } from '@core/models/question.model';
import {
    createRatingApi,
    getInfoDiscussApi,
    infoDiscusKeys,
} from '@core/services/questions.service';
import { RootState } from '@core/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Divider, Form, Image, Input, Rate, Spin, message } from 'antd';
import { useSelector } from 'react-redux';
import { SideBarMentor } from '../SideBarMentor';

const mentor: MentorType = {
    id: '1',
    image: images.feedback.src,
    name: 'Nguyễn Hưng',
    age: 23,
    rating: 5,
    // tags: ['tag1'],
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
    const user = useSelector((state: RootState) => state.authentication)?.user ?? '';

    const mutateCreate = useMutation({
        // mutationFn: (data: RatingReq) => updateRatingApi(data, user?.id),
        mutationFn: (data: RatingReq) =>
            createRatingApi(data, '65974321-27ff-47f1-8513-8696930c76f5'),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
        },
        onError: (error: any) => {
            message.error(`Đã xảy ra lỗi: ${error.message || 'Vui lòng thử lại.'}`);
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
            // answerId: '4d6350fd-5f44-4b52-8ac7-3d03be8e63c4',
        });
    };

    return (
        <Spin spinning={mutateCreate.isPending} size='large'>
            <SideBarMentor
                className='p-8'
                button={<ButtonPrimary title='Quay lại đoạn chat' className='w-full' isRightIcon />}
                mentor={mentor}
            >
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
                            name='numberOfStar'
                            rules={[{ required: true, message: 'Please rating' }]}
                            className='flex  justify-center'
                        >
                            <Rate />
                        </Form.Item>
                        <div className='font-bold text-base mb-2'>Chi tiết</div>
                        <Form.Item<RatingInput>
                            name='comment'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your comment about this question',
                                },
                            ]}
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
            </SideBarMentor>
        </Spin>
    );
}
