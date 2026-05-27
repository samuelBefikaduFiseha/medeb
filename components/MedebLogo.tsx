interface Props {
  size?: number
  variant?: 'full' | 'icon'
  /** Tailwind text colour class applied to the wordmark */
  textClass?: string
  showTagline?: boolean
}

/**
 * Medeb brand identity — Market Stall concept.
 *
 * Icon mark: a deep-violet rounded square containing a stylised market-stall
 * silhouette.  Two tent peaks form the letter M (the canopy of a traditional
 * open-air market booth), a horizontal shelf line represents the stall counter,
 * and a small amber dot below it represents the goods on display — Medeb's
 * core promise: organised, governed wholesale commerce.
 */
export default function MedebLogo({
  size = 40,
  variant = 'full',
  textClass = 'text-white',
  showTagline = false,
}: Props) {
  const sw   = Math.max(3.5, size * 0.105)  // tent stroke width
  const sw2  = Math.max(2.5, size * 0.075)  // shelf stroke width
  const dotR = Math.max(2.5, size * 0.085)  // amber goods dot radius

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* ── Icon mark ── */}
      <div
        className="flex-shrink-0 rounded-xl flex items-center justify-center shadow-md"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 60%, #2e1065 100%)',
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          style={{ width: size * 0.68, height: size * 0.68 }}
          aria-hidden="true"
        >
          {/*
            Market stall canopy — two tent peaks forming the M letterform.
            Reading left→right: left base → left post → left peak →
            centre valley → right peak → right post → right base.
          */}
          <path
            d="M5,34 L5,22 L14,8 L23,19 L32,8 L43,22 L43,34"
            stroke="white"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stall counter / shelf */}
          <line
            x1="5"
            y1="29"
            x2="43"
            y2="29"
            stroke="white"
            strokeWidth={sw2}
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Amber goods dot — merchandise on the counter */}
          <circle cx="24" cy="39" r={dotR} fill="#f59e0b" />
        </svg>
      </div>

      {/* ── Wordmark ── */}
      {variant === 'full' && (
        <div className="leading-none">
          <span className={`font-extrabold text-[1.2rem] tracking-tight block ${textClass}`}>
            Medeb
          </span>
          {showTagline && (
            <span
              className={`text-[9px] tracking-[0.14em] uppercase font-semibold opacity-40 block mt-0.5 ${textClass}`}
            >
              Wholesale Platform
            </span>
          )}
        </div>
      )}
    </div>
  )
}
