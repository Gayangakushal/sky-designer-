import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, UploadCloud, X } from "lucide-react";
import { usePublicVacancies } from "@/hooks/useVacancies";
import { submitApplication } from "@/lib/recruitment";

interface JobApplicationFormProps {
  /** Preselected vacancy id (controlled when onVacancyChange is provided). */
  vacancyId?: string;
  onVacancyChange?: (vacancyId: string) => void;
  /** Lock the Position field to a single vacancy (job detail page). */
  lockPosition?: boolean;
}

type Status = "idle" | "submitting" | "success" | "error";

const acceptedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const JobApplicationForm = ({
  vacancyId = "",
  onVacancyChange,
  lockPosition = false,
}: JobApplicationFormProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedVacancy, setSelectedVacancy] = useState(vacancyId);
  const fileInput = useRef<HTMLInputElement>(null);
  const { data: vacancies = [], isLoading: vacanciesLoading } = usePublicVacancies();

  useEffect(() => {
    setSelectedVacancy(vacancyId);
  }, [vacancyId]);

  const setVacancy = (id: string) => {
    setSelectedVacancy(id);
    setErrors((current) => ({ ...current, position: "" }));
    onVacancyChange?.(id);
  };

  const validateFile = (selected: File | null) => {
    if (!selected) return "Please attach your CV or résumé.";
    if (!acceptedTypes.includes(selected.type) && !/\.(pdf|doc|docx)$/i.test(selected.name))
      return "Only PDF, DOC, and DOCX files are accepted.";
    if (selected.size > 5 * 1024 * 1024) return "The file must be smaller than 5 MB.";
    return "";
  };

  const handleFile = (selected: File | null) => {
    const error = validateFile(selected);
    if (error) {
      setFile(null);
      setErrors((current) => ({ ...current, cv: error }));
      return;
    }
    setFile(selected);
    setErrors((current) => ({ ...current, cv: "" }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (field: string) => String(data.get(field) || "").trim();
    const nextErrors: Record<string, string> = {};
    ["fullName", "email", "phone", "coverMessage"].forEach((field) => {
      if (!value(field)) nextErrors[field] = "This field is required.";
    });
    if (value("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email")))
      nextErrors.email = "Enter a valid email address.";
    if (!selectedVacancy) nextErrors.position = "Please select a position.";
    if (data.get("consent") !== "on")
      nextErrors.consent = "Please confirm your consent before submitting.";
    const cvError = validateFile(file);
    if (cvError) nextErrors.cv = cvError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !file) return;

    setStatus("submitting");
    setMessage("");

    try {
      await submitApplication({
        vacancyId: selectedVacancy,
        fullName: value("fullName"),
        email: value("email"),
        phone: value("phone"),
        currentLocation: value("location"),
        yearsOfExperience: value("experience"),
        linkedinProfile: value("linkedin"),
        portfolioWebsite: value("portfolio"),
        coverMessage: value("coverMessage"),
        file,
      });
      setStatus("success");
      form.reset();
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      if (!lockPosition) setVacancy("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Application could not be sent. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="form-message rounded-[24px] border border-blue-100 bg-blue-50 p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h3 className="mt-5 font-heading text-2xl font-extrabold text-slate-950">
          Application submitted successfully!
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
          Thank you for applying to Sky Designers. Our team will review your application and contact
          shortlisted candidates.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setMessage("");
            setVacancy(lockPosition ? vacancyId : "");
          }}
          className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white"
        >
          Send another application
        </button>
      </div>
    );
  }

  const fieldClass =
    "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";
  const errorClass = "form-message mt-1.5 text-xs font-semibold text-red-600";
  const activeTitle = vacancies.find((vacancy) => vacancy.id === selectedVacancy)?.title;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.08)] sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-bold text-slate-700">
          Full name *<input name="fullName" className={fieldClass} placeholder="Your full name" />
          {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
        </label>
        <label className="text-xs font-bold text-slate-700">
          Email address *
          <input name="email" type="email" className={fieldClass} placeholder="you@email.com" />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </label>
        <label className="text-xs font-bold text-slate-700">
          Phone number *<input name="phone" className={fieldClass} placeholder="+94" />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </label>
        <label className="text-xs font-bold text-slate-700">
          Current location
          <input name="location" className={fieldClass} placeholder="City / Country" />
        </label>
        <label className="text-xs font-bold text-slate-700">
          Position *
          <select
            name="position"
            value={selectedVacancy}
            onChange={(event) => setVacancy(event.target.value)}
            disabled={lockPosition || vacanciesLoading}
            className={`${fieldClass} disabled:bg-slate-50 disabled:text-slate-600`}
          >
            <option value="">
              {vacanciesLoading ? "Loading positions..." : "Select a position"}
            </option>
            {vacancies.map((vacancy) => (
              <option key={vacancy.id} value={vacancy.id}>
                {vacancy.title}
              </option>
            ))}
          </select>
          {activeTitle && (
            <p className="mt-1.5 text-xs font-semibold text-primary">Applying for: {activeTitle}</p>
          )}
          {errors.position && <p className={errorClass}>{errors.position}</p>}
        </label>
        <label className="text-xs font-bold text-slate-700">
          Years of experience
          <input name="experience" className={fieldClass} placeholder="Example: 2 years" />
        </label>
        <label className="text-xs font-bold text-slate-700">
          LinkedIn profile
          <input
            name="linkedin"
            type="url"
            className={fieldClass}
            placeholder="https://linkedin.com/in/..."
          />
        </label>
        <label className="text-xs font-bold text-slate-700">
          Portfolio / website
          <input name="portfolio" type="url" className={fieldClass} placeholder="https://..." />
        </label>
      </div>

      <label className="mt-5 block text-xs font-bold text-slate-700">
        Short cover message *
        <textarea
          name="coverMessage"
          rows={6}
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="Tell us why you would be a strong fit."
        />
        {errors.coverMessage && <p className={errorClass}>{errors.coverMessage}</p>}
      </label>

      <div className="mt-5">
        <p className="text-xs font-bold text-slate-700">
          CV or résumé *{" "}
          <span className="font-medium text-slate-400">PDF, DOC, or DOCX · Max 5 MB</span>
        </p>
        <input
          ref={fileInput}
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0] || null)}
        />
        {file ? (
          <div className="mt-2 flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">{file.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInput.current) fileInput.current.value = "";
              }}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-blue-100 bg-white text-slate-600 hover:text-red-600"
              aria-label="Remove selected file"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="mt-2 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-primary hover:bg-blue-50"
          >
            <UploadCloud className="h-7 w-7 text-primary" />
            <span className="mt-3 text-sm font-extrabold text-slate-900">Choose your CV</span>
            <span className="mt-1 text-xs text-slate-500">Click to browse your files</span>
          </button>
        )}
        {errors.cv && <p className={errorClass}>{errors.cv}</p>}
      </div>

      <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-600">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-primary"
        />
        <span>
          I consent to Sky Designers using this information to review and respond to my job
          application.
        </span>
      </label>
      {errors.consent && <p className={errorClass}>{errors.consent}</p>}

      {status === "error" && (
        <div className="form-message mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="button-shine mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(23,107,255,.24)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending application...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
};

export default JobApplicationForm;
