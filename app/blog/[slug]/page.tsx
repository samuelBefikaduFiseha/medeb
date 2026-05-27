import { createClient } from '@supabase/supabase-js'
import type { BlogPost } from '@/lib/types'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data || null
}

type Props = { params: Promise<{ slug: string }> }

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="bg-slate-900 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <Tag size={13} className="text-violet-400" />
              <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              {post.title}
            </h1>

            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Calendar size={14} />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.cover_image_url && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full rounded-2xl shadow-2xl aspect-video object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <MarkdownRenderer content={post.content} />

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-500 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
