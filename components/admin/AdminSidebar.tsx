'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Mail, FileText, LogOut, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import MedebLogo from '@/components/MedebLogo'

const navItems = [
  { label: 'Dashboard', href: '/admin', Icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', Icon: Users },
  { label: 'Subscribers', href: '/admin/subscribers', Icon: Mail },
  { label: 'Blog', href: '/admin/blog', Icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-slate-950 border-r border-slate-800/60 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800/60">
        <MedebLogo size={36} showTagline />
        <div className="mt-2 ml-[44px]">
          <span className="text-[9px] text-slate-600 uppercase tracking-[0.15em] font-bold">Admin Console</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, href, Icon }) => {
          const active =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                active
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-900'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon size={16} className={active ? 'text-violet-200' : 'text-slate-500'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-800/60 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          <ExternalLink size={16} className="text-slate-600" />
          View Website
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} className="text-slate-600" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
