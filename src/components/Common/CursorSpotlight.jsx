import React, { useRef } from 'react';

// Efecto de luz que sigue al cursor (solo visual, sin texto visible)
const CursorSpotlight = () => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(360px 360px at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.18), transparent 60%), radial-gradient(140px 140px at var(--x, 50%) var(--y, 50%), rgba(99,102,241,0.22), transparent 65%)',
      }}
    >
      {/* Bloque puramente decorativo para dar altura y visibilidad al efecto */}
      <div className="py-24 sm:py-28" />
    </section>
  );
};

export default CursorSpotlight;
