import "@/styles/globals.css";
export const runtime = "experimental-edge";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
