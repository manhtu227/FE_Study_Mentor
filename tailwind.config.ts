import type { Config } from 'tailwindcss';
import colors from './src/+core/themes/colors';

const config: Config = {
    content: [
        './src/page-ui/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors,
        },
    },
    plugins: [],
    screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1600px',
        '3xl': '1920px',
    },
    corePlugins: {
        preflight: false, // <== disable this!
    },
};
export default config;
