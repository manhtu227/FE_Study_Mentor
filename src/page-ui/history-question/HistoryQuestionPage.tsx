'use client';
import { RightOutlined } from '@ant-design/icons';
import DocumentIcon from '@assets/icons/document-icon';
import GlobeIcon from '@assets/icons/globe-icon';
import WalletIcon from '@assets/icons/wallet-icon';
import { CardTitleIcon } from '@components/card/CardTitleIcon';
import { HistoryQuestion } from './components/HistoryQuestion';
import { SideBarMentorProfile } from './components/SideBarMentorPorfile';

export default function HistoryQuestionPage() {
    return (
        <div className='pack-layout pb-16 px-4'>
            <div className='h-[69px] flex items-center gap-4 text-sm font-bold text-primary-800'>
                <span>Học viên</span>
                <RightOutlined />
                <span>Quản lý và thống kê</span>
            </div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[435px]'>
                    <SideBarMentorProfile />
                </div>
                <div className='min-w-[500px] flex-grow'>
                    <div className='mb-8'>
                        <div className='flex gap-4 justify-between'>
                            <CardTitleIcon
                                title='Số tiền đã thanh toán'
                                value='4.500 Xu'
                                percent='0'
                                icon={<WalletIcon />}
                            />
                            <CardTitleIcon
                                title='Số câu hỏi đã hỏi'
                                value='120'
                                percent='0'
                                icon={<DocumentIcon />}
                            />
                            <CardTitleIcon
                                title='Số câu hỏi được trả lời'
                                value='32'
                                percent='0'
                                icon={<GlobeIcon />}
                            />
                        </div>
                    </div>
                    <HistoryQuestion />
                </div>
            </div>
        </div>
    );
}
