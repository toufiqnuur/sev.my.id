import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sev my id",
  description:
    "Sev - Make it short, make it simple. Shorten, track, and share your links with our all-in-one URL shortener. Enjoy personalized link customization, rapid link shortening through our powerful API, and advanced security with password protection and expiration dates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {children}
    </html>
  );
}
