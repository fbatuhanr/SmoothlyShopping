import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CartSlide from "./components/cart/CartSlide";
import Visited from "./components/visited/visited";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smoothly Shopping",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ToastContainer autoClose={2500} pauseOnHover={false} hideProgressBar={true}/>
          <CartSlide/>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Visited />
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
export const dynamic = 'force-dynamic'