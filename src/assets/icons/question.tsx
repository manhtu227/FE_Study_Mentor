'use client';
import { Colors } from '@core/enums/colors.enum';
import clsx from 'clsx';
import { ReactElement, ReactNode, SVGProps, useEffect, useState } from 'react';

interface QuestionIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function QuestionIcon(props: QuestionIconProps): ReactElement {
    const { className, color, ...rest } = props;

    const [colorIcon, setColorIcon] = useState<string>('');

    useEffect(() => {
        setColorIcon(color ?? Colors.CapeCod);
    }, [color]);

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='24'
            viewBox='0 0 25 24'
            fill='none'
            {...rest}
            className={clsx('h-4 w-4 fill-black', className)}
        >
            <path
                d='M9.58984 9.00008C9.82495 8.33175 10.289 7.76819 10.8998 7.40921C11.5106 7.05024 12.2287 6.91902 12.927 7.03879C13.6253 7.15857 14.2587 7.52161 14.7149 8.06361C15.1712 8.60561 15.4209 9.2916 15.4198 10.0001C15.4198 12.0001 12.4198 13.0001 12.4198 13.0001M12.5 17H12.51M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z'
                stroke={colorIcon}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
