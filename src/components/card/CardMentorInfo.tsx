import { DownloadOutlined } from '@ant-design/icons';
import CustomSkeletonTitle from '@components/skeleton/CustomSkeletonTitle';
import { Gender } from '@core/enums/user.enum';
import { Status } from '@core/models/authentication.model';
import { MentorType } from '@core/models/profile.model';
import { UserModel } from '@core/models/user.model';
import { getUserById } from '@core/services/user.service';
import { imageUtility } from '@core/utilities/image.utility';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button, Image, Modal, Rate } from 'antd';
import { useState } from 'react';

export function CardMentorInfo({
    mentor,
    isAvatar = true,
    loading = false,
    onPickMentor,
    user,
}: {
    user?: UserModel;
    mentor: MentorType;
    isAvatar?: boolean;
    loading?: boolean;
    onPickMentor?: () => void;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const userMutation = useMutation({
        mutationFn: (id: string) => getUserById(id),
        onSuccess: () => {
            setIsOpen(true);
        },
    });

    const handleShowModalMentor = () => {
        if (onPickMentor) {
            userMutation.mutate(mentor.id);
        }
    };

    const handlePickMentor = () => {
        setIsOpen(false);
        onPickMentor && onPickMentor();
    };

    const handleCancelMentor = () => {
        setIsOpen(false);
    };

    return (
        <div className='w-full border-solid bg-white-900 border-[1px] rounded-lg border-[#D9D9D9]'>
            <div className='p-4'>
                <div className='flex items-start gap-4'>
                    <div className='w-[100px] h-[100px]'>
                        {loading ? (
                            <CustomSkeletonTitle height='100px' width='100px' />
                        ) : isAvatar ? (
                            <Avatar
                                size={100}
                                icon={
                                    <Image
                                        alt={'image of question'}
                                        loading='lazy'
                                        src={mentor?.image || ''}
                                    />
                                }
                            />
                        ) : (
                            <img
                                className='object-cover w-[100px] h-[100px] rounded-lg '
                                src={mentor?.image || ''}
                                alt='mento'
                            />
                        )}
                    </div>
                    {loading ? (
                        <CustomSkeletonTitle height='100px' />
                    ) : (
                        <div className='flex flex-col w-full'>
                            <div className='flex items-center justify-between'>
                                <span className='text-lg font-bold items-start text-black-800'>
                                    {mentor?.name}
                                </span>
                                <span className='text-sm font-bold text-[#838B8F] '>
                                    | Tuổi {mentor?.age}
                                </span>
                            </div>

                            <div className='flex items-center gap-1'>
                                {/* <StarFilled className='text-[#f2c94c]' />
                                <StarFilled className='text-[#f2c94c]' />
                                <StarFilled className='text-[#f2c94c]' />
                                <StarFilled className='text-[#f2c94c]' />
                                <StarFilled className='text-[#f2c94c]' /> */}
                                <Rate disabled defaultValue={mentor?.rating} />
                            </div>
                            <div className='flex mt-[10px] gap-2 flex-wrap'>
                                <Button type='primary' onClick={handleShowModalMentor}>
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                open={isOpen}
                onOk={handlePickMentor}
                onCancel={handleCancelMentor}
                okText='Chọn người này'
                cancelText='Hủy bỏ'
            >
                <div>
                    <div className='flex gap-x-2 items-center'>
                        {/* Avatar and full name */}
                        <Image
                            className='!w-10 !h-10 rounded-full object-cover'
                            src={imageUtility(userMutation?.data?.data?.data?.avatar?.fileKey)}
                            alt='avatar'
                        />
                        <p className='font-semibold'>{userMutation?.data?.data?.data?.fullName}</p>
                    </div>
                    {/* Email */}
                    {userMutation?.data?.data?.data?.email && (
                        <div className='flex items-center gap-x-2 mt-2'>
                            <span className='font-bold'>Email: </span>
                            <div>{userMutation?.data?.data?.data?.email}</div>
                        </div>
                    )}
                    {/* Phone number */}
                    {userMutation?.data?.data?.data?.phone && (
                        <div className='flex items-center gap-x-2 mt-2'>
                            <span className='font-bold'>Số điện thoại: </span>
                            <div>{userMutation?.data?.data?.data?.phone}</div>
                        </div>
                    )}
                    {/* Date of birth */}
                    {userMutation?.data?.data?.data?.dateOfBirth && (
                        <div className='flex items-center gap-x-2 mt-2'>
                            <span className='font-bold'>Năm sinh: </span>
                            <div>{userMutation?.data?.data?.data?.dateOfBirth}</div>
                        </div>
                    )}
                    {/* Gender */}
                    <div className='flex items-center gap-x-2 mt-2'>
                        <span className='font-bold'>Giới tính: </span>
                        <div>
                            {userMutation?.data?.data?.data?.gender === Gender.Male ? 'Nam' : 'Nữ'}
                        </div>
                    </div>
                    <>
                        {/* Subjects */}
                        <div className='flex items-center gap-x-2 mt-2'>
                            <span className='font-bold'>Danh sách môn học đang đăng ký: </span>
                            <div className='text-[#0064FF] text-sm font-semibold'>
                                {Array.isArray(userMutation?.data?.data?.data?.subjects) &&
                                userMutation?.data?.data?.data?.subjects.length > 0 ? (
                                    userMutation?.data?.data?.data?.subjects.map((item, index) => (
                                        <span key={index}>{item.name},&nbsp; </span>
                                    ))
                                ) : (
                                    <span>No certificates</span>
                                )}
                            </div>
                        </div>
                        {/* Certificates */}
                        <div className='mt-2'>
                            <div className='text-sm font-semibold'>
                                {userMutation?.data?.data?.data?.certificates && (
                                    <span className='font-bold'>Danh sách chứng chỉ: </span>
                                )}
                                {userMutation?.data?.data?.data?.certificates ? (
                                    userMutation?.data?.data?.data?.certificates.map(
                                        (file, index) => (
                                            <div
                                                key={file.fileKey}
                                                className='flex border rounded-lg border-gray-600 border-solid mt-1 items-center justify-between p-4 gap-1'
                                            >
                                                <div className='flex items-center'>
                                                    <div className='font-bold text-md mx-4 max-w-4/5 truncate '>
                                                        {file.fileName}
                                                    </div>
                                                </div>
                                                <a
                                                    href={imageUtility(file.fileKey)}
                                                    type='download'
                                                    className='hover:opacity-90'
                                                >
                                                    <DownloadOutlined className=' text-2xl cursor-pointer' />
                                                </a>
                                            </div>
                                        ),
                                    )
                                ) : (
                                    <span>Không có chứng chỉ nào</span>
                                )}
                            </div>
                        </div>
                    </>
                    {/* Status */}
                    <div className='flex items-center gap-x-2 mt-2'>
                        <span className='font-bold'>Trạng thái tài khoản: </span>
                        <div>
                            {userMutation?.data?.data?.data?.status === Status.ACTIVE ? (
                                <span className='text-green-600'>Đang kích hoạt</span>
                            ) : (
                                <span className='text-red-600'>Vô hiệu hóa</span>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
