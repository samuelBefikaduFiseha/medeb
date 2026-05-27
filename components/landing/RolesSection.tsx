import { Crown, Package, ShoppingBag, Truck, Check } from 'lucide-react'

const roles = [
  {
    Icon: Crown,
    title: 'Platform Admin',
    subtitle: 'Full ecosystem control',
    gradientLine: 'from-violet-500 to-purple-600',
    iconRing: 'bg-violet-500/15 border border-violet-500/30',
    iconColor: 'text-violet-400',
    tag: 'tagViolet',
    capabilities: [
      'Manage all supplier profiles and activation status',
      'Review and approve every catalog change before it goes live',
      'Set daily wholesale pricing from supplier quotes',
      'Monitor all RFQ requests with live response-time countdowns',
      'Full immutable audit log of every platform action',
      'Role-based access control across all user tiers',
    ],
  },
  {
    Icon: Package,
    title: 'Supplier',
    subtitle: 'Managed product participation',
    gradientLine: 'from-amber-500 to-orange-500',
    iconRing: 'bg-amber-500/15 border border-amber-500/30',
    iconColor: 'text-amber-400',
    tag: 'tagAmber',
    capabilities: [
      'Submit product listings with photos, SKUs, and descriptions',
      'Suggest daily price updates for admin review',
      'Request new product additions to the live catalog',
      'Receive and respond to admin RFQ sourcing requests',
      'All changes staged in approval pipeline before visibility',
      'Track submission and approval status in real time',
    ],
  },
  {
    Icon: ShoppingBag,
    title: 'Retailer',
    subtitle: 'Seamless wholesale procurement',
    gradientLine: 'from-emerald-500 to-teal-500',
    iconRing: 'bg-emerald-500/15 border border-emerald-500/30',
    iconColor: 'text-emerald-400',
    tag: 'tagEmerald',
    capabilities: [
      'Browse a vetted, admin-curated live catalog',
      'Search and filter by category, brand, price, and stock',
      'Place orders with quantity selectors and reorder favorites',
      'Submit custom sourcing requests for any out-of-catalog product',
      'Receive supplier quotations within 5–10 minutes',
      'Track all orders and RFQ statuses in real time',
    ],
  },
  {
    Icon: Truck,
    title: 'Driver',
    subtitle: 'Last-mile delivery execution',
    gradientLine: 'from-sky-500 to-cyan-500',
    iconRing: 'bg-sky-500/15 border border-sky-500/30',
    iconColor: 'text-sky-400',
    tag: 'tagSky',
    capabilities: [
      'Receive assigned delivery orders instantly on mobile',
      'View retailer location and full delivery details',
      'Optimised routing for multi-stop delivery runs',
      'Update delivery checkpoint status in real time',
      'Confirm receipt and collect digital proof of delivery',
      'Dedicated mobile-optimised driver interface',
    ],
  },
]

const tagStyles: Record<string, string> = {
  tagViolet:  'bg-violet-500/10 border border-violet-500/20 text-violet-300',
  tagAmber:   'bg-amber-500/10  border border-amber-500/20  text-amber-300',
  tagEmerald: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300',
  tagSky:     'bg-sky-500/10    border border-sky-500/20    text-sky-300',
}

export default function RolesSection() {
  return (
    <section
      id="roles"
      className="py-24 relative overflow-hidden"
      style={{ background: '#0d0618' }}
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)' }}
      />
      <div
        className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-5">
            Role-Based Access Control
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-400">
              Every Stakeholder
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Medeb enforces a strict role hierarchy — every actor from admin to driver has
            precisely scoped permissions, keeping the marketplace governed and trustworthy.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map(({ Icon, title, subtitle, gradientLine, iconRing, iconColor, tag, capabilities }) => (
            <div
              key={title}
              className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 overflow-hidden"
            >
              {/* Gradient top accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientLine} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              {/* Icon + title */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 rounded-2xl ${iconRing} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className={iconColor} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white leading-tight">{title}</h3>
                  <span className={`inline-block mt-1 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${tagStyles[tag]}`}>
                    {subtitle}
                  </span>
                </div>
              </div>

              {/* Capabilities */}
              <ul className="space-y-2.5">
                {capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5">
                    <Check size={14} className={`${iconColor} mt-0.5 flex-shrink-0`} />
                    <span className="text-slate-400 text-sm leading-snug">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-600 text-sm mt-10 font-mono">
          Supplier login is staged for a future release — the full permission architecture is
          built into the database from day one.
        </p>
      </div>
    </section>
  )
}
