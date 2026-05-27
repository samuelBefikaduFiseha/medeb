import Link from 'next/link'
import type { BlogPost } from '@/lib/types'
import { Calendar, Tag } from 'lucide-react'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-violet-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover image */}
      {post.cover_image_url ? (
        <div className="aspect-video overflow-hidden bg-slate-100">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-violet-50 via-purple-50 to-slate-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-violet-600">M</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Tag size={12} className="text-violet-400" />
          <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-violet-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.content.replace(/[#*`[\]]/g, '').slice(0, 160)}…
        </p>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar size={12} />
          {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </Link>
  )
}
