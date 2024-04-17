import { USER_ID } from '@core/constants/commons.constant';
import { PersonalInformationInput, UserResp } from '@core/models/profile.model';
import { updateProfileSectionApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Button, DatePicker, Form, Input, Select, Spin, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function PersonalInfoSection({ data }: { data?: UserResp }) {
    const [form] = Form.useForm<PersonalInformationInput>();
    const [initialDataForm, setInitialDataForm] = useState<PersonalInformationInput>();

    const mutateUpdate = useMutation({
        mutationFn: (data: PersonalInformationInput) => updateProfileSectionApi(data, USER_ID),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
            setIsEdit(false);
        },
    });

    const handleSubmitPersonalInformationForm = (values: PersonalInformationInput) => {
        mutateUpdate.mutate(values);
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                dateOfBirth: dayjs(data.dateOfBirth),
                gender: data.gender,
            });
        }
    }, [data]);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleCancelUpdate = () => {
        setIsEdit(false);
        if (initialDataForm) {
            form.setFieldsValue(initialDataForm);
        }
    };

    return (
        <Spin spinning={mutateUpdate.isPending} size='large'>
            <div className='w-full mb-8'>
                <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                    <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                    Thông tin cá nhân
                </div>
                <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
                <Form
                    name='personalInformationForm'
                    form={form}
                    onFinish={handleSubmitPersonalInformationForm}
                    autoComplete='off'
                    disabled={!isEdit}
                >
                    {/* Full name */}
                    <div className='font-bold text-base mb-2'>Họ và tên</div>
                    <Form.Item<PersonalInformationInput>
                        name='fullName'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input
                            className='h-12 font-medium text-base'
                            placeholder='Nhập họ và tên'
                        />
                    </Form.Item>

                    <div className='flex items-center gap-8 w-full'>
                        {/* Phone number */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Số điện thoại</div>
                            <Form.Item<PersonalInformationInput>
                                name='phone'
                                rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <Input
                                    className='h-12 font-medium text-base'
                                    placeholder='Nhập số điện thoại'
                                />
                            </Form.Item>
                        </div>

                        {/* Email */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Email</div>
                            <Form.Item<PersonalInformationInput>
                                name='email'
                                rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <Input
                                    className='h-12 font-medium text-base'
                                    placeholder='Nhập email'
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className='flex items-center gap-8 w-full'>
                        {/* Year of Birth */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Năm sinh</div>
                            <Form.Item<PersonalInformationInput>
                                name='dateOfBirth'
                                rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <DatePicker
                                    className='h-12 font-medium text-base w-full'
                                    placeholder='Nhập năm sinh'
                                    picker='year'
                                />
                            </Form.Item>
                        </div>

                        {/* Email */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Giới tính</div>
                            <Form.Item<PersonalInformationInput>
                                name='gender'
                                rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <Select
                                    className='h-12 font-medium text-base'
                                    placeholder='Chọn giới tính'
                                    onChange={(e) => form.setFieldsValue({ gender: e })}
                                    options={[
                                        { value: 1, label: 'Male' },
                                        { value: 2, label: 'Female' },
                                        { value: 3, label: 'Other' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        {isEdit && (
                            <Button
                                size='large'
                                className='!h-12 !w-[200px] font-bold text-base bg-gray-300'
                                onClick={handleCancelUpdate}
                            >
                                Hủy
                            </Button>
                        )}
                        {isEdit && (
                            <Form.Item colon={false}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    size='large'
                                    className='!h-12 !w-[200px] font-bold text-base bg-primary-800'
                                >
                                    Lưu
                                </Button>
                            </Form.Item>
                        )}
                    </div>
                </Form>
                {!isEdit && (
                    <Button
                        size='large'
                        type='primary'
                        className='!h-12 !w-[200px] font-bold text-base'
                        onClick={() => setIsEdit(true)}
                    >
                        Cập nhật
                    </Button>
                )}
            </div>
        </Spin>
    );
}
