import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps } from 'react';

interface CameraIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function CameraIcon(props: CameraIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='18'
            viewBox='0 0 22 18'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M13.5 1H8.5L6 4H3C2.46957 4 1.96086 4.21071 1.58579 4.58579C1.21071 4.96086 1 5.46957 1 6V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H19C19.5304 17 20.0391 16.7893 20.4142 16.4142C20.7893 16.0391 21 15.5304 21 15V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H16L13.5 1Z'
                stroke='#F3F9FA'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11 13C12.6569 13 14 11.6569 14 10C14 8.34315 12.6569 7 11 7C9.34315 7 8 8.34315 8 10C8 11.6569 9.34315 13 11 13Z'
                stroke='#F3F9FA'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
