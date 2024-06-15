'use client';
'use client';
import { RightOutlined } from '@ant-design/icons';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CustomTextAreaInput } from '@components/form-input/CustomTextAreaInput';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { RatingInput, RatingReq } from '@core/models/question.model';
import {
    createRatingApi,
    detailedQuestionKeys,
    getDetailedQuestionApi,
} from '@core/services/questions.service';
import { RootState } from '@core/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Divider, Form, Image, Rate, Spin, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { SideBarMentor } from '../SideBarMentor';

const subject = {
    id: 1,
    name: 'Lập trình Javascript',
    level: 'Đại học',
    time: '1 giờ 15 phút',
    price: '130 Xu',
};

export default function RatingAnswerPage() {
    const [form] = Form.useForm<RatingInput>();
    const questions = useSelector((state: RootState) => state.questions);
    const router = useRouter();

    const mutateCreate = useMutation({
        // mutationFn: (data: RatingReq) => updateRatingApi(data, user?.id),
        mutationFn: (data: RatingReq) => createRatingApi(data, questions.currentQuestionId),
        onSuccess: () => {
            message.success('Đánh giá thành công');
            router.push(MY_ROUTE.HOME);
        },
        onError: (error: any) => {
            message.error(`Đã xảy ra lỗi: ${error.message || 'Vui lòng thử lại.'}`);
        },
    });

    const query = useQuery({
        queryKey: detailedQuestionKeys.list({ currentQuestionId: questions.currentQuestionId }),
        queryFn: () => getDetailedQuestionApi(questions.currentQuestionId),
        select: (data) => data?.data.data,
    });

    const handleFinish = (values: RatingInput) => {
        mutateCreate.mutate({
            ...values,
            tutorId: query.data?.tutor?.id || '',
            // answerId: '4d6350fd-5f44-4b52-8ac7-3d03be8e63c4',
        });
    };

    return (
        <Spin spinning={mutateCreate.isPending} size='large'>
            <SideBarMentor
                className='p-8'
                button={<ButtonPrimary title='Quay lại đoạn chat' className='w-full' isRightIcon />}
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
                                    src={
                                        query.data?.tutor?.avatar?.fileKey
                                            ? `${process.env.NEXT_PUBLIC_PHOTO}${query.data.tutor.avatar.fileKey}`
                                            : images.teacher.src
                                    }
                                />
                            }
                        />
                    </div>
                    <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0'>
                        {query.data?.tutor?.fullName || 'Không tên'}
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
                        <CustomTextAreaInput<RatingInput>
                            fileUpload={false}
                            name='comment'
                            placeholder='Nhập đánh giá chi tiết'
                            rows={8}
                            isActive={false}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your comment about this question',
                                },
                            ]}
                            classNameForm='w-full !mb-6'
                            className='w-full text-left'
                        />
                        {/* <Form.Item<RatingInput>
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
                        </Form.Item> */}
                        <ButtonPrimary
                            title='Gửi đánh giá'
                            htmlType='submit'
                            className='w-full  rounded-lg'
                            isRightIcon
                        />
                    </Form>
                </div>
            </SideBarMentor>
        </Spin>
    );
}
