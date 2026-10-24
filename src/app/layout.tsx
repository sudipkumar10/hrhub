import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HR Hub",
    template: "%s | HR Hub",
  },
  description:
    "HR Hub — modern HR management platform to manage employees, attendance, payroll, and leave requests in one place.",
  keywords: [
    "HR",
    "HRMS",
    "employees",
    "payroll",
    "attendance",
    "leave management",
  ],
  authors: [{ name: "HR Hub Team" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="antialiased min-h-svh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <TooltipProvider>
              <Suspense
                fallback={<div className="h-[61px] border-b bg-background" />}
              >
                <Header />
              </Suspense>
              <main className="flex-1 flex flex-col">{children}</main>
            </TooltipProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
