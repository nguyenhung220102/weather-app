/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            backgroundColor: {
                "primary-1000": "#0958d9",
                "primary-700": "#1677FF",
                "primary-400": "#758694",
                "primary-100": "#EBF4F6",
            },
            textColor: {
                primary: "#55AD9B",
                secondary: "#C0C0C0",
                placeholder: "#F1F8E8",
            },
            keyframes: {
                slidein: {
                    from: {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    to: {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                slideinleft: {
                    from: {
                        opacity: "0",
                        transform: "translateX(-100%)",
                    },
                    to: {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                slideinright: {
                    from: {
                        opacity: "0",
                        transform: "translateX(100%)",
                    },
                    to: {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                bounceSoft: {
                    "0%, 100%": {
                        transform: "translateY(-15%)",
                        animationTimingFunction: "cubic-bezier(0.6, 0, 0.4, 1)",
                    },
                    "50%": {
                        transform: "translateY(0)",
                        animationTimingFunction: "cubic-bezier(0.3, 0, 0.3, 1)",
                    },
                },
            },
            animation: {
                slidein: "slidein 1s ease var(--slidein-delay, 0) forwards",
                slideinleft:
                    "slideinleft 1s ease var(--slideinleft-delay, 0) forwards",
                slideinright:
                    "slideinright 1s ease var(--slideinright-delay, 0) forwards",
                bounceSoft: "bounceSoft 2s infinite",
                bounceOnce: "bounceSoft 0.5s linear",
            },
        },
    },
    plugins: [],
};
