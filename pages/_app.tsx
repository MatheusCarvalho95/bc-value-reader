import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/sass/datePicker.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
