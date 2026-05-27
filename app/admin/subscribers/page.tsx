'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { NewsletterSubscriber } from '@/lib/types'
import { Mail, Copy, Check, Download } from 'lucide-react'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false })
      setSubscribers((data as NewsletterSubscriber[]) || [])
      setLoading(false)
    })()
  }, [])

  function copyAllEmails() {
    const emails = subscribers.map((s) => s.email).join('\n')
    navigator.clipboard.writeText(emails).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function exportCSV() {
    const header = 'Email,Subscribed At'
    const rows = subscribers.map(
      (s) =>
        `${s.email},${new Date(s.subscribed_at).toLocaleString()}`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `medeb-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail size={18} className="text-amber-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Newsletter Subscribers</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Waitlist and newsletter sign-ups — {subscribers.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyAllEmails}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy All Emails
              </>
            )}
          </button>
          <button
            onClick={exportCSV}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 text-center text-slate-400 text-sm">Loading subscribers…</div>
        ) : subscribers.length === 0 ? (
          <div className="py-24 text-center">
            <Mail size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No subscribers yet.</p>
            <p className="text-slate-400 text-sm mt-1">
              Newsletter sign-ups from the website will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Email Address</th>
                  <th className="px-5 py-3.5">Subscribed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((sub, index) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 text-slate-400 text-xs font-mono">
                      {String(index + 1).padStart(3, '0')}
                    </td>
                    <td className="px-5 py-3">
                      <a
                        href={`mailto:${sub.email}`}
                        className="text-violet-600 hover:text-violet-500 font-medium transition-colors"
                      >
                        {sub.email}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs font-mono">
                      {new Date(sub.subscribed_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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
