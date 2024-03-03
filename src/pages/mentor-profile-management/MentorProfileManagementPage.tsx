/* eslint-disable unused-imports/no-unused-imports */
'use client';
import { RightOutlined } from '@ant-design/icons';
import DocumentIcon from '@assets/icons/document-icon';
import GlobeIcon from '@assets/icons/globe-icon';
import WalletIcon from '@assets/icons/wallet-icon';
import { CardTitleIcon } from '@components/card/CardTitleIcon';
import { SideBarMentorProfile } from './components/SideBarMentorPorfile';
import { AreaChart } from './components/AreaChart';
import { BarChart } from './components/BarChart';

export default function MentorProfileManagementPage() {
    return (
        <div className='pack-layout pb-16 px-4'>
            <div className='h-[69px] flex items-center gap-4 text-sm font-bold text-primary-800'>
                <span>Người hướng dẫn</span>
                <RightOutlined />
                <span>Quản lý và thống kê doanh thu</span>
            </div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[435px]'>
                    <SideBarMentorProfile />
                </div>
                <div className='min-w-[500px] flex-grow'>
                    <div>
                        <div className='flex gap-4 justify-between'>
                            <CardTitleIcon
                                title='Doanh thu'
                                value='4.500 Xu'
                                percent='+55%'
                                icon={<WalletIcon />}
                            />
                            <CardTitleIcon
                                title='Số câu trả lời'
                                value='120'
                                percent='+55%'
                                icon={<DocumentIcon />}
                            />
                            <CardTitleIcon
                                title='Thời gian truy cập'
                                value='32 giờ'
                                percent='+55%'
                                icon={<GlobeIcon />}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-8'>
                        <BarChart />
                        <AreaChart />
                    </div>
                    {/* <Chat chatList={dataChat} setChatList={handleDataChat} /> */}
                </div>
            </div>
        </div>
    );
}
