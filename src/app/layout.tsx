import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "@/context/DashboardContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BiologyDigital – Interactive 3D Cell Explorer",
  description:
    "An interactive 3D dashboard for exploring cell biology: neurons, muscle cells, and plant cells with rich component data.",
  keywords: ["biology", "3D", "cell", "neuron", "muscle", "plant", "education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <DashboardProvider>{children}</DashboardProvider>
      </body>
    </html>
  );
}
