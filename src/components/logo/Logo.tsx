import LogoIcon from '@assets/icons/logo';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

function Logo({ size, title, className }: { size?: string; title: string; className?: string }) {
    const router = useRouter();

    return (
        <div className={`flex h-full items-center ${className}`} onClick={() => router.push('/')}>
            <LogoIcon
                className={clsx({
                    'h-[32px] w-[34px]': !size,
                    'h-[10px] w-[10px]': size === 'sm',
                    'mr-3': true,
                })}
            />
            <div className={`text-2xl font-bold text-[#5BB9E2]`}>{title}</div>
        </div>
    );
}

export default Logo;
