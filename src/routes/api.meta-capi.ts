import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "node:crypto";

const PIXEL_ID = "1070145265420068";
const ALLOWED_EVENTS = new Set(["Lead", "Contact", "PageView"]);
const safeJson = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
const hash = (value: string) => createHash("sha256").update(value).digest("hex");

export const Route = createFileRoute("/api/meta-capi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (
          origin &&
          !["https://skydesigners.lk", "https://www.skydesigners.lk"].includes(origin) &&
          !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
        )
          return safeJson({ success: false, message: "Origin not allowed." }, 403);
        const length = Number(request.headers.get("content-length") || 0);
        if (length > 16_384)
          return safeJson({ success: false, message: "Request is too large." }, 413);
        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return safeJson({ success: false, message: "Invalid JSON." }, 400);
        }
        const eventName = clean(body.event_name, 20);
        const eventId = clean(body.event_id, 100);
        const source = clean(body.event_source_url, 2048);
        if (!ALLOWED_EVENTS.has(eventName))
          return safeJson({ success: false, message: "Unsupported event." }, 400);
        if (!eventId) return safeJson({ success: false, message: "event_id is required." }, 400);
        let sourceUrl: URL;
        try {
          sourceUrl = new URL(source);
        } catch {
          return safeJson({ success: false, message: "Invalid event source URL." }, 400);
        }
        if (
          sourceUrl.protocol !== "https:" ||
          !["skydesigners.lk", "www.skydesigners.lk"].includes(sourceUrl.hostname)
        )
          return safeJson({ success: false, message: "Invalid event source URL." }, 400);
        const token = process.env.META_ACCESS_TOKEN;
        if (!token)
          return safeJson(
            { success: false, message: "Conversion service is not configured." },
            503,
          );
        const email = clean(body.email, 320).toLowerCase();
        const phone = clean(body.phone, 32).replace(/\D/g, "");
        const userData: Record<string, string | string[]> = {
          client_ip_address: clean(
            request.headers.get("x-nf-client-connection-ip") ||
              request.headers.get("x-forwarded-for")?.split(",")[0],
            64,
          ),
          client_user_agent: clean(request.headers.get("user-agent"), 512),
        };
        const fbp = clean(body.fbp, 255);
        const fbc = clean(body.fbc, 255);
        if (fbp) userData.fbp = fbp;
        if (fbc) userData.fbc = fbc;
        if (email) userData.em = [hash(email)];
        if (phone) userData.ph = [hash(phone)];
        Object.keys(userData).forEach((key) => {
          if (!userData[key] || (Array.isArray(userData[key]) && !userData[key].length))
            delete userData[key];
        });
        const payload: Record<string, unknown> = {
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              event_source_url: sourceUrl.toString(),
              action_source: "website",
              user_data: userData,
            },
          ],
        };
        if (process.env.META_TEST_EVENT_CODE)
          payload.test_event_code = process.env.META_TEST_EVENT_CODE;
        const version = process.env.META_GRAPH_API_VERSION || "v23.0";
        try {
          const upstream = await fetch(
            `https://graph.facebook.com/${version}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
              signal: AbortSignal.timeout(8000),
            },
          );
          if (!upstream.ok) {
            console.error(`Meta CAPI upstream status ${upstream.status}`);
            return safeJson({ success: false, message: "Conversion event was not accepted." }, 502);
          }
          return safeJson({ success: true });
        } catch {
          return safeJson(
            { success: false, message: "Conversion service is temporarily unavailable." },
            502,
          );
        }
      },
    },
  },
});
