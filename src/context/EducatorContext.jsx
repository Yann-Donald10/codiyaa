import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

const EducatorContext = createContext();

export const EducatorProvider = ({ children }) => {
  const { user } = useAuth();
  const [session_status, set_session_status] = useState(null);
  const [rangeType, set_rangeType] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [educator_range, set_educator_range] = useState();
  const [rangelist, set_rangelist] = useState([]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("student")
        .select(
          "id_student, student_firstname, student_lastname, student_code, url_project"
        )
        .eq("id_educator", user.id);

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user, session_status]);
  
  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("educator")
          .select("session_status, id_range")
          .eq("id_educator", user.id)
          .single();

        if (error) throw error;
        set_session_status(data?.session_status || false);
        set_educator_range(data.id_range);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchSessionStatus();
  }, [user]);

  useEffect(() => {
    const fetchRange = async () => {
      try {
        const { data, error } = await supabase
          .from("range")
          .select("id_range, range_name");

        if (error) throw error;
        set_rangelist(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchRange();
  }, [user]);

 const handleChangeStatus = async (newStatus) => {
    const { error: updateError } = await supabase
      .from("educator")
      .update({ session_status: newStatus })
      .eq("id_educator", user.id);

    if (updateError) {
      console.error(updateError);
      return;
    }

    if (newStatus === true) {
      const { data: students, error: studentError } = await supabase
        .from("student")
        .select("id_student")
        .eq("id_educator", user.id);

      if (studentError) {
        console.error(studentError);
        return;
      }

      const updates = students.map((student) => ({
        id_student: student.id_student,
        student_code: Math.floor(1000 + Math.random() * 9000).toString(),
      }));

      const { error: batchError } = await supabase
        .from("student")
        .upsert(updates, { onConflict: "id_student" });

      if (batchError) {
        console.error(batchError);
        return;
      }

      console.log("Codes générés :", updates);
    }

    await fetchProjects();
    set_session_status(newStatus);
  };

  useEffect(() => {
    if (!educator_range || rangelist.length === 0) return;
    const range = rangelist.find((r) => r.id_range === educator_range);
    set_rangeType(range?.range_name);
  }, [educator_range, rangelist]);


  return (
    <EducatorContext.Provider
      value={{
        session_status,
        rangeType,
        handleChangeStatus,
      }}
    >
      {children}
    </EducatorContext.Provider>
  );
};

export const useEducator = () => useContext(EducatorContext);
