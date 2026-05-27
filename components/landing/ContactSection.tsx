'use client'
import { useState } from 'react'
import { CheckCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

interface FormState {
  name: string
  company_name: string
  email: string
  phone: string
  message: string
}

const initial: FormState = { name: '', company_name: '', email: '', phone: '', message: '' }

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 text-slate-800 text-sm outline-none transition-all placeholder-slate-400 bg-white hover:border-slate-300'

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        company_name: form.company_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        message: form.message.trim(),
      }),
    })
    if (res.ok) {
      setStatus('success')
      setForm(initial)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-600 opacity-[0.07] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── Left ── */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-6">
              Get in Touch
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Ready to transform your wholesale operations?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Whether you&apos;re a supplier looking to digitize your product lines or a retailer
              ready to streamline procurement — let&apos;s talk about what Medeb can do for your
              business.
            </p>

            {/* Contact cards */}
            <div className="space-y-4">
              {[
                {
                  Icon: Mail,
                  label: 'Email',
                  value: 'hello@medeb.io',
                  href: 'mailto:hello@medeb.io',
                },
                {
                  Icon: Phone,
                  label: 'Phone',
                  value: '+251 99 699 5878',
                  href: 'tel:+251996995878',
                },
                {
                  Icon: MapPin,
                  label: 'Location',
                  value: 'Addis Ababa, Ethiopia',
                  href: null,
                },
              ].map(({ Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-white font-semibold text-sm hover:text-violet-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-white font-semibold text-sm">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 p-8 border border-slate-100">
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                  Thank you. A confirmation has been sent to your email — we&apos;ll be in touch
                  within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-violet-600 font-semibold text-sm hover:text-violet-500 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-5">
                  <h3 className="text-xl font-extrabold text-slate-900">Send us a message</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      required
                      placeholder="Abebe Girma"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.company_name}
                      onChange={set('company_name')}
                      required
                      placeholder="Sunrise Trading PLC"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      required
                      placeholder="you@company.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+251 99 699 5878"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    required
                    rows={4}
                    placeholder="Tell us about your business and how you'd like to work with Medeb…"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 disabled:opacity-60 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30 hover:-translate-y-0.5"
                >
                  {status === 'loading' ? (
                    'Sending…'
                  ) : (
                    <>
                      Send Message
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-0.5 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  A confirmation will be sent to your email address.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
