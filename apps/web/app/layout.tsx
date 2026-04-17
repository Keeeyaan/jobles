import { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobles - Manage Your Job Applications",
  description: "Track and manage all your job applications in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
