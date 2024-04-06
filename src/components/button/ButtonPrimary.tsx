import { RightOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import clsx from 'clsx';
import { ReactNode } from 'react';
type ButtonPrimaryProps = {
    className?: string;
    title: string | ReactNode;
    isRightIcon?: boolean;
    prefix?: ReactNode;
} & ButtonProps;

export default function ButtonPrimary({
    title,
    className,
    isRightIcon,
    prefix,
    ...rest
}: ButtonPrimaryProps) {
    return (
        <Button
            type='primary'
            className={clsx(
                'w-full rounded-lg h-[52px] bg-primary-800 text-white-900 font-bold flex justify-center items-center',
                className,
            )}
            {...rest}
        >
            {prefix}
            {title}
            {isRightIcon && <RightOutlined />}
        </Button>
    );
}
