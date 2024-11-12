import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProviders } from "./auth-providers";
import { Chivo } from "next/font/google";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My X Bedroom",
  description: "See your X profile represented as a unique virtual bedroom",
};

const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"], // Include any weights you need
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProviders>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={chivo.className}>{children}</body>
      </AuthProviders>
    </html>
  );
}
