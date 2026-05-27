'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import MedebLogo from '@/components/MedebLogo'

const links = [
  { label: 'Features',    href: '/#features'  },
  { label: 'How It Works', href: '/#workflow' },
  { label: 'Roles',       href: '/#roles'     },
  { label: 'Why Medeb',   href: '/#benefits'  },
  { label: 'Blog',        href: '/blog'       },
  { label: 'Contact',     href: '/#contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Medeb home">
            <MedebLogo
              size={36}
              textClass={scrolled ? 'text-slate-900' : 'text-white'}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-slate-600 hover:text-violet-600'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 text-slate-900 font-bold text-sm shadow-md hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-200"
            >
              Request Access
              <ArrowUpRight
                size={14}
                className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              scrolled
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-4 py-5 shadow-xl space-y-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center h-11 px-3 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-50 hover:text-violet-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 h-11 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-bold text-sm shadow-md"
            >
              Request Early Access
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
