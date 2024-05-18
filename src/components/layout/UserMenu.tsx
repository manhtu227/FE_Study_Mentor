import { MY_ROUTE } from '@core/constants/routes.constant';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export function UserMenu() {
    const router = useRouter();
    const handleClickLogin = () => {
        router.push(MY_ROUTE.LOGIN);
    };

    const handleClickSignUp = () => {
        router.push(MY_ROUTE.SIGN_UP);
    };
    return (
        <div className='flex w-1/3 items-center justify-end gap-8'>
            <Button
                type='default'
                size='large'
                shape='round'
                className='text-lightBlue border text-base font-bold'
                onClick={handleClickLogin}
            >
                Đăng nhập
            </Button>
            <Button
                type='default'
                size='large'
                shape='round'
                className='bg-lightBlue border text-base font-bold bg-primary-800 text-white-900 hover:!text-white-900 hover:opacity-85'
                onClick={handleClickSignUp}
            >
                Đăng ký
            </Button>
        </div>
    );
}
