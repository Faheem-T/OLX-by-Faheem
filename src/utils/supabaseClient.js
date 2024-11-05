import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ssgvoeghescpzolyfark.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZ3ZvZWdoZXNjcHpvbHlmYXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3ODQwODIsImV4cCI6MjA0NjM2MDA4Mn0.TtF_Fb-v5j-CmKfI_DOkMOQJCnHSzz6QpYKC6Fm-sI0"
);
