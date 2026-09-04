import { supabase } from "@/integrations/supabase/client";

export async function assignAccountingRole(userId: string) {
  const { data, error } = await supabase.rpc("set_user_role", {
    _user_id: userId,
    _role: "accounting",
  });
  if (error) throw error;
  return data;
}