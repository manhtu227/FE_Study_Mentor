import { ReactElement, ReactNode, SVGProps } from 'react';

interface GlobeIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function GlobeIcon(props: GlobeIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            width='23'
            height='23'
            viewBox='0 0 23 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M11.5002 2.3584C6.45225 2.3584 2.35962 6.45102 2.35962 11.499C2.35962 16.547 6.45225 20.6396 11.5002 20.6396C16.5482 20.6396 20.6409 16.547 20.6409 11.499C20.6409 6.45102 16.5482 2.3584 11.5002 2.3584Z'
                fill='white'
                stroke='#4EA8B4'
                strokeWidth='0.75'
                strokeMiterlimit='10'
            />
            <path
                d='M11.5001 2.3584C8.94824 2.3584 6.54883 6.45102 6.54883 11.499C6.54883 16.547 8.94824 20.6396 11.5001 20.6396C14.052 20.6396 16.4515 16.547 16.4515 11.499C16.4515 6.45102 14.052 2.3584 11.5001 2.3584Z'
                fill='white'
                stroke='#4EA8B4'
                strokeWidth='0.75'
                strokeMiterlimit='10'
            />
            <path
                d='M5.40625 5.40552C7.08672 6.59863 9.20224 7.31011 11.5001 7.31011C13.798 7.31011 15.9136 6.59863 17.594 5.40552'
                fill='white'
            />
            <path
                d='M5.40625 5.40552C7.08672 6.59863 9.20224 7.31011 11.5001 7.31011C13.798 7.31011 15.9136 6.59863 17.594 5.40552'
                stroke='#4EA8B4'
                strokeWidth='0.75'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M17.594 17.5945C15.9136 16.4014 13.798 15.6899 11.5001 15.6899C9.20224 15.6899 7.08672 16.4014 5.40625 17.5945'
                stroke='#4EA8B4'
                strokeWidth='0.75'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11.5001 2.3584V20.6396'
                stroke='#4EA8B4'
                strokeWidth='0.75'
                strokeMiterlimit='10'
            />
            <path
                d='M20.6409 11.499H2.35962'
                stroke='#4EA8B4'
                strokeWidth='0.75'
                strokeMiterlimit='10'
            />
        </svg>
    );
}
