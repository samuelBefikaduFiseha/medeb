'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-100 prose-code:rounded prose-code:px-1 prose-pre:bg-slate-900 prose-img:rounded-xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
