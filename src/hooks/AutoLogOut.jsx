import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function useAutoLogout(timeout = 2 * 60 * 60 * 1000) { // 2h
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        supabase.auth.signOut();
        alert("Vous avez été déconnecté pour inactivité.");
      }, timeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // démarrer timer au chargement

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [timeout]);
}

export default useAutoLogout;
