'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Users, Mail, FileText, BookOpen, TrendingUp, ArrowRight } from 'lucide-react'

interface Metrics {
  leads: number
  subscribers: number
  totalPosts: number
  publishedPosts: number
}

function MetricCard({
  label,
  value,
  Icon,
  color,
  href,
}: {
  label: string
  value: number | string
  Icon: React.ElementType
  color: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-200 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon size={20} />
        </div>
        <ArrowRight
          size={16}
          className="text-slate-300 group-hover:text-violet-500 transition-colors"
        />
      </div>
      <div className="text-3xl font-extrabold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </Link>
  )
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    leads: 0,
    subscribers: 0,
    totalPosts: 0,
    publishedPosts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [leadsRes, subRes, allPostsRes, pubPostsRes] = await Promise.all([
        supabase.from('contact_leads').select('id', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'published'),
      ])
      setMetrics({
        leads: leadsRes.count ?? 0,
        subscribers: subRes.count ?? 0,
        totalPosts: allPostsRes.count ?? 0,
        publishedPosts: pubPostsRes.count ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of your Medeb marketing platform</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <MetricCard
          label="Captured Leads"
          value={loading ? '—' : metrics.leads}
          Icon={Users}
          color="bg-violet-100 text-violet-600"
          href="/admin/leads"
        />
        <MetricCard
          label="Newsletter Subscribers"
          value={loading ? '—' : metrics.subscribers}
          Icon={Mail}
          color="bg-amber-100 text-amber-600"
          href="/admin/subscribers"
        />
        <MetricCard
          label="Total Blog Posts"
          value={loading ? '—' : metrics.totalPosts}
          Icon={FileText}
          color="bg-slate-100 text-slate-600"
          href="/admin/blog"
        />
        <MetricCard
          label="Published Posts"
          value={loading ? '—' : metrics.publishedPosts}
          Icon={BookOpen}
          color="bg-emerald-100 text-emerald-600"
          href="/admin/blog"
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-violet-600" />
          <h2 className="font-bold text-slate-900 text-sm">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors"
          >
            + New Blog Post
          </Link>
          <Link
            href="/admin/leads"
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
          >
            View Leads
          </Link>
          <Link
            href="/admin/subscribers"
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
          >
            View Subscribers
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
          >
            View Website ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
