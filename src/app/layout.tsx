import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const font = Lora({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Гомбрайх — пространство красоты",
  description: "Выберите услугу и запишиесь онлайн",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
