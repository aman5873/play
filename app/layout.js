"use client";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertProvider } from "@/context/AlertContext";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where header should be hidden
  const hideHeaderRoutes = ["/reset-password"];
  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <LanguageProvider>
            <AlertProvider>
              <AuthProvider>
                {shouldShowHeader && <Header />}
                <main className="flex-grow">{children}</main>
                <Footer />
              </AuthProvider>
            </AlertProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
