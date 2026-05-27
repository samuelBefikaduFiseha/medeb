import { createClient } from '@supabase/supabase-js'

let _client: ReturnType<typeof createClient> | null = null

function getClient() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _client
}

// Lazy proxy — client is instantiated only when first accessed at runtime,
// not at module evaluation time (which would fail during static prerendering).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = new Proxy({} as any, {
  get(_: object, prop: string | symbol): unknown {
    const client = getClient()
    const value = client[prop as keyof typeof client]
    return typeof value === 'function'
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value
  },
})
