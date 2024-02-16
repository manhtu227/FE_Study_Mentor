import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
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
            colors: {
                darkBlue: '#0A2277',
                lightBlue: '#3D64EE',
                primary: {
                    1: '#4EA8B4',
                    2: '#3D64EE',
                },
                grayText: '#838B8F',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false, // <== disable this!
    },
};
export default config;
