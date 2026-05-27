import Link from 'next/link'

const CATEGORIES = [
  'All',
  'Supply Chain',
  'B2B Commerce',
  'Industry News',
  'Product Updates',
]

export default function CategoryFilter({ current }: { current?: string }) {
  const active = current || 'All'

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const href = cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`
        const isActive = active === cat
        return (
          <Link
            key={cat}
            href={href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </Link>
        )
      })}
    </div>
  )
}
