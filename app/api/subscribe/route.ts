import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function welcomeEmail(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
<tr><td>
<table width="600" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.10);">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#1e1b4b 0%,#3730a3 50%,#4338ca 100%);padding:48px 48px 40px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.12);border-radius:14px;padding:10px 20px;margin-bottom:16px;">
        <span style="color:#fff;font-size:26px;font-weight:900;letter-spacing:-0.5px;vertical-align:middle;">M</span>
        <span style="color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.3px;vertical-align:middle;margin-left:4px;">edeb</span>
        <span style="display:inline-block;width:8px;height:8px;background:#f59e0b;border-radius:50%;vertical-align:middle;margin-left:6px;"></span>
      </div>
      <h1 style="color:#fff;font-size:26px;font-weight:900;margin:0 0 10px;line-height:1.2;">
        You&rsquo;re on the list!
      </h1>
      <p style="color:rgba(255,255,255,0.65);font-size:15px;margin:0;line-height:1.6;">
        Thank you for joining the Medeb waitlist.
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:44px 48px 32px;">
      <p style="font-size:15px;color:#475569;line-height:1.75;margin:0 0 28px;">
        We&rsquo;re building an <strong style="color:#1e293b;">enterprise-grade B2B wholesale commerce
        and digital supply chain ecosystem</strong> that connects commercial suppliers with retail
        merchants through governed, auditable digital trade.
      </p>

      <!-- Feature highlights -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        ${[
          ['🏪', 'Live Retail Catalog', 'Real-time, admin-curated product catalog with structured browsing.'],
          ['📊', 'Daily Pricing Governance', 'Immutable audit trails for every single price change.'],
          ['🔒', 'Medeb Approval Vault', 'Asynchronous staging pipeline — no change goes live without admin sign-off.'],
          ['⚡', '5–10 Min RFQ Engine', 'Custom sourcing requests fulfilled in minutes, not hours.'],
        ]
          .map(
            ([icon, title, desc]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;width:36px;font-size:20px;">${icon}</td>
            <td style="padding:10px 0 10px 12px;border-bottom:1px solid #f1f5f9;">
              <p style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 3px;">${title}</p>
              <p style="font-size:13px;color:#64748b;margin:0;line-height:1.5;">${desc}</p>
            </td>
          </tr>`
          )
          .join('')}
      </table>

      <p style="font-size:15px;color:#475569;line-height:1.75;margin:0 0 28px;">
        We&rsquo;ll reach out with early access details, exclusive updates, and launch announcements
        as we get closer to our rollout.
      </p>

      <!-- CTA -->
      <div style="text-align:center;margin:0 0 36px;">
        <a href="https://medeb.io" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#1e293b;text-decoration:none;font-weight:800;font-size:14px;padding:15px 36px;border-radius:12px;">
          Explore Medeb &rarr;
        </a>
      </div>

      <!-- Contact -->
      <div style="border-top:1px solid #e2e8f0;padding-top:20px;">
        <p style="font-size:13px;color:#94a3b8;margin:0 0 10px;">Questions before launch? Reach us at:</p>
        <p style="font-size:14px;color:#475569;margin:0 0 6px;">
          <a href="tel:+251996995878" style="color:#475569;text-decoration:none;font-weight:600;">&#9743; +251 99 699 5878</a>
        </p>
        <p style="font-size:14px;margin:0;">
          <a href="mailto:hello@medeb.io" style="color:#6366f1;text-decoration:none;font-weight:600;">&#9993; hello@medeb.io</a>
        </p>
      </div>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#0f172a;padding:24px 48px;text-align:center;">
      <p style="color:#475569;font-size:12px;margin:0 0 4px;">
        &copy; ${new Date().getFullYear()} Medeb Technologies &middot; Addis Ababa, Ethiopia
      </p>
      <p style="color:#334155;font-size:11px;margin:0;">
        You&rsquo;re receiving this because you signed up at medeb.io
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const email = body.email?.trim()?.toLowerCase()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  // Persist to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { error: dbError } = await supabase.from('newsletter_subscribers').insert({ email })

  if (dbError && dbError.code !== '23505') {
    console.error('DB insert error:', dbError)
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 })
  }

  // Send welcome email (skip if already subscribed — duplicate)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && !dbError) {
    const from = process.env.FROM_EMAIL ?? 'Medeb <noreply@medeb.io>'
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "You're on the Medeb waitlist 🎉",
        html: welcomeEmail(),
      }),
    }).catch((e) => console.error('Email send failed:', e))
  }

  return NextResponse.json({ success: true })
}
