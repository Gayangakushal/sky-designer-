import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Minus, Sparkles } from "lucide-react";
import { type PricingPackage } from "@/data/pricingPackages";
import { type ComparisonValue } from "@/data/pricingComparison";
import { usePricingData } from "@/hooks/usePricingData";
import { company } from "@/data/siteData";

const ComparisonValueCell = ({ value }: { value: ComparisonValue }) => {
  if (typeof value === "string") return <span>{value}</span>;

  return value ? (
    <span className="inline-flex items-center gap-2 font-bold text-blue-200">
      <span
        className="grid h-6 w-6 place-items-center rounded-full bg-blue-400/15 text-[#4a8dff]"
        aria-hidden="true"
      >
        <Check size={14} strokeWidth={3} />
      </span>
      <span className="sr-only">Included</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 text-[#718096]">
      <Minus size={19} strokeWidth={2.5} aria-hidden="true" />
      <span className="sr-only">Not included</span>
    </span>
  );
};

const PackageComparison = ({
  onSelectPackage,
}: {
  onSelectPackage: (packageName: string) => void;
}) => {
  const { packages: pricingPackages, comparison: pricingComparison } = usePricingData();
  const comparisonPackages = pricingPackages;

  return (
    <div className="mt-24 sm:mt-28" aria-labelledby="comparison-heading">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-blue-300">
          Package Comparison
        </p>
        <h3
          id="comparison-heading"
          className="mt-5 text-balance font-heading text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
        >
          Compare Our Plans
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#8fa1bd] sm:text-lg">
          Find the perfect growth engine for your brand.
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        className="relative mt-12 rounded-[24px] border border-[rgba(140,170,220,.15)] bg-[#071025]"
      >
        <p
          id="comparison-scroll-hint"
          className="border-b border-white/10 px-5 py-3 text-xs font-semibold text-[#8fa1bd] lg:hidden"
        >
          Swipe to compare plans →
        </p>
        <div
          className="max-w-full overflow-x-auto overscroll-x-contain rounded-b-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 lg:rounded-[24px]"
          style={{ WebkitOverflowScrolling: "touch" }}
          tabIndex={0}
          aria-describedby="comparison-scroll-hint"
        >
          <table className="w-full min-w-[1235px] border-separate border-spacing-0 text-sm">
            <caption className="sr-only">
              Detailed comparison of Standard, Premium, Platinum, Corporate, and Custom investment
              packages.
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-20 w-[260px] min-w-[260px] border-b border-r border-white/10 bg-[#071025] px-6 py-7 text-left font-heading text-sm font-extrabold text-white"
                >
                  Package features
                </th>
                {comparisonPackages.map((pricingPackage) => (
                  <th
                    key={pricingPackage.category}
                    scope="col"
                    className={`w-[195px] border-b border-r border-white/10 px-4 py-6 text-center last:border-r-0 ${pricingPackage.featured ? "bg-[rgba(22,119,255,.12)] shadow-[inset_1px_0_rgba(74,141,255,.22),inset_-1px_0_rgba(74,141,255,.22)]" : "bg-[#071025]"}`}
                  >
                    <div className="flex min-h-[142px] flex-col items-center justify-end">
                      {pricingPackage.featured && (
                        <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-blue-300/20 bg-blue-400/15 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                          <Sparkles size={10} aria-hidden="true" /> Most Popular
                        </span>
                      )}
                      <span className="font-heading text-lg font-extrabold text-white">
                        {pricingPackage.category}
                      </span>
                      <span className="mt-2 text-xs font-semibold text-[#8fa1bd]">
                        {pricingPackage.isCustom
                          ? "Tailored quote"
                          : `LKR ${pricingPackage.price} / mo`}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectPackage(pricingPackage.optionLabel)}
                        className={`mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border px-4 text-xs font-extrabold text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071025] ${pricingPackage.featured ? "border-primary bg-primary hover:bg-blue-500" : "border-white/15 bg-white/[0.06] hover:bg-white/[0.1]"}`}
                      >
                        Select {pricingPackage.category}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {pricingComparison.map((category) => (
              <tbody key={category.name}>
                <tr>
                  <th
                    colSpan={comparisonPackages.length + 1}
                    scope="colgroup"
                    className="border-b border-white/10 bg-[#0a1630] px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-300"
                  >
                    {category.name}
                  </th>
                </tr>
                {category.features.map((feature, rowIndex) => (
                  <tr
                    key={feature.name}
                    className={rowIndex % 2 === 1 ? "bg-white/[0.025]" : undefined}
                  >
                    <th
                      scope="row"
                      className={`sticky left-0 z-10 border-b border-r border-white/10 px-6 py-4 text-left font-semibold leading-5 text-[#d9e2f0] ${rowIndex % 2 === 1 ? "bg-[#0b1429]" : "bg-[#071025]"}`}
                    >
                      {feature.name}
                    </th>
                    {comparisonPackages.map((pricingPackage, valueIndex) => (
                      <td
                        key={`${feature.name}-${valueIndex}`}
                        className={`border-b border-r border-white/10 px-4 py-4 text-center font-semibold leading-5 text-[#aebbd0] last:border-r-0 ${pricingPackage.featured ? "bg-[rgba(22,119,255,.08)] shadow-[inset_1px_0_rgba(74,141,255,.16),inset_-1px_0_rgba(74,141,255,.16)]" : ""}`}
                      >
                        <span className="inline-flex min-h-6 items-center justify-center">
                          <ComparisonValueCell
                            value={
                              feature.values[valueIndex] ??
                              (pricingPackage.isCustom ? "Tailored" : false)
                            }
                          />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </motion.div>

      <p className="mt-5 text-center text-sm font-semibold text-[#8fa1bd]">
        Ad spend is not included in the package fee.
      </p>

      <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-blue-300/15 bg-[rgba(11,23,64,.68)] px-6 py-8 text-center sm:px-9 lg:flex-row lg:text-left">
        <div>
          <h4 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-white">
            Ready to scale your brand?
          </h4>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8fa1bd] sm:text-base">
            Select the package that aligns with your growth objectives and start building your
            digital growth engine.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => onSelectPackage("")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071025]"
          >
            Confirm Your Package <ArrowRight size={17} aria-hidden="true" />
          </button>
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071025]"
            aria-label={`Contact Sky Designers on WhatsApp at ${company.phoneDisplay}`}
          >
            <MessageCircle size={17} aria-hidden="true" /> {company.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({
  pricingPackage,
  index,
  reduceMotion,
  onSelect,
}: {
  pricingPackage: PricingPackage;
  index: number;
  reduceMotion: boolean;
  onSelect: (packageName: string) => void;
}) => {
  const {
    category,
    name,
    price,
    description,
    features,
    buttonLabel,
    optionLabel,
    featured,
    smallLabel,
    isCustom,
  } = pricingPackage;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: reduceMotion ? 0 : 0.5 }}
      className={`premium-card relative flex min-h-full flex-col overflow-hidden rounded-[24px] border p-6 shadow-[0_24px_70px_rgba(0,0,0,.22)] hover:shadow-[0_30px_80px_rgba(0,0,0,.28)] sm:p-7 ${
        featured
          ? "border-[#4a8dff] bg-[#0b1740] shadow-[0_24px_75px_rgba(22,119,255,.18),0_0_0_1px_rgba(74,141,255,.25)]"
          : "border-[rgba(140,170,220,.18)] bg-[rgba(7,16,37,.88)]"
      } lg:col-span-2 2xl:col-span-1 ${index === 3 ? "lg:col-start-2 2xl:col-start-auto" : ""}`}
    >
      {featured && (
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/20 blur-[70px]"
          aria-hidden="true"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-300">
          {isCustom ? category : smallLabel || category}
        </p>
        {featured && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-300/15 bg-blue-400/15 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
            <Sparkles size={11} aria-hidden="true" /> Most Popular
          </span>
        )}
      </div>

      <h3 className="relative mt-6 min-h-[3.5rem] font-heading text-xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-2xl">
        {name}
      </h3>

      <div className="relative mt-6">
        {isCustom ? (
          <span className="block font-heading text-[clamp(2.25rem,3.1vw,3.35rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.055em] text-white">
            <span className="block">Custom</span>
            <span className="block text-blue-200">Quote</span>
          </span>
        ) : (
          <>
            <span className="block text-sm font-extrabold uppercase tracking-[0.12em] text-blue-200">
              LKR
            </span>
            <div className="mt-1 flex items-end gap-2">
              <span className="font-heading text-[clamp(2.25rem,3.1vw,3.35rem)] font-extrabold leading-none tracking-[-0.055em] text-white tabular-nums">
                {price}
              </span>
              <span className="pb-1 text-sm font-semibold text-[#8fa1bd]">/mo</span>
            </div>
          </>
        )}
      </div>

      <p className="relative mt-5 min-h-[4.5rem] text-sm leading-6 text-[#8fa1bd]">{description}</p>

      <ul className="relative mt-6 flex-1 space-y-3" aria-label={`${name} features`}>
        {features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm leading-5 text-[#a7b5ca]">
            <span
              className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-blue-400/15 text-blue-300"
              aria-hidden="true"
            >
              <Check size={10} strokeWidth={3} />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {isCustom ? (
        <div className="relative mt-8 text-center">
          <p className="text-xs leading-5 text-[#8fa1bd]">
            Let’s build a package around your goals.
          </p>
          <a
            href="tel:+94779507298"
            className="mt-2 inline-flex min-h-11 items-center justify-center px-3 text-sm font-bold text-blue-200 transition hover:text-white"
          >
            +94 77 950 7298
          </a>
          <a
            href="tel:+94779507298"
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.07] px-5 text-sm font-extrabold uppercase text-white transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/[0.11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071025]"
          >
            {buttonLabel}
          </a>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onSelect(optionLabel)}
          aria-label={`${buttonLabel} package`}
          className={`relative mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl border px-5 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071025] ${
            featured
              ? "border-primary bg-primary shadow-[0_14px_32px_rgba(22,119,255,.25)] hover:border-blue-400 hover:bg-blue-500"
              : "border-white/[0.12] bg-white/[0.07] hover:border-blue-300/40 hover:bg-white/[0.11]"
          }`}
        >
          {buttonLabel}
        </button>
      )}
    </motion.article>
  );
};

const PricingSection = ({
  onSelectPackage,
}: {
  onSelectPackage: (packageName: string) => void;
}) => {
  const reduceMotion = useReducedMotion();
  const { packages: pricingPackages } = usePricingData();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative overflow-hidden bg-[#020817] py-24 text-white sm:py-28 lg:py-32"
    >
      <div
        className="blue-grid pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[70rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-blue-300">
            Pricing Plans
          </p>
          <h2
            id="pricing-heading"
            className="mt-5 text-balance font-heading text-4xl font-extrabold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl"
          >
            Investment Packages
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#8fa1bd] sm:text-lg">
            Choose the package that best fits your business growth objectives.
          </p>
        </header>

        <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-5 2xl:gap-5">
          {pricingPackages.map((pricingPackage, index) => (
            <PricingCard
              key={pricingPackage.category}
              pricingPackage={pricingPackage}
              index={index}
              reduceMotion={Boolean(reduceMotion)}
              onSelect={onSelectPackage}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-sm font-semibold text-[#8fa1bd]">
          Ad spend is not included in the package fee.
        </p>

        <PackageComparison onSelectPackage={onSelectPackage} />
      </div>
    </section>
  );
};

export default PricingSection;
