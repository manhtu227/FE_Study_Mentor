'use client';
import { Colors } from '@core/enums/colors.enum';
import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps, useEffect, useState } from 'react';

interface StarIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function StarIcon(props: StarIconProps): ReactElement {
    const { className, color, ...rest } = props;

    const [colorIcon, setColorIcon] = useState<string>('');

    useEffect(() => {
        setColorIcon(color ?? Colors.CapeCod);
    }, [color]);

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='21'
            viewBox='0 0 23 21'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M11.5 1L14.59 7.26L21.5 8.27L16.5 13.14L17.68 20.02L11.5 16.77L5.32 20.02L6.5 13.14L1.5 8.27L8.41 7.26L11.5 1Z'
                stroke={colorIcon}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
