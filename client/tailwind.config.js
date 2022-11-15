module.exports = {
    mode: `jit`,
    content: [
        `./src/**/*.{js,ts,jsx,tsx}`
    ],
    prefix: `tw-`,
    theme: {
        extend: {
            colors: {
                primary: `#57acdc`,
                secondary: `#1f2022`,
                dimsecondary: `#1f2022`,
                dimprimary: `#57acdc`,
                dimWhite: `rgba(255, 255, 255, 0.7)`,
                lightgray: `rgb(225,220,220)`
            },
            fontFamily: {
                poppins: [`Poppins`, `sans-serif`]
            }
        }
    },
    plugins: []
};
