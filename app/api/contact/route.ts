import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/* ── helpers ──────────────────────────────────────────────────────────── */

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function confirmationEmail(name: string, company: string, message: string): string {
  const preview = esc(message.slice(0, 200))
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
<tr><td>
<table width="600" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.10);">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#1e1b4b 0%,#3730a3 50%,#4338ca 100%);padding:40px 48px 36px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.12);border-radius:14px;padding:10px 20px;margin-bottom:14px;">
        <span style="color:#fff;font-size:26px;font-weight:900;letter-spacing:-0.5px;vertical-align:middle;">M</span>
        <span style="color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.3px;vertical-align:middle;margin-left:4px;">edeb</span>
        <span style="display:inline-block;width:8px;height:8px;background:#f59e0b;border-radius:50%;vertical-align:middle;margin-left:6px;"></span>
      </div>
      <p style="color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0;">Enterprise B2B Wholesale Platform</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:44px 48px 32px;">
      <h1 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 14px;line-height:1.3;">
        We&rsquo;ve received your message, ${esc(name)}!
      </h1>
      <p style="font-size:15px;color:#475569;line-height:1.75;margin:0 0 28px;">
        Thank you for reaching out from <strong style="color:#1e293b;">${esc(company)}</strong>.
        A member of our team will review your inquiry and be in touch
        <strong style="color:#1e293b;">within 24 hours</strong>.
      </p>

      <!-- Message preview -->
      <div style="background:#f8fafc;border-left:3px solid #6366f1;border-radius:0 10px 10px 0;padding:18px 20px;margin-bottom:30px;">
        <p style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;font-weight:700;">Your message</p>
        <p style="font-size:14px;color:#334155;line-height:1.7;margin:0;font-style:italic;">&ldquo;${preview}${message.length > 200 ? '&hellip;' : ''}&rdquo;</p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:0 0 36px;">
        <a href="https://medeb.io" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#1e293b;text-decoration:none;font-weight:800;font-size:14px;padding:15px 36px;border-radius:12px;letter-spacing:0.01em;">
          Explore the Platform &rarr;
        </a>
      </div>

      <!-- Contact info -->
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:24px;">
        <tr>
          <td style="padding-top:20px;">
            <p style="font-size:13px;color:#94a3b8;margin:0 0 10px;">Need immediate assistance?</p>
            <p style="font-size:14px;color:#475569;margin:0 0 6px;">
              <span style="color:#6366f1;font-weight:700;">&#9743;</span>&nbsp;
              <a href="tel:+251996995878" style="color:#475569;text-decoration:none;font-weight:600;">+251 99 699 5878</a>
            </p>
            <p style="font-size:14px;color:#475569;margin:0;">
              <span style="color:#6366f1;font-weight:700;">&#9993;</span>&nbsp;
              <a href="mailto:hello@medeb.io" style="color:#6366f1;text-decoration:none;font-weight:600;">hello@medeb.io</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#0f172a;padding:24px 48px;text-align:center;">
      <p style="color:#475569;font-size:12px;margin:0 0 4px;">
        &copy; ${new Date().getFullYear()} Medeb Technologies &middot; Addis Ababa, Ethiopia
      </p>
      <p style="color:#334155;font-size:11px;margin:0;">
        You received this email because you submitted a contact form on medeb.io
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function adminNotificationEmail(
  name: string,
  company: string,
  email: string,
  phone: string | null,
  message: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 20px;">
<tr><td>
<table width="560" align="center" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
  <tr>
    <td style="background:#1e1b4b;padding:24px 36px;">
      <p style="color:#a5b4fc;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Medeb Admin — New Lead</p>
      <h1 style="color:#fff;font-size:20px;font-weight:800;margin:0;">${esc(name)} &middot; ${esc(company)}</h1>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 36px;">
      <table width="100%" cellpadding="6" cellspacing="0">
        <tr><td style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;width:100px;">Email</td><td><a href="mailto:${esc(email)}" style="color:#6366f1;font-weight:600;font-size:14px;">${esc(email)}</a></td></tr>
        <tr><td style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Phone</td><td style="font-size:14px;color:#334155;">${phone ? esc(phone) : '<span style="color:#cbd5e1">—</span>'}</td></tr>
        <tr><td style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Company</td><td style="font-size:14px;color:#334155;font-weight:600;">${esc(company)}</td></tr>
      </table>
      <div style="background:#f8fafc;border-radius:10px;padding:16px 20px;margin-top:20px;">
        <p style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Message</p>
        <p style="font-size:14px;color:#1e293b;line-height:1.7;margin:0;">${esc(message)}</p>
      </div>
      <div style="margin-top:24px;text-align:center;">
        <a href="https://medeb.io/admin/leads" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 28px;border-radius:10px;">View in Admin Dashboard &rarr;</a>
      </div>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

/* ── route handler ───────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, company_name, email, phone, message } = body

  if (!name?.trim() || !company_name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Persist to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { error: dbError } = await supabase.from('contact_leads').insert({
    name: name.trim(),
    company_name: company_name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    message: message.trim(),
  })

  if (dbError) {
    console.error('DB insert error:', dbError)
    return NextResponse.json({ error: 'Failed to save your message.' }, { status: 500 })
  }

  // Send emails (non-blocking — DB save already succeeded)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const from = process.env.FROM_EMAIL ?? 'Medeb <noreply@medeb.io>'
    const adminTo = process.env.ADMIN_EMAIL ?? 'befikadufiseha23@gmail.com'

    await Promise.allSettled([
      // Confirmation to the lead
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [email.trim().toLowerCase()],
          subject: 'We received your message — Medeb',
          html: confirmationEmail(name.trim(), company_name.trim(), message.trim()),
        }),
      }),
      // Admin notification
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [adminTo],
          subject: `New lead: ${name.trim()} (${company_name.trim()})`,
          html: adminNotificationEmail(
            name.trim(),
            company_name.trim(),
            email.trim(),
            phone?.trim() || null,
            message.trim()
          ),
        }),
      }),
    ])
  }

  return NextResponse.json({ success: true })
}
