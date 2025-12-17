import type { Metadata } from "next";
import { Inter, Poppins, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import GlobalLoader from "@/components/(shared)/GlobalLoader";

// Primary font for headings and important text
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

// Secondary font for body text and UI elements
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

// Alternative modern font for special sections
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

// Fallback font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Transport Management System",
  description: "Efficient transport and delivery management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${jakarta.variable} ${outfit.variable} ${inter.variable} font-jakarta antialiased`}>
        <AuthProvider>
          <LoaderProvider>
            <GlobalLoader />
            {children}
          </LoaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
