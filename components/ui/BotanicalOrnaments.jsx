'use client';

export function VintageFlourish({ className = '', color = '#C5AD7B' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 20 Q50 5 100 20 Q150 35 190 20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 20 Q50 35 100 20 Q150 5 190 20"
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="100" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="10" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="190" cy="20" r="2" fill={color} opacity="0.6" />
      <path d="M85 20 Q100 8 115 20" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function VenueEstateSketch({ className = '', color = '#C5AD7B' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main building */}
      <rect x="80" y="90" width="140" height="90" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Roof */}
      <polygon points="70,90 150,40 230,90" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Door */}
      <rect x="135" y="140" width="30" height="40" stroke={color} strokeWidth="1" fill="none" opacity="0.8" />
      {/* Windows */}
      <rect x="95" y="105" width="25" height="25" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      <rect x="180" y="105" width="25" height="25" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      {/* Cross on windows */}
      <line x1="107.5" y1="105" x2="107.5" y2="130" stroke={color} strokeWidth="0.7" opacity="0.6" />
      <line x1="95" y1="117.5" x2="120" y2="117.5" stroke={color} strokeWidth="0.7" opacity="0.6" />
      <line x1="192.5" y1="105" x2="192.5" y2="130" stroke={color} strokeWidth="0.7" opacity="0.6" />
      <line x1="180" y1="117.5" x2="205" y2="117.5" stroke={color} strokeWidth="0.7" opacity="0.6" />
      {/* Trees */}
      <ellipse cx="45" cy="120" rx="18" ry="28" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="45" y1="148" x2="45" y2="180" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="255" cy="120" rx="18" ry="28" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="255" y1="148" x2="255" y2="180" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Ground line */}
      <line x1="20" y1="180" x2="280" y2="180" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Chimney */}
      <rect x="160" y="55" width="12" height="25" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
    </svg>
  );
}

export function WaxSealMonogram({ letter1 = 'S', letter2 = 'A', size = 80 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer seal ring */}
      <circle cx="50" cy="50" r="46" fill="#EAE6DD" stroke="#C5AD7B" strokeWidth="2" />
      {/* Decorative inner ring */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="#C5AD7B" strokeWidth="0.8" opacity="0.8" />
      {/* Starburst points */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 38 * Math.cos(rad);
        const y1 = 50 + 38 * Math.sin(rad);
        const x2 = 50 + 44 * Math.cos(rad);
        const y2 = 50 + 44 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C5AD7B" strokeWidth="1" opacity="0.7" />;
      })}
      {/* Monogram letters */}
      <text
        x="35"
        y="58"
        textAnchor="middle"
        fill="#242424"
        fontSize="22"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="300"
      >
        {letter1}
      </text>
      <text x="50" y="54" textAnchor="middle" fill="#C5AD7B" fontSize="10" fontFamily="Georgia, serif" opacity="0.9">
        &amp;
      </text>
      <text
        x="65"
        y="58"
        textAnchor="middle"
        fill="#242424"
        fontSize="22"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="300"
      >
        {letter2}
      </text>
    </svg>
  );
}

export function FloralCorner({ className = '', flip = false, color = '#C5AD7B' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <path d="M10 110 Q10 10 110 10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M10 110 Q30 50 80 20" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
      {/* Flower 1 */}
      <circle cx="80" cy="20" r="4" fill={color} opacity="0.7" />
      <circle cx="80" cy="12" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <circle cx="88" cy="20" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <circle cx="80" cy="28" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <circle cx="72" cy="20" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
      {/* Leaf details */}
      <path d="M55 45 Q65 35 70 40" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M35 65 Q45 55 50 62" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="55" cy="45" r="2" fill={color} opacity="0.5" />
      <circle cx="35" cy="65" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

export function DividerOrnament({ className = '', color = '#C5AD7B' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D8D2C7]" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={color} opacity="0.85" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D8D2C7]" />
    </div>
  );
}
