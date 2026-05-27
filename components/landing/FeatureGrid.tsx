import { LayoutGrid, BarChart3, ShieldCheck, Timer } from 'lucide-react'

const features = [
  {
    Icon: LayoutGrid,
    name: 'Medeb Catalog',
    subtitle: 'Live Retail Catalog',
    description:
      'A structured, real-time product catalog optimized for B2B browsing. Retailers search by category, add to cart, and reorder favorites — with every listing vetted and admin-curated before going live.',
    accentFrom: 'from-violet-500',
    accentTo:   'to-purple-600',
    iconBg:     'bg-violet-50',
    iconColor:  'text-violet-600',
    borderHover: 'hover:border-violet-200/60',
    shadowHover: 'hover:shadow-violet-100/80',
    badgeBg:    'bg-violet-600',
  },
  {
    Icon: BarChart3,
    name: 'Daily Pricing Governance',
    subtitle: 'Immutable Audit Engine',
    description:
      'Admins contact suppliers daily for the latest wholesale rates and input them directly into the management console. Every price change generates an immutable, timestamped audit log for complete pricing transparency.',
    accentFrom: 'from-amber-500',
    accentTo:   'to-orange-600',
    iconBg:     'bg-amber-50',
    iconColor:  'text-amber-600',
    borderHover: 'hover:border-amber-200/60',
    shadowHover: 'hover:shadow-amber-100/80',
    badgeBg:    'bg-amber-500',
  },
  {
    Icon: ShieldCheck,
    name: 'Medeb Approval Vault',
    subtitle: 'Asynchronous Staging Pipeline',
    description:
      'Supplier pricing adjustments, new SKU uploads, and product edits never publish directly to the live catalog. All changes land in isolated staging tables and remain "Pending" until explicitly approved by an administrator.',
    accentFrom: 'from-emerald-500',
    accentTo:   'to-teal-600',
    iconBg:     'bg-emerald-50',
    iconColor:  'text-emerald-600',
    borderHover: 'hover:border-emerald-200/60',
    shadowHover: 'hover:shadow-emerald-100/80',
    badgeBg:    'bg-emerald-600',
  },
  {
    Icon: Timer,
    name: 'Medeb RFQ Engine',
    subtitle: '5–10 Minute Sourcing SLA',
    description:
      "When stock is low or a product isn't in the catalog, retailers submit a Custom Sourcing Request. The platform routes it instantly with a 5–10 minute SLA countdown — admin matches suppliers, adjusts the quotation, and pushes it to the retailer.",
    accentFrom: 'from-fuchsia-500',
    accentTo:   'to-pink-600',
    iconBg:     'bg-fuchsia-50',
    iconColor:  'text-fuchsia-600',
    borderHover: 'hover:border-fuchsia-200/60',
    shadowHover: 'hover:shadow-fuchsia-100/80',
    badgeBg:    'bg-fuchsia-600',
  },
]

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #f8f5ff 0%, #f0f0ff 20%, #f5f0ff 40%, #fff5f0 60%, #f0f8ff 80%, #f8f5ff 100%)',
        backgroundSize: '400% 400%',
        animation: 'aurora-shift 14s ease infinite',
      }}
    >
      {/* Faint decorative orb top-right */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Faint decorative orb bottom-left */}
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest mb-5">
            Platform Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Built for the Future{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              of B2B Commerce
            </span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Four integrated pillars replace fragmented, unmoderated wholesale trade with a
            governed, auditable, and infinitely scalable digital marketplace.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map(
            ({
              Icon,
              name,
              subtitle,
              description,
              accentFrom,
              accentTo,
              iconBg,
              iconColor,
              borderHover,
              shadowHover,
              badgeBg,
            }) => (
              <div
                key={name}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-8 ${borderHover} hover:shadow-2xl ${shadowHover} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
              >
                {/* Subtle shimmer highlight on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                  <div
                    className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    style={{ animation: 'shimmer-slide 1.4s ease forwards' }}
                  />
                </div>

                {/* Top gradient accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accentFrom} ${accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className={iconColor} />
                </div>

                {/* Badge */}
                <div className="mb-3">
                  <span
                    className={`inline-block text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-md ${badgeBg} text-white`}
                  >
                    {subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-tight">
                  {name}
                </h3>
                <p className="text-slate-500 leading-relaxed text-[0.9rem]">{description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
