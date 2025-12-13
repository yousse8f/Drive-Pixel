import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/context/CartContext";
import FloatingCartButton from "@/components/ui/FloatingCartButton";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DrivePixel - Intelligent Digital Solutions",
    description: "Transform your business with innovative digital solutions, cloud infrastructure, and AI-powered automation from DrivePixel.",
    keywords: ["web development", "cloud solutions", "AI automation", "digital transformation", "software development"],
    icons: {
        icon: "/images/logo-eecf49f1.png",
        apple: "/images/logo-eecf49f1.png",
    },
    openGraph: {
        title: "DrivePixel - Intelligent Digital Solutions",
        description: "Transform your business with innovative digital solutions, cloud infrastructure, and AI-powered automation.",
        url: "https://drivepixel.com",
        siteName: "DrivePixel",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <CartProvider>
                    {children}
                    <WhatsAppButton />
                    <FloatingCartButton />
                </CartProvider>
            </body>
        </html>
    );
}
