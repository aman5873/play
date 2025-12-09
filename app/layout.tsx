"use client";
import "./globals.css";

import React, { useState } from "react";
import { Rajdhani } from "next/font/google";

import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AlertProvider } from "@/context/AlertContext";
import { AuthProvider } from "@/context/AuthContext";

import { Sidebar, MobileSidebar } from "@/components/common/SideNavbar";
import Header from "@/components/common/Header";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import GlobalNotificationListener from "@/components/notification/GlobalNotificationListener";
import {
  NotificationToasts,
  useToasts,
} from "@/components/notification/NotificationToast";

const nyxerin = localFont({
  src: "./fonts/NYXERIN.woff2",
  variable: "--font-nyxerin",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // all weights
  variable: "--font-rajdhani", // CSS variable for Tailwind
});

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 initialize toast system here (GLOBAL)
  const { toasts, addToast, removeToast } = useToasts();

  return (
    <html lang="en" className={`${rajdhani.variable} ${nyxerin.variable}`}>
      <body className="flex min-h-screen bg-[var(--bg)] text-[var(--text)] font-rajdhani overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
            <AlertProvider>
              <AuthProvider>
                <div className="flex h-screen w-screen">
                  {/* 🔥 Render toasts globally */}
                  <NotificationToasts
                    toasts={toasts}
                    removeToast={removeToast}
                  />

                  {/* 🔥 Listener uses same addToast() */}
                  <GlobalNotificationListener addToast={addToast} />

                  {/* Sidebar  */}
                  <Sidebar />

                  {/* Mobile Sidebar */}
                  <MobileSidebar
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  />

                  {/* Right Section */}
                  <div className="flex flex-col flex-1 h-full min-w-0">
                    <Header onMenuClick={() => setIsOpen(true)} />

                    {/* Content */}
                    <main className="flex-1 w-full  overflow-y-auto scrollbar-hide">
                      {children}
                      <Footer />
                    </main>
                  </div>
                </div>
              </AuthProvider>
            </AlertProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
