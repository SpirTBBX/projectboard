module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        fontFamily: {
            sans: [
                'Inter\\ UI',
                'SF\\ Pro\\ Display',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe\\ UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Open\\ Sans',
                'Helvetica\\ Neue',
                'sans-serif'
            ]
        },
        extend: {
            boxShadow: {
                modal: 'rgb(0 0 0 / 9%) 0px 3px 12px',
                'large-modal': 'rgb(0 0 0 / 50%) 0px 16px 70px'
            },
            spacing: {
                2.5: '10px',
                4.5: '18px',
                3.5: '14px',
                34: '136px',

                70: '280px',
                140: '560px',
                100: '400px',
                175: '700px',
                53: '212px',
                90: '360px'
            },
            fontSize: {
                xxs: '0.5rem',
                xs: '0.75rem', // 12px
                sm: '0.8125rem', // 13px
                md: '0.9357rem', //15px
                14: '0.875rem',
                base: '1.0rem' // 16px
            },
            zIndex: {
                1: 1,
                2: 2,
                10: 10,
                20: 20,
                100: 100
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked']
        }
    },
    plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')]
};