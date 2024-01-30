import React from 'react';
import { Button, Card, Image, Input, Tag } from 'antd';
import images from '@assets/images';
import { Avatar, Row, Col, Pagination } from 'antd';
import DropDownField from '../../components/drop-down-fied/DropDownField';
import SearchField from '@components/search-field/SearchField';
import { SearchOutlined } from '@ant-design/icons';

export default function QuestionCardPage() {
    return (
        <div className='p-16'>
            <div className='flex mb-8 justify-between'>
                <DropDownField className='px-6 py-3 flex items-center' title='Sắp xếp theo' />
                <Input
                    prefix={<SearchOutlined />}
                    className='w-[368px] h-[36px] rounded-md'
                    placeholder='Nhập nội dung tìm kiếm...'
                />
                <DropDownField className='px-6 py-3 flex items-center' title='Bộ lọc' />
            </div>
            <Row gutter={[{ xs: 8, sm: 14, md: 24, lg: 32 }, 18]}>
                <Col className='gutter-row' span={8}>
                    <div className='w-[435px] h-[272px] border-solid border-[1px] border-[#DEE0E2]'>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 mt-4'>
                                <Avatar size={44} icon={<Image src={images.charac1.src} />} />
                                <div className='flex flex-col'>
                                    <span className='text-[18px] leading-[27px] font-bold'>
                                        Nguyễn Hưng
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                        #123123123
                                    </span>
                                </div>
                            </div>
                            <div className='text-base line-clamp-3 mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className='flex mt-[10px] gap-2'>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                            </div>
                        </div>
                        <Button className='w-full rounded-b-lg h-[40px] bg-[#3D64EE] text-white font-bold '>
                            Xem câu hỏi
                        </Button>
                    </div>
                </Col>
                <Col className='gutter-row' span={8}>
                    <div className='w-[435px] h-[272px] border-solid border-[1px] border-[#DEE0E2]'>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 mt-4'>
                                <Avatar size={44} icon={<Image src={images.charac1.src} />} />
                                <div className='flex flex-col'>
                                    <span className='text-[18px] leading-[27px] font-bold'>
                                        Nguyễn Hưng
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                        #123123123
                                    </span>
                                </div>
                            </div>
                            <div className='text-base line-clamp-3 mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className='flex mt-[10px] gap-2'>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                            </div>
                        </div>
                        <Button className='w-full rounded-b-lg h-[40px] bg-[#3D64EE] text-white font-bold '>
                            Xem câu hỏi
                        </Button>
                    </div>
                </Col>
                <Col className='gutter-row' span={8}>
                    <div className='w-[435px] h-[272px] border-solid border-[1px] border-[#DEE0E2]'>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 mt-4'>
                                <Avatar size={44} icon={<Image src={images.charac1.src} />} />
                                <div className='flex flex-col'>
                                    <span className='text-[18px] leading-[27px] font-bold'>
                                        Nguyễn Hưng
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                        #123123123
                                    </span>
                                </div>
                            </div>
                            <div className='text-base line-clamp-3 mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className='flex mt-[10px] gap-2'>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                            </div>
                        </div>
                        <Button className='w-full rounded-b-lg h-[40px] bg-[#3D64EE] text-white font-bold '>
                            Xem câu hỏi
                        </Button>
                    </div>
                </Col>{' '}
                <Col className='gutter-row' span={8}>
                    <div className='w-[435px] h-[272px] border-solid border-[1px] border-[#DEE0E2]'>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 mt-4'>
                                <Avatar size={44} icon={<Image src={images.charac1.src} />} />
                                <div className='flex flex-col'>
                                    <span className='text-[18px] leading-[27px] font-bold'>
                                        Nguyễn Hưng
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                        #123123123
                                    </span>
                                </div>
                            </div>
                            <div className='text-base line-clamp-3 mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className='flex mt-[10px] gap-2'>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                            </div>
                        </div>
                        <Button className='w-full rounded-b-lg h-[40px] bg-[#3D64EE] text-white font-bold '>
                            Xem câu hỏi
                        </Button>
                    </div>
                </Col>{' '}
                <Col className='gutter-row' span={8}>
                    <div className='w-[435px] h-[272px] border-solid border-[1px] border-[#DEE0E2]'>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 mt-4'>
                                <Avatar size={44} icon={<Image src={images.charac1.src} />} />
                                <div className='flex flex-col'>
                                    <span className='text-[18px] leading-[27px] font-bold'>
                                        Nguyễn Hưng
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                        #123123123
                                    </span>
                                </div>
                            </div>
                            <div className='text-base line-clamp-3 mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className='flex mt-[10px] gap-2'>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                            </div>
                        </div>
                        <Button className='w-full rounded-b-lg h-[40px] bg-[#3D64EE] text-white font-bold '>
                            Xem câu hỏi
                        </Button>
                    </div>
                </Col>{' '}
                <Col className='gutter-row' span={8}>
                    <div className='w-[435px] h-[272px] border-solid border-[1px] border-[#DEE0E2]'>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 mt-4'>
                                <Avatar size={44} icon={<Image src={images.charac1.src} />} />
                                <div className='flex flex-col'>
                                    <span className='text-[18px] leading-[27px] font-bold'>
                                        Nguyễn Hưng
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                        #123123123
                                    </span>
                                </div>
                            </div>
                            <div className='text-base line-clamp-3 mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <div className='flex mt-[10px] gap-2'>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                                <Tag className='px-3 py-2 bg-white rounded-md text-[14px] leading-[21px]'>
                                    This is tag
                                </Tag>
                            </div>
                        </div>
                        <Button className='w-full rounded-b-lg h-[40px] bg-[#3D64EE] text-white font-bold '>
                            Xem câu hỏi
                        </Button>
                    </div>
                </Col>
            </Row>
            <Pagination defaultCurrent={1} total={50} className='pt-8 flex justify-center' />
        </div>
    );
}