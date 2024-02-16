'use client';
import { Colors } from '@core/enums/colors.enum';
import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps, useEffect, useState } from 'react';

interface CreateQuestionIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function CreateQuestionIcon(props: CreateQuestionIconProps): ReactElement {
    const { className, color, ...rest } = props;

    const [colorIcon, setColorIcon] = useState<string>('');

    useEffect(() => {
        setColorIcon(color ?? Colors.CapeCod);
    }, [color]);

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='22'
            viewBox='0 0 23 22'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M17.5 8H19.5C20.0304 8 20.5391 8.21071 20.9142 8.58579C21.2893 8.96086 21.5 9.46957 21.5 10V21L17.5 17H11.5C10.9696 17 10.4609 16.7893 10.0858 16.4142C9.71071 16.0391 9.5 15.5304 9.5 15V14M13.5 8C13.5 8.53043 13.2893 9.03914 12.9142 9.41421C12.5391 9.78929 12.0304 10 11.5 10H5.5L1.5 14V3C1.5 1.9 2.4 1 3.5 1H11.5C12.0304 1 12.5391 1.21071 12.9142 1.58579C13.2893 1.96086 13.5 2.46957 13.5 3V8Z'
                stroke={colorIcon}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
