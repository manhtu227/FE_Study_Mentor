import { CardInfoExchange } from '@components/card/CardInfoExchange';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { MentorType } from '@core/models/profile.model';
import clsx from 'clsx';

type Props = {
    button: React.ReactNode;
    mentor: MentorType;
    children?: React.ReactNode;
    className?: string;
};

export function SideBarMentor({ button, mentor, children, className }: Props) {
    return (
        <div className={clsx('flex items-start w-full gap-8')}>
            <div className='fixed min-w-[400px] h-[calc(100vh-144px)] hover-scrollbar z-10'>
                <CardInfoExchange />
                <div className='flex flex-col gap-4 my-4'>
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
