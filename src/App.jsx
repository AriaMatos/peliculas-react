import React, { useMemo, useState, useEffect } from 'react';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = (h) => {
    if (h === hash) return;
    window.location.hash = h || '';
  };
  return { hash, navigate };
}

export default function App() {
  const { hash, navigate } = useHashRoute();
  const currentSlug = useMemo(
    () => (hash?.startsWith('#/movie/') ? decodeURIComponent(hash.replace('#/movie/', '')) : null),
    [hash]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#140a2e] to-[#1f0f3f]">
      {currentSlug ? <MovieDetail slug={currentSlug} navigate={navigate} /> : <Home navigate={navigate} />}
    </div>
  );
}
