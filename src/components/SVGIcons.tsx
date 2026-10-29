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
