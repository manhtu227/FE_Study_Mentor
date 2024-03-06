import UpgradeIcon from '@assets/icons/upgrade';
import ButtonPrimary from '@components/button/ButtonPrimary';
import CustomUploadAvatarInput from '@components/form-input/CustomUploadAvatarInput';
import { Divider, GetProp, Switch, UploadProps, message } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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

export function CardAccount() {
    return (
        <div className='w-full'>
            <div className='flex flex-col p-8 bg-white-900 rounded-md'>
                <div className='flex items-start gap-4'>
                    <CustomUploadAvatarInput />
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='text-black-800 text-base'>Chào mừng bạn trở lại</div>
                        <div className='text-black-800 font-bold text-lg'>Sterling</div>

                        <ButtonPrimary
                            title={'Tài khoản đã xác thực'}
                            className='!bg-gray-700 rounded !h-[29px] !px-4 !w-fit text-sm text-white-800 font-medium'
                        />

                        <ButtonPrimary
                            title={' Nâng cấp tài khoản'}
                            prefix={(<UpgradeIcon className='mr-2' />) as any}
                            className='!h-12 !rounded-full'
                        />
                    </div>
                </div>
                <Divider className='my-8' />
                <div className='flex gap-4 items-center mb-4'>
                    <Switch defaultChecked />
                    <span className='text-gray-800 font-bold text-lg'>
                        Đang tắt trạng thái hoạt động
                    </span>
                </div>
                <span className='font-normal text-sm'>
                    Bật trạng thái hoạt động cho phép các ứng viên tìm đến bạn trong thời gian bạn
                    đang sử dụng website.
                </span>
            </div>
        </div>
    );
}
