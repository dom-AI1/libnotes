// Hand-drawn editorial illustration for Card 1: Learn Your Way (Notebook + Coffee + Speech bubble)
export const NotebookIllustration = ({ className = 'w-full h-44' }: { className?: string }) => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Subtle paper background tilt */}
    <rect x="42" y="32" width="220" height="126" rx="8" fill="#F1F7EA" stroke="#141414" strokeWidth="1.75" />
    <rect x="52" y="24" width="220" height="126" rx="8" fill="#FCFAF6" stroke="#141414" strokeWidth="1.75" />
    
    {/* Notebook binding rings */}
    <line x1="68" y1="20" x2="68" y2="34" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="98" y1="20" x2="98" y2="34" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="128" y1="20" x2="128" y2="34" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="158" y1="20" x2="158" y2="34" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="188" y1="20" x2="188" y2="34" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="218" y1="20" x2="218" y2="34" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="248" y1="20" x2="248" y2="34" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />

    {/* Note text lines with green highlight */}
    <rect x="74" y="52" width="94" height="12" rx="3" fill="#E8F2DC" stroke="#79A94A" strokeWidth="1" />
    <line x1="78" y1="58" x2="158" y2="58" stroke="#141414" strokeWidth="2" strokeLinecap="round" />
    <line x1="74" y1="78" x2="210" y2="78" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
    <line x1="74" y1="94" x2="240" y2="94" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="74" y1="110" x2="190" y2="110" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="74" y1="126" x2="224" y2="126" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" />

    {/* Coffee cup badge */}
    <g transform="translate(230, 95)">
      <rect x="0" y="8" width="36" height="30" rx="6" fill="#FAF9F5" stroke="#141414" strokeWidth="1.75" />
      <path d="M36 14 C44 14, 44 28, 36 28" stroke="#141414" strokeWidth="1.75" fill="none" strokeLinecap="round" />
      <path d="M8 2 C8 -2, 14 -2, 14 -5" stroke="#79A94A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M18 2 C18 -2, 24 -2, 24 -5" stroke="#79A94A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Hinglish + English tag pills */}
    <g transform="translate(170, 44)">
      <rect width="70" height="20" rx="10" fill="#79A94A" />
      <text x="35" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">HINGLISH</text>
    </g>
  </svg>
);

// Hand-drawn editorial illustration for Card 2: Ready for Exams (Exam sheet + checkmarks + A+ badge)
export const ExamIllustration = ({ className = 'w-full h-44' }: { className?: string }) => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Exam Sheet */}
    <rect x="70" y="22" width="180" height="138" rx="10" fill="#FCFAF6" stroke="#141414" strokeWidth="1.75" />
    
    {/* Top header bar */}
    <line x1="88" y1="42" x2="160" y2="42" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="230" cy="42" r="10" fill="#E8F2DC" stroke="#79A94A" strokeWidth="1.5" />
    <path d="M226 42 L229 45 L235 39" stroke="#79A94A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />

    {/* Section 1 question & checkmark */}
    <line x1="88" y1="62" x2="220" y2="62" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="88" y="72" width="80" height="10" rx="3" fill="#E8F2DC" />
    <line x1="88" y1="77" x2="160" y2="77" stroke="#79A94A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="176" y1="77" x2="232" y2="77" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" />

    {/* PYQ Stamp */}
    <g transform="translate(195, 88) rotate(-8)">
      <rect width="48" height="24" rx="4" fill="#FCFAF6" stroke="#79A94A" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="24" y="16" fill="#79A94A" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PYQ ★</text>
    </g>

    {/* MCQ options list */}
    <g transform="translate(88, 96)">
      <circle cx="5" cy="5" r="4" stroke="#141414" strokeWidth="1.5" fill="none" />
      <line x1="16" y1="5" x2="80" y2="5" stroke="#5E5D57" strokeWidth="1.5" strokeLinecap="round" />

      <circle cx="5" cy="20" r="4" stroke="#79A94A" strokeWidth="1.5" fill="#79A94A" />
      <line x1="16" y1="20" x2="95" y2="20" stroke="#141414" strokeWidth="1.75" strokeLinecap="round" />
      
      <circle cx="5" cy="35" r="4" stroke="#141414" strokeWidth="1.5" fill="none" />
      <line x1="16" y1="35" x2="70" y2="35" stroke="#5E5D57" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Score badge at bottom right */}
    <g transform="translate(205, 122)">
      <rect width="36" height="24" rx="6" fill="#141414" />
      <text x="18" y="16" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">100%</text>
    </g>
  </svg>
);

// Hand-drawn editorial illustration for Card 3: Understand Weak Spots (Diagnostic Radar / Target / Lightbulb)
export const WeakSpotsIllustration = ({ className = 'w-full h-44' }: { className?: string }) => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Background card frame */}
    <rect x="65" y="24" width="190" height="134" rx="10" fill="#FCFAF6" stroke="#141414" strokeWidth="1.75" />

    {/* Target concentric circles */}
    <g transform="translate(125, 90)">
      <circle cx="0" cy="0" r="48" stroke="#DFDBCF" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <circle cx="0" cy="0" r="32" stroke="#DFDBCF" strokeWidth="1.5" fill="none" />
      <circle cx="0" cy="0" r="16" fill="#E8F2DC" stroke="#79A94A" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="4" fill="#79A94A" />

      {/* Crosshair lines */}
      <line x1="-54" y1="0" x2="54" y2="0" stroke="#8A8880" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="0" y1="-54" x2="0" y2="54" stroke="#8A8880" strokeWidth="1" strokeDasharray="2 2" />
    </g>

    {/* Diagnostic score bars */}
    <g transform="translate(185, 52)">
      <text x="0" y="8" fill="#141414" fontSize="9" fontWeight="bold" fontFamily="monospace">ACCURACY</text>
      
      {/* Bar 1: Strong */}
      <rect x="0" y="16" width="58" height="6" rx="3" fill="#E8F2DC" />
      <rect x="0" y="16" width="48" height="6" rx="3" fill="#79A94A" />
      
      {/* Bar 2: Weak Spot Highlight */}
      <text x="0" y="36" fill="#8A8880" fontSize="8" fontFamily="sans-serif">Carnot Cycle</text>
      <rect x="0" y="42" width="58" height="6" rx="3" fill="#DFDBCF" />
      <rect x="0" y="42" width="22" height="6" rx="3" fill="#E05B49" />
      
      {/* Revision recommended flag */}
      <g transform="translate(0, 56)">
        <rect width="58" height="16" rx="4" fill="#141414" />
        <text x="29" y="11" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">REVISE NOW</text>
      </g>
    </g>

    {/* Lightbulb insight doodle */}
    <g transform="translate(75, 42)">
      <circle cx="12" cy="12" r="10" fill="#FAF9F5" stroke="#141414" strokeWidth="1.5" />
      <path d="M8 22 L16 22 M9 25 L15 25" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="-1" x2="12" y2="-4" stroke="#79A94A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="4" x2="25" y2="2" stroke="#79A94A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="4" x2="-1" y2="2" stroke="#79A94A" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Curved playful arrow SVG
export const EditorialArrow = ({ className = 'w-12 h-12' }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 20 C25 8, 42 12, 48 38"
      stroke="#141414"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M40 38 L48 38 L48 30"
      stroke="#141414"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Sparkle doodle
export const SparkleDoodle = ({ className = 'w-5 h-5 text-[#79A94A]' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

// Hand-drawn editorial illustration for Auth pages (Books, Reading Lamp, Sparkles, Pencil)
export const AuthIllustration = ({ className = 'w-full h-64' }: { className?: string }) => (
  <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Soft backdrop circular glow */}
    <circle cx="180" cy="130" r="100" fill="#F1F7EA" />

    {/* Stack of books */}
    <g transform="translate(110, 140)">
      {/* Bottom book */}
      <rect x="0" y="40" width="140" height="22" rx="4" fill="#141414" />
      <rect x="8" y="44" width="124" height="14" rx="2" fill="#FAF9F5" stroke="#141414" strokeWidth="1" />
      <line x1="16" y1="51" x2="116" y2="51" stroke="#DFDBCF" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Middle book - Green spine */}
      <rect x="15" y="18" width="115" height="22" rx="4" fill="#79A94A" stroke="#141414" strokeWidth="1.5" />
      <rect x="23" y="22" width="99" height="14" rx="2" fill="#FCFAF6" stroke="#141414" strokeWidth="1" />
      <line x1="30" y1="29" x2="110" y2="29" stroke="#79A94A" strokeWidth="1.5" />

      {/* Top open notebook */}
      <path d="M25 0 L70 5 L115 0 L115 18 L70 14 L25 18 Z" fill="#FCFAF6" stroke="#141414" strokeWidth="1.5" />
      <line x1="70" y1="5" x2="70" y2="14" stroke="#141414" strokeWidth="1.5" />
      {/* Bookmark ribbon */}
      <path d="M85 8 L85 24 L90 20 L95 24 L95 8 Z" fill="#E05B49" stroke="#141414" strokeWidth="1" />
    </g>

    {/* Hand-drawn pencil */}
    <g transform="translate(260, 130) rotate(-35)">
      <rect x="0" y="0" width="12" height="65" rx="2" fill="#E8F2DC" stroke="#141414" strokeWidth="1.5" />
      <path d="M0 65 L6 78 L12 65 Z" fill="#FCFAF6" stroke="#141414" strokeWidth="1.5" />
      <polygon points="4,73 6,78 8,73" fill="#141414" />
      <line x1="4" y1="0" x2="4" y2="65" stroke="#79A94A" strokeWidth="1" />
      <rect x="0" y="0" width="12" height="10" fill="#E05B49" stroke="#141414" strokeWidth="1.5" />
    </g>

    {/* Floating lightbulb of ideas */}
    <g transform="translate(160, 45)">
      <circle cx="20" cy="20" r="16" fill="#FAF9F5" stroke="#141414" strokeWidth="1.75" />
      <path d="M12 28 L28 28 L26 36 L14 36 Z" fill="#E8F2DC" stroke="#141414" strokeWidth="1.5" />
      <path d="M16 36 L24 36" stroke="#141414" strokeWidth="2" strokeLinecap="round" />
      {/* Filament */}
      <path d="M16 20 C16 14, 24 14, 24 20" stroke="#79A94A" strokeWidth="1.5" fill="none" />
      {/* Radiating rays */}
      <line x1="20" y1="-2" x2="20" y2="-8" stroke="#79A94A" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="6" x2="44" y2="2" stroke="#79A94A" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="6" x2="-4" y2="2" stroke="#79A94A" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Whimsical sparkles */}
    <g transform="translate(85, 90)">
      <path d="M6 0 L8 5 L13 6 L8 8 L6 13 L5 8 L0 6 L5 5 Z" fill="#79A94A" />
    </g>
    <g transform="translate(275, 75)">
      <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#79A94A" />
    </g>
  </svg>
);

// Hand-drawn editorial illustration for 404 page (Lost notebook, fluttering papers, wandering pencil)
export const NotFoundIllustration = ({ className = 'w-full h-56' }: { className?: string }) => (
  <svg viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Soft background shape */}
    <ellipse cx="170" cy="120" rx="120" ry="70" fill="#F1F7EA" />

    {/* Lost wandering open notebook */}
    <g transform="translate(100, 75)">
      {/* Left page */}
      <path
        d="M10 20 C35 15, 65 18, 70 28 L70 95 C65 88, 35 85, 10 90 Z"
        fill="#FCFAF6"
        stroke="#141414"
        strokeWidth="2"
      />
      {/* Right page */}
      <path
        d="M70 28 C75 18, 105 15, 130 20 L130 90 C105 85, 75 88, 70 95 Z"
        fill="#FAF9F5"
        stroke="#141414"
        strokeWidth="2"
      />
      {/* Spine binding */}
      <line x1="70" y1="26" x2="70" y2="95" stroke="#79A94A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Confused doodle lines on page */}
      <line x1="22" y1="42" x2="58" y2="42" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
      <line x1="22" y1="54" x2="50" y2="54" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
      <line x1="22" y1="66" x2="54" y2="66" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />

      <line x1="82" y1="42" x2="118" y2="42" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="82" y1="54" x2="112" y2="54" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="82" y1="66" x2="105" y2="66" stroke="#8A8880" strokeWidth="1.5" strokeLinecap="round" />

      {/* Big green question mark rising from book */}
      <g transform="translate(62, -35)">
        <path
          d="M4 14 C4 4, 18 4, 18 14 C18 20, 10 22, 10 28"
          stroke="#79A94A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="10" cy="36" r="2.5" fill="#79A94A" />
      </g>
    </g>

    {/* Fluttering loose exam sheet */}
    <g transform="translate(230, 50) rotate(18)">
      <rect width="45" height="55" rx="3" fill="#FCFAF6" stroke="#141414" strokeWidth="1.5" />
      <line x1="8" y1="12" x2="37" y2="12" stroke="#79A94A" strokeWidth="1.5" />
      <line x1="8" y1="20" x2="30" y2="20" stroke="#8A8880" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="8" y1="28" x2="34" y2="28" stroke="#8A8880" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="8" y1="36" x2="25" y2="36" stroke="#8A8880" strokeWidth="1" strokeDasharray="2 2" />
    </g>

    {/* Scattered pencil */}
    <g transform="translate(60, 145) rotate(42)">
      <rect width="10" height="50" rx="2" fill="#E8F2DC" stroke="#141414" strokeWidth="1.5" />
      <path d="M0 50 L5 60 L10 50 Z" fill="#FCFAF6" stroke="#141414" strokeWidth="1.5" />
      <polygon points="3,56 5,60 7,56" fill="#141414" />
      <rect width="10" height="8" fill="#E05B49" stroke="#141414" strokeWidth="1.5" />
    </g>

    {/* Sparkles */}
    <g transform="translate(75, 45)">
      <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#79A94A" />
    </g>
    <g transform="translate(265, 135)">
      <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fill="#79A94A" />
    </g>
  </svg>
);
