/* eslint-disable unused-imports/no-unused-imports */
'use client';
import DocumentIcon from '@assets/icons/document-icon';
import WalletIcon from '@assets/icons/wallet-icon';
import { CardTitleIcon } from '@components/card/CardTitleIcon';
import CustomSkeletonParagraph from '@components/skeleton/CustomSkeletonParagraph';
import { OverviewTutorInfo } from '@core/models/user.model';
import { getOverviewTutorInfoApi, getOverviewTutorInfoKeys } from '@core/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AreaChart } from './components/AreaChart';
import { HistoryQuestion } from './components/HistoryQuestion';

export default function MentorProfileManagementPage() {
    const [overviewTutorInfo, setOverviewTutorInfo] = useState<OverviewTutorInfo>();
    const overviewTutorInfoQuery = useQuery({
        queryKey: getOverviewTutorInfoKeys.all,
        queryFn: () => getOverviewTutorInfoApi(),
    });

    useEffect(() => {
        if (overviewTutorInfoQuery.data?.data?.data) {
            setOverviewTutorInfo(overviewTutorInfoQuery.data?.data?.data);
        }
    }, [overviewTutorInfoQuery.data?.data?.data]);

    const optionsChart = [
        { value: 7, label: '7 ngày gần nhất' },
        { value: 30, label: '30 ngày gần nhất' },
        { value: 90, label: '90 ngày gần nhất' },
        { value: 365, label: '365 ngày gần nhất' },
    ];

    return (
        <div className='pack-layout pb-16 px-4 pt-4'>
            <div className='min-w-[500px] flex-grow'>
                <div>
                    <div className='flex gap-4 justify-between'>
                        {overviewTutorInfoQuery?.isFetching ? (
                            [1, 2, 3, 4].map((item) => (
                                <CustomSkeletonParagraph height={50} key={item} />
                            ))
                        ) : (
                            <>
                                <CardTitleIcon
                                    title='Doanh thu'
                                    value={`${overviewTutorInfo?.revenue} VND`}
                                    icon={<WalletIcon />}
                                />
                                <CardTitleIcon
                                    title='Số câu trả lời'
                                    value={`${overviewTutorInfo?.numberOfQuestionsAnswered}`}
                                    icon={<DocumentIcon />}
                                />
                                <CardTitleIcon
                                    title='Số phản hồi từ học viên'
                                    value={`${overviewTutorInfo?.numberOfComment}`}
                                    icon={<DocumentIcon />}
                                />
                                <CardTitleIcon
                                    title='Số học viên đã trả lời'
                                    value={`${overviewTutorInfo?.numberOfStudent}`}
                                    icon={<DocumentIcon />}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className='w-full my-8'>
                    <AreaChart optionsChart={optionsChart} />
                </div>
                {/* <Chat chatList={dataChat} setChatList={handleDataChat} /> */}
                <HistoryQuestion />
            </div>
        </div>
    );
}
