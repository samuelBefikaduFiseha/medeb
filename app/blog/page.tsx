import { createClient } from '@supabase/supabase-js'
import type { BlogPost } from '@/lib/types'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import Link from 'next/link'
import { Rss } from 'lucide-react'

type SearchParams = { category?: string }

async function getPosts(category?: string): Promise<BlogPost[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data } = await query
  return data || []
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { category } = await searchParams
  const posts = await getPosts(category)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 pt-24 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-violet-600 text-sm font-semibold mb-2">
                  <Rss size={14} />
                  Medeb Blog
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  Insights &amp; Updates
                </h1>
                <p className="text-slate-500 mt-2">
                  Perspectives on B2B commerce, supply chain, and the future of wholesale trade.
                </p>
              </div>
              <Link
                href="/#contact"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
              >
                Get Early Access
              </Link>
            </div>

            <div className="mt-8">
              <CategoryFilter current={category} />
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Rss size={24} className="text-slate-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">No posts yet</h2>
              <p className="text-slate-500">
                {category
                  ? `No published posts in "${category}" yet. Check back soon.`
                  : 'No published posts yet. Check back soon.'}
              </p>
              {category && (
                <Link
                  href="/blog"
                  className="mt-4 inline-block text-violet-600 font-medium text-sm hover:text-violet-500"
                >
                  View all posts
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
