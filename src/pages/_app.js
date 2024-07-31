import "@/styles/globals.css";
export const runtime = "edge";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
