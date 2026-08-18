import { useEffect, useState } from "react";
import { Save, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Pkg {
  id: string;
  slug: string;
  tier: string;
  name: string;
  price_lkr: number;
  billing_period: string;
  badge: string | null;
  description: string | null;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
  features: string[];
}
interface Cat { id: string; name: string; sort_order: number }
interface Feat { id: string; category_id: string | null; label: string; sort_order: number }
interface Val { id: string; package_id: string | null; feature_id: string | null; included: boolean | null; display_value: string | null }

const PricingManager = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [categories, setCategories] = useState<Cat[]>([]);
  const [features, setFeatures] = useState<Feat[]>([]);
  const [values, setValues] = useState<Val[]>([]);
  const [newFeature, setNewFeature] = useState<Record<string, string>>({});

  const load = async () => {
    const [p, c, f, v] = await Promise.all([
      supabase.from("pricing_packages").select("*").order("sort_order"),
      supabase.from("pricing_categories").select("*").order("sort_order"),
      supabase.from("pricing_features").select("*").order("sort_order"),
      supabase.from("pricing_feature_values").select("*"),
    ]);
    setPackages((p.data ?? []) as Pkg[]);
    setCategories((c.data ?? []) as Cat[]);
    setFeatures((f.data ?? []) as Feat[]);
    setValues((v.data ?? []) as Val[]);
  };

  useEffect(() => { void load(); }, []);

  const patchPkg = (id: string, patch: Partial<Pkg>) =>
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const savePkg = async (pkg: Pkg) => {
    const { error } = await supabase
      .from("pricing_packages")
      .update({
        tier: pkg.tier,
        name: pkg.name,
        price_lkr: pkg.price_lkr,
        billing_period: pkg.billing_period,
        badge: pkg.badge,
        description: pkg.description,
        is_popular: pkg.is_popular,
        is_active: pkg.is_active,
        features: pkg.features,
      })
      .eq("id", pkg.id);
    toast(error ? { title: "Could not save", description: error.message, variant: "destructive" } : { title: `${pkg.name} saved` });
  };

  const valueFor = (packageId: string, featureId: string) =>
    values.find((v) => v.package_id === packageId && v.feature_id === featureId);

  const setValue = async (packageId: string, featureId: string, raw: string) => {
    const included = raw === "yes" ? true : raw === "no" ? false : null;
    const display_value = included === null ? raw : null;
    const { data, error } = await supabase
      .from("pricing_feature_values")
      .upsert({ package_id: packageId, feature_id: featureId, included, display_value }, { onConflict: "package_id,feature_id" })
      .select()
      .single();
    if (error) {
      toast({ title: "Could not update", description: error.message, variant: "destructive" });
      return;
    }
    setValues((prev) => {
      const rest = prev.filter((v) => !(v.package_id === packageId && v.feature_id === featureId));
      return [...rest, data as Val];
    });
  };

  const addFeature = async (categoryId: string) => {
    const label = (newFeature[categoryId] ?? "").trim();
    if (!label) return;
    const { data, error } = await supabase
      .from("pricing_features")
      .insert({ category_id: categoryId, label, sort_order: features.filter((f) => f.category_id === categoryId).length + 1 })
      .select()
      .single();
    if (error) {
      toast({ title: "Could not add feature", description: error.message, variant: "destructive" });
      return;
    }
    setFeatures((prev) => [...prev, data as Feat]);
    setNewFeature((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const deleteFeature = async (id: string) => {
    await supabase.from("pricing_features").delete().eq("id", id);
    setFeatures((prev) => prev.filter((f) => f.id !== id));
    setValues((prev) => prev.filter((v) => v.feature_id !== id));
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Pricing Management</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
        {packages.map((pkg) => (
          <div key={pkg.id} className="glass-card p-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input value={pkg.tier} onChange={(e) => patchPkg(pkg.id, { tier: e.target.value })} placeholder="Tier" className="bg-secondary border-border text-foreground" />
              <Input value={String(pkg.price_lkr)} onChange={(e) => patchPkg(pkg.id, { price_lkr: Number(e.target.value) || 0 })} placeholder="Price (LKR)" className="bg-secondary border-border text-foreground" />
            </div>
            <Input value={pkg.name} onChange={(e) => patchPkg(pkg.id, { name: e.target.value })} placeholder="Package name" className="bg-secondary border-border text-foreground" />
            <div className="grid grid-cols-2 gap-3">
              <Input value={pkg.badge ?? ""} onChange={(e) => patchPkg(pkg.id, { badge: e.target.value || null })} placeholder="Small label / badge" className="bg-secondary border-border text-foreground" />
              <Input value={pkg.billing_period} onChange={(e) => patchPkg(pkg.id, { billing_period: e.target.value })} placeholder="Billing period" className="bg-secondary border-border text-foreground" />
            </div>
            <Textarea value={pkg.description ?? ""} onChange={(e) => patchPkg(pkg.id, { description: e.target.value })} placeholder="Description" className="bg-secondary border-border text-foreground" />
            <Textarea
              value={pkg.features.join("\n")}
              onChange={(e) => patchPkg(pkg.id, { features: e.target.value.split("\n").filter(Boolean) })}
              placeholder="One feature per line"
              rows={5}
              className="bg-secondary border-border text-foreground"
            />
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={pkg.is_popular} onChange={(e) => patchPkg(pkg.id, { is_popular: e.target.checked })} /> Most popular
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={pkg.is_active} onChange={(e) => patchPkg(pkg.id, { is_active: e.target.checked })} /> Visible on site
              </label>
            </div>
            <Button onClick={() => savePkg(pkg)} className="gap-2"><Save size={16} /> Save package</Button>
          </div>
        ))}
      </div>

      <h2 className="font-heading text-xl font-bold text-foreground mb-4">Comparison table</h2>
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="glass-card p-6">
            <h3 className="text-foreground font-bold mb-4">{cat.name}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">Feature</th>
                    {packages.map((p) => (
                      <th key={p.id} className="text-left p-3 text-muted-foreground font-medium">{p.tier}</th>
                    ))}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {features.filter((f) => f.category_id === cat.id).map((f) => (
                    <tr key={f.id} className="border-b border-border/50">
                      <td className="p-3 text-foreground">{f.label}</td>
                      {packages.map((p) => {
                        const v = valueFor(p.id, f.id);
                        const current = v?.display_value ?? (v?.included ? "yes" : "no");
                        const isText = Boolean(v?.display_value);
                        return (
                          <td key={p.id} className="p-3">
                            <div className="flex flex-col gap-1">
                              <select
                                value={isText ? "text" : current}
                                onChange={(e) => setValue(p.id, f.id, e.target.value === "text" ? (v?.display_value || "Included") : e.target.value)}
                                className="bg-secondary border border-border rounded-md px-2 py-1 text-foreground"
                              >
                                <option value="yes">Included</option>
                                <option value="no">Not included</option>
                                <option value="text">Custom text</option>
                              </select>
                              {isText && (
                                <Input
                                  defaultValue={v?.display_value ?? ""}
                                  onBlur={(e) => setValue(p.id, f.id, e.target.value)}
                                  className="h-8 bg-secondary border-border text-foreground"
                                />
                              )}
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-3">
                        <Button size="sm" variant="ghost" onClick={() => deleteFeature(f.id)} className="text-destructive h-8 w-8 p-0"><Trash2 size={16} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 mt-4">
              <Input
                value={newFeature[cat.id] ?? ""}
                onChange={(e) => setNewFeature((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                placeholder="New feature label"
                className="bg-secondary border-border text-foreground max-w-sm"
              />
              <Button onClick={() => addFeature(cat.id)} variant="secondary" className="gap-2"><Plus size={16} /> Add</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingManager;
