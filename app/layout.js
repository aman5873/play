"use client";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import { AlertProvider } from "@/context/AlertContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where header should be hidden
  const hideHeaderRoutes = ["/reset-password"];

  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AlertProvider>
              {shouldShowHeader && <Header />}
              <main style={{ padding: 6, paddingTop: 70 }}>{children}</main>
            </AlertProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
