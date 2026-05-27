import { CheckCircle } from 'lucide-react'

const rfqSteps = [
  {
    step: 1,
    label: 'Submitted',
    description: 'Retailer submits sourcing request with product details, quantity, and urgency',
    color: 'bg-slate-100 text-slate-600',
    active: false,
  },
  {
    step: 2,
    label: 'Under Review',
    description: 'Admin receives the RFQ — SLA countdown begins (5–10 min)',
    color: 'bg-violet-100 text-violet-700',
    active: false,
  },
  {
    step: 3,
    label: 'Supplier Contacted',
    description: 'Admin matches request to capable suppliers and requests pricing',
    color: 'bg-fuchsia-100 text-fuchsia-700',
    active: false,
  },
  {
    step: 4,
    label: 'Quoted',
    description: 'Admin reviews supplier pricing, adjusts margin, pushes quote to retailer',
    color: 'bg-amber-100 text-amber-700',
    active: true,
  },
  {
    step: 5,
    label: 'Accepted',
    description: 'Retailer accepts the quotation — order is confirmed',
    color: 'bg-emerald-100 text-emerald-700',
    active: false,
  },
  {
    step: 6,
    label: 'Delivery Processing',
    description: 'Fulfillment initiated — driver assigned, delivery route optimized',
    color: 'bg-purple-100 text-purple-700',
    active: false,
  },
]

const pricingLog = [
  {
    product: 'Canola Oil 5L',
    sku: 'CO-5L-001',
    prev: '580.00',
    updated: '620.00',
    change: '+6.9%',
    positive: true,
    admin: 'admin@medeb.io',
    ts: '2024-01-15  09:42:11',
  },
  {
    product: 'Sugar 50kg Bag',
    sku: 'SG-50K-003',
    prev: '2,800.00',
    updated: '2,950.00',
    change: '+5.4%',
    positive: true,
    admin: 'admin@medeb.io',
    ts: '2024-01-15  10:15:38',
  },
  {
    product: 'Wheat Flour 25kg',
    sku: 'WF-25K-007',
    prev: '1,450.00',
    updated: '1,390.00',
    change: '−4.1%',
    positive: false,
    admin: 'admin@medeb.io',
    ts: '2024-01-15  10:58:22',
  },
  {
    product: 'Bottled Water 1.5L ×24',
    sku: 'BW-1P5-012',
    prev: '480.00',
    updated: '480.00',
    change: '0.0%',
    positive: null,
    admin: 'admin@medeb.io',
    ts: '2024-01-15  11:30:05',
  },
  {
    product: 'Tomato Paste 400g ×24',
    sku: 'TP-400G-018',
    prev: '1,200.00',
    updated: '1,280.00',
    change: '+6.7%',
    positive: true,
    admin: 'admin@medeb.io',
    ts: '2024-01-15  13:12:44',
  },
]

export default function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #ffffff 0%, #fdf8ff 30%, #fff8fd 60%, #f8faff 100%)',
        backgroundSize: '300% 300%',
        animation: 'aurora-shift 18s ease infinite',
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ── RFQ Lifecycle ── */}
        <div>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-black uppercase tracking-widest mb-5">
              Medeb RFQ Engine
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              The RFQ Status{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Lifecycle
              </span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
              From submission to fulfilled delivery — every custom sourcing request moves through
              a transparent, traceable pipeline.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[calc(8.33%+1.5rem)] right-[calc(8.33%+1.5rem)] h-0.5 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-emerald-200 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-2 relative z-10">
              {rfqSteps.map(({ step, label, description, color, active }) => (
                <div key={step} className="flex flex-col items-center text-center group">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-3 border-2 transition-transform group-hover:scale-110 ${
                      active
                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200'
                        : `${color} border-slate-200`
                    }`}
                  >
                    {active ? <CheckCircle size={20} /> : step}
                  </div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                      active ? 'text-amber-600' : 'text-slate-700'
                    }`}
                  >
                    {label}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Pricing Audit Table ── */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-widest mb-5">
              Daily Pricing Governance
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Immutable Pricing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                Audit Log
              </span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
              Every price update is automatically recorded with the previous value, updated value,
              percentage change, and an admin audit stamp — building an unalterable operational history.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Table chrome bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs text-slate-400 font-mono">
                  price_updates — Medeb Admin Console
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">2024-01-15</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-slate-300 text-left text-xs uppercase tracking-wider">
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3 text-right">Prev. Price (ETB)</th>
                    <th className="px-4 py-3 text-right">Updated Price (ETB)</th>
                    <th className="px-4 py-3 text-right">Change</th>
                    <th className="px-4 py-3">Updated By</th>
                    <th className="px-4 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pricingLog.map((row) => (
                    <tr key={row.sku} className="hover:bg-violet-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-slate-800">{row.product}</td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{row.sku}</td>
                      <td className="px-4 py-3.5 text-right text-slate-500">{row.prev}</td>
                      <td className="px-4 py-3.5 text-right font-semibold text-slate-800">
                        {row.updated}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span
                          className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${
                            row.positive === true
                              ? 'bg-red-50 text-red-600'
                              : row.positive === false
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {row.change}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 font-mono">{row.admin}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">{row.ts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-400 font-mono">
              5 rows returned · All entries immutable after creation · Audit trail preserved indefinitely
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
