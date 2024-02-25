import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps } from 'react';

interface BellIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function BellIcon(props: BellIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='22'
            viewBox='0 0 20 22'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M4 7C4 5.4087 4.63214 3.88258 5.75736 2.75736C6.88258 1.63214 8.4087 1 10 1C11.5913 1 13.1174 1.63214 14.2426 2.75736C15.3679 3.88258 16 5.4087 16 7C16 14 19 16 19 16H1C1 16 4 14 4 7Z'
                fill='#F3F9FA'
            />
            <path
                d='M8.2998 20C8.46719 20.3044 8.71325 20.5583 9.0123 20.7352C9.31134 20.912 9.65238 21.0053 9.9998 21.0053C10.3472 21.0053 10.6883 20.912 10.9873 20.7352C11.2864 20.5583 11.5324 20.3044 11.6998 20'
                fill='#F3F9FA'
            />
            <path
                d='M8.2998 20C8.46719 20.3044 8.71325 20.5583 9.0123 20.7352C9.31134 20.912 9.65238 21.0053 9.9998 21.0053C10.3472 21.0053 10.6883 20.912 10.9873 20.7352C11.2864 20.5583 11.5324 20.3044 11.6998 20M4 7C4 5.4087 4.63214 3.88258 5.75736 2.75736C6.88258 1.63214 8.4087 1 10 1C11.5913 1 13.1174 1.63214 14.2426 2.75736C15.3679 3.88258 16 5.4087 16 7C16 14 19 16 19 16H1C1 16 4 14 4 7Z'
                stroke='#F3F9FA'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
