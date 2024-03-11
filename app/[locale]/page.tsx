'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import mainLoad from './../../public/json/mainload.json';

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/innovationboard');
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        // <div>Loading...</div>
        <Player
          autoplay
          loop
          src={mainLoad}
          style={{ width: '30vh' }}
        >
        </Player>
      ) : null}
    </div>
  );
}
