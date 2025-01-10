import {transform} from "next/dist/build/swc";
import type {Config} from "tailwindcss";
const plugin = require("tailwind-scrollbar");
const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            extend: {
                screens: {
                    xs: "500px",
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1280px"
                }
            },
            maxWidth: {
                sm: "600px",
                md: "768px",
                lg: "960px",
                xl: "1200px",
                "2xl": "1550px"
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primaryColor: "#0070F4",
                secondColor: "#005AC3",
                grey: "#EEEFF1",
                dark_grey: "#EEEFF1",
                lightBlue: "#CCE2FD",
                black: "#CCE2FD",
                text: "#121212",
                white: "#FFFFFF",
                green: "#00B63E",
                dark_green: "#006D25",
                orange: "#FAAE59"
            },
            animation: {
                dropdown: "dropdown 0.2s ease-in-out forwards",
                uptown: "uptown 0.2s ease-in-out forwards",
                rotate: "rotate 0.2s ease-in-out forwards",
                rotateContrary: "rotateContrary 0.2s ease-in-out forwards"
            },
            keyframes: {
                dropdown: {
                    "0%": {opacity: "0", transform: "translateY(-10px)"},
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                        visibility: "!visible"
                    }
                },
                uptown: {
                    "0%": {
                        opacity: "1",
                        transform: "translateY(0)",
                        visibility: "visible"
                    },
                    "100%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                        visibility: "hidden"
                    }
                },
                rotate: {
                    "0%": {transform: "rotate(0deg)"},
                    "100%": {transform: "rotate(180deg)"}
                },
                rotateContrary: {
                    "0%": {transform: "rotate(180deg)"},
                    "100%": {transform: "rotate(0deg)"}
                }
            }
        }
    },
    plugins: [plugin]
};

export default config;
