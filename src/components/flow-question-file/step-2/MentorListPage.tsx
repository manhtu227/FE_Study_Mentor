'use client';
import { Tabs, TabsProps } from 'antd';
import CardListPage from './CardListPage';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Đang hoạt động',
        children: <CardListPage />,
    },
];

export default function MentorListPage() {
    return (
        <div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-full bg-white-900 p-8 rounded-md text-center flex flex-col justify-between'>
                    <div>
                        <Tabs activeKey={'1'} items={items} />
                    </div>
                </div>
            </div>
        </div>
    );
}
