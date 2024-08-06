import GoogleIcon from '@assets/icons/google';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { LoginGoogle } from '@core/models/authentication.model';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastError, toastSuccess } from '@core/utilities/toast.utility';
import { useMutation } from '@tanstack/react-query';
import { Spin } from 'antd';
import { signIn, SignInOptions, useSession } from 'next-auth/react';
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
        mutationFn: (body: LoginGoogle) =>
            signIn('custom-login-google', {
                email: body.email,
                fullName: body.fullName,
                redirect: false,
            } as LoginGoogle & SignInOptions),
        // onSuccess: async (data) => {
        //     if (!session) return;
        //     console.log('data login', data.data);
        //     const value = {
        //         user: data.data.data,
        //         account: session.account,
        //         expires: session.expires,
        //     };
        //     updateSession(value);
        //     router.push(MY_ROUTE.HOME);
        //     toastSuccess('Đăng nhập thành công');
        //     return;
        // },
        onError: handleError,
    });

    useEffect(() => {
        if (session) {
            const loginFunction = async () => {
                const resp = await loginGoogleMutation.mutateAsync({
                    email: session.account?.email,
                    fullName: session.account?.name,
                });
                if (resp && resp?.ok) {
                    toastSuccess('Đăng nhập thành công');
                    router.push(MY_ROUTE.HOME);
                    return;
                }
                toastError('Email không hợp lệ.');
            };
            if (session?.account && !verify) {
                setVerify(true);
                const { account } = session;
                if (account?.provider === 'google') {
                    loginFunction();
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
