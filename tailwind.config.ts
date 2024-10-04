import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primaryColor: "#0070F4",
                secondColor: "#12509A",
                grey: "#EEEFF1",
                dark_grey: "#EEEFF1",
                lightBlue: "#CCE2FD",
                black: "#CCE2FD",
                white: "#FFFFFF",
                green: "#00B63E",
                orange: "#FAAE59"
            }
        }
    },
    plugins: []
};

export default config;
