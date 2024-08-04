import GoogleIcon from '@assets/icons/google';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { LoginGoogle } from '@core/models/authentication.model';
import { loginByGooogleApi } from '@core/services/authentication.service';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation } from '@tanstack/react-query';
import { Spin } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const socialLoginButtons = [
    {
        title: 'Google',
        key: 'google',
        icon: <GoogleIcon />,
    },
];
export default function SocialLogin({ size = 55 }: { size?: number }) {
    const [verify, setVerify] = useState(false);

    const { data: session, update: updateSession } = useSession();
    const router = useRouter();
    //   const [signinSocial, { isLoading }] = useSigninSocialMutation();

    const loginGoogleMutation = useMutation({
        mutationFn: (body: LoginGoogle) => loginByGooogleApi(body),
        onSuccess: (data) => {
            if (!session) return;
            session.user = data.data.data;
            updateSession(session);
            toastSuccess('Đăng nhập thành công');
            router.push(MY_ROUTE.HOME);
            return;
        },
        onError: handleError,
    });

    useEffect(() => {
        if (session) {
            if (session?.account && !verify) {
                setVerify(true);
                const { account } = session;
                if (account?.provider === 'google') {
                    loginGoogleMutation.mutate({
                        email: account.email,
                        fullName: account.name,
                    });
                }
            }
        }
    }, [session?.account]);

    return (
        <>
            <div className='flex justify-center gap-5'>
                {socialLoginButtons.map((btn) => (
                    <div
                        key={btn.key}
                        className='cursor-pointer'
                        onClick={() => signIn(btn.key, {}, { prompt: 'login' })}
                    >
                        {btn.icon}
                    </div>
                ))}
            </div>
            <Spin spinning={false} fullscreen />
        </>
    );
}
