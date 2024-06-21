'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import mainLoad from './../../public/json/mainload.json';
import Router from 'next/router';
import * as gtag from '@/utils/gtag';


export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* {loading ? (
        <Player
          autoplay
          loop
          src={mainLoad}
          style={{ width: '30vh' }}
        >
        </Player>
      ) : null} */}
    </div>
  );
}
