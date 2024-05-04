'use client';

import EyeIcon from '@assets/icons/eye';
import CustomUploadAvatarInput from '@components/form-input/CustomUploadAvatarInput';
import { DEFAULT_USER_NAME } from '@core/constants/commons.constant';
import { api } from '@core/https/http';
import { SignedUrlResp } from '@core/models/profile.model';
import {
    educationInfoKeys,
    getEducationInfoApi,
    getSignedUrlApi,
    getUserDetailApi,
    updateAvatarApi,
    userDetailKeys,
} from '@core/services/user.service';
import { RootState } from '@core/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Spin, Switch, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileForm } from './components/ProfileForm';

function ProfilePage() {
    const [form] = Form.useForm();
    const [isUpdatePersonalInfo, setIsUpdatePersonalInfo] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<any>();
    const [avatarObject, setAvatarObject] = useState<SignedUrlResp>();
    const user = useSelector((state: RootState) => state.authentication)?.user ?? '';

    const personalInfoQuery = useQuery({
        queryKey: userDetailKeys.list({ id: user?.id, isUpdatePersonalInfo }),
        queryFn: () => getUserDetailApi(user?.id),
        select: (resp) => resp.data.data,
    });

    const educationInfoQuery = useQuery({
        queryKey: educationInfoKeys.list({ id: user?.id }),
        queryFn: () => getEducationInfoApi(user?.id),
        select: (resp) => resp.data.data,
    });

    const [isActive, setIsActive] = useState<boolean>(personalInfoQuery.data?.isActive ?? false);

    const mutateUpdate = useMutation({
        mutationFn: (data: any) => updateAvatarApi(data, user?.id),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
        },
    });

    const mutateSignUrl = useMutation({
        mutationFn: (fileName: string) => getSignedUrlApi(fileName),
        onSuccess: () => {},
    });

    const handleSubmitAvatar = (values: any) => {
        console.log(values);

        const reader = new FileReader();
        reader.onload = (e) => {
            values.avatar.file.base64 = e?.target?.result;
            setAvatar(values.avatar.file.base64);
        };
        reader.readAsDataURL(values.avatar.file.originFileObj);
        console.log(values.avatar.file.base64);

        const dataObject = mutateSignUrl.mutate(values.avatar.file.name);
        setAvatar(values.avatar.file.base64);
        // mutateUpdate.mutate(values);
    };

    console.log(avatar);

    useEffect(() => {
        if (mutateSignUrl.data) {
            const url = mutateSignUrl.data.data?.data?.url;
            console.log(avatar);

            api.put(url, avatar, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }).then((res) => {
                console.log(res);
            });
        }
    }, [mutateSignUrl.data]);

    useEffect(() => {
        if (personalInfoQuery.data?.isActive) setIsActive(personalInfoQuery.data.isActive);
    }, [personalInfoQuery.data?.isActive]);

    return (
        <Spin spinning={personalInfoQuery.isFetching || educationInfoQuery.isFetching} size='large'>
            <div className='w-full bg-[#F3F9FA]'>
                <div className='px-[180px] pb-[100px]'>
                    <div className='flex gap-8 w-full'>
                        <div className='w-1/3'>
                            <div className='flex p-8 flex-col bg-white-900 mb-8 rounded-md'>
                                <div className=' flex items-start gap-4'>
                                    <Form name='avatar' onFinish={handleSubmitAvatar} form={form}>
                                        <CustomUploadAvatarInput
                                            image={undefined}
                                            name='avatar'
                                            onChange={() => {
                                                form.submit();
                                            }}
                                        />
                                    </Form>

                                    <div>
                                        <div className='text-black-800 text-xl mb-2'>
                                            Chào mừng bạn trở lại
                                        </div>
                                        <div className='text-black-800 font-bold text-[27px] mb-2'>
                                            {personalInfoQuery.data?.fullName ?? DEFAULT_USER_NAME}
                                        </div>
                                        <Button className='bg-gray-700 rounded-md text-white-900 text-md hover:opacity-90 hover:!text-white-900 hover:!bg-gray-700'>
                                            Tài khoản đã xác thực
                                        </Button>
                                        {/* {isVerified ? (
                                    <Button className='bg-gray-700 rounded-md text-white-900 text-md hover:opacity-90 hover:!text-white-900 hover:!bg-gray-700'>
                                        Tài khoản đã xác thực
                                    </Button>
                                ) : (
                                    <Button
                                        className='hover:!bg-gray-700 bg-gray-700 rounded-md text-black-800 text-md'
                                        disabled
                                    >
                                        Tài khoản chưa xác thực
                                    </Button>
                                )} */}
                                        {/* <Button className='w-full bg-primary-800 hover:!bg-primary-800 rounded-full text-lg hover:opacity-90 hover:!text-white-900 font-semibold h-12 text-white-900 mt-2'>
                                            <UpgradeIcon className='mr-2' />
                                            Nâng cấp tài khoản
                                        </Button> */}
                                    </div>
                                </div>
                                <div className='w-full border-solid border-[1px] border-gray-200 border-r-0 border-l-0 border-b-0 mt-8 pt-8'>
                                    <div className='flex items-center gap-4'>
                                        <Switch
                                            defaultChecked
                                            onChange={() => setIsActive(!isActive)}
                                            value={isActive}
                                        />
                                        <div
                                            className={`text-gray-800 font-bold text-lg ${
                                                isActive ? 'text-blue-800' : ''
                                            }`}
                                        >
                                            Đang {isActive ? 'bật' : 'tắt'} trạng thái hoạt động
                                        </div>
                                    </div>
                                    <div className='text-gray-700 font-light text-sm mt-4'>
                                        Bật trạng thái hoạt động cho phép các ứng viên tìm đến bạn
                                        trong thời gian bạn đang sử dụng website.
                                    </div>
                                </div>
                            </div>

                            <div className='p-8 flex flex-col items-start gap-4 bg-white-900 rounded-md'>
                                <div className='font-semibold text-xl text-black-800'>
                                    Độ uy tín của bạn
                                </div>
                                <div className='text-md'>
                                    Mỗi lượt đánh giá 5 sao sẽ tăng độ uy tín của bạn. Bạn sẽ được
                                    ứng viên tìm đến nhiều hơn.
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='rounded-full bg-primary-600 flex flex-col h-[120px] min-w-[120px] items-center justify-center'>
                                        <span className='font-bold text-white-800 text-[48px]'>
                                            {personalInfoQuery.data?.averageRate ?? 0}
                                        </span>
                                        <span className='text-white-800 font-bold text-xs'>
                                            Sao
                                        </span>
                                    </div>
                                    <div className='text-md'>
                                        Hãy tích cực và nhiệt tình trao đổi, hướng dẫn cho học sinh
                                        của bạn nhé. Nhận được đánh giá tốt là một cách tiếp cận và
                                        nân cao độ uy tín của bản thân nhé!
                                    </div>
                                </div>
                                <Button className='w-full h-12 border-[2px] border-primary-800 text-2xl font-semibold gap-2 flex items-center justify-center text-primary-800'>
                                    Xem nhận xét <EyeIcon />
                                </Button>
                            </div>
                        </div>
                        <ProfileForm
                            personalData={personalInfoQuery.data}
                            educationData={educationInfoQuery.data}
                            onUpdatePersonalInfo={() =>
                                setIsUpdatePersonalInfo(!isUpdatePersonalInfo)
                            }
                        />
                    </div>
                </div>
            </div>
        </Spin>
    );
}

export default ProfilePage;
