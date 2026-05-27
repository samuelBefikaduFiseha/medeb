'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import MedebLogo from '@/components/MedebLogo'

const navigation = {
  platform: [
    { label: 'Features',          href: '/#features'  },
    { label: 'How It Works',      href: '/#workflow'  },
    { label: 'Platform Roles',    href: '/#roles'     },
    { label: 'Why Medeb',         href: '/#benefits'  },
    { label: 'RFQ Engine',        href: '/#workflow'  },
    { label: 'Pricing Governance', href: '/#features' },
  ],
  company: [
    { label: 'Blog',       href: '/blog'      },
    { label: 'Contact Us', href: '/#contact'  },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
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
    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <MedebLogo size={38} showTagline />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Enterprise B2B wholesale commerce and digital supply chain ecosystem. Bridging
              suppliers and retailers with governed, auditable digital trade.
            </p>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {navigation.platform.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-slate-500 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.company.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-slate-500 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="tel:+251996995878"
                  className="text-slate-500 text-sm hover:text-white transition-colors"
                >
                  +251 99 699 5878
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              Stay Updated
            </h4>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Get platform updates and B2B commerce insights in your inbox.
            </p>
            {status === 'success' ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <CheckCircle size={15} />
                You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 focus:border-violet-500 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-bold transition-colors shadow-sm"
                >
                  {status === 'loading' ? (
                    'Subscribing…'
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-xs">Failed. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Medeb Technologies. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs">
            Enterprise B2B Wholesale Platform · Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </footer>
  )
}
