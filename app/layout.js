import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenContextProvider } from "./context/token";
import Fetch from "./Helpers/Fetch";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "مینی سایت آموزش خیاطی",
  description: "آموزش خیاطی ",
  manifest: "/manifest.json",
  icons: { apple: "/icon512_maskable.png" },
};

export default function RootLayout({ children }) {
  return (
    <TokenContextProvider>
      <html lang="en">
        <head>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
        </head>
        <body>
          <ToastContainer
            position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {children}
        </body>
      </html>
    </TokenContextProvider>
  );
}
