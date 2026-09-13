import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const displayFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display-family",
  weight: ["500", "600", "700", "800"],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-family",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Life RPG — Turn Your Life Into a Game",
  description:
    "Turn everyday tasks into quests. Earn XP, level up attributes, build streaks, and unlock rewards as you build real habits.",
  openGraph: {
    title: "Life RPG — Turn Your Life Into a Game",
    description:
      "Turn everyday tasks into quests. Earn XP, level up attributes, build streaks, and unlock rewards as you build real habits.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", displayFont.variable, bodyFont.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}