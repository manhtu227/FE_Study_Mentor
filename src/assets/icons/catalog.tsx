import clsx from 'clsx';
import React, { ReactElement, ReactNode, SVGProps } from 'react';

interface LogoIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function Catalog(props: LogoIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M5.5 8.5L9 12L5.5 15.5L2 12L5.5 8.5Z'
                stroke='#0A2277'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M12 2L15.5 5.5L12 9L8.5 5.5L12 2Z'
                stroke='#0A2277'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M18.5 8.5L22 12L18.5 15.5L15 12L18.5 8.5Z'
                stroke='#0A2277'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M12 15L15.5 18.5L12 22L8.5 18.5L12 15Z'
                stroke='#0A2277'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
