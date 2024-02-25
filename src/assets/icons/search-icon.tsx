import React, { ReactElement, ReactNode, SVGProps } from 'react';

interface SearchIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function SearchIcon(props: SearchIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
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
                d='M21.0002 21L16.7002 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
                stroke='#838B8F'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}