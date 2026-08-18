import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SettingsMap = Record<string, Record<string, string>>;

/** Editable website settings (contact, hero, social) loaded from the database. */
export function useSiteSettings() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("site_settings")
      .select("setting_key,setting_value")
      .then(({ data }) => {
        if (!active) return;
        const map: SettingsMap = {};
        for (const row of data ?? []) {
          map[row.setting_key] = (row.setting_value ?? {}) as Record<string, string>;
        }
        setSettings(map);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { settings, loading };
}
