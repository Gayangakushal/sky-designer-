import { supabase } from "@/integrations/supabase/client";

const API_BASE_URL = (
  import.meta.env.VITE_STAFF_API_BASE_URL || "https://zenith-cms-toolkit.lovable.app"
).replace(/\/$/, "");

type StaffRole = "admin" | "user" | "accounting";
type StaffStatus = "active" | "disabled" | "invited";

export interface StaffMember {
  user_id: string;
  full_name: string;
  email: string;
  role: StaffRole;
  status: StaffStatus;
  created_at: string;
}

export class StaffApiError extends Error {
  constructor(message: string, public status = 500) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new StaffApiError("Your admin session has expired.", 401);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/public/staff/${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${session.access_token}`,
        ...init?.headers,
      },
    });
  } catch {
    throw new StaffApiError("Unable to connect to the Staff Access service.", 0);
  }

  const payload = (await response.json().catch(() => ({}))) as {
    staff?: StaffMember[];
    error?: string;
    message?: string;
    [key: string]: unknown;
  };
  if (!response.ok) {
    const message = response.status === 403
      ? "You do not have permission to perform this action."
      : response.status === 401
        ? "Your admin session has expired."
        : payload.error || payload.message || "Staff Access request failed.";
    throw new StaffApiError(message, response.status);
  }
  return payload as T;
}

export const staffApi = {
  list: () => request<{ staff: StaffMember[] }>("list"),
  create: (input: { full_name: string; email: string; password: string; role: "accounting" }) =>
    request<StaffMember>("create", { method: "POST", body: JSON.stringify(input) }),
  setStatus: (user_id: string, disabled: boolean) =>
    request<{ user_id: string; status: StaffStatus }>("status", {
      method: "POST",
      body: JSON.stringify({ user_id, disabled }),
    }),
  delete: (user_id: string) =>
    request<{ user_id: string; removed: boolean }>("delete", {
      method: "POST",
      body: JSON.stringify({ user_id }),
    }),
};

export const staffRoleLabel = (role: StaffRole) =>
  role === "accounting" ? "Accounting" : role === "admin" ? "Admin" : "User";

export const staffStatusLabel = (status: StaffStatus) =>
  status.charAt(0).toUpperCase() + status.slice(1);
