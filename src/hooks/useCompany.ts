import { company as fallbackCompany } from "@/data/siteData";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/** Company contact details, overridable from the admin Settings tab. */
export function useCompany() {
  const { settings } = useSiteSettings();
  const contact = settings["contact"] ?? {};
  const social = settings["social"] ?? {};
  const hero = settings["hero"] ?? {};

  return {
    ...fallbackCompany,
    slogan: hero["slogan"] || fallbackCompany.slogan,
    phoneDisplay: contact["phone_display"] || fallbackCompany.phoneDisplay,
    phone: contact["phone"] || fallbackCompany.phone,
    email: contact["email"] || fallbackCompany.email,
    whatsapp: contact["whatsapp"] || fallbackCompany.whatsapp,
    address: contact["address"] || "Ministry Of Defence Rd, Battaramulla 10120",
    registration: contact["registration"] || fallbackCompany.registration,
    facebook: social["facebook"] || fallbackCompany.facebook,
    instagram: social["instagram"] || fallbackCompany.instagram,
    linkedin: social["linkedin"] || fallbackCompany.linkedin,
    threads: social["threads"] || fallbackCompany.threads,
    tiktok: social["tiktok"] || fallbackCompany.tiktok,
    youtube: social["youtube"] || fallbackCompany.youtube,
  };
}
