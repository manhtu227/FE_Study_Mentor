'use client';

import CameraIcon from '@assets/icons/camera';
import EyeIcon from '@assets/icons/eye';
import UpgradeIcon from '@assets/icons/upgrade';
import ProfileForm from '@components/form/ProfileForm';
import type { GetProp, UploadProps } from 'antd';
import { Button, Upload, message } from 'antd';
import { useState } from 'react';

function ProfilePage() {
    const isVerified = true;
    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleUploadAvatar: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    return (
        <div className='w-full bg-[#F3F9FA]'>
            <div className='pt-[70px] px-[180px] pb-[100px]'>
                <div className='flex gap-8 w-full'>
                    <div className='w-1/3'>
                        <div className='p-8 flex items-start gap-4 bg-white-900 rounded-md mb-8'>
                            <div className='relative'>
                                <div>
                                    {isVerified ? (
                                        <div className='bg-gray-800 uppercase text-white-800 w-max text-sm px-2 py-1 font-semibold absolute top-0 right-0'>
                                            VERIFIED
                                        </div>
                                    ) : (
                                        <div className='bg-gray-800 uppercase text-white-800'>
                                            NO VERIFIED
                                        </div>
                                    )}
                                </div>
                                <div className='w-[100px] h-[100px] rounded-full bg-gray-600 overflow-hidden'>
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt='avatar'
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </div>
                                <Upload
                                    name='avatar'
                                    listType='picture-circle'
                                    className='avatar-uploader !w-10 !h-10 absolute bottom-0 right-0'
                                    showUploadList={false}
                                    action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                                    beforeUpload={beforeUpload}
                                    onChange={handleUploadAvatar}
                                >
                                    <Button className='w-10 h-10 rounded-full bg-primary-600 hover:!bg-primary-600 p-0 flex items-center justify-center'>
                                        <CameraIcon className='h-6 w-6' />
                                    </Button>
                                </Upload>
                            </div>
                            <div>
                                <div className='text-black-800 text-xl mb-2'>
                                    Chào mừng bạn trở lại
                                </div>
                                <div className='text-black-800 font-bold text-[27px] mb-2'>
                                    Sterling
                                </div>
                                {isVerified ? (
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
                                )}
                                <Button className='w-full bg-primary-800 hover:!bg-primary-800 rounded-full text-lg hover:opacity-90 hover:!text-white-900 font-semibold h-12 text-white-900 mt-2'>
                                    <UpgradeIcon className='mr-2' />
                                    Nâng cấp tài khoản
                                </Button>
                            </div>
                        </div>

                        <div className='p-8 flex flex-col items-start gap-4 bg-white-900 rounded-md'>
                            <div className='font-semibold text-xl text-black-800'>
                                Độ uy tín của bạn
                            </div>
                            <div className='text-md'>
                                Mỗi lượt đánh giá 5 sao sẽ tăng độ uy tín của bạn. Bạn sẽ được ứng
                                viên tìm đến nhiều hơn.
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='rounded-full bg-primary-600 flex flex-col h-[120px] min-w-[120px] items-center justify-center'>
                                    <span className='font-bold text-white-800 text-[48px]'>32</span>
                                    <span className='text-white-800 font-bold text-xs'>
                                        Lượt đánh giá
                                    </span>
                                </div>
                                <div className='text-md'>
                                    Hãy tích cực và nhiệt tình trao đổi, hướng dẫn cho học sinh của
                                    bạn nhé. Nhận được đánh giá tốt là một cách tiếp cận và nân cao
                                    độ uy tín của bản thân nhé!
                                </div>
                            </div>
                            <Button className='w-full h-12 border-[2px] border-primary-800 text-2xl font-semibold gap-2 flex items-center justify-center text-primary-800'>
                                Xem nhận xét <EyeIcon />
                            </Button>
                        </div>
                    </div>
                    <div className='w-2/3 p-8 bg-white-900'>
                        <ProfileForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
