import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "利用規約を理解する",
  description: "利用規約を入力すると、AIによってイントごとに要約が生成されます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow"><StoreProvider>{children}</StoreProvider></main>
          <footer className="bg-blue-100 mt-auto">
            <p className='text-center text-gray-500 py-5'>
              この要約はAIによって生成されます。内容が不正確または不完全な場合があるため、重要な判断の際は必ず原文をご確認ください。
              <br />© 2025 Kazuya Konishi
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
