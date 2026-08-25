import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SettingsMap = Record<string, Record<string, string>>;

let settingsChannel: ReturnType<typeof supabase.channel> | null = null;
let settingsSubscribers = 0;
let invalidateSettings: (() => void) | null = null;

const fetchSiteSettings = async (): Promise<SettingsMap> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("setting_key,setting_value");
  if (error) throw error;
  const settings: SettingsMap = {};
  for (const row of data ?? []) {
    settings[row.setting_key] = (row.setting_value ?? {}) as Record<string, string>;
  }
  return settings;
};

/** Shared live settings query: one request and one realtime channel per browser tab. */
export function useSiteSettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["site_settings", "public"],
    queryFn: fetchSiteSettings,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    settingsSubscribers += 1;
    invalidateSettings = () => {
      void queryClient.invalidateQueries({ queryKey: ["site_settings", "public"] });
    };
    if (!settingsChannel) {
      settingsChannel = supabase
        .channel("public-site-settings")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "site_settings" },
          () => invalidateSettings?.(),
        )
        .subscribe();
    }

    return () => {
      settingsSubscribers -= 1;
      if (settingsSubscribers === 0 && settingsChannel) {
        void supabase.removeChannel(settingsChannel);
        settingsChannel = null;
        invalidateSettings = null;
      }
    };
  }, [queryClient]);

  return { settings: query.data ?? {}, loading: query.isLoading };
}
