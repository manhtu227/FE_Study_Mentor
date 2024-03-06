import { ReactElement, ReactNode, SVGProps } from 'react';

interface WalletIconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
}

export default function WalletIcon(props: WalletIconProps): ReactElement {
    const { className, ...rest } = props;

    return (
        <svg
            width='24'
            height='23'
            viewBox='0 0 24 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <path
                d='M5.11334 4.81804H19.1758C19.3401 4.81797 19.5042 4.82839 19.6671 4.84924C19.6119 4.46155 19.4787 4.08905 19.2757 3.75421C19.0726 3.41937 18.8038 3.12913 18.4855 2.90097C18.1672 2.67282 17.806 2.51149 17.4237 2.4267C17.0414 2.34192 16.6458 2.33543 16.2609 2.40764L4.69586 4.38211H4.68267C3.95673 4.52093 3.31117 4.93165 2.87784 5.5304C3.53069 5.06604 4.31219 4.81701 5.11334 4.81804V4.81804Z'
                fill='white'
            />
            <path
                d='M19.176 5.875H5.11349C4.36782 5.87581 3.65293 6.17239 3.12566 6.69966C2.59839 7.22693 2.30181 7.94183 2.30099 8.6875V17.125C2.30181 17.8707 2.59839 18.5856 3.12566 19.1128C3.65293 19.6401 4.36782 19.9367 5.11349 19.9375H19.176C19.9217 19.9367 20.6366 19.6401 21.1638 19.1128C21.6911 18.5856 21.9877 17.8707 21.9885 17.125V8.6875C21.9877 7.94183 21.6911 7.22693 21.1638 6.69966C20.6366 6.17239 19.9217 5.87581 19.176 5.875V5.875ZM17.0886 14.3125C16.8105 14.3125 16.5386 14.23 16.3073 14.0755C16.0761 13.921 15.8958 13.7014 15.7894 13.4444C15.6829 13.1874 15.6551 12.9047 15.7094 12.6319C15.7636 12.3591 15.8976 12.1085 16.0942 11.9119C16.2909 11.7152 16.5415 11.5813 16.8142 11.527C17.087 11.4728 17.3698 11.5006 17.6267 11.607C17.8837 11.7135 18.1033 11.8937 18.2578 12.125C18.4124 12.3562 18.4948 12.6281 18.4948 12.9062C18.4948 13.2792 18.3467 13.6369 18.083 13.9006C17.8192 14.1643 17.4615 14.3125 17.0886 14.3125Z'
                fill='white'
            />
            <path
                d='M2.32288 11.6514V7.27881C2.32288 6.32651 2.85022 4.72998 4.68054 4.38413C6.23401 4.09277 7.77209 4.09277 7.77209 4.09277C7.77209 4.09277 8.78284 4.7959 7.94788 4.7959C7.11291 4.7959 7.13489 5.87256 7.94788 5.87256C8.76086 5.87256 7.94788 6.90527 7.94788 6.90527L4.67395 10.6187L2.32288 11.6514Z'
                fill='white'
            />
        </svg>
    );
}
