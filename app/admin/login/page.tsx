'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import MedebLogo from '@/components/MedebLogo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    void (async () => {
      const res = await supabase.auth.getUser()
      if (res?.data?.user) router.replace('/admin')
    })()
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (authError) {
      setError(authError.message)
      setStatus('error')
    } else {
      router.replace('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[80px] bg-violet-500 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <MedebLogo size={48} variant="full" showTagline />
            <span className="text-slate-600 text-xs uppercase tracking-[0.15em] font-bold mt-1">
              Admin Console
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 border border-slate-100 p-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-100 mx-auto mb-5">
            <Lock size={24} className="text-violet-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-1">Welcome back</h1>
          <p className="text-slate-400 text-sm text-center mb-8">
            Sign in to the Medeb admin dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@medeb.io"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 text-slate-800 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 text-slate-800 text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 disabled:opacity-60 text-white font-bold text-sm transition-all shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30 hover:-translate-y-0.5 mt-2"
            >
              {status === 'loading' ? 'Signing in…' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
