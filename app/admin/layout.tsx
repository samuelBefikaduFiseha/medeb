'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  const isLogin = pathname === '/admin/login'

  useEffect(() => {
    void (async () => {
      const res = await supabase.auth.getUser()
      const user = res?.data?.user
      if (!user && !isLogin) {
        router.replace('/admin/login')
      } else {
        setReady(true)
      }
    })()
  }, [isLogin, router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading…</p>
        </div>
      </div>
    )
  }

  if (isLogin) return <>{children}</>

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">{children}</main>
    </div>
  )
}
