import { RightOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import clsx from 'clsx';
import { ReactNode } from 'react';
type ButtonPrimaryProps = {
    className?: string;
    title: ReactNode;
    isRightIcon?: boolean;
} & ButtonProps;

export default function ButtonPrimary({
    title,
    className,
    isRightIcon,
    ...rest
}: ButtonPrimaryProps) {
    return (
        <Button
            type='primary'
            className={clsx(
                'w-full rounded-lg h-[52px] bg-[#3D64EE] text-white-900 font-bold',
                className,
            )}
            {...rest}
        >
            {title}
            {isRightIcon && <RightOutlined />}
        </Button>
    );
}
