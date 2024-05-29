import { CardInfoExchange } from '@components/card/CardInfoExchange';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { MentorType } from '@core/models/profile.model';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { RootState } from '@core/store';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

type Props = {
    button: React.ReactNode;
    mentor: MentorType;
    children?: React.ReactNode;
    className?: string;
};

export function SideBarMentor({ button, mentor, children, className }: Props) {
    const currentQuestionId = useSelector((state: RootState) => state.questions.currentQuestionId);
    const query = useQuery({
        queryKey: detailedQuestionKeys.list({ currentQuestionId }),
        queryFn: () => getDetailedQuestionApi(currentQuestionId),
        select: (data) => data?.data.data,
    });

    return (
        <div className={clsx('flex items-start w-full gap-8')}>
            <div className='fixed min-w-[400px] h-[calc(100vh-144px)] hover-scrollbar z-10'>
                <CardInfoExchange data={query.data} />
                <div className='flex flex-col gap-4 my-4 items-start'>
                    <span className='font-bold text-lg text-black-800'>Người hướng dẫn</span>
                    <CardMentorInfo mentor={mentor} />
                </div>
                {button}
            </div>
            <div
                className={clsx(
                    'ml-[432px] w-full bg-white-900 rounded-md flex flex-col gap-8',
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}
