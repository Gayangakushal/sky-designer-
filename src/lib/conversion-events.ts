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

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    ...details,
  });
};
