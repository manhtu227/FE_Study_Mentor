'use client';

import CustomUploadAvatarInput from '@components/form-input/CustomUploadAvatarInput';
import BankAccountForm from '@components/form/BankAccountForm';
import Prestige from '@components/profile/prestige/Prestige';
import { DEFAULT_USER_NAME } from '@core/constants/commons.constant';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import { FileReq } from '@core/models/file.model';
import {
    educationInfoKeys,
    getEducationInfoApi,
    getUserDetailApi,
    updateAvatarApi,
    userDetailKeys,
} from '@core/services/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Spin, Switch, message } from 'antd';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ProfileForm } from './components/ProfileForm';

function ProfilePage() {
    const [form] = Form.useForm();
    const [isUpdatePersonalInfo, setIsUpdatePersonalInfo] = useState<boolean>(false);
    const { data } = useSession();
    const file = useUploadFileApi();
    const [avatar, setAvatar] = useState<FileReq>();

    const personalInfoQuery = useQuery({
        queryKey: userDetailKeys.list({ id: data?.user?.user?.id, isUpdatePersonalInfo }),
        queryFn: () => getUserDetailApi(),
        select: (resp) => resp.data.data,
    });

    const educationInfoQuery = useQuery({
        queryKey: educationInfoKeys.list({ id: data?.user?.user?.id }),
        queryFn: () => getEducationInfoApi(),
        select: (resp) => resp.data.data,
    });

    const [isActive, setIsActive] = useState<boolean>(personalInfoQuery.data?.isActive ?? false);

    const mutateUpdate = useMutation({
        mutationFn: (data: any) => updateAvatarApi(data),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
        },
    });

    const handleSubmitAvatar = async (values: any) => {
        const attachFiles = file && (await file.uploadFile(values?.avatar?.file));

        mutateUpdate.mutate(attachFiles);
    };

    useEffect(() => {
        if (mutateUpdate?.data?.data) setAvatar(mutateUpdate?.data?.data?.avatar);
    }, [mutateUpdate?.data?.data]);

    useEffect(() => {
        if (personalInfoQuery.data?.isActive) setIsActive(personalInfoQuery.data.isActive);

        if (personalInfoQuery.data?.avatar?.fileKey) setAvatar(personalInfoQuery.data?.avatar);
    }, [personalInfoQuery.data]);

    return (
        <Spin spinning={personalInfoQuery.isFetching || educationInfoQuery.isFetching} size='large'>
            <div className='w-full bg-[#F3F9FA] pt-4'>
                <div className='px-[180px] pb-[100px]'>
                    <div className='flex gap-8 w-full'>
                        <div className='w-1/3'>
                            <div className='flex p-8 flex-col bg-white-900 mb-8 rounded-md'>
                                <div className=' flex items-start gap-4'>
                                    <Form name='avatar' onFinish={handleSubmitAvatar} form={form}>
                                        <CustomUploadAvatarInput
                                            image={avatar}
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
                            <BankAccountForm />
                            <Prestige averageRate={personalInfoQuery.data?.averageRate ?? 0} />
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
