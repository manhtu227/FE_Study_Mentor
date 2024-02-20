import { ReactElement, ReactNode, SVGProps } from 'react';

interface SideBarChatActiveProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function SideBarChatActive(props: SideBarChatActiveProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <div className='w-6 h-6'>
            <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M2 21C1.99992 19.4603 2.44413 17.9533 3.27935 16.6598C4.11456 15.3664 5.30527 14.3414 6.7086 13.708C8.11193 13.0745 9.66824 12.8595 11.1908 13.0886C12.7133 13.3178 14.1373 13.9815 15.292 15M16 19L18 21L22 17M15 8C15 10.7614 12.7614 13 10 13C7.23858 13 5 10.7614 5 8C5 5.23858 7.23858 3 10 3C12.7614 3 15 5.23858 15 8Z'
                    stroke='#F3F9FA'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </div>
    );
}
