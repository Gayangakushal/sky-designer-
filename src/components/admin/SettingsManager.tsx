import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Group = { key: string; values: Record<string, string> };

const LABELS: Record<string, string> = {
  contact: "Contact details",
  hero: "Homepage hero",
  social: "Social links",
};

const SettingsManager = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    void supabase
      .from("site_settings")
      .select("setting_key,setting_value")
      .order("setting_key")
      .then(({ data }) => {
        setGroups((data ?? []).map((row) => ({ key: row.setting_key, values: (row.setting_value ?? {}) as Record<string, string> })));
      });
  }, []);

  const save = async (group: Group) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ setting_key: group.key, setting_value: group.values }, { onConflict: "setting_key" });
    toast(error ? { title: "Could not save", description: error.message, variant: "destructive" } : { title: `${LABELS[group.key] ?? group.key} saved` });
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Website Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div key={group.key} className="glass-card p-6 space-y-3">
            <h3 className="text-foreground font-bold">{LABELS[group.key] ?? group.key}</h3>
            {Object.entries(group.values).map(([field, value]) => (
              <div key={field} className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-muted-foreground">{field.replace(/_/g, " ")}</label>
                <Input
                  value={value}
                  onChange={(e) =>
                    setGroups((prev) =>
                      prev.map((g) => (g.key === group.key ? { ...g, values: { ...g.values, [field]: e.target.value } } : g)),
                    )
                  }
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            ))}
            <Button onClick={() => save(group)} className="gap-2"><Save size={16} /> Save</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsManager;
