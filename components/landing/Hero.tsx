'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'

/* Particle positions: top/left percentages + individual timing */
const PARTICLES = [
  { top: '14%', left:  '9%', dur: '4.2s', delay: '0s'    },
  { top: '22%', left: '84%', dur: '5.1s', delay: '0.7s'  },
  { top: '38%', left: '18%', dur: '3.8s', delay: '1.4s'  },
  { top: '55%', left: '91%', dur: '4.7s', delay: '0.3s'  },
  { top: '68%', left:  '6%', dur: '5.4s', delay: '2.1s'  },
  { top: '78%', left: '46%', dur: '4.0s', delay: '1.1s'  },
  { top: '10%', left: '58%', dur: '4.9s', delay: '0.5s'  },
  { top: '48%', left: '73%', dur: '3.5s', delay: '1.8s'  },
  { top: '86%', left: '25%', dur: '5.6s', delay: '0.9s'  },
  { top: '30%', left: '50%', dur: '4.4s', delay: '2.5s'  },
]

export default function Hero() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() }),
    })
    if (res.ok) { setStatus('success'); setEmail('') }
    else        { setStatus('error') }
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0d0618' }}
    >
      {/* Fine violet dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Drifting ambient orbs ── */}
      <div
        className="absolute pointer-events-none rounded-full opacity-[0.13] blur-[110px]"
        style={{
          width: 700, height: 700,
          top: '10%', left: '20%',
          background: '#7c3aed',
          animation: 'orb-drift-1 15s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full opacity-[0.10] blur-[90px]"
        style={{
          width: 520, height: 520,
          bottom: '10%', right: '12%',
          background: '#c026d3',
          animation: 'orb-drift-2 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full opacity-[0.09] blur-[80px]"
        style={{
          width: 380, height: 380,
          top: '55%', left: '10%',
          background: '#f59e0b',
          animation: 'orb-drift-3 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full opacity-[0.07] blur-[70px]"
        style={{
          width: 300, height: 300,
          top: '20%', right: '25%',
          background: '#06b6d4',
          animation: 'orb-drift-2 20s ease-in-out infinite 3s',
        }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  i % 3 === 0 ? 6 : 4,
            height: i % 3 === 0 ? 6 : 4,
            top: p.top,
            left: p.left,
            background: i % 4 === 0 ? '#f59e0b' : '#a78bfa',
            animation: `float-particle ${p.dur} ease-in-out infinite ${p.delay}`,
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          Now Accepting Early Access Applications
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black tracking-tight text-white leading-[1.06] mb-6">
          The Organised Marketplace
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-400">
            for Wholesale Commerce
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Medeb bridges commercial suppliers and retail merchants through admin-governed pricing,
          a real-time vetted catalog, and a{' '}
          <span className="text-amber-400 font-semibold">
            5–10 minute custom sourcing engine
          </span>{' '}
          — so your business never loses a transaction.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 text-slate-900 font-black text-base shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Request Early Access
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </a>
          <a
            href="#workflow"
            className="group inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl border border-white/15 hover:border-violet-400/40 hover:bg-violet-500/[0.08] text-white/80 hover:text-white font-semibold text-base transition-all duration-200 backdrop-blur-sm"
          >
            See How It Works
            <ChevronDown
              size={18}
              className="opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all duration-200"
            />
          </a>
        </div>

        {/* Newsletter waitlist */}
        <div className="max-w-md mx-auto">
          {status === 'success' ? (
            <div className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <CheckCircle size={16} className="flex-shrink-0" />
              <span>You&apos;re on the waitlist — check your inbox!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white/[0.07] border border-white/10 focus:border-violet-500/70 focus:bg-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-sm transition-colors whitespace-nowrap shadow-lg shadow-violet-600/30"
              >
                {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-2 text-red-400 text-xs text-center">
              Something went wrong. Please try again.
            </p>
          )}
          {status !== 'success' && (
            <p className="mt-2.5 text-white/25 text-xs">No spam. Unsubscribe at any time.</p>
          )}
        </div>

        {/* Stats bar */}
        <div className="mt-16 pt-10 border-t border-white/[0.07] grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { value: '5–10 Min',    label: 'Custom Sourcing SLA'  },
            { value: '100% Admin',  label: 'Governed Marketplace' },
            { value: 'Zero Leakage', label: 'Demand Retention'   },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white mb-1 tracking-tight">{s.value}</div>
              <div className="text-xs text-white/35 font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors"
        aria-label="Scroll to features"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>

      {/* Wave divider — blends into the light section below */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 56"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 56 }}
        >
          <path
            d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,20 1440,28 L1440,56 L0,56 Z"
            fill="#f8f5ff"
          />
        </svg>
      </div>
    </section>
  )
}
