type BookMarkIconProps = {
    number: string;
};
export default function BookmarkIcon({ number }: BookMarkIconProps) {
    return (
        <svg
            width='45'
            height='71'
            viewBox='0 0 45 71'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d='M0.5 70.5V58.5H22.5L0.5 70.5Z' fill='url(#paint0_linear_478_3786)' />
            <path d='M44.5 70.5L22.5 58.5H44.5V70.5Z' fill='url(#paint1_linear_478_3786)' />
            <path d='M0.5 0.5H44.5V58.5H0.5V0.5Z' fill='url(#paint2_linear_478_3786)' />
            <text
                x='49%'
                y='30%'
                className='font-bold text-base'
                dominantBaseline='middle'
                textAnchor='middle'
                fill='#F3F9FA'
                fontSize='10'
            >
                {number}
            </text>
            <text
                x='49%'
                y='60%'
                className='font-bold text-xs'
                dominantBaseline='middle'
                textAnchor='middle'
                fill='#F3F9FA'
                fontSize='10'
            >
                Xu
            </text>

            <defs>
                <linearGradient
                    id='paint0_linear_478_3786'
                    x1='22.5'
                    y1='0.5'
                    x2='22.5'
                    y2='70.5'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='#4EA8B4' />
                    <stop offset='1' stopColor='#3D64EE' />
                </linearGradient>
                <linearGradient
                    id='paint1_linear_478_3786'
                    x1='22.5'
                    y1='0.5'
                    x2='22.5'
                    y2='70.5'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='#4EA8B4' />
                    <stop offset='1' stopColor='#3D64EE' />
                </linearGradient>
                <linearGradient
                    id='paint2_linear_478_3786'
                    x1='22.5'
                    y1='0.5'
                    x2='22.5'
                    y2='70.5'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='#4EA8B4' />
                    <stop offset='1' stopColor='#3D64EE' />
                </linearGradient>
            </defs>
        </svg>
    );
}
