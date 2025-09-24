// src/data/localMovies.js
// Pósters en /posters/...  |  Fotos del cast en /cast/...
// Trailers (yt) aceptan ID o URL de YouTube.

export const NOW_PLAYING = [
  {
    slug: 'capitan-america-un-nuevo-mundo',
    title: 'Capitán América: Un nuevo mundo',
    year: 2025,
    overview: 'Sam Wilson asume el escudo del Capitán América y enfrenta una amenaza global.',
    poster: '/posters/capitan-america-un-nuevo-mundo.jpg',
    yt: 'https://www.youtube.com/watch?v=RXoqRPP-y5c', // ← Capitán América
    cast: [
      { name: 'Anthony Mackie', character: 'Sam Wilson',     photo: '/cast/anthony-mackie.jfif' },
      { name: 'Harrison Ford',  character: 'Thaddeus Ross',  photo: '/cast/harrison-ford.jfif' },
      { name: 'Carl Lumbly',    character: 'Isaiah Bradley', photo: '/cast/carl-lumbly.jfif' },
    ],
  },
  {
    slug: 'elio',
    title: 'Elio',
    year: 2025,
    overview: 'Un niño es confundido con el embajador de la Tierra ante una asamblea intergaláctica.',
    poster: '/posters/elio.jpg',
    yt: 'https://www.youtube.com/watch?v=waf9snfaUFw', // ← Elio
    cast: [
      { name: 'Jonas Kibreab',   photo: '/cast/yonas-kibreab.jpg' },
      { name: 'America Ferrera', photo: '/cast/america-ferrera.jpg' },
    ],
  },
  {
    slug: 'lilo-y-stitch',
    title: 'Lilo & Stitch',
    year: 2025,
    overview: 'Acción real del clásico: una niña hawaiana adopta a un experimento alienígena.',
    poster: '/posters/lilo-y-stitch.jpg',
    yt: 'https://www.youtube.com/watch?v=VWqJifMMgZE', // ← Lilo & Stitch
    cast: [
      { name: 'Maia Kealoha',      photo: '/cast/maia-kealoha.jpg' },
      { name: 'Zach Galifianakis', photo: '/cast/zach-galifianakis.jpg' },
    ],
  },
  {
    slug: 'los-cuatro-fantasticos',
    title: 'Los Cuatro Fantásticos',
    year: 2025,
    overview: 'La primera familia de Marvel enfrenta un nuevo desafío.',
    poster: '/posters/los-cuatro-fantasticos.jpg',
    yt: 'https://www.youtube.com/watch?v=waf9snfaUFw', // ← Los Cuatro Fantásticos
    cast: [
      { name: 'Pedro Pascal',       photo: '/cast/pedro-pascal.jpg' },
      { name: 'Vanessa Kirby',      photo: '/cast/vanessa-kirby.jpg' },
      { name: 'Joseph Quinn',       photo: '/cast/joseph-quinn.jfif' }, // jfif
      { name: 'Ebon Moss-Bachrach', photo: '/cast/ebon-moss-bachrach.jpg' },
    ],
  },
  {
    slug: 'como-entrenar-a-tu-dragon',
    title: 'Cómo entrenar a tu dragón',
    year: 2025,
    overview: 'Nueva versión en acción real del clásico de Hipo y Desdentao.',
    poster: '/posters/como-entrenar-a-tu-dragon.jpg',
    yt: 'https://www.youtube.com/watch?v=liGB1ssYn38', // ← Cómo entrenar a tu dragón (2025)
    cast: [
      { name: 'Mason Thames', character: 'Hipo',   photo: '/cast/mason-thames.jpg' },
      { name: 'Nico Parker',  character: 'Astrid', photo: '/cast/nico-parker.jfif' }, // jfif
      { name: 'Gerard Butler', character: 'Stoick', photo: '/cast/gerald-butler.jpg' },
    ],
  },
];

export const UPCOMING = [
  {
    slug: 'tron-ares',
    title: 'TRON: Ares',
    year: 2025,
    overview: 'Nueva entrega que conecta el mundo real con el digital.',
    poster: '/posters/tron-ares.jpg',
    yt: 'https://www.youtube.com/watch?v=YShVEXb7-ic', // ← TRON: Ares
    cast: [{ name: 'Jared Leto', photo: '/cast/jared-leto.jpg' }],
  },
  {
    slug: 'zootopia-2',
    title: 'Zootopia 2',
    year: 2025,
    overview: 'Judy Hopps y Nick Wilde regresan a Zootopía.',
    poster: '/posters/zootopia-2.jpg',
    yt: 'https://www.youtube.com/watch?v=A-7RMaQaygI', // ← Zootopia 2
    cast: [
      { name: 'Ginnifer Goodwin', photo: '/cast/ginnifer-goodwin.jpg' },
      { name: 'Jason Bateman',    photo: '/cast/jason-bateman.jpg' },
    ],
  },
  {
    slug: 'shrek-5',
    title: 'Shrek 5',
    year: 2026,
    overview: 'La nueva aventura de Shrek y compañía.',
    poster: '/posters/shrek-5.jpg',
    yt: 'https://www.youtube.com/watch?v=7Bzbckc1IUI', // ← Shrek 5
    cast: [
      { name: 'Mike Myers',   photo: '/cast/mike-myers.jpg' },
      { name: 'Eddie Murphy', photo: '/cast/eddie-murphy.jpg' },
      { name: 'Cameron Diaz', photo: '/cast/cameron-diaz.jpg' },
    ],
  },
  {
    slug: 'moana-2',
    title: 'Moana 2',
    year: 2024,
    overview: 'Moana emprende una nueva aventura por los mares.',
    poster: '/posters/moana-2.jpg',
    yt: 'https://www.youtube.com/watch?v=hDZ7y8RP5HE', // ← Moana 2
    cast: [
      { name: 'Auliʻi Cravalho', photo: '/cast/aulii-cravalho.jpg' },
      { name: 'Dwayne Johnson',  photo: '/cast/dwayne-johnson.jpg' },
    ],
  },
];

export const getBySlug = (slug) =>
  [...NOW_PLAYING, ...UPCOMING].find((m) => m.slug === slug);
