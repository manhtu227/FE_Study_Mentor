'use client';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Button, Flex } from 'antd';

export default function ModalAcceptQuestion() {
    return (
        <div className='w-[900px] p-4 shadow-lg border flex flex-col text-center items-center'>
            <h2 className='text-[20px] leading-[27px] text-[NeutralDark1]'>
                Có câu hỏi mới cần được giải đáp
            </h2>
            <QuestionCircleTwoTone style={{ fontSize: '100px' }} className='p-5' />
            <div>Bạn có muốn nhận trả lời câu hỏi?</div>
            <div className='mt-5'>
                <Flex gap='large' wrap='wrap'>
                    <Button type='primary'>Chấp nhận</Button>
                    <Button>Từ chối</Button>
                </Flex>
            </div>
        </div>
    );
}
