'use client';

import { DownOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import images from '@assets/images';
import { CardQuestion } from '@components/card/CardQuestion';
import AnswerQuestionForm from '@components/form/AnswerQuestionForm';
import { Avatar, Breadcrumb, Button, Col, Pagination, Row, Tag } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

function DetailedQuestionPage() {
    const questions = [
        {
            id: 1,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 2,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 3,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 4,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 5,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 6,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
    ];

    const [showForm, setShowForm] = useState<boolean>(false);
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
            title: 'Tìm kiếm câu hỏi',
            href: '/find-questions',
            className: 'font-bold text-sm !text-primary-800',
        },
        {
            title: 'Procedural Python - Lập trình hàm trong Python',
            className: 'font-bold text-sm !text-black',
        },
    ];

    return (
        <div className='px-[180px] pb-[64px] bg-[#F3F9FA]'>
            <div className='py-6'>
                <Breadcrumb separator={<RightOutlined />} items={breadcrumbList} />
            </div>
            <div className='w-full flex gap-8'>
                <div className='w-2/3 '>
                    <div className='w-full transition-all'>
                        <div className='text-[14px] leading-[21px] font-normal text-black-800 mb-3'>
                            Đặt câu hỏi lúc 10:00 AM 25/02/2024
                        </div>
                        <div className='font-bold text-4xl text-black-800'>
                            Procedural Python - Lập trình hàm trong Python
                        </div>
                        <div className='my-4 text-2xl'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque enim
                            quos explicabo expedita neque, recusandae velit! Iste cum sed vero, a
                            quo, sunt totam eos veniam numquam voluptatem iusto voluptatum.
                        </div>
                        <div className='flex items-center gap-2 '>
                            <Avatar
                                size={44}
                                icon={
                                    <Image
                                        alt={'image of question'}
                                        loading='lazy'
                                        src={images.charac1}
                                    />
                                }
                            />
                            <div className='flex flex-col'>
                                <span className='text-[18px] leading-[27px] font-bold'>
                                    Nguyễn Hưng
                                </span>
                                <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                    Student
                                </span>
                            </div>
                        </div>
                        {!showForm ? (
                            <Button
                                type='primary'
                                size='large'
                                className='!h-12 !w-[248px] font-bold text-base bg-primary-800 mt-4'
                                onClick={() => setShowForm(true)}
                            >
                                Trả lời câu hỏi này
                                <DownOutlined />
                            </Button>
                        ) : (
                            <Button
                                type='primary'
                                size='large'
                                className='!h-12 !w-[248px] font-bold text-base bg-red-500 hover:!bg-red-500 hover:opacity-80 mt-4'
                                onClick={() => setShowForm(false)}
                            >
                                Hủy bỏ
                                <UpOutlined />
                            </Button>
                        )}
                    </div>
                    {showForm ? (
                        <div className='mt-8 rounded-lg bg-white-900 transition-all'>
                            <AnswerQuestionForm />
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* the same topic of the question */}
                    <div className='mt-8'>
                        <div className='w-full font-bold text-2xl text-black mb-8 items-center flex'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Câu hỏi cùng chủ đề
                        </div>
                        <Row gutter={[32, 32]}>
                            {questions &&
                                questions.length > 0 &&
                                questions.map((question) => {
                                    return (
                                        <Col xs={24} sm={12} md={12} key={question.id}>
                                            <CardQuestion question={question} />
                                        </Col>
                                    );
                                })}
                        </Row>
                        <Pagination
                            defaultCurrent={1}
                            total={50}
                            className='py-8 flex justify-center'
                        />
                    </div>
                </div>
                <div className='w-1/3'>
                    <div>
                        <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Thông tin cá nhân
                        </div>
                        <div>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                        </div>
                        <div className='w-full font-bold text-lg text-black mb-8 items-center flex mt-8'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Người hướng dẫn nổi bật
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedQuestionPage;
