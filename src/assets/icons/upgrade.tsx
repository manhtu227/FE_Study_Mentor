import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps } from 'react';

interface UpgradeIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function UpgradeIcon(props: UpgradeIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='17'
            height='20'
            viewBox='0 0 17 20'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M14.5 7L8.5 1M8.5 1L2.5 7M8.5 1V15M1.5 19H15.5'
                stroke='#F3F9FA'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
