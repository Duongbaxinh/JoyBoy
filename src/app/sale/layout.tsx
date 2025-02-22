import Navbar from "@/components/sale/navbar/navbar";
import Head from "next/head";

export default function SaleLayout({children}: {children: React.ReactNode}) {
    return (
        <body className="">
            <Navbar />
            {children}
        </body>
    );
}
