import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "./utils/supabaseClient";

function App() {
  useEffect(() => {
    // Initialize Google Sign-In
    window.google?.accounts?.id?.initialize({
      client_id:
        "1009146002259-qhok5alrch6qor02ejnrll77fqdh9t0b.apps.googleusercontent.com",
      callback: handleSignInWithGoogle,
    });

    // Define the callback function
    async function handleSignInWithGoogle(response) {
      console.log("Google response:", response); // Debug log
      try {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.credential,
        });

        if (error) {
          console.error("Supabase auth error:", error);
        } else {
          console.log("Supabase auth success:", data);
        }
      } catch (error) {
        console.error("Try-catch error:", error);
      }
    }

    // Make the function global
    window.handleSignInWithGoogle = handleSignInWithGoogle;

    return () => {
      delete window.handleSignInWithGoogle;
    };
  }, []);

  return (
    <div className="p-4">
      <div
        id="g_id_onload"
        data-client_id="1009146002259-qhok5alrch6qor02ejnrll77fqdh9t0b.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  );
}

export default App;
