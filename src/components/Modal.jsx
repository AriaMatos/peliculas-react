import React, { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, title, children, actions }) {
  const ref = useRef(null);
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape' && open) onClose?.(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) { const prev = document.activeElement; ref.current?.focus(); return () => prev?.focus(); }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
         role="dialog" aria-modal="true"
         onClick={(e)=>{ if(e.target===e.currentTarget) onClose?.(); }}>
      <div ref={ref} tabIndex={-1} className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 hover:bg-gray-100">×</button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {actions && <div className="flex justify-end gap-3 border-t px-6 py-4">{actions}</div>}
      </div>
    </div>
  );
}
