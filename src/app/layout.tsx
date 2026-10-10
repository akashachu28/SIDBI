import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIDBI - MSME Navigator",
  description: "Your business growth workspace",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" style={{ fontFamily: '"Manrope", ui-sans-serif, system-ui, sans-serif' }}>
      <body className="min-h-full" style={{ fontFamily: '"Manrope", ui-sans-serif, system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}
