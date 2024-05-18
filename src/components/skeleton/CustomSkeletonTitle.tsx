import { Skeleton } from 'antd';
type CustomSkeletonTitleProps = {
    isAvatar?: boolean;
    className?: string;
    height?: string;
    marginBottom?: string;
};

export default function CustomSkeletonTitle({
    isAvatar,
    className,
    height = '30px',
    marginBottom = '0px',
}: CustomSkeletonTitleProps) {
    return (
        <Skeleton
            active
            title={{
                width: '100%',
                style: {
                    margin: '0px',
                    marginBlockStart: '0px',
                    height: height,
                    marginBottom: marginBottom,
                },
            }}
            paragraph={{ rows: 0 }}
            className={`rounded-md  w-full flex items-center ${className}`}
            avatar={
                isAvatar
                    ? {
                          shape: 'circle',
                          style: { width: '20px', height: '20px', alignSelf: 'center' },
                      }
                    : undefined
            }
        />
    );
}
