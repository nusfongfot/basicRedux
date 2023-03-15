import "@/styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { store } from "@/reduxToolkit/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  );
}
