import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import SignupStudentForm from"../components/SignStudent"
import "../css/SignupStudent.css"

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session_status, set_session_status] = useState();
  const [educator_range, set_educator_range] = useState();
  const [rangelist, set_rangelist] = useState([]);
  const [rangeType, set_rangeType] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [code_session_2, set_code_session_2] = useState(0);
  

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("student")
        .select("student_firstname, student_lastname, url_project")
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
    if (user) 
      fetchProjects();
  }, [user]);

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
        set_educator_range(data.id_range)
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) 
      fetchSessionStatus();
  }, [user]);

  useEffect(() => {
    const fetchRange = async () => {
      try {
        const { data, error } = await supabase
          .from("range")
          .select("id_range, range_name")

        if (error) throw error;
        set_rangelist(data)
      } catch (err) {
        setError(err.message);
      }
    };
    if (user) 
      fetchRange();
  }, [user]);
  
  useEffect(() => {
    if (!educator_range || rangelist.length === 0) return;
    const range = rangelist.find(r => r.id_range === educator_range);
    set_rangeType(range?.range_name);
  }, [educator_range, rangelist]);

  const handleChangeStatus = async (newStatus) => {
    let generatedCode=0;
    const { error } = await supabase
      .from("educator")
      .update({ session_status: newStatus })
      .eq("id_educator", user.id);

    if (!error) 
      set_session_status(newStatus);
    if (rangeType === 'Cycle 2') {
      generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      set_code_session_2(generatedCode);
   } 
   console.log(generatedCode)
  };
  
  const handleLogout = async () => { 
    const { error } = await supabase.auth.signOut(); 
    if (error) 
      console.log("Erreur logout :", error); 
    else 
      navigate("/home")
  };

  const handleAddStudent = async (student_firstname, student_lastname) => {

    const student_code =
      student_firstname.slice(0, 2).toUpperCase() +
      student_lastname.slice(0, 2).toUpperCase() ;

    const folderName = `${student_firstname}_${student_lastname}`
    .replace(/\s+/g, "_")
    .toLowerCase();

    const folderPath = `Project/${folderName}/`;
    const url_project = folderPath;

    const { error } = await supabase.from("student").insert([{
      student_firstname,
      student_lastname,
      student_code,
      id_educator: user.id,
      url_project
    }
    ]).select().single();

    if (error) {
      console.log(error);
      return;
    }
    
    const { error: storageError } = await supabase.storage
    .from("Project")
    .upload(`${folderName}/.init`, new Blob([""]));

  if (storageError && storageError.message !== "The resource already exists") {
    console.log("Erreur storage:", storageError);
  }

    await fetchProjects();

    setShowAddModal(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  console.log(rangeType)
  return (
    <div>
      {projects.map((student, index) => (
        <p key={index}>
          {student.student_lastname} {student.student_firstname} : {student.url_project}
        </p>
      ))}

      {rangeType === "Cycle 3" && (
        <button onClick={() => setShowAddModal(true)}>Ajouter un élève</button>
      )}

      {session_status ? (
        <div>
         {/*<p>Le code de la Session est {code_session_2}</p>*/}
        <button onClick={() => handleChangeStatus(false)}>Terminer la session</button>
        </div>
        ) : (
        <button onClick={() => handleChangeStatus(true)}>Activer la session</button>
      )}

      <button onClick={handleLogout}>Se déconnecter</button>


      {showAddModal && (
        <div className="modalStyle">
          <div className="modalContentStyle">

            <h3>Ajouter un élève</h3>

            <SignupStudentForm
              onAdd={handleAddStudent}
              onCancel={() => setShowAddModal(false)}
            />

          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
