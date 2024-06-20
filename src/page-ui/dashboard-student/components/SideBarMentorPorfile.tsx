import { CardAccount } from '@components/card/CardAccount';
import { useSession } from 'next-auth/react';

export function SideBarMentorProfile() {
    const { data } = useSession();
    return (
        <div className='flex flex-col gap-8 '>
            <CardAccount
                avatar={data?.user.user.avatar}
                name={data?.user.user.fullName || 'Không tên'}
            />
            {/* <CardBankAccount /> */}
        </div>
    );
}
