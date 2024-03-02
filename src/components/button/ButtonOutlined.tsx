import { RightOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import clsx from 'clsx';
import { ReactNode } from 'react';
type ButtonOutlinedProps = {
    className?: string;
    title: ReactNode;
    isRightIcon?: boolean;
} & ButtonProps;

export default function ButtonOutlined({
    title,
    className,
    isRightIcon,
    ...rest
}: ButtonOutlinedProps) {
    return (
        <Button
            type='text'
            className={clsx(
                'w-full rounded-lg h-[52px] border-primary-800 border-solid border-[2px] text-primary-800 font-bold',
                className,
            )}
            {...rest}
        >
            {title}
            {isRightIcon && <RightOutlined />}
        </Button>
    );
}
