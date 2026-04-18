import { Resend } from "resend";
import { allowedCountries, CountryName } from "@/lib/order-countries";

export const runtime = "nodejs";

const SERVICE_NAME = "Nexus Growth Hub Membership";
const FROM_EMAIL = "Nexus Growth Hub <support@nexusgrowthub.com>";

const planPaymentLinks = {
  Basic: "https://designflare.de/pack/firstpack.html",
  Starter: "https://designflare.de/pack/secondpack.html",
  Pro: "https://designflare.de/pack/thirdpack.html",
  Growth: "https://designflare.de/pack/forthpack.html",
  Executive: "https://designflare.de/pack/premiumfirstpack.html",
  Elite: "https://designflare.de/pack/premiumsecondpack.html",
  Corporate: "https://designflare.de/pack/premiumthirdpack.html",
  Chairman: "https://designflare.de/pack/premiumforthpack.html",
} as const;

type MembershipPlan = keyof typeof planPaymentLinks;

type InvoicePayload = {
  membershipPlan?: string;
  fullName?: string;
  email?: string;
  country?: string;
};

function getRequiredEnv() {
  const values = {
    resendApiKey: process.env.RESEND_API_KEY,
    adminEmail: process.env.ORDER_ADMIN_EMAIL,
  };

  const missing = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }

  return {
    resendApiKey: values.resendApiKey as string,
    adminEmail: values.adminEmail as string,
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function customerInvoiceHtml(name: string, membershipPlan: string, paymentLink: string) {
  return `
  <div style="background:#0f172a;padding:28px;font-family:Inter,Arial,sans-serif;color:#e2e8f0;">
    <div style="max-width:620px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:14px;padding:28px;">
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#93c5fd;margin:0 0 12px;">Invoice Notification</p>
      <h1 style="font-size:24px;line-height:1.3;margin:0 0 16px;color:#f8fafc;">Invoice: Finalize your ${SERVICE_NAME} Activation</h1>
      <p style="font-size:15px;line-height:1.8;margin:0 0 14px;">Hello ${name}, thank you for your order. To complete your activation, please proceed with the payment using the secure link below.</p>
      <p style="font-size:14px;line-height:1.7;margin:0 0 10px;color:#cbd5e1;">Selected Plan: <strong>${membershipPlan}</strong></p>
      <div style="text-align:center;padding:24px 0;">
        <a href="${paymentLink}" style="display:inline-block;background:#0070f3;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:700;">
          Pay Now &amp; Activate Account
        </a>
      </div>
      <p style="font-size:14px;line-height:1.7;margin:0 0 10px;color:#cbd5e1;">Once paid, your credentials will be delivered to this email address within 1-12 hours.</p>
      <p style="font-size:12px;color:#94a3b8;margin:0;">If you did not request this invoice, you can safely ignore this email.</p>
    </div>
  </div>
  `;
}

function adminNotificationHtml(name: string, email: string, country: string, membershipPlan: string) {
  return `
  <div style="background:#0f172a;padding:24px;font-family:Inter,Arial,sans-serif;color:#e2e8f0;">
    <div style="max-width:620px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:14px;padding:24px;">
      <h2 style="margin:0 0 12px;color:#f8fafc;">New order submission received</h2>
      <p style="margin:0;font-size:14px;line-height:1.7;">
        Customer: ${name} | Email: ${email} | Country: ${country} | Plan: ${membershipPlan}. The invoice has been automatically sent to them.
      </p>
    </div>
  </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InvoicePayload;
    const membershipPlan = body.membershipPlan?.trim() ?? "";
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const country = body.country?.trim() ?? "";

    if (!membershipPlan || !fullName || !email || !country) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!allowedCountries.has(country as CountryName)) {
      return Response.json({ error: "Invalid country selection" }, { status: 400 });
    }

    if (!(membershipPlan in planPaymentLinks)) {
      return Response.json({ error: "Invalid membership plan" }, { status: 400 });
    }

    const paymentLink = planPaymentLinks[membershipPlan as MembershipPlan];
    const { resendApiKey, adminEmail } = getRequiredEnv();
    const resend = new Resend(resendApiKey);

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Invoice: Finalize your ${SERVICE_NAME} Activation`,
        html: customerInvoiceHtml(fullName, membershipPlan, paymentLink),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: adminEmail,
        subject: `NEW LEAD: ${fullName} - ${country} - ${membershipPlan}`,
        html: adminNotificationHtml(fullName, email, country, membershipPlan),
      }),
    ]);

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Send invoice API failure", error);
    return Response.json({ error: "Email delivery failed" }, { status: 500 });
  }
}
