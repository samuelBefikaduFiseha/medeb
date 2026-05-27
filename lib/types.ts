export interface ContactLead {
  id: string
  name: string
  company_name: string
  email: string
  phone: string | null
  message: string
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  content: string
  cover_image_url: string | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

