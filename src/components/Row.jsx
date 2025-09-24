import React, { useEffect, useState } from 'react';
import { API, headers, img } from '../api';

export default function Row({ title, path, onSelect }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const r = await fetch(`${API}${path}`, { headers });
      const d = await r.json();
      if (alive) setItems(d.results || []);
    })();
    return () => { alive = false; };
  }, [path]);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar" style={{scrollSnapType:'x proximity'}}>
        {items.map(m => (
          <button key={m.id} onClick={()=>onSelect?.(m)} className="w-36 shrink-0 text-left" style={{scrollSnapAlign:'start'}} title={m.title}>
            <img src={img(m.poster_path)} alt={m.title} className="h-52 w-36 object-cover rounded-xl shadow" loading="lazy"/>
            <p className="mt-2 text-sm font-medium truncate">{m.title}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
