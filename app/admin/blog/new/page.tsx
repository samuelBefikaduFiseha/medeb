'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'

const CATEGORIES = [
  'General',
  'Supply Chain',
  'B2B Commerce',
  'Industry News',
  'Product Updates',
]

interface Form {
  title: string
  slug: string
  category: string
  content: string
  cover_image_url: string
  status: 'draft' | 'published'
}

const initial: Form = {
  title: '',
  slug: '',
  category: 'General',
  content: '',
  cover_image_url: '',
  status: 'draft',
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const [form, setForm] = useState<Form>(initial)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof Form>(field: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value as Form[K]
      setForm((prev) => {
        const next = { ...prev, [field]: value }
        if (field === 'title') next.slug = toSlug(value as string)
        return next
      })
    }
  }

  async function handleSave(status: 'draft' | 'published') {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setError('Title, slug, and content are required.')
      return
    }
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('blog_posts').insert({
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category,
      content: form.content,
      cover_image_url: form.cover_image_url.trim() || null,
      status,
    })
    if (err) {
      setError(err.message)
      setSaving(false)
    } else {
      router.push('/admin/blog')
    }
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
            <h1 className="text-2xl font-extrabold text-slate-900">New Blog Post</h1>
            <p className="text-slate-500 text-sm">Create a new article for the Medeb blog</p>
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
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors disabled:opacity-60"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold text-sm transition-all shadow-md shadow-violet-600/20 disabled:opacity-60"
          >
            <Save size={14} />
            Publish
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
                placeholder="e.g. How Medeb Eliminates Wholesale Demand Leakage"
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
                  placeholder="how-medeb-eliminates-demand-leakage"
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
                placeholder={`# Your Post Title\n\nWrite your content in **Markdown** format.\n\n## Section\n\nParagraph text here...\n\n- List item 1\n- List item 2`}
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

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h4 className="text-xs font-semibold text-amber-800 mb-2 uppercase tracking-wider">
              Markdown Tips
            </h4>
            <ul className="text-xs text-amber-700 space-y-1.5">
              <li><code className="bg-amber-100 px-1 rounded"># H1</code> — Heading 1</li>
              <li><code className="bg-amber-100 px-1 rounded">## H2</code> — Heading 2</li>
              <li><code className="bg-amber-100 px-1 rounded">**bold**</code> — Bold text</li>
              <li><code className="bg-amber-100 px-1 rounded">*italic*</code> — Italic text</li>
              <li><code className="bg-amber-100 px-1 rounded">- item</code> — Bullet list</li>
              <li><code className="bg-amber-100 px-1 rounded">`code`</code> — Inline code</li>
              <li><code className="bg-amber-100 px-1 rounded">[text](url)</code> — Link</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
