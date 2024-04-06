import { DownloadOutlined, RightOutlined } from '@ant-design/icons';
import ReportAnswerForm from '@components/form/ReportAnswerForm';
import { Breadcrumb } from 'antd';
import { FileIcon, defaultStyles } from 'react-file-icon';

function ReportAnswerPage() {
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
            title: 'Câu hỏi số 1',
            href: '/find-questions',
            className: 'font-bold text-sm !text-primary-800',
        },
        {
            title: 'Báo cáo câu hỏi',
            className: 'font-bold text-sm !text-black',
        },
    ];

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

    return (
        <div className='px-[180px] pb-[64px] bg-[#F3F9FA]'>
            <div className='py-6'>
                <Breadcrumb separator={<RightOutlined />} items={breadcrumbList} />
            </div>
            <div className='w-full flex gap-8'>
                <div className='w-2/5 rounded-lg bg-white-900 p-8'>
                    <div className='flex items-center gap-4'>
                        <div className='rounded-full h-12 w-12 bg-gray-600' />
                        <div>
                            <div className='text-xl'>Câu hỏi của</div>
                            <div className='font-bold text-2xl'>Sterling</div>
                        </div>
                    </div>
                    <div className='h-[1px] w-full my-8 bg-gray-600' />
                    <div>
                        <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Thông tin câu hỏi
                        </div>
                        <div className='h-[1px] w-full mb-4 bg-gray-600' />
                        <div className='w-full text-lg text-black mb-8 items-center flex'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                            corporis quos placeat quasi voluptate ipsa adipisci provident sunt
                            commodi beatae tempora facere expedita vitae eos dolorum cumque, illo
                            assumenda eius.
                        </div>
                        <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                            Tệp đính kèm
                        </div>
                        <div className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'>
                            <div className='flex items-center'>
                                <div className='w-[30px]'>
                                    <FileIcon
                                        extension={questionFile.extension}
                                        {...defaultStyles.docx}
                                    />
                                </div>
                                <div className='font-bold text-xl mx-4 max-w-[145px] truncate'>
                                    {questionFile.fileName}
                                </div>
                                <div className='text-md'>{questionFile.size} MB</div>
                            </div>
                            <DownloadOutlined className='text-[#4EA8B4] text-xl cursor-pointer' />
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Thông tin câu trả lời
                        </div>
                        <div className='h-[1px] w-full mb-4 bg-gray-600' />
                        <div className='w-full text-lg text-black mb-8 items-center flex'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                            corporis quos placeat quasi voluptate ipsa adipisci provident sunt
                            commodi beatae tempora facere expedita vitae eos dolorum cumque, illo
                            assumenda eius.
                        </div>
                        <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                            Tệp đính kèm
                        </div>
                        <div className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'>
                            <div className='flex items-center'>
                                <div className='w-[30px]'>
                                    <FileIcon
                                        extension={answerFile.extension}
                                        {...defaultStyles.docx}
                                    />
                                </div>
                                <div className='font-bold text-xl mx-4 max-w-[145px] truncate'>
                                    {answerFile.fileName}
                                </div>
                                <div className='text-md'>{answerFile.size} MB</div>
                            </div>
                            <DownloadOutlined className='text-[#4EA8B4] text-xl cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className='w-3/5 rounded-lg bg-white-900'>
                    <ReportAnswerForm />
                </div>
            </div>
        </div>
    );
}

export default ReportAnswerPage;
