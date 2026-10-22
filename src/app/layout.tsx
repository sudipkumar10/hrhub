import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
