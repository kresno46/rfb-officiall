import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from "@/components/organisms/LoadingScreen";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    const initialLoad = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
      clearTimeout(initialLoad);
    };
  }, [router]);

  return (
    <>
      <LoadingScreen show={loading} />
      <Component {...pageProps} />
    </>
  );
}
