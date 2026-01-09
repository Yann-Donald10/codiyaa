import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function useAutoLogout(timeout = 2 * 60 * 60 * 1000, navigate)  {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await supabase.auth.signOut();
        alert("Vous avez été déconnecté pour inactivité.");

        // Optionnel (la protection de routes suffit déjà)
        if (navigate) navigate("/");
      }, timeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [timeout, navigate]);
}

export default useAutoLogout;
