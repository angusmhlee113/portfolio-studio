import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Angus — A little world of ideas",
  description:
    "A playful interactive portfolio concept for Angus. Work experience, education, and an animated studio avatar.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
