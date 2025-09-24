export function minutosAHHMM(min) {
  if (!min && min !== 0) return '';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m.toString().padStart(2,'0')}m`;
}
