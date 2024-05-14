// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/global.css";
import AdminPage from "./admin";

function MyApp({ Component, pageProps }: AppProps) {
  return <AdminPage />;
}

export default MyApp;
