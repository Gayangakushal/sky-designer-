import TextReveal from "@/components/motion/TextReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) => (
  <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-primary" />
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
    </div>
    <TextReveal
      as="h2"
      className={`text-balance font-heading text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-slate-950"}`}
    >
      {title}
    </TextReveal>
    {description && (
      <p
        className={`mt-5 text-base leading-7 sm:text-lg ${light ? "text-slate-300" : "text-slate-600"}`}
      >
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
