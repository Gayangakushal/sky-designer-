import { useMemo } from "react";
import { company as fallbackCompany } from "@/data/siteData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/** Company contact details, overridable from the admin Settings tab. */
export function useCompany() {
  const { settings } = useSiteSettings();
  const contact = settings["contact"] ?? {};
  const social = settings["social"] ?? {};

  return useMemo(
    () => ({
      ...fallbackCompany,
      phoneDisplay: contact["phone_display"] || fallbackCompany.phoneDisplay,
      phone: contact["phone"] || fallbackCompany.phone,
      email: contact["email"] || fallbackCompany.email,
      whatsapp: contact["whatsapp"] || fallbackCompany.whatsapp,
      address: contact["address"] || "Ministry Of Defence Rd, Battaramulla 10120",
      registration: contact["registration"] || fallbackCompany.registration,
      youtube: social["youtube"] || fallbackCompany.youtube,
    }),
    [contact, social],
  );
}
