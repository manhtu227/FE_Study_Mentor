'use client';
import { Colors } from '@core/enums/colors.enum';
import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps, useEffect, useState } from 'react';

interface GraduationIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function GraduationIcon(props: GraduationIconProps): ReactElement {
    const { className, color, ...rest } = props;

    const [colorIcon, setColorIcon] = useState<string>('');

    useEffect(() => {
        setColorIcon(color ?? Colors.CapeCod);
    }, [color]);

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
                d='M22 10V16M22 10L12 5L2 10L12 15L22 10ZM6 12V17C9 20 15 20 18 17V12'
                stroke={colorIcon}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
