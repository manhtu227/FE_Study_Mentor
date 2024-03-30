import { ReactElement, ReactNode, SVGProps } from 'react';

interface SideBarChatDefaultProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function SideBarChatDefault(props: SideBarChatDefaultProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <div className='w-6 h-6'>
            <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={className}
                {...rest}
            >
                <path
                    d='M12 2V6M12 18V22M4.92969 4.92993L7.75969 7.75993M16.2402 16.24L19.0702 19.07M2 12H6M18 12H22M4.92969 19.07L7.75969 16.24M16.2402 7.75993L19.0702 4.92993'
                    stroke='#0A2277'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </div>
    );
}
