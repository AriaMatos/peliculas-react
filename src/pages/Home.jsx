import React, { useMemo, useState, useEffect } from 'react';
import { NOW_PLAYING, UPCOMING } from '../data/localMovies';
import { API, headers, img } from '../api';

function Card({ item, onClick }) {
  const [poster, setPoster] = useState(item.poster || '');

  useEffect(() => {
    let alive = true;
    if (poster || !import.meta.env.VITE_TMDB_TOKEN) return; // si ya hay, o no hay token, no buscamos
    (async () => {
      try {
        const q = encodeURIComponent(item.query || item.title);
        const y = item.year ? `&year=${item.year}` : '';
        const r = await fetch(`${API}/search/movie?query=${q}${y}&language=es-ES`, { headers });
        const d = await r.json();
        const m = d.results?.[0];
        if (alive && m?.poster_path) setPoster(img(m.poster_path));
      } catch {}
    })();
    return () => { alive = false; };
  }, [item, poster]);

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition text-left"
    >
      {poster ? (
        <img src={poster} alt={item.title} className="h-64 w-full object-cover" loading="lazy" />
      ) : (
        <div className="h-64 w-full grid place-items-center bg-gradient-to-br from-purple-700/50 to-indigo-700/50">
          <span className="px-4 text-center text-base font-semibold text-white/90">{item.title}</span>
        </div>
      )}
      <div className="p-4">
        <h4 className="text-white font-semibold group-hover:underline">{item.title}</h4>
        {item.year && <p className="mt-1 text-sm text-white/70">{item.year}</p>}
      </div>
    </button>
  );
}

export default function Home({ navigate }) {
  const [q, setQ] = useState('');

  const filteredNow = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return NOW_PLAYING;
    return NOW_PLAYING.filter((m) => m.title.toLowerCase().includes(s));
  }, [q]);

  const filteredUp = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return UPCOMING;
    return UPCOMING.filter((m) => m.title.toLowerCase().includes(s));
  }, [q]);

  return (
    <>
      {/* Header morado oscuro */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1b1039]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">🎬 Cinema App</h1>
          <input
            type="search"
            placeholder="Buscar…"
            className="w-56 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 text-white">
        {/* EN CINES */}
        <section className="mt-4">
          <h2 className="text-xl font-semibold mb-3">En cines</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {filteredNow.map((m) => (
              <Card key={m.slug} item={m} onClick={() => navigate(`#/movie/${m.slug}`)} />
            ))}
          </div>
        </section>

        {/* PRÓXIMOS */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Próximos estrenos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredUp.map((m) => (
              <Card key={m.slug} item={m} onClick={() => navigate(`#/movie/${m.slug}`)} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
