import type { Metadata } from "next";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import CartSlide from "./components/cart/CartSlide";

import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Smoothly Shopping",
  description: "Generated by create next app",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <ToastContainer autoClose={2500} pauseOnHover={false} hideProgressBar={true} />
            <CartSlide />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
export const dynamic = 'force-dynamic'