import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/contexts/ThemeProvider";
import {LanguageProvider} from "@/contexts/LanguageContext";
import {TooltipProvider} from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Miqueias Rocha",
    description: "Portfólio de Miqueias Rocha.",
    icons: {
        icon: "/favicon.ico",
    },
    authors: [{ name: "Miqueias Rocha" }],
    keywords: ["Tech Lead", "Java Full Stack", "Developer", "Líder Técnico", "desenvolvedor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider>
          <TooltipProvider>
              <LanguageProvider>
                  {children}
              </LanguageProvider>
          </TooltipProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
