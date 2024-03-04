'use client';

import images from '@assets/images';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { Col, Row } from 'antd';

const mentors = [
    {
        id: 1,
        image: images.feedback,
        name: 'Nguyễn Hưng',
        age: 23,
        rating: 5,
        tags: ['tag1', 'tag2', 'tag3'],
    },
    {
        id: 2,
        image: images.feedback,
        name: 'Nguyễn Hùng',
        age: 23,
        rating: 5,
        tags: ['tag1', 'tag2', 'tag3'],
    },
    {
        id: 3,
        image: images.feedback,
        name: 'Nguyễn Hào',
        age: 23,
        rating: 5,
        tags: ['tag1', 'tag2', 'tag3'],
    },
    {
        id: 4,
        image: images.feedback,
        name: 'Nguyễn Hương',
        age: 23,
        rating: 5,
        tags: ['tag1', 'tag2', 'tag3'],
    },
];
export default function CardListPage() {
    return (
        <div className='max-w[837px]'>
            <Row gutter={[32, 32]}>
                {mentors &&
                    mentors.length > 0 &&
                    mentors.map((mentor) => {
                        return (
                            <Col span={12} xs={24} sm={12} key={mentor.id}>
                                <CardMentorInfo mentor={mentor} />
                            </Col>
                        );
                    })}
            </Row>
        </div>
    );
}
