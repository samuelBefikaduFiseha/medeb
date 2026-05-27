-- ============================================================
-- Medeb Marketing Database Schema
-- Run in Supabase SQL Editor (Settings > SQL Editor)
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- TABLE: contact_leads
-- Stores all "Contact Us" form submissions from the website.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_leads (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  company_name TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  phone        TEXT,
  message      TEXT        NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: newsletter_subscribers
-- Captures waitlist / newsletter sign-ups from hero & footer.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: blog_posts
-- CMS-managed posts with markdown content, categories, and
-- draft/published lifecycle.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT        NOT NULL,
  slug            TEXT        NOT NULL UNIQUE,
  category        TEXT        NOT NULL DEFAULT 'General',
  content         TEXT        NOT NULL DEFAULT '',
  cover_image_url TEXT,
  status          TEXT        NOT NULL DEFAULT 'draft'
                              CHECK (status IN ('draft', 'published')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
ALTER TABLE contact_leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts           ENABLE ROW LEVEL SECURITY;

-- Anonymous users: insert-only for leads and newsletter
CREATE POLICY "anon_insert_leads"
  ON contact_leads FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_insert_newsletter"
  ON newsletter_subscribers FOR INSERT TO anon
  WITH CHECK (true);

-- Anonymous users: read published blog posts only
CREATE POLICY "anon_read_published_posts"
  ON blog_posts FOR SELECT TO anon
  USING (status = 'published');

-- Authenticated users (admins): full access to all tables
CREATE POLICY "auth_full_access_leads"
  ON contact_leads FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_full_access_newsletter"
  ON newsletter_subscribers FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_full_access_blog"
  ON blog_posts FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ────────────────────────────────────────────────────────────
-- INDEXES
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug   ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at  ON contact_leads (created_at DESC);
