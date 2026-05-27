import {
  ShieldCheck,
  Zap,
  Handshake,
  TrendingUp,
  Layers,
  Bell,
} from 'lucide-react'

const benefits = [
  {
    Icon: ShieldCheck,
    number: '01',
    title: 'Zero Demand Leakage',
    description:
      'When a catalog product is unavailable, the RFQ engine catches the demand gap in real time. Retailers stay on the platform and source immediately rather than walking to a competitor.',
    accentColor: 'text-violet-600',
    accentBg: 'bg-violet-50',
    borderColor: 'border-violet-100',
  },
  {
    Icon: Zap,
    number: '02',
    title: '5–10 Minute Sourcing SLA',
    description:
      'Industry-fastest custom sourcing commitment. Admins receive a live response-timer the moment a retailer submits an RFQ — no request goes unanswered, and every response is logged.',
    accentColor: 'text-amber-600',
    accentBg: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    Icon: Handshake,
    number: '03',
    title: 'Stronger Supplier Relationships',
    description:
      'Suppliers participate through a structured, approval-gated channel. Their products, pricing, and edits are always reviewed before going live — building reliability and long-term partnership.',
    accentColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
  {
    Icon: TrendingUp,
    number: '04',
    title: 'Higher Order Volume',
    description:
      'Every sourcing request fulfilled through the RFQ engine is an order that would otherwise be lost. Wider product coverage means retailers consolidate more of their procurement on Medeb.',
    accentColor: 'text-fuchsia-600',
    accentBg: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-100',
  },
  {
    Icon: Layers,
    number: '05',
    title: 'Architecture That Scales',
    description:
      'Supplier features, approval pipelines, and audit tables are built into the database from day one. When operations mature, supplier self-service activates without any architecture rebuild.',
    accentColor: 'text-sky-600',
    accentBg: 'bg-sky-50',
    borderColor: 'border-sky-100',
  },
  {
    Icon: Bell,
    number: '06',
    title: 'Real-Time Notifications',
    description:
      'All three stakeholders — retailers, admins, and suppliers — receive live status notifications at every stage: submission, review, quotation, acceptance, and delivery updates.',
    accentColor: 'text-orange-600',
    accentBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
]

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(150deg, #faf7ff 0%, #f5f0ff 25%, #fff8f0 50%, #f0faff 75%, #faf7ff 100%)',
        backgroundSize: '400% 400%',
        animation: 'aurora-shift 16s ease infinite',
      }}
    >
      {/* Decorative corner blobs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-bold uppercase tracking-widest mb-5">
            Business Value
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Why Medeb{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Changes Everything
            </span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            A governed wholesale marketplace is more than a catalog — it is a defensible
            operating system for B2B trade that compounds in value with every transaction.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ Icon, number, title, description, accentColor, accentBg, borderColor }) => (
            <div
              key={title}
              className={`group bg-white/80 backdrop-blur-sm rounded-2xl border ${borderColor} p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
            >
              {/* Number + Icon row */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[2.5rem] font-black text-slate-100 leading-none select-none">
                  {number}
                </span>
                <div className={`w-11 h-11 rounded-2xl ${accentBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={accentColor} />
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              Ready to see Medeb in action?
            </h3>
            <p className="text-slate-500 text-sm">
              Join the waitlist and get early access to the platform before public launch.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold text-sm shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Request Early Access
          </a>
        </div>
      </div>
    </section>
  )
}
