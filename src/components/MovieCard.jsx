import React from 'react';
import { minutosAHHMM } from '../utils/time';

export default function MovieCard({ movie, onClick }) {
  return (
    <button onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition-all text-left">
      <img src={movie.poster} alt={`Poster de ${movie.titulo}`}
           className="h-64 w-full object-cover" loading="lazy" />
      <div className="p-4">
        <h4 className="text-lg font-semibold group-hover:underline">{movie.titulo}</h4>
        <p className="mt-1 text-sm text-gray-600">{movie.anio}</p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1 text-xs">
          ⭐ {movie.rating?.toFixed?.(1) ?? movie.rating}
          {movie.duracionMin ? <> · {minutosAHHMM(movie.duracionMin)}</> : null}
        </div>
      </div>
    </button>
  );
}
