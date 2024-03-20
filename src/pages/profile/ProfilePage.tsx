'use client';

import { RightOutlined } from '@ant-design/icons';
import EyeIcon from '@assets/icons/eye';
import UpgradeIcon from '@assets/icons/upgrade';
import CustomUploadAvatarInput from '@components/form-input/CustomUploadAvatarInput';
import { Breadcrumb, Button } from 'antd';
import { ProfileForm } from './components/ProfileForm';

function ProfilePage() {
    const breadcrumbList = [
        {
            title: 'Home',
            href: '/',
            className: 'font-bold text-sm !text-primary-800',
        },
        {
            title: 'Dành cho người hướng dẫn',
            href: '',
            className: 'font-bold text-sm !text-primary-800',
        },
        {
            title: 'Trang cá nhân',
            href: '/profile',
            className: 'font-bold text-sm !text-black',
        },
    ];

    return (
        <div className='w-full bg-[#F3F9FA]'>
            <div className='px-[180px] pb-[100px]'>
                <div className='py-6'>
                    <Breadcrumb separator={<RightOutlined />} items={breadcrumbList} />
                </div>
                <div className='flex gap-8 w-full'>
                    <div className='w-1/3'>
                        <div className='p-8 flex items-start gap-4 bg-white-900 rounded-md mb-8'>
                            <CustomUploadAvatarInput />
                            <div>
                                <div className='text-black-800 text-xl mb-2'>
                                    Chào mừng bạn trở lại
                                </div>
                                <div className='text-black-800 font-bold text-[27px] mb-2'>
                                    Sterling
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
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
