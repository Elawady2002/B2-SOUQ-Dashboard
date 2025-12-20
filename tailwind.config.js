/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0554FF',
                    50: '#E6EFFF',
                    100: '#CCE0FF',
                    200: '#99C1FF',
                    300: '#66A1FF',
                    400: '#3382FF',
                    500: '#0554FF',
                    600: '#0043CC',
                    700: '#003299',
                    800: '#002266',
                    900: '#001133',
                },
                secondary: {
                    DEFAULT: '#E6D400',
                    50: '#FFFEF0',
                    100: '#FFFCE0',
                    200: '#FFF9C2',
                    300: '#FFF5A3',
                    400: '#FFF285',
                    500: '#E6D400',
                    600: '#B8AA00',
                    700: '#8A7F00',
                    800: '#5C5500',
                    900: '#2E2A00',
                },
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444',
                info: '#06b6d4',
            },
            fontSize: {
                'xs': ['12px', { lineHeight: '16px' }],
                'sm': ['14px', { lineHeight: '20px' }],
                'base': ['16px', { lineHeight: '24px' }],
                'lg': ['18px', { lineHeight: '28px' }],
                'xl': ['20px', { lineHeight: '28px' }],
                '2xl': ['24px', { lineHeight: '32px' }],
                '3xl': ['30px', { lineHeight: '36px' }],
                '4xl': ['36px', { lineHeight: '40px' }],
            },
            fontFamily: {
                cairo: ['Cairo', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
