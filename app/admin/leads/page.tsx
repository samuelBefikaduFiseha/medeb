'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ContactLead } from '@/lib/types'
import { Users, Search, Download } from 'lucide-react'

export default function LeadsPage() {
  const [leads, setLeads] = useState<ContactLead[]>([])
  const [filtered, setFiltered] = useState<ContactLead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false })
      const rows = (data as ContactLead[]) || []
      setLeads(rows)
      setFiltered(rows)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company_name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
      )
    )
  }, [search, leads])

  function exportCSV() {
    const header = 'Name,Company,Email,Phone,Message,Date'
    const rows = leads.map((l) =>
      [
        `"${l.name}"`,
        `"${l.company_name}"`,
        `"${l.email}"`,
        `"${l.phone || ''}"`,
        `"${l.message.replace(/"/g, '""')}"`,
        new Date(l.created_at).toLocaleString(),
      ].join(',')
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `medeb-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users size={18} className="text-violet-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Contact Leads</h1>
          </div>
          <p className="text-slate-500 text-sm">
            All &quot;Contact Us&quot; form submissions — {leads.length} total
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm transition-colors shadow-sm"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, company, or email…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-800 text-sm outline-none transition-colors bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 text-center text-slate-400 text-sm">Loading leads…</div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <Users size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">
              {search ? 'No leads match your search.' : 'No leads yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Company</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Phone</th>
                  <th className="px-5 py-3.5 max-w-xs">Message</th>
                  <th className="px-5 py-3.5 whitespace-nowrap">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                      {lead.company_name}
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-violet-600 hover:text-violet-500 transition-colors"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {lead.phone || <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-xs">
                      <p className="truncate max-w-[220px]" title={lead.message}>
                        {lead.message}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap font-mono">
                      {new Date(lead.created_at).toLocaleString('en-US', {
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
