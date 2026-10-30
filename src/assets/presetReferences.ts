// Pre-encoded SVG Data URLs for curated presets (100% offline, zero CORS issues)
const createSvgDataUrl = (svgContent: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
};

export const PRESET_REFERENCES = [
  {
    name: 'Inspiración Tech & Neón (Minimalista)',
    url: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#0d0e1a"/>
        <circle cx="300" cy="200" r="140" fill="none" stroke="#a855f7" stroke-width="6" opacity="0.8"/>
        <circle cx="300" cy="200" r="90" fill="none" stroke="#06b6d4" stroke-width="8" stroke-dasharray="20 10"/>
        <polygon points="300,120 370,240 230,240" fill="none" stroke="#ec4899" stroke-width="7"/>
        <text x="300" y="370" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="4">CYBER & TECH INSPIRATION</text>
      </svg>
    `),
    notes: 'Gradientes modernos, geometría limpia y alto contraste en fondo oscuro.'
  },
  {
    name: 'Inspiración Tipográfica & Branding Premium',
    url: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#0b0d19"/>
        <rect x="150" y="100" width="300" height="200" rx="16" fill="#14172e" stroke="#ffffff15" stroke-width="2"/>
        <text x="300" y="195" font-family="serif" font-size="44" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="6">LUMINA</text>
        <text x="300" y="235" font-family="sans-serif" font-size="12" font-weight="600" fill="#a855f7" text-anchor="middle" letter-spacing="8">STUDIO & DESIGN</text>
        <line x1="200" y1="260" x2="400" y2="260" stroke="#06b6d4" stroke-width="2"/>
        <text x="300" y="370" font-family="sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">Tipografía elegante con proporciones áureas</text>
      </svg>
    `),
    notes: 'Lettering editorial sobrio, serif contemporáneo y alta legibilidad.'
  },
  {
    name: 'Inspiración Emblema & Monograma Dinámico',
    url: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#080a14"/>
        <path d="M 300 80 L 410 170 L 370 310 L 230 310 L 190 170 Z" fill="none" stroke="#06b6d4" stroke-width="6"/>
        <path d="M 300 130 L 370 240 L 230 240 Z" fill="#a855f7" fill-opacity="0.3" stroke="#a855f7" stroke-width="5"/>
        <circle cx="300" cy="200" r="16" fill="#ec4899"/>
        <text x="300" y="370" font-family="sans-serif" font-size="16" font-weight="bold" fill="#e2e8f0" text-anchor="middle" letter-spacing="3">MONOGRAMA & SÍMBOLO ORGÁNICO</text>
      </svg>
    `),
    notes: 'Símbolo compacto que funciona perfectamente como favicon e icono de app.'
  }
];
