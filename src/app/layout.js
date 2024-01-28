import AppProvider from '../components/AppContext'
import Header from "../components/layout/Header";
import { Roboto } from "next/font/google";
import "./globals.css";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Food Order App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-7xl mx-auto p-4">
          <AppProvider>
            <Header />
            {children}
            <footer
              className="p-8 my-6 text-center text-gray-600"
            >
              &copy; 2024  All Rights Are Reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
