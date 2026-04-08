import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Striver Chronos-Wall | Interactive Calendar 2026",
  description:
    "A futuristic 3D interactive wall calendar with range selection, heatmap coding streaks, intelligent notes, and a developer-focused design.",
  keywords: ["calendar", "DSA", "TakeUForward", "Striver", "productivity", "coding"],
  authors: [{ name: "Striver Chronos-Wall" }],
  openGraph: {
    title: "Striver Chronos-Wall",
    description: "A 3D developer-centric interactive calendar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#020617] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
