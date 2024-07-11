import CameraIcon from '@assets/icons/camera';
import images from '@assets/images';
import { FileReq } from '@core/models/file.model';
import { UserRole } from '@core/models/user.model';
import { beforeUpload } from '@core/utilities/file.utility';
import { imageUtility } from '@core/utilities/image.utility';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Form, Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

type CustomUploadAvatarInputProps = {
    image?: FileReq;
    name?: string;
    onChange?: () => void;
    userType?: UserRole;
};

const CustomUploadAvatarInput = ({
    image,
    name,
    onChange,
    userType,
}: CustomUploadAvatarInputProps) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        image && setImageUrl(imageUtility(image?.fileKey));
    }, [image]);

    /* Handler */
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                onChange && onChange();
                setLoading(false);
                setImageUrl(url);
            });
        }

        // temp solution because post image of antd not working
        getBase64(info.file.originFileObj as RcFile, (url) => {
            onChange && onChange();
            setLoading(false);
            setImageUrl(url);
        });
    };

    return (
        <div className='relative h-[100px]'>
            <div>
                {/* {isVerified ? ( */}
                {/* <div className='bg-gray-800 text-white-800 text-[10px] px-2 leading-[18px] font-bold absolute top-0 right-0'>
                    VERIFIED
                </div> */}
                {/* ) : (
                <div className='bg-gray-800 uppercase text-white-800'>NO VERIFIED</div>
            )} */}
            </div>
            <div className='w-[100px] h-[100px] rounded-full bg-gray-600 overflow-hidden'>
                {imageUrl ? (
                    <img src={imageUrl} alt='avatar' className='w-full h-full' />
                ) : (
                    <img
                        src={
                            userType === UserRole.STUDENT ? images.student.src : images.teacher.src
                        }
                        alt='avatar'
                        className='w-full h-full'
                    />
                )}
                <Form.Item name={name} className='absolute z-50 right-0 bottom-0 m-0'>
                    <Upload
                        name='avatar'
                        // listType='picture-circle'
                        //  className='h-full w-full'
                        showUploadList={false}
                        action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        <Button
                            className={clsx(
                                'w-10 h-10 rounded-full',
                                'bg-primary-600 hover:!bg-primary-600 p-0 flex items-center justify-center',
                            )}
                        >
                            <CameraIcon className='h-6 w-6' />
                        </Button>
                    </Upload>
                </Form.Item>
            </div>
        </div>
    );
};

export default CustomUploadAvatarInput;
