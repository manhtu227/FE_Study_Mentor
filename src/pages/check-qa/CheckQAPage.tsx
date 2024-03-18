'use client';
import { DownloadOutlined } from '@ant-design/icons';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { Divider, Image, Typography } from 'antd';
import { FileIcon, defaultStyles } from 'react-file-icon';

const mentor = {
    id: 1,
    image: images.feedback,
    name: 'Nguyễn Hưng',
    age: 23,
    rating: 5,
    tags: ['tag1'],
};
const subject = {
    id: 1,
    name: 'Lập trình Javascript',
    level: 'Đại học',
    time: '1 giờ 15 phút',
    price: '130 Xu',
    teacher: mentor,
};
const questionFile = {
    extension: 'docx',
    fileName: 'FileCauHoi.docx',
    size: 3.4,
};
const answerFile = {
    extension: 'docx',
    fileName: 'FileCauTraLoi.docx',
    size: 3.4,
};

export default function CheckQAPage() {
    return (
        <div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[561px]'>
                    <div className='w-full bg-white-900 rounded-lg text-black-800'>
                        <div className='p-8'>
                            <h3 className='font-bold text-lg m-0 mb-8'>Thông tin buổi trao đổi</h3>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-x-3'>
                                    <Image preview={false} src={images.clock.src} />
                                    <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                        Thời gian:
                                    </h4>
                                    <p className='text-base font-bold m-0'>1 giờ 15 phút </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <Image preview={false} src={images.anchor.src} />
                                    <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                        Chủ đề:
                                    </h4>
                                    <p className='text-base font-bold m-0'>Lập trình </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <Image preview={false} src={images.layer.src} />
                                    <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                        Lớp / Cấp độ:
                                    </h4>
                                    <p className='text-base font-bold m-0'>Đại học </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <Image preview={false} src={images.cardCredit.src} />
                                    <h4 className='text-sm text-[#838B8F] font-thin m-0'>
                                        Thanh toán:
                                    </h4>
                                    <p className='text-base font-bold m-0'>Tài khoản ngân hàng </p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <Image preview={false} src={images.cardCredit.src} />
                                    <h4 className='text-sm text-[#838B8F] font-thin m-0'>Giá:</h4>
                                    <p className='text-base font-bold m-0'>130 Xu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='flex flex-coltext-lg font-bold text-black-800'>
                            Người hướng dẫn
                        </h3>
                        <CardMentorInfo mentor={mentor} />
                        <ButtonPrimary
                            title='Quay lại đoạn chat'
                            className='w-full pt-3'
                            isRightIcon
                        />
                    </div>
                </div>
                <div className='w-full bg-white-900 rounded-md flex flex-col gap-8 p-8'>
                    <div className='flex flex-col text-left'>
                        <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                            Thông tin câu hỏi
                        </h3>
                        <Divider />
                        <Typography>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                            has roots in a piece of classical Latin literature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin professor at
                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                            Latin words, consectetur, from a Lorem Ipsum passage, and going through
                            the cites of the word in classical literature, discovered the
                            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                            of de Finibus Bonorum et Malorum The Extremes of Good and Evil by
                            Cicero, written in 45 BC. This book is a treatise on the theory of
                            ethics, very popular during the Renaissance. The first line of Lorem
                            Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section
                            1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
                            reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
                            de Finibus Bonorum et Malorum by Cicero are also reproduced in their
                            exact original form, accompanied by English versions from the 1914
                            translation by H. Rackham.
                        </Typography>
                        <br />
                        <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                            Tệp đính kèm
                        </h3>
                        <div className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'>
                            <div className='flex items-center'>
                                <div className='w-[30px]'>
                                    <FileIcon
                                        extension={questionFile.extension}
                                        {...defaultStyles.docx}
                                    />
                                </div>
                                <div className='font-bold text-md mx-4 max-w-[145px] truncate text-black-800'>
                                    {questionFile.fileName}
                                </div>
                                <div className='text-sm text-black-800'>{questionFile.size} MB</div>
                            </div>
                            <DownloadOutlined className='text-[#4EA8B4] text-2xl cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex flex-col text-left'>
                        <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                            Thông tin câu trả lời
                        </h3>
                        <Divider />
                        <Typography>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                            has roots in a piece of classical Latin literature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin professor at
                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                            Latin words, consectetur, from a Lorem Ipsum passage, and going through
                            the cites of the word in classical literature, discovered the
                            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                            of de Finibus Bonorum et Malorum The Extremes of Good and Evil by
                            Cicero, written in 45 BC. This book is a treatise on the theory of
                            ethics, very popular during the Renaissance. The first line of Lorem
                            Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section
                            1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
                            reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
                            de Finibus Bonorum et Malorum by Cicero are also reproduced in their
                            exact original form, accompanied by English versions from the 1914
                            translation by H. Rackham.
                        </Typography>
                        <br />
                        <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                            Tệp đính kèm
                        </h3>
                        <div className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'>
                            <div className='flex items-center'>
                                <div className='w-[30px]'>
                                    <FileIcon
                                        extension={answerFile.extension}
                                        {...defaultStyles.docx}
                                    />
                                </div>
                                <div className='font-bold text-md mx-4 max-w-[145px] truncate text-black-800'>
                                    {answerFile.fileName}
                                </div>
                                <div className='text-sm text-black-800'>{answerFile.size} MB</div>
                            </div>
                            <DownloadOutlined className='text-[#4EA8B4] text-2xl cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
