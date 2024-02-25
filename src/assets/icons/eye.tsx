import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps } from 'react';

interface EyeIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function EyeIcon(props: EyeIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='16'
            viewBox='0 0 23 16'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M1.5 8C1.5 8 4.5 1 11.5 1C18.5 1 21.5 8 21.5 8C21.5 8 18.5 15 11.5 15C4.5 15 1.5 8 1.5 8Z'
                stroke='#3D64EE'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11.5 11C13.1569 11 14.5 9.65685 14.5 8C14.5 6.34315 13.1569 5 11.5 5C9.84315 5 8.5 6.34315 8.5 8C8.5 9.65685 9.84315 11 11.5 11Z'
                stroke='#3D64EE'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
