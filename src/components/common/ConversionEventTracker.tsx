import { useEffect } from "react";
import {
  pushConversionEvent,
  type ConversionEventName,
} from "@/lib/conversion-events";

const explicitEvents = new Set<ConversionEventName>([
  "contact_whatsapp_click",
  "contact_phone_click",
  "contact_email_click",
  "package_enquiry_click",
  "service_enquiry_click",
]);

/** Captures privacy-safe contact and contextual CTA clicks without loading a new library. */
const ConversionEventTracker = () => {
  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const explicitTarget = event.target.closest<HTMLElement>("[data-conversion-event]");
      const explicitEvent = explicitTarget?.dataset.conversionEvent as
        | ConversionEventName
        | undefined;

      if (explicitEvent && explicitEvents.has(explicitEvent)) {
        pushConversionEvent(explicitEvent, {
          conversion_context: explicitTarget?.dataset.conversionContext,
        });
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        pushConversionEvent("contact_phone_click");
      } else if (href.startsWith("mailto:")) {
        pushConversionEvent("contact_email_click");
      } else if (/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
        pushConversionEvent("contact_whatsapp_click");
      }
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return null;
};

export default ConversionEventTracker;
