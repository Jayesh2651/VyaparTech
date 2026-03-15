import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bptsqxbacpqhnckfavfx.supabase.co";
const supabaseKey = "sb_secret_02OmCAyDOzQ4BR9eUhdjwg_iUSaAdht";

export const supabase = createClient(supabaseUrl, supabaseKey);