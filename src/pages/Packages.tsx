import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

type PackageOption = {
  id: string;
  title: string;
  price: string;
  duration: string;
  plan: string;
  visible: boolean;
};

const categories = [
  "Facebook Ads",
  "Instagram Ads",
  "TikTok Ads",
];

const plans = ["Standard", "Premium", "Platinum"];

const facebookStandardPackages: PackageOption[] = [
  { id: "fb-std-1", title: "2,500 LKR Package (Max 5 days)", price: "2,500 LKR", duration: "Max 5 days", plan: "Standard", visible: true },
  { id: "fb-std-2", title: "3,800 LKR Package (Max 7 days)", price: "3,800 LKR", duration: "Max 7 days", plan: "Standard", visible: true },
  { id: "fb-std-3", title: "5,000 LKR Package (Max 10 days)", price: "5,000 LKR", duration: "Max 10 days", plan: "Standard", visible: true },
  { id: "fb-std-4", title: "6,800 LKR Package (Max 15 days) - Recommended", price: "6,800 LKR", duration: "Max 15 days", plan: "Standard", visible: true },
  { id: "fb-std-5", title: "8,500 LKR Package (Max 20 days) - Recommended", price: "8,500 LKR", duration: "Max 20 days", plan: "Standard", visible: true },
  { id: "fb-std-6", title: "10,000 LKR Package (Max 25 days) - Best Recommended", price: "10,000 LKR", duration: "Max 25 days", plan: "Standard", visible: true },
  { id: "fb-std-7", title: "11,500 LKR Package (Max 30 days) - Best Recommended", price: "11,500 LKR", duration: "Max 30 days", plan: "Standard", visible: true },
];

const instagramStandardPackages: PackageOption[] = [
  { id: "ig-std-1", title: "2,500 LKR Package (Max 5 days)", price: "2,500 LKR", duration: "Max 5 days", plan: "Standard", visible: true },
  { id: "ig-std-2", title: "3,800 LKR Package (Max 7 days)", price: "3,800 LKR", duration: "Max 7 days", plan: "Standard", visible: true },
  { id: "ig-std-3", title: "5,000 LKR Package (Max 10 days)", price: "5,000 LKR", duration: "Max 10 days", plan: "Standard", visible: true },
  { id: "ig-std-4", title: "6,800 LKR Package (Max 15 days) - Recommended", price: "6,800 LKR", duration: "Max 15 days", plan: "Standard", visible: true },
  { id: "ig-std-5", title: "8,500 LKR Package (Max 20 days) - Recommended", price: "8,500 LKR", duration: "Max 20 days", plan: "Standard", visible: true },
  { id: "ig-std-6", title: "10,000 LKR Package (Max 25 days) - Best Recommended", price: "10,000 LKR", duration: "Max 25 days", plan: "Standard", visible: true },
  { id: "ig-std-7", title: "11,500 LKR Package (Max 30 days) - Best Recommended", price: "11,500 LKR", duration: "Max 30 days", plan: "Standard", visible: true },
];

const tiktokStandardPackages: PackageOption[] = [
  { id: "tt-std-1", title: "2,500 LKR Package (Max 5 days)", price: "2,500 LKR", duration: "Max 5 days", plan: "Standard", visible: true },
  { id: "tt-std-2", title: "3,800 LKR Package (Max 7 days)", price: "3,800 LKR", duration: "Max 7 days", plan: "Standard", visible: true },
  { id: "tt-std-3", title: "5,000 LKR Package (Max 10 days)", price: "5,000 LKR", duration: "Max 10 days", plan: "Standard", visible: true },
  { id: "tt-std-4", title: "6,800 LKR Package (Max 15 days) - Recommended", price: "6,800 LKR", duration: "Max 15 days", plan: "Standard", visible: true },
  { id: "tt-std-5", title: "8,500 LKR Package (Max 20 days) - Recommended", price: "8,500 LKR", duration: "Max 20 days", plan: "Standard", visible: true },
  { id: "tt-std-6", title: "10,000 LKR Package (Max 25 days) - Best Recommended", price: "10,000 LKR", duration: "Max 25 days", plan: "Standard", visible: true },
  { id: "tt-std-7", title: "11,500 LKR Package (Max 30 days) - Best Recommended", price: "11,500 LKR", duration: "Max 30 days", plan: "Standard", visible: true },
];

const facebookPremiumPackages: PackageOption[] = [
  { id: "fb-prem-1", title: "6,800 LKR Package (5 Days)", price: "6,800 LKR", duration: "5 Days", plan: "Premium", visible: true },
  { id: "fb-prem-2", title: "8,800 LKR Package (7 Days)", price: "8,800 LKR", duration: "7 Days", plan: "Premium", visible: true },
  { id: "fb-prem-3", title: "10,000 LKR Package (5/7 Days)", price: "10,000 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "fb-prem-4", title: "11,500 LKR Package (5/7 Days) - Recommended", price: "11,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "fb-prem-5", title: "13,500 LKR Package (5/7 Days) - Recommended", price: "13,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "fb-prem-6", title: "15,500 LKR Package (5/7 Days) - Best Recommended", price: "15,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
];

const instagramPremiumPackages: PackageOption[] = [
  { id: "ig-prem-1", title: "6,800 LKR Package (5 Days)", price: "6,800 LKR", duration: "5 Days", plan: "Premium", visible: true },
  { id: "ig-prem-2", title: "8,800 LKR Package (7 Days)", price: "8,800 LKR", duration: "7 Days", plan: "Premium", visible: true },
  { id: "ig-prem-3", title: "10,000 LKR Package (5/7 Days)", price: "10,000 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "ig-prem-4", title: "11,500 LKR Package (5/7 Days) - Recommended", price: "11,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "ig-prem-5", title: "13,500 LKR Package (5/7 Days) - Recommended", price: "13,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "ig-prem-6", title: "15,500 LKR Package (5/7 Days) - Best Recommended", price: "15,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
];

const tiktokPremiumPackages: PackageOption[] = [
  { id: "tt-prem-1", title: "6,800 LKR Package (5 Days)", price: "6,800 LKR", duration: "5 Days", plan: "Premium", visible: true },
  { id: "tt-prem-2", title: "8,800 LKR Package (7 Days)", price: "8,800 LKR", duration: "7 Days", plan: "Premium", visible: true },
  { id: "tt-prem-3", title: "10,000 LKR Package (5/7 Days)", price: "10,000 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "tt-prem-4", title: "11,500 LKR Package (5/7 Days) - Recommended", price: "11,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "tt-prem-5", title: "13,500 LKR Package (5/7 Days) - Recommended", price: "13,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
  { id: "tt-prem-6", title: "15,500 LKR Package (5/7 Days) - Best Recommended", price: "15,500 LKR", duration: "5/7 Days", plan: "Premium", visible: true },
];

const facebookPlatinumPackages: PackageOption[] = [
  { id: "fb-plt-1", title: "15,500 LKR Package (5/7 Days)", price: "15,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-2", title: "20,000 LKR Package (5/7 Days)", price: "20,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-3", title: "25,500 LKR Package (5/7 Days) - Recommended", price: "25,500 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-4", title: "35,000 LKR Package (5/7 Days) - Recommended", price: "35,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-5", title: "45,000 LKR Package (5/7 Days) - Best Recommended", price: "45,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-6", title: "50,000 LKR Package (5/7 Days) - Best Recommended", price: "50,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
];

const instagramPlatinumPackages: PackageOption[] = [
  { id: "fb-plt-1", title: "15,500 LKR Package (5/7 Days)", price: "15,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-2", title: "20,000 LKR Package (5/7 Days)", price: "20,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-3", title: "25,500 LKR Package (5/7 Days) - Recommended", price: "25,500 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-4", title: "35,000 LKR Package (5/7 Days) - Recommended", price: "35,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-5", title: "45,000 LKR Package (5/7 Days) - Best Recommended", price: "45,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-6", title: "50,000 LKR Package (5/7 Days) - Best Recommended", price: "50,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
];


const tiktokPlatinumPackages: PackageOption[] = [
  { id: "fb-plt-1", title: "15,500 LKR Package (5/7 Days)", price: "15,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-2", title: "20,000 LKR Package (5/7 Days)", price: "20,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-3", title: "25,500 LKR Package (5/7 Days) - Recommended", price: "25,500 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-4", title: "35,000 LKR Package (5/7 Days) - Recommended", price: "35,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-5", title: "45,000 LKR Package (5/7 Days) - Best Recommended", price: "45,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
  { id: "fb-plt-6", title: "50,000 LKR Package (5/7 Days) - Best Recommended", price: "50,000 LKR", duration: "5/7 Days", plan: "Platinum", visible: true },
];


const defaultPackages: Record<string, PackageOption[]> = {
  Standard: [
    { id: "std-1", title: "Starter Boost", price: "$299", duration: "1 month", plan: "Standard", visible: true },
    { id: "std-2", title: "Growth Fuel", price: "$749", duration: "3 months", plan: "Standard", visible: true },
    { id: "std-3", title: "Conversion Edge", price: "$1,299", duration: "6 months", plan: "Standard", visible: true },
  ],
  Premium: [
    { id: "prm-1", title: "Premium Launch", price: "$599", duration: "1 month", plan: "Premium", visible: true },
    { id: "prm-2", title: "Momentum Plan", price: "$1,499", duration: "3 months", plan: "Premium", visible: true },
    { id: "prm-3", title: "Scale Leader", price: "$2,799", duration: "6 months", plan: "Premium", visible: true },
  ],
  Platinum: [
    { id: "plt-1", title: "Platinum Ignite", price: "$1,099", duration: "1 month", plan: "Platinum", visible: true },
    { id: "plt-2", title: "Platinum Growth", price: "$2,999", duration: "3 months", plan: "Platinum", visible: true },
    { id: "plt-3", title: "Platinum Apex", price: "$5,499", duration: "6 months", plan: "Platinum", visible: true },
  ],
};

const Packages = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [serviceCategory, setServiceCategory] = useState<string | null>(null);
  const [businessPlan, setBusinessPlan] = useState<string | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [customPackages, setCustomPackages] = useState<PackageOption[]>([]);
  const [newPackage, setNewPackage] = useState({
    title: "",
    price: "",
    duration: "",
    plan: "Standard",
    visible: true,
  });

  useEffect(() => {
    if (searchParams.get("admin") === "true") {
      setAdminPanelOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
        setAdminPanelOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedPackageId) {
      setConfirmed(false);
    }
  }, [selectedPackageId]);

  const availablePackages = useMemo(() => {
    if (!businessPlan) {
      return [];
    }

    const base =
      businessPlan === "Standard" && serviceCategory === "Facebook Ads"
        ? facebookStandardPackages
        : businessPlan === "Premium" && serviceCategory === "Facebook Ads"
        ? facebookPremiumPackages
        : businessPlan === "Platinum" && serviceCategory === "Facebook Ads"
        ? facebookPlatinumPackages
        : businessPlan === "Standard" && serviceCategory === "Instagram Ads"
        ? instagramStandardPackages
        : businessPlan === "Premium" && serviceCategory === "Instagram Ads"
        ? instagramPremiumPackages
        : businessPlan === "Platinum" && serviceCategory === "Instagram Ads"
        ? instagramPlatinumPackages
        : businessPlan === "Standard" && serviceCategory === "TikTok Ads"
        ? tiktokStandardPackages
        : businessPlan === "Premium" && serviceCategory === "TikTok Ads"
        ? tiktokPremiumPackages
        : businessPlan === "Platinum" && serviceCategory === "TikTok Ads"
        ? tiktokPlatinumPackages
        : defaultPackages[businessPlan] ?? [];
    const custom = customPackages.filter(
      (option) => option.plan === businessPlan && option.visible,
    );

    return [...base, ...custom];
  }, [businessPlan, customPackages, serviceCategory]);

  const selectedPackage = selectedPackageId
    ? availablePackages.find((item) => item.id === selectedPackageId)
    : undefined;

  const steps = [
    { id: 1, label: "Service Category" },
    { id: 2, label: "Business Plan" },
    { id: 3, label: "Final Package" },
  ];

  const handleNext = () => {
    if (step === 1 && serviceCategory) {
      setStep(2);
      setConfirmed(false);
      return;
    }
    if (step === 2 && businessPlan) {
      setStep(3);
      setConfirmed(false);
      return;
    }
    if (step === 3 && selectedPackageId) {
      setConfirmed(true);
      return;
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAddPackage = () => {
    if (!newPackage.title || !newPackage.price || !newPackage.duration) {
      return;
    }

    const custom = {
      id: `custom-${Date.now()}`,
      title: newPackage.title,
      price: newPackage.price,
      duration: newPackage.duration,
      plan: newPackage.plan,
      visible: newPackage.visible,
    };

    setCustomPackages((current) => [custom, ...current]);
    setNewPackage({ title: "", price: "", duration: "", plan: "Standard", visible: true });
  };

  const handlePackageChange = (id: string, field: keyof PackageOption, value: string | boolean) => {
    setCustomPackages((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleRemovePackage = (id: string) => {
    setCustomPackages((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B3C5D] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-lg">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Package Selection</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Build your ad package with confidence.
            </h1>
            <p className="max-w-3xl text-base text-slate-200 sm:text-lg">
              Choose your service category, match the right business plan, then pick the final package that fits your goals.
              The experience is fully responsive and built as a standalone page so the homepage remains unchanged.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {steps.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-5 transition-all duration-200 ${
                    step === item.id
                      ? "border-white/30 bg-white/10 shadow-[0_20px_80px_-40px_rgba(255,255,255,0.35)]"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Step {item.id}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 transition-all duration-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current Stage</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{steps[step - 1].label}</h2>
                </div>
                <div className="rounded-2xl bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
                  {step} / 3
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {step === 1 && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {categories.map((category) => {
                      const active = serviceCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            setServiceCategory(category);
                            setConfirmed(false);
                          }}
                          className={`rounded-3xl border p-6 text-left transition-all duration-200 ${
                            active
                              ? "border-sky-300 bg-sky-500/20 shadow-[0_15px_40px_-20px_rgba(56,189,248,0.8)]"
                              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Service</p>
                          <p className="mt-4 text-xl font-semibold text-white">{category}</p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {plans.map((plan) => {
                      const active = businessPlan === plan;
                      return (
                        <button
                          key={plan}
                          type="button"
                          onClick={() => setBusinessPlan(plan)}
                          className={`rounded-3xl border p-6 text-left transition-all duration-200 ${
                            active
                              ? "border-emerald-400 bg-emerald-500/15 shadow-[0_15px_40px_-20px_rgba(16,185,129,0.8)]"
                              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Plan</p>
                          <p className="mt-4 text-xl font-semibold text-white">{plan}</p>
                          <p className="mt-3 text-sm text-slate-300">
                            {plan === "Standard"
                              ? "Designed for early-stage campaigns"
                              : plan === "Premium"
                              ? "Balanced growth for consistent scaling"
                              : "High-impact service for top-tier brands"}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {availablePackages.map((item) => {
                      const active = selectedPackageId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedPackageId(item.id)}
                          className={`rounded-3xl border p-6 text-left transition-all duration-200 ${
                            active
                              ? "border-slate-100 bg-slate-100/10 shadow-[0_15px_40px_-20px_rgba(255,255,255,0.38)]"
                              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-semibold text-white">{item.title}</p>
                            <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                              {item.duration}
                            </span>
                          </div>
                          <p className="mt-5 text-3xl font-semibold text-white">{item.price}</p>
                          <p className="mt-3 text-sm leading-6 text-slate-300">Perfect for campaigns that need structure, clarity, and measurable growth.</p>
                        </button>
                      );
                    })}
                    {!businessPlan && (
                      <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-slate-300">
                        Select a business plan first to reveal tailored packages.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant="secondary"
                  className="w-full border border-slate-200/10 bg-slate-100/10 text-slate-100 hover:bg-slate-100/20 sm:w-auto"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <span className="inline-flex items-center rounded-full bg-slate-900/70 px-4 py-2 text-sm text-slate-200">
                    {step === 1 && (serviceCategory ? "Ready to continue" : "Pick a category")}
                    {step === 2 && (businessPlan ? "Ready to continue" : "Pick a business plan")}
                    {step === 3 && (selectedPackageId ? "Ready to confirm" : "Pick a package")}
                  </span>
                  <Button
                    className="w-full bg-[#0B3C5D] text-white hover:bg-[#0A3450] sm:w-auto"
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !serviceCategory) ||
                      (step === 2 && !businessPlan) ||
                      (step === 3 && !selectedPackageId)
                    }
                  >
                    {step === 3 ? "Confirm package" : "Continue"}
                  </Button>
                </div>
              </div>
              {confirmed && selectedPackage && (
                <div className="mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                    Package confirmed
                  </p>
                  <p className="mt-2 text-base text-white/90">
                    Your package selection is ready. Tap the button below to open WhatsApp and send your confirmation.
                  </p>
                  <a
                    href={`https://wa.me/94779507298?text=${encodeURIComponent(`Hello, I would like to confirm my ${serviceCategory} ${businessPlan} package: ${selectedPackage.title}. Please help with the next steps.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Open WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Need help?</p>
              <p className="mt-3 text-white/90">Use the WhatsApp button for quick support and to confirm custom package details.</p>
              <a
                href="https://wa.me/94779507298"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#0B3C5D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A3450]"
              >
                WhatsApp Support
              </a>
          </aside>
        </div>

        {adminPanelOpen && (
          <section className="mt-10 rounded-3xl border border-emerald-400/25 bg-slate-950/40 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Admin only</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Hidden Package Management</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-300">
                Secret panel active
              </span>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Create a new custom package and choose which plan it belongs to.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-200">
                    Package name
                    <input
                      type="text"
                      value={newPackage.title}
                      onChange={(event) => setNewPackage((prev) => ({ ...prev, title: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none transition focus:border-sky-300"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    Price
                    <input
                      type="text"
                      value={newPackage.price}
                      onChange={(event) => setNewPackage((prev) => ({ ...prev, price: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none transition focus:border-sky-300"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    Duration
                    <input
                      type="text"
                      value={newPackage.duration}
                      onChange={(event) => setNewPackage((prev) => ({ ...prev, duration: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none transition focus:border-sky-300"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    Plan
                    <select
                      value={newPackage.plan}
                      onChange={(event) => setNewPackage((prev) => ({ ...prev, plan: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none transition focus:border-sky-300"
                    >
                      {plans.map((plan) => (
                        <option key={plan} value={plan} className="bg-slate-950 text-white">
                          {plan}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      checked={newPackage.visible}
                      onChange={(event) => setNewPackage((prev) => ({ ...prev, visible: event.target.checked }))}
                      className="h-5 w-5 rounded border-white/20 bg-slate-800 text-emerald-400 focus:ring-emerald-400"
                    />
                    Visible in final package list
                  </label>
                  <Button
                    className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 sm:w-auto"
                    onClick={handleAddPackage}
                  >
                    Add custom package
                  </Button>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Package catalog</p>
                <div className="space-y-4">
                  {customPackages.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/50 p-6 text-slate-400">
                      No custom packages added yet.
                    </div>
                  ) : (
                    customPackages.map((item) => (
                      <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                              <span className="rounded-full border border-slate-700/80 px-2 py-1">{item.plan}</span>
                              <span className="rounded-full border border-slate-700/80 px-2 py-1">
                                {item.visible ? "Visible" : "Hidden"}
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-white">{item.title}</p>
                            <p className="text-sm text-slate-300">{item.price} · {item.duration}</p>
                          </div>
                          <button
                            type="button"
                            className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                            onClick={() => handleRemovePackage(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(event) => handlePackageChange(item.id, "title", event.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none focus:border-sky-300"
                            placeholder="Package title"
                          />
                          <input
                            type="text"
                            value={item.price}
                            onChange={(event) => handlePackageChange(item.id, "price", event.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none focus:border-sky-300"
                            placeholder="Price"
                          />
                          <input
                            type="text"
                            value={item.duration}
                            onChange={(event) => handlePackageChange(item.id, "duration", event.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none focus:border-sky-300"
                            placeholder="Duration"
                          />
                        </div>
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                            <input
                              type="checkbox"
                              checked={item.visible}
                              onChange={(event) => handlePackageChange(item.id, "visible", event.target.checked)}
                              className="h-5 w-5 rounded border-white/20 bg-slate-800 text-emerald-400 focus:ring-emerald-400"
                            />
                            Visible in package selector
                          </label>
                          <select
                            value={item.plan}
                            onChange={(event) => handlePackageChange(item.id, "plan", event.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white outline-none focus:border-sky-300 sm:w-auto"
                          >
                            {plans.map((plan) => (
                              <option key={plan} value={plan} className="bg-slate-950 text-white">
                                {plan}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Packages;
