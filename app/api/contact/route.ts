import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    const { name, email, company, demo, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    try {
      const ip =
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown";

      const rateLimitKey = `contact:${ip}`;

      const currentCount = await redis.get(rateLimitKey);
      const count = Number(currentCount || 0);

      if (count >= 5) {
        return NextResponse.json(
          {
            error: "Too many requests. Please try again later.",
          },
          {
            status: 429,
          }
        );
      }

      await redis.incr(rateLimitKey);

      if (count === 0) {
        await redis.expire(rateLimitKey, 3600);
      }
    } catch (redisError) {
      console.error(
        "[/api/contact] Redis unavailable, skipping rate limit:",
        redisError
      );
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "horizonrelevance@gmail.com",
      replyTo: email,
      subject: `[Contact Form] New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <div style="background:#050b1a;padding:24px 32px;border-radius:12px 12px 0 0">
            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#00b95f">Contact Form Submission</p>
            <h2 style="margin:8px 0 0;font-size:22px;color:#ffffff">New message from ${name}</h2>
          </div>
          <div style="background:#f8f9fa;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:12px;color:#6b7280;width:120px">Name</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:12px;color:#6b7280">Email</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px"><a href="mailto:${email}" style="color:#00b95f">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:12px;color:#6b7280">Company</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px">${company || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:${message ? "1px solid #e5e7eb" : "none"};font-size:12px;color:#6b7280">Demo Request</td><td style="padding:10px 0;border-bottom:${message ? "1px solid #e5e7eb" : "none"};font-size:14px">${demo || "—"}</td></tr>
              ${message ? `<tr><td colspan="2" style="padding:16px 0 0"><p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em">Message</p><p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</p></td></tr>` : ""}
            </table>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[/api/contact] Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[/api/contact] sent:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] caught:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
