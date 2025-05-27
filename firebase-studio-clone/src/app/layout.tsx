import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

// Using Inter as a replacement for Google Sans
// In a real project, we would use the actual Google Sans font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HubbotsX",
  description: "HubbotsX is an entirely web-based workspace for full-stack application development, complete with the latest generative AI, and full-fidelity app previews, powered by cloud emulators.",
  openGraph: {
    title: "HubbotsX",
    description: "HubbotsX is an entirely web-based workspace for full-stack application development, complete with the latest generative AI, and full-fidelity app previews, powered by cloud emulators.",
    images: ["https://ext.same-assets.com/2510403415/3053245229.png"],
  },
  icons: {
    icon: "https://ext.same-assets.com/2510403415/3301625649.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
