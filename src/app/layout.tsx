import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/contexts/ThemeProvider";
import {LanguageProvider} from "@/contexts/LanguageContext";
import {TooltipProvider} from "@/components/ui/tooltip";
import {AuthProvider} from "@/contexts/AuthContext";
import {ChatProvider} from "@/contexts/ChatContext";
import ChatWoot from "@/components/ChatWoot";
import { DeviceProvider } from "@/contexts/DeviceContext";
import DeviceShell from "@/components/DeviceShell";
import { NavigationProvider } from "@/contexts/NavigationContext";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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
    description: "app de Miqueias Rocha.",
    icons: {
        icon: "/favicon.ico",
    },
    authors: [{ name: "Miqueias Rocha" }],
    keywords: ["Tech Lead", "Java Full Stack", "Developer", "Líder Técnico", "desenvolvedor"],
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthProvider>
          <DeviceProvider>
          <ThemeProvider>
              <TooltipProvider>
                  <LanguageProvider>
                      <ChatProvider>
                          <NavigationProvider>
                              <DeviceShell>
                                  {children}
                              </DeviceShell>
                          </NavigationProvider>
                          <div className="fixed bottom-1 right-12 z-[9999]">
                              <ChatWoot/>
                          </div>
                      </ChatProvider>
                  </LanguageProvider>
              </TooltipProvider>
          </ThemeProvider>
          </DeviceProvider>
      </AuthProvider>
      </body>
      </html>
  );
}
