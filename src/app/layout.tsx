import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {AppContextProvider} from "../context/AppContext";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Site Builder",
  description: "build your portfolio in few clicks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </AppContextProvider>
    </html>
  );
}
