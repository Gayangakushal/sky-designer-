import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({ path: z.string().min(1).max(400) });

/**
 * Deletes a just-uploaded CV whose application row failed to insert.
 * Only removes files inside `job-cvs` that no application references.
 */
export const discardOrphanCv = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    if (!data.path.startsWith("job-applications/")) return { removed: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("job_applications")
      .select("id")
      .eq("cv_file_path", data.path)
      .maybeSingle();
    if (existing) return { removed: false };

    await supabaseAdmin.storage.from("job-cvs").remove([data.path]);
    return { removed: true };
  });
