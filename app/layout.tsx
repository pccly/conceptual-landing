import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conceptual Studio | Where Ideas Take Shape",
  description: "Journey through infinite possibilities with Conceptual Studio. We transform visionary concepts into extraordinary digital experiences that push the boundaries of creativity and innovation.",
  keywords: ["conceptual studio", "digital agency", "creative studio", "web design", "digital experiences", "innovation", "design agency", "creative services"],
  authors: [{ name: "Conceptual Studio" }],
  creator: "Conceptual Studio",
  publisher: "Conceptual Studio",
  metadataBase: new URL("https://conceptualstudio.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://conceptualstudio.com",
    title: "Conceptual Studio | Where Ideas Take Shape",
    description: "Journey through infinite possibilities with Conceptual Studio. We transform visionary concepts into extraordinary digital experiences.",
    siteName: "Conceptual Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conceptual Studio | Where Ideas Take Shape",
    description: "Journey through infinite possibilities with Conceptual Studio. We transform visionary concepts into extraordinary digital experiences.",
    creator: "@conceptualstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
