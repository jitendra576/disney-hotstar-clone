import "tailwindcss/tailwind.css";
import "../styles.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";

export default function App({
  Component,
  pageProps,
}: AppProps & { pageProps: { session: any } }) {
  return (
    <Provider session={pageProps?.session}>
      <Component {...pageProps} />;
    </Provider>
  );
}
