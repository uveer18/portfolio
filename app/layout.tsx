import type { Metadata, Viewport } from "next";
import { HeroProvider } from "@/components/hero-context";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Udayveer Singh | Machine Learning Engineer & Photographer",
  description:
    "Portfolio of Udayveer Singh - Machine Learning Engineer specializing in image deep learning and artistic photography. Building AI tools that bridge technology and visual art.",
  keywords: [
    "Machine Learning",
    "AI",
    "Deep Learning",
    "Photography",
    "Computer Vision",
    "Image Processing",
  ],
  authors: [{ name: "Udayveer Singh" }],
  openGraph: {
    title: "Udayveer Singh | Machine Learning Engineer & Photographer",
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
    <html lang="en">
      <body className="min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider>
          <HeroProvider>{children}</HeroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
