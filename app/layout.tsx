import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProviders from "@/providers/query-providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Commerce",
    template: "%s | Commerce"
  },
  description: "Commerce"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground">
        <QueryProviders>
          <main>{children}</main>
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                description: "!text-foreground/80"
              }
            }}
          />
        </QueryProviders>
      </body>
    </html>
  );
}
