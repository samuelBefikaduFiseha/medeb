'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/types'
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'

const CATEGORIES = [
  'General',
  'Supply Chain',
  'B2B Commerce',
  'Industry News',
  'Product Updates',
]

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'General',
    content: '',
    cover_image_url: '',
    status: 'draft' as 'draft' | 'published',
  })
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error: err }: { data: BlogPost | null; error: unknown }) => {
        if (err || !data) {
          router.replace('/admin/blog')
          return
        }
        const post = data
        setForm({
          title: post.title,
          slug: post.slug,
          category: post.category,
          content: post.content,
          cover_image_url: post.cover_image_url || '',
          status: post.status,
        })
        setLoading(false)
      })
  }, [id, router])

  function set<K extends keyof typeof form>(field: K) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const value = e.target.value as (typeof form)[K]
      setForm((prev) => {
        const next = { ...prev, [field]: value }
        if (field === 'title') next.slug = toSlug(value as string)
        return next
      })
    }
  }

  async function handleSave() {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setError('Title, slug, and content are required.')
      return
    }
    setSaving(true)
    setError('')
    const { error: err } = await supabase
      .from('blog_posts')
      .update({
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category,
        content: form.content,
        cover_image_url: form.cover_image_url.trim() || null,
        status: form.status,
      })
      .eq('id', id)
    if (err) {
      setError(err.message)
      setSaving(false)
    } else {
      router.push('/admin/blog')
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this post permanently? This cannot be undone.')) return
    await supabase.from('blog_posts').delete().eq('id', id)
    router.replace('/admin/blog')
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Edit Post</h1>
            <p className="text-slate-500 text-sm font-mono">/blog/{form.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 font-medium text-sm transition-colors"
          >
            <Eye size={14} />
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 font-medium text-sm transition-colors"
          >
            <Trash2 size={14} />
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold text-sm transition-all shadow-md shadow-violet-600/20 disabled:opacity-60"
          >
            <Save size={14} />
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Post Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={set('title')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-800 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Slug <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  /blog/
                </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={set('slug')}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-800 font-mono text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Cover Image URL
              </label>
              <input
                type="url"
                value={form.cover_image_url}
                onChange={set('cover_image_url')}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-800 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-700">
                Content (Markdown) <span className="text-red-400">*</span>
              </label>
              <span className="text-xs text-slate-400">{form.content.length} chars</span>
            </div>

            {preview ? (
              <div className="min-h-[400px] border border-slate-200 rounded-xl p-6 bg-slate-50">
                {form.content ? (
                  <MarkdownRenderer content={form.content} />
                ) : (
                  <p className="text-slate-400 text-sm italic">Nothing to preview yet.</p>
                )}
              </div>
            ) : (
              <textarea
                value={form.content}
                onChange={set('content')}
                rows={20}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-800 font-mono text-sm outline-none transition-colors resize-y"
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Post Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={set('category')}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-800 text-sm outline-none transition-colors bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={set('status')}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-800 text-sm outline-none transition-colors bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h4 className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <Link
                href={`/blog/${form.slug}`}
                target="_blank"
                className="block w-full text-center px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                View on Blog ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
