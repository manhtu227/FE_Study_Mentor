import GoogleIcon from '@assets/icons/google';
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

    useEffect(() => {
        if (session) {
            if (session?.user && !verify) {
                // call api to verify social token
                setVerify(true);
                const { account } = session;
                let token;
                if (account?.provider === 'google') {
                    token = account?.id_token;
                } else {
                    token = account?.access_token;
                }
                console.log('token', token);
                // signinSocial({ provider: account.provider, idToken: token })
                //   .unwrap()
                //   .then((res: any) => {
                //     if (res?.name === 'HttpException') {
                //       //move to sns signup
                //       updateSession({});
                //       router.push(
                //         /join-membership/sns-member?idToken=${account.id_token}&provider=${account.provider},
                //       );
                //     } else {
                //       // update session
                //       const sessionWithoutaccount = {
                //         user: res.data,
                //         expires: session.expires,
                //       };
                //       updateSession(sessionWithoutaccount).then(() => {
                //         router.replace('/');
                //         // window.location.reload();
                //       });
                //     }
                //   })
                //   .catch((err) => {
                //     console.log({ err });
                //     updateSession({});
                //   });
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
