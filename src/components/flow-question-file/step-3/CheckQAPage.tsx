'use client';
import { DownloadOutlined } from '@ant-design/icons';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { MentorType } from '@core/models/profile.model';
import { Divider, Typography } from 'antd';
import { useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { SideBarMentor } from '../SideBarMentor';
import ChatMentorPage from './ChatMentorPage';

const mockDataInfo: MentorType = {
    id: '4',
    image: images.feedback.src,
    name: 'Nguyễn Hương',
    age: 23,
    rating: 5,
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
    const [isChat, setIsChat] = useState(false);

    return isChat ? (
        <ChatMentorPage
            setIsChat={setIsChat}
            idRoom='b9a66b1d-fdc6-4a86-966f-4016f2e5e927'
            senderId='30110137-1685-4b28-b585-55f87886cb56'
        />
    ) : (
        <div>
            <SideBarMentor
                className='p-8'
                button={
                    <ButtonPrimary
                        title='Tạo đoạn chat'
                        className='w-full'
                        onClick={() => setIsChat(true)}
                        isRightIcon
                    />
                }
                mentor={mockDataInfo}
            >
                <div className='flex flex-col text-left'>
                    <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                        Thông tin câu hỏi
                    </h3>
                    <Divider />
                    <Typography>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                        roots in a piece of classical Latin literature from 45 BC, making it over
                        2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                        College in Virginia, looked up one of the more obscure Latin words,
                        consectetur, from a Lorem Ipsum passage, and going through the cites of the
                        word in classical literature, discovered the undoubtable source. Lorem Ipsum
                        comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum The
                        Extremes of Good and Evil by Cicero, written in 45 BC. This book is a
                        treatise on the theory of ethics, very popular during the Renaissance. The
                        first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line
                        in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s
                        is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
                        de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact
                        original form, accompanied by English versions from the 1914 translation by
                        H. Rackham.
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
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                        roots in a piece of classical Latin literature from 45 BC, making it over
                        2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                        College in Virginia, looked up one of the more obscure Latin words,
                        consectetur, from a Lorem Ipsum passage, and going through the cites of the
                        word in classical literature, discovered the undoubtable source. Lorem Ipsum
                        comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum The
                        Extremes of Good and Evil by Cicero, written in 45 BC. This book is a
                        treatise on the theory of ethics, very popular during the Renaissance. The
                        first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line
                        in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s
                        is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
                        de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact
                        original form, accompanied by English versions from the 1914 translation by
                        H. Rackham.
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
            </SideBarMentor>
        </div>
    );
}
