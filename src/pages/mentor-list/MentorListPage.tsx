'use client';
import { Tabs, TabsProps } from 'antd';
import { useRouter } from 'next/navigation';
import CardListPage from './list/CardListPage';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Đang hoạt động',
        children: <CardListPage />,
    },
    {
        key: '2',
        label: 'Đang theo dõi',
        children: <CardListPage />,
    },
];

export default function MentorListPage() {
    const router = useRouter();

    const onChange = (tab: string) => {
        router.push(
            `?searchYourSelfTab=${tab}&${
                tab === '1' ? 'isTutorOnline=true' : 'isTutorOnline=false'
            }`,
        );
    };

    return (
        <div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-full bg-white-900 p-8 rounded-md text-center flex flex-col justify-between'>
                    <div>
                        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
                    </div>
                    {/* <ButtonOutlined className='max-w-[142px]' title='Tất cả' isFilterIcon /> */}
                </div>
            </div>
        </div>
    );
}
