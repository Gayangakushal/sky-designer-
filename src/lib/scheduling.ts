export const COLOMBO_TIME_ZONE = "Asia/Colombo";
export const COLOMBO_TIME_ZONE_LABEL = "Sri Lanka time (Asia/Colombo, UTC+05:30)";

const COLOMBO_OFFSET_MS = (5 * 60 + 30) * 60_000;

export const utcToColomboInput = (value: string | null | undefined) => {
  if (!value) return "";
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() + COLOMBO_OFFSET_MS).toISOString().slice(0, 16);
};

export const colomboInputToUtc = (value: string) => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) return null;
  const [, year, month, day, hour, minute] = match;
  const milliseconds =
    Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)) -
    COLOMBO_OFFSET_MS;
  const date = new Date(milliseconds);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

export const formatColomboDateTime = (value: string | null | undefined) => {
  if (!value) return "Not scheduled";
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-LK", {
    timeZone: COLOMBO_TIME_ZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const validateFutureColomboSchedule = (value: string) => {
  const utc = colomboInputToUtc(value);
  if (!utc) return { utc: null, error: "Choose a valid publishing date and time." };
  if (new Date(utc).getTime() <= Date.now()) {
    return { utc: null, error: "Scheduled publishing must be in the future." };
  }
  return { utc, error: null };
};
