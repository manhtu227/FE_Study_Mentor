import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps } from 'react';

interface UploadIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function UploadIconIcon(props: UploadIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='22'
            viewBox='0 0 30 22'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M8.33325 21.6104C6.51198 21.4926 4.78146 20.8933 3.38879 19.8979C1.99611 18.9026 1.0125 17.5622 0.578388 16.068C0.144278 14.5739 0.28187 13.0024 0.97152 11.5781C1.66117 10.1537 2.86761 8.94925 4.41858 8.13669C4.7486 5.96977 6.00498 3.97838 7.9526 2.53518C9.90023 1.09199 12.4056 0.295898 14.9999 0.295898C17.5942 0.295898 20.0996 1.09199 22.0472 2.53518C23.9949 3.97838 25.2512 5.96977 25.5812 8.13669C27.1322 8.94925 28.3387 10.1537 29.0283 11.5781C29.718 13.0024 29.8555 14.5739 29.4214 16.068C28.9873 17.5622 28.0037 18.9026 26.611 19.8979C25.2184 20.8933 23.4878 21.4926 21.6666 21.6104V21.6317H8.33325V21.6104ZM16.3332 12.6493H20.3332L14.9999 7.03522L9.66658 12.6493H13.6666V17.1405H16.3332V12.6493Z'
                fill='#3D64EE'
            />
        </svg>
    );
}
