import { CardAccount } from '@components/card/CardAccount';
import { CardBankAccount } from '@components/card/CardBankAccount';

export function SideBarMentorProfile() {
    return (
        <div className='flex flex-col gap-8 '>
            <CardAccount />
            <CardBankAccount />
        </div>
    );
}
