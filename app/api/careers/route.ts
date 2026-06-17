import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import redis from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    // Check configuration
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }
    // Parse request body
    const { name, email, position, message } = await req.json();

    // Validate input
    if (!name || !email || !position) {
      return NextResponse.json({ error: "Name, email and position are required." }, { status: 400 });
    }

    // Redis rate limiting (fail-open)
    try {
      const ip =
        req.headers.get("cf-connecting-ip") ||
        req.headers
          .get("x-forwarded-for")
          ?.split(",")[0]
          ?.trim() || "unknown";

      const rateLimitKey = `career:${ip}`;

      const currentCount =
        await redis.get(rateLimitKey);

      const count = Number(currentCount || 0);

      // Allow max 3 applications/hour/IP
      if (count >= 3) {
        return NextResponse.json(
          {
            error:
              "Too many applications submitted. Please try again later.",
          },
          {
            status: 429,
          }
        );
      }
      await redis.incr(rateLimitKey);

      // Set expiry only on first request
      if (count === 0) {
        await redis.expire(rateLimitKey, 3600);
      }
    } catch (redisError) {
      console.error(
        "[/api/careers] Redis unavailable, skipping rate limit:",
        redisError
      );
    }
    
    // Create Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "horizonrelevance@gmail.com",
      replyTo: email,
      subject: `[Career Application] ${name} — ${position}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <div style="background:#050b1a;padding:24px 32px;border-radius:12px 12px 0 0">
            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#f59e0b">Career Application</p>
            <h2 style="margin:8px 0 0;font-size:22px;color:#ffffff">${name} applied for ${position}</h2>
          </div>
          <div style="background:#f8f9fa;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:12px;color:#6b7280;width:120px">Name</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:12px;color:#6b7280">Email</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px"><a href="mailto:${email}" style="color:#f59e0b">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:${message ? "1px solid #e5e7eb" : "none"};font-size:12px;color:#6b7280">Position</td><td style="padding:10px 0;border-bottom:${message ? "1px solid #e5e7eb" : "none"};font-size:14px;font-weight:600">${position}</td></tr>
              ${message ? `<tr><td colspan="2" style="padding:16px 0 0"><p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em">Cover Note</p><p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</p></td></tr>` : ""}
            </table>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[/api/careers] Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[/api/careers] sent:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/careers] caught:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
