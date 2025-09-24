// src/pages/MovieDetail.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { getBySlug } from '../data/localMovies';

const getSlugFromHash = () => {
  const h = window.location.hash || '';
  const m = h.match(/^#\/movie\/(.+)$/);
  return m ? decodeURIComponent(m[1]) : '';
};

const toYtId = (v = '') => {
  if (!v) return '';
  if (/^[A-Za-z0-9_-]{6,}$/.test(v)) return v; // ya es un ID
  try {
    const u = new URL(v);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const m = u.pathname.match(/\/embed\/([A-Za-z0-9_-]{6,})/);
    return m?.[1] || '';
  } catch {
    return '';
  }
};

const embedUrl = (id) =>
  id
    ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&origin=${window.location.origin}`
    : '';
const watchUrl = (id) => (id ? `https://www.youtube.com/watch?v=${id}` : '#');

export default function MovieDetail() {
  const [slug, setSlug] = useState(getSlugFromHash());
  const base = useMemo(() => getBySlug(slug), [slug]);

  // Trae el ID desde el dataset (campo "yt") y conviértelo a ID usable
  const [ytKey, setYtKey] = useState(toYtId(base?.yt));

  // Escucha cambios de hash (por si navegas entre detalles)
  useEffect(() => {
    const onHash = () => setSlug(getSlugFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Si cambia la película base, recalcula el trailer
  useEffect(() => {
    setYtKey(toYtId(base?.yt));
  }, [base]);

  if (!base) {
    return <div className="p-6 text-white">Película no encontrada.</div>;
  }

  const { title, year, overview, cast = [] } = base;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <button
        onClick={() => history.back()}
        className="mb-6 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20 transition"
      >
        ← Regresar
      </button>

      <header className="mb-8">
        <div className="rounded-3xl bg-gradient-to-br from-white/5 to-white/0 p-10">
          <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
        </div>
        {year && (
          <span className="mt-4 inline-block text-sm bg-white/10 rounded-full px-3 py-1">
            {year}
          </span>
        )}
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Sinopsis</h2>
        <p className="text-white/80">{overview || 'Sin sinopsis.'}</p>
      </section>

      {!!cast.length && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Reparto principal</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cast.map((c, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-3">
                <div className="h-28 w-full overflow-hidden rounded-xl mb-2">
                  <img
                    src={c.photo}
                    alt={c.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-sm font-medium">{c.name}</div>
                {c.character && (
                  <div className="text-xs text-white/60">{c.character}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Tráiler Oficial</h2>
        {ytKey ? (
          <div className="space-y-3">
            <iframe
              key={ytKey}
              className="w-full aspect-video rounded-2xl border border-white/10"
              src={embedUrl(ytKey)}
              title={`Tráiler de ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {/* Respaldo por si el canal bloquea embeds */}
            <a
              href={watchUrl(ytKey)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20 transition text-sm"
            >
              Abrir tráiler en YouTube
            </a>
          </div>
        ) : (
          <p className="text-white/60 text-sm">
            No se encontró un tráiler. Añade <code>yt</code> en tu dataset o usa TMDb.
          </p>
        )}
      </section>
    </div>
  );
}
