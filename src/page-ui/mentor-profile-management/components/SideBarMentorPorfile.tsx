import { CardAccount } from '@components/card/CardAccount';
import { CardBankAccount } from '@components/card/CardBankAccount';
import { CardRate } from '@components/card/CardRate';

export function SideBarMentorProfile() {
    return (
        <div className='flex flex-col gap-8 '>
            <CardAccount />
            <CardBankAccount />
            <CardRate />
        </div>
    );
}
