import 'dotenv/config';

const API = 'https://api.themoviedb.org/3';
const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`,
};

const movies = [
  { title: 'Captain America: Brave New World', year: 2025, alt: ['Capitán América: Un nuevo mundo'] },
  { title: 'Elio', year: 2025 },
  { title: 'Lilo & Stitch', year: 2025 },
  { title: 'The Fantastic Four', year: 2025, alt: ['Los Cuatro Fantásticos'] },
  { title: 'How to Train Your Dragon', year: 2025, alt: ['Cómo entrenar a tu dragón'] },
  { title: 'TRON: Ares', year: 2025 },
  { title: 'Zootopia 2', year: 2025, alt: ['Zootrópolis 2', 'Zootopía 2'] },
  { title: 'Shrek 5', year: 2026 },
  { title: 'Moana 2', year: 2024 },
];

const bestTrailer = (videos = []) => {
  const yt = videos.filter(v => v.site === 'YouTube');
  const langs = ['es', 'es-ES', 'en', 'en-US'];
  for (const lng of langs) {
    const t = yt.find(v => v.type==='Trailer' && v.official && v.iso_639_1===lng);
    if (t) return `https://www.youtube.com/watch?v=${t.key}`;
  }
  const t1 = yt.find(v => v.type==='Trailer' && v.official);
  if (t1) return `https://www.youtube.com/watch?v=${t1.key}`;
  const t2 = yt.find(v => v.type==='Trailer');
  if (t2) return `https://www.youtube.com/watch?v=${t2.key}`;
  return yt[0]?.key ? `https://www.youtube.com/watch?v=${yt[0].key}` : null;
};

for (const m of movies) {
  const search = async (q) => {
    const y = m.year ? `&year=${m.year}` : '';
    const res = await fetch(`${API}/search/movie?query=${encodeURIComponent(q)}${y}&language=es-ES&include_adult=false`, { headers });
    return res.json();
  };

  let data = await search(m.title);
  if (!data.results?.length && m.alt?.length) {
    for (const a of m.alt) {
      data = await search(a);
      if (data.results?.length) break;
    }
  }

  const movie = data.results?.[0];
  if (!movie) {
    console.log(`${m.title}: NOT FOUND`);
    continue;
  }

  // primero en es-ES, si no, sin language (todos)
  let vids = await (await fetch(`${API}/movie/${movie.id}/videos?language=es-ES`, { headers })).json();
  if (!vids.results?.length) {
    vids = await (await fetch(`${API}/movie/${movie.id}/videos`, { headers })).json();
  }

  const link = bestTrailer(vids.results);
  console.log(link ? `${m.title}: ${link}` : `${m.title}: (no trailer yet)`);
}
