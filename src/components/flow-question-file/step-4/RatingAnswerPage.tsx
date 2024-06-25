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
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Divider, Form, Image, Rate, Spin } from 'antd';
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
            toastSuccess('Đánh giá thành công');
            router.push(MY_ROUTE.HOME);
        },
        onError: handleError,
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
                button={
                    <ButtonPrimary
                        title='Báo cáo'
                        className='w-full bg-red-600 hover:!bg-red-500'
                    />
                }
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
                                    message: 'Vui lòng nhập giá trị',
                                },
                            ]}
                            classNameForm='w-full !mb-6'
                            className='w-full text-left'
                        />

                        <ButtonPrimary
                            title='Gửi đánh giá'
                            htmlType='submit'
                            className='!w-fit mx-auto rounded-lg'
                            isRightIcon
                        />
                    </Form>
                </div>
            </SideBarMentor>
        </Spin>
    );
}
