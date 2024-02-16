import { Col, Pagination, Row } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { CardQuestion } from '@components/card/CardQuestion';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';

export default function FindQuestionsPage() {
    return (
        <div>
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
                <Col xs={24} sm={12} md={8}>
                    <CardQuestion />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <CardQuestion />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <CardQuestion />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <CardQuestion />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <CardQuestion />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <CardQuestion />
                </Col>
            </Row>
            <Pagination defaultCurrent={1} total={50} className='py-8 flex justify-center' />
        </div>
    );
}
