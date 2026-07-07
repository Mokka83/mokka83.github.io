import type { Handler } from "@netlify/functions";

const MAX_LENGTHS = {
  name: 120,
  company: 160,
  email: 180,
  telephone: 60,
  topic: 160,
  message: 4000
};

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value || "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] || char));
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

async function verifyTurnstile(token: string, ip?: string) {
  if (!process.env.TURNSTILE_SECRET_KEY) return process.env.NODE_ENV !== "production";
  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token
  });
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const result = await response.json() as { success?: boolean };
  return Boolean(result.success);
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  const contentType = event.headers["content-type"] || "";
  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    return { statusCode: 400, body: "Invalid request" };
  }

  try {
    const request = new Request("https://local/contact", {
      method: "POST",
      headers: { "content-type": contentType },
      body: event.isBase64Encoded ? Buffer.from(event.body || "", "base64") : event.body
    });
    const form = await request.formData();
    if (clean(form.get("website"), 200)) return { statusCode: 200, body: "OK" };

    const startedAt = Number(clean(form.get("startedAt"), 30));
    if (!startedAt || Date.now() - startedAt < 2500) return { statusCode: 400, body: "Invalid request" };

    const name = clean(form.get("name"), MAX_LENGTHS.name);
    const company = clean(form.get("company"), MAX_LENGTHS.company);
    const email = clean(form.get("email"), MAX_LENGTHS.email);
    const telephone = clean(form.get("telephone"), MAX_LENGTHS.telephone);
    const topic = clean(form.get("topic"), MAX_LENGTHS.topic);
    const message = clean(form.get("message"), MAX_LENGTHS.message);
    const consent = clean(form.get("consent"), 10) === "yes";
    const token = clean(form.get("cf-turnstile-response"), 2048);

    if (!name || !validEmail(email) || !topic || !message || !consent || /[\r\n]/.test(name + topic)) {
      return { statusCode: 400, body: "Invalid request" };
    }

    const turnstileOk = await verifyTurnstile(token, event.headers["x-nf-client-connection-ip"]);
    if (!turnstileOk) return { statusCode: 400, body: "Invalid request" };

    const resendKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_RECIPIENT;
    const from = process.env.CONTACT_FROM;
    if (!resendKey || !recipient || !from) return { statusCode: process.env.NODE_ENV === "production" ? 503 : 200, body: process.env.NODE_ENV === "production" ? "Unavailable" : "Development accepted" };

    const html = `
      <h2>Website inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telephone:</strong> ${escapeHtml(telephone)}</p>
      <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const send = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: recipient, reply_to: email, subject: `Website inquiry: ${topic}`, html })
    });
    if (!send.ok) return { statusCode: 502, body: "Message failed" };
    return { statusCode: 200, body: "Message received" };
  } catch {
    return { statusCode: 400, body: "Invalid request" };
  }
};
