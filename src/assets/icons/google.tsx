import { ReactElement, ReactNode, SVGProps } from 'react';

interface GlobeIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function GoogleIcon(props: GlobeIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='57'
            height='57'
            viewBox='0 0 57 57'
            fill='none'
            className={className}
            {...rest}
        >
            <path
                d='M56 28.5C56 13.3122 43.6878 1 28.5 1C13.3122 1 1 13.3122 1 28.5C1 43.6878 13.3122 56 28.5 56C43.6878 56 56 43.6878 56 28.5Z'
                fill='white'
                stroke='#D6D6D6'
                strokeWidth='0.75'
                strokeMiterlimit='10'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M39.8244 28.8313C39.8244 27.9998 39.7521 27.2045 39.6075 26.4453H28.6055V30.9642H34.8958C34.6307 32.4223 33.7992 33.6635 32.57 34.4829V37.4112H36.3418C38.547 35.3747 39.8244 32.3862 39.8244 28.8313Z'
                fill='#4285F4'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M28.6192 40.2431C31.7764 40.2431 34.4155 39.1947 36.3435 37.4113L32.5718 34.483C31.5234 35.1819 30.1858 35.5916 28.6192 35.5916C25.5825 35.5916 23.0038 33.5431 22.0879 30.7715H18.1836V33.7961C20.0996 37.6161 24.0521 40.231 28.6192 40.231V40.2431Z'
                fill='#34A853'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M22.0869 30.7834C21.858 30.0845 21.7254 29.3374 21.7254 28.5661C21.7254 27.7949 21.858 27.0478 22.0869 26.3489V23.3242H18.1826C17.3873 24.9028 16.9414 26.6863 16.9414 28.5661C16.9414 30.446 17.3873 32.2295 18.1826 33.8081L22.0869 30.7834Z'
                fill='#FBBC05'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M28.6192 21.5281C30.3304 21.5281 31.8728 22.1185 33.0779 23.2754L36.4279 19.9254C34.4034 18.0455 31.7644 16.8887 28.6192 16.8887C24.0521 16.8887 20.0996 19.5036 18.1836 23.3236L22.0879 26.3482C23.0038 23.5887 25.5825 21.5281 28.6192 21.5281Z'
                fill='#EA4335'
            />
        </svg>
    );
}
