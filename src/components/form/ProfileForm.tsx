'use client';

import UploadIconIcon from '@assets/icons/upload';
import {
    CertificatesInformationInput,
    EducationInformationInput,
    PersonalInformationInput,
} from '@core/models/profile.model';
import type { UploadProps } from 'antd';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { useRef } from 'react';

function ProfileForm() {
    const [personalInformationForm] = Form.useForm<PersonalInformationInput>();
    const [educationInformationForm] = Form.useForm<EducationInformationInput>();
    const [certificatesInformationForm] = Form.useForm<CertificatesInformationInput>();
    const refEditor = useRef<any>(null);
    const refFile = useRef<any>(null);
    const { Dragger } = Upload;
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        listType: 'text',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmitPersonalInformationForm = (values: PersonalInformationInput) => {
        console.log(values);
    };

    const handleSubmitEducationInformationForm = (values: EducationInformationInput) => {
        console.log(values);
    };

    const handleSubmitCertificatesInformationForm = (values: CertificatesInformationInput) => {
        if (refFile.current) {
            values.certificatesContent = refFile.current.fileList;
        }

        console.log(values);
    };

    return (
        <div className='w-full'>
            {/* Personal information */}
            <div className='w-full mb-8'>
                <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                    <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                    Thông tin cá nhân
                </div>
                <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
                <Form
                    name='personalInformationForm'
                    form={personalInformationForm}
                    onFinish={handleSubmitPersonalInformationForm}
                    //cancel

                    autoComplete='off'
                >
                    {/* Full name */}
                    <Form.Item
                        name='fullName'
                        // rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <div className='font-bold text-base mb-2'>Họ và tên</div>
                        <Input
                            className='h-12 font-medium text-base text-gray-700'
                            placeholder='Nhập họ và tên'
                            onChange={(e) =>
                                personalInformationForm.setFieldsValue({ fullName: e.target.value })
                            }
                        />
                    </Form.Item>

                    <div className='flex items-center gap-8 w-full'>
                        {/* Phone number */}
                        <Form.Item
                            name='phoneNumber'
                            className='w-1/2'
                            // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <div className='font-bold text-base mb-2'>Số điện thoại</div>
                            <Input
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Nhập số điện thoại'
                                onChange={(e) =>
                                    personalInformationForm.setFieldsValue({
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item
                            name='email'
                            className='w-1/2'
                            // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <div className='font-bold text-base mb-2'>Email</div>
                            <Input
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Nhập email'
                                onChange={(e) =>
                                    personalInformationForm.setFieldsValue({
                                        email: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </div>

                    <div className='flex items-center gap-8 w-full'>
                        {/* Year of Birth */}
                        <Form.Item
                            name='yearOfBirth'
                            className='w-1/2'
                            // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <div className='font-bold text-base mb-2'>Năm sinh</div>
                            <Input
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Nhập năm sinh'
                                onChange={(e) =>
                                    personalInformationForm.setFieldsValue({
                                        dateOfBirth: +e.target.value,
                                    })
                                }
                            />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item
                            name='gender'
                            className='w-1/2'
                            // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <div className='font-bold text-base mb-2'>Giới tính</div>
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn giới tính'
                                onChange={(e) =>
                                    personalInformationForm.setFieldsValue({ gender: e })
                                }
                                options={[
                                    { value: 1, label: 'Male' },
                                    { value: 2, label: 'Female' },
                                    { value: 3, label: 'Other' },
                                ]}
                            />
                        </Form.Item>
                    </div>

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
                </Form>
            </div>

            {/* Educational information of interest */}
            <div className='w-full mb-8'>
                <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                    <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                    Thông tin giáo dục quan tâm
                </div>
                <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
                <Form
                    name='educationInformationForm'
                    form={educationInformationForm}
                    onFinish={handleSubmitEducationInformationForm}
                    //cancel

                    autoComplete='off'
                >
                    {/* Subjects */}
                    <Form.Item
                        name='subjects'
                        // rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <div className='font-bold text-base mb-2'>Môn/ Kỹ năng</div>
                        <Select
                            mode='tags'
                            className='h-12 font-medium text-base text-gray-700'
                            placeholder='Nhập môn/ kỹ năng quan tâm'
                            onChange={(e) => educationInformationForm.setFieldsValue({ skill: e })}
                        />
                    </Form.Item>

                    <div className='flex items-center gap-8 w-full'>
                        {/* School level */}
                        <Form.Item
                            name='schoolLevel'
                            className='w-1/2'
                            // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <div className='font-bold text-base mb-2'>Cấp học</div>
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn cấp học'
                                onChange={(e) =>
                                    educationInformationForm.setFieldsValue({ levelId: e })
                                }
                                options={[
                                    { value: 1, label: 'Cấp 1' },
                                    { value: 2, label: 'Cấp 2' },
                                    { value: 3, label: 'Cấp 3' },
                                ]}
                            />
                        </Form.Item>

                        {/* Class */}
                        <Form.Item
                            name='class'
                            className='w-1/2'
                            // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <div className='font-bold text-base mb-2'>Lớp</div>
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn lớp'
                                onChange={(e) =>
                                    educationInformationForm.setFieldsValue({ gradeId: e })
                                }
                                options={[
                                    { value: 1, label: '1' },
                                    { value: 2, label: '2' },
                                    { value: 3, label: '3' },
                                    { value: 4, label: '4' },
                                    { value: 5, label: '5' },
                                ]}
                            />
                        </Form.Item>
                    </div>

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
                </Form>
            </div>

            {/* Certificates information of interest */}
            <div className='w-full'>
                <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                    <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                    Chứng chỉ
                </div>
                <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
                <Form
                    name='certificatesInformationForm'
                    form={certificatesInformationForm}
                    onFinish={handleSubmitCertificatesInformationForm}
                    //cancel

                    autoComplete='off'
                >
                    <Form.Item name='certificatesContent'>
                        <Dragger {...props} ref={refFile}>
                            <p className='ant-upload-drag-icon'>
                                <UploadIconIcon />
                            </p>
                            <p className='font-bold text-base text-gray-700'>
                                Tải lên hoặc thả tệp tại đây
                            </p>
                        </Dragger>
                    </Form.Item>
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
                </Form>
            </div>
        </div>
    );
}

export default ProfileForm;
