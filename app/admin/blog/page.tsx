'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/types'
import { FileText, Plus, Pencil, Trash2, Globe, Clock } from 'lucide-react'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    await supabase.from('blog_posts').delete().eq('id', id)
    await load()
    setDeleting(null)
  }

  async function toggleStatus(post: BlogPost) {
    const next = post.status === 'published' ? 'draft' : 'published'
    await supabase.from('blog_posts').update({ status: next }).eq('id', post.id)
    await load()
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={18} className="text-slate-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Blog Posts</h1>
          </div>
          <p className="text-slate-500 text-sm">{posts.length} total posts</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus size={15} />
          New Post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 text-center text-slate-400 text-sm">Loading posts…</div>
        ) : posts.length === 0 ? (
          <div className="py-24 text-center">
            <FileText size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No blog posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="mt-4 inline-flex items-center gap-2 text-violet-600 font-medium text-sm hover:text-violet-500"
            >
              <Plus size={14} />
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Slug</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Created</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 max-w-xs">
                      <p className="truncate max-w-[220px]" title={post.title}>
                        {post.title}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">
                      /{post.slug}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => toggleStatus(post)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                          post.status === 'published'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                      >
                        {post.status === 'published' ? (
                          <>
                            <Globe size={11} />
                            Published
                          </>
                        ) : (
                          <>
                            <Clock size={11} />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs font-mono">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
