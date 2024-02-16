import MentorItem from '@components/chat/MentorItem';
import { Col, Row } from 'antd';

export default function ChatAiPage() {
    return (
        <Row className='bg-white-800'>
            <Col span={8}>
                <MentorItem />
            </Col>
            <Col span={16}></Col>
        </Row>
    );
}
