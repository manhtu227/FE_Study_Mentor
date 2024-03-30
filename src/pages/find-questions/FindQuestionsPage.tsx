import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Pagination, Row } from 'antd';

import images from '@assets/images';
import { CardQuestion } from '@components/card/CardQuestion';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';

export default function FindQuestionsPage() {
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
            className: 'font-bold text-sm !text-black',
        },
    ];

    return (
        <div>
            <div className='py-6'>
                <Breadcrumb separator={<RightOutlined />} items={breadcrumbList} />
            </div>
            <div className='flex mb-8 justify-between flex-wrap gap-2'>
                {/* <DropDownField className='px-6 py-3 flex items-center' title='Sắp xếp theo' /> */}
                <CustomSelectInput
                    classNameForm='w-[167px]'
                    optionsSelect={[]}
                    placeholder='Sắp xếp theo'
                    classNameSelect='placeholder-color'
                />
                <CustomTextInput
                    prefix={<SearchOutlined />}
                    placeholder='Nhập nội dung tìm kiếm...'
                    classNameForm='w-[400px]'
                />
                <CustomSelectInput
                    classNameForm='w-[131px] '
                    optionsSelect={[]}
                    placeholder='Bộ lọc'
                    classNameSelect='placeholder-color '
                />
            </div>
            <Row gutter={[32, 32]}>
                {questions &&
                    questions.length > 0 &&
                    questions.map((question) => {
                        return (
                            <Col xs={24} sm={12} md={8} key={question.id}>
                                <CardQuestion question={question} />
                            </Col>
                        );
                    })}
            </Row>
            <Pagination defaultCurrent={1} total={50} className='py-8 flex justify-center' />
        </div>
    );
}
