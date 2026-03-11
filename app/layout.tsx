import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Udayveet Singh | Machine Learning Engineer & Photographer",
  description:
    "Portfolio of Udayveet Singh - Machine Learning Engineer specializing in image deep learning and artistic photography. Building AI tools that bridge technology and visual art.",
  keywords: [
    "Machine Learning",
    "AI",
    "Deep Learning",
    "Photography",
    "Computer Vision",
    "Image Processing",
  ],
  authors: [{ name: "Udayveet Singh" }],
  openGraph: {
    title: "Udayveet Singh | Machine Learning Engineer & Photographer",
    description:
      "Building AI tools and capturing artistic photography. Specializing in image deep learning and visual art.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
