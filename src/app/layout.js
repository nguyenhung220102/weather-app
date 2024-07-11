import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { ConfigProvider } from "antd";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
    title: "Weather Dashboard",
    description: "Daily weather forecast",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {},
                    },
                }}
            >
                <body className={rubik.className}>
                    <Header />
                    {children}
                </body>
            </ConfigProvider>
        </html>
    );
}
