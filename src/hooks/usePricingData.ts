import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { pricingPackages as fallbackPackages, type PricingPackage } from "@/data/pricingPackages";
import {
  pricingComparison as fallbackComparison,
  type ComparisonCategory,
  type ComparisonValue,
} from "@/data/pricingComparison";

const formatPrice = (value: number) => new Intl.NumberFormat("en-US").format(value);

/** Live pricing packages + comparison table, with the bundled data as fallback. */
export function usePricingData() {
  const [packages, setPackages] = useState<PricingPackage[]>(fallbackPackages);
  const [comparison, setComparison] = useState<ComparisonCategory[]>(fallbackComparison);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const [pkgRes, catRes, featRes, valRes] = await Promise.all([
        supabase.from("pricing_packages").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("pricing_categories").select("*").order("sort_order"),
        supabase.from("pricing_features").select("*").order("sort_order"),
        supabase.from("pricing_feature_values").select("*"),
      ]);
      if (!active) return;

      const dbPackages = pkgRes.data ?? [];
      if (dbPackages.length) {
        setPackages(
          dbPackages.map((p) => ({
            slug: p.slug,
            category: p.tier,
            name: p.name,
            price: p.slug === "custom" ? "Custom Quote" : formatPrice(p.price_lkr),
            description: p.description ?? "",
            features: p.features ?? [],
            buttonLabel: p.slug === "custom" ? "Get a Custom Quote" : `Select ${p.tier}`,
            optionLabel: `${p.tier} – LKR ${formatPrice(p.price_lkr)} ${p.billing_period === "/mo" ? "/ month" : p.billing_period}`,
            featured: p.is_popular,
            smallLabel: p.badge ?? undefined,
            isCustom: p.slug === "custom",
          })),
        );

        const cats = catRes.data ?? [];
        const feats = featRes.data ?? [];
        const values = valRes.data ?? [];
        if (cats.length && feats.length) {
          setComparison(
            cats.map((cat) => ({
              name: cat.name,
              features: feats
                .filter((f) => f.category_id === cat.id)
                .map((f) => ({
                  name: f.label,
                  values: dbPackages.map((p) => {
                    const v = values.find((x) => x.feature_id === f.id && x.package_id === p.id);
                    if (!v) return p.slug === "custom" ? "Tailored" : false;
                    return (v.display_value ?? v.included ?? false) as ComparisonValue;
                  }) as ComparisonCategory["features"][number]["values"],
                })),
            })),
          );
        }
      }
      setLoading(false);
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  return { packages, comparison, loading };
}
