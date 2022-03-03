import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header/Header";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="min-h-screen bg-[rgba(0,0,0,0)]">
      <ToastContainer />
      <Header />
      <div className="h-[90vh]">
        <Component {...pageProps} />
      </div>
    </main>
  );
}

export default MyApp;
