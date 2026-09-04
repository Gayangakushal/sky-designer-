export type ConversionEventName =
  | "contact_whatsapp_click"
  | "contact_phone_click"
  | "contact_email_click"
  | "project_enquiry_submit"
  | "package_enquiry_click"
  | "service_enquiry_click";

type ConversionEventDetails = {
  conversion_context?: string;
};

/**
 * Queues a privacy-safe conversion signal for GTM. Never pass contact details,
 * free-text messages, or destination URLs through this helper.
 */
export const pushConversionEvent = (
  event: ConversionEventName,
  details: ConversionEventDetails = {},
) => {
  if (typeof window === "undefined") return;

  const eventId = crypto.randomUUID();
  const metaEventName =
    event === "contact_whatsapp_click"
      ? "Lead"
      : event === "contact_phone_click" || event === "contact_email_click"
        ? "Contact"
        : undefined;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    meta_event_id: eventId,
    meta_event_name: metaEventName,
    ...details,
  });
  if (metaEventName) {
    const cookie = Object.fromEntries(
      document.cookie
        .split(";")
        .map((part) => part.trim().split(/=(.*)/s, 2))
        .filter(([key]) => key),
    );
    void fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event_name: metaEventName,
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: cookie._fbp,
        fbc: cookie._fbc,
      }),
    });
  }
};
