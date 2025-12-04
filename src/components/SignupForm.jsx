import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../css/SignupForm.css";   // important pour que le style s'applique

export default function Signup_organization({ onSubmitSuccess }) {
  const navigate = useNavigate();

  const regionsSenegal = [
    "Dakar",
    "Diourbel",
    "Fatick",
    "Kaolack",
    "Kaffrine",
    "Kédougou",
    "Kolda",
    "Louga",
    "Matam",
    "Saint-Louis",
    "Sédhiou",
    "Tambacounda",
    "Thiès",
    "Ziguinchor",
  ];

  const [types, setTypes] = useState([]);
  const [data_organization, setdata_organization] = useState({
    orga_type_id: "",
    orga_name: "",
    orga_siret: "",
    orga_region: "",
    orga_email: "",
    orga_phone: "",
    orga_comment: "",
  });

  useEffect(() => {
    const fetchType_orga = async () => {
      const { data, error } = await supabase
        .from("type_organization")
        .select("*");
      if (error) {
        console.error("Erreur :", error);
        return;
      }
      setTypes(data || []);
    };
    fetchType_orga();
  }, []);

  const handleChange = (e) => {
    setdata_organization({
      ...data_organization,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("organization")
      .insert([data_organization]);

    if (error) {
      console.log("Erreur:", error);
      return;
    }

    const { data: typeData, error: typeError } = await supabase
      .from("type_organization")
      .select("type_name")
      .eq("id_type", data_organization.orga_type_id)
      .single();

    if (typeError) {
      console.log("Erreur type:", typeError);
      return;
    }

    const fullData = {
      ...data_organization,
      orga_type_name: typeData.type_name,
    };

    const { data: emailResponse, error: emailError } =
      await supabase.functions.invoke("SendOrgEmail", {
        body: fullData,
      });

    if (emailError) {
      console.error("Erreur lors de l'envoi de l'email");
    } else {
      console.log("Réponse de la fonction :", emailResponse);
    }

    onSubmitSuccess();
  };

  return (
    <div className="signup-page">
      {/* bandes décoratives */}
      <div className="signup-decor signup-decor--left" />
      <div className="signup-decor signup-decor--right" />

      {/* carte formulaire */}
      <form onSubmit={handleSubmit} className="data_organization-container">
        <h1 className="signup-title">Création de compte</h1>
        <p className="signup-subtitle">
          Dites-nous en un peu plus sur votre structure pour que l’on vous
          contacte rapidement.
        </p>

        {/* Type */}
        <div className="field-group">
          <label>Type d’organisation</label>
          <select
            name="orga_type_id"
            value={data_organization.orga_type_id}
            onChange={handleChange}
          >
            <option value="">Sélectionner…</option>
            {types.map((orga_type) => (
              <option
                key={orga_type.id_type}
                value={orga_type.id_type}
              >
                {orga_type.type_name}
              </option>
            ))}
          </select>
        </div>

        {/* Nom */}
        <div className="field-group">
          <label>Nom de l’organisation</label>
          <input
            name="orga_name"
            value={data_organization.orga_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* SIRET */}
        <div className="field-group">
          <label>Numéro SIRET</label>
          <input
            name="orga_siret"
            value={data_organization.orga_siret}
            onChange={handleChange}
          />
        </div>

        {/* Région */}
        <div className="field-group">
          <label>Région</label>
          <select
            name="orga_region"
            value={data_organization.orga_region}
            onChange={handleChange}
          >
            <option value="">Sélectionner…</option>
            {regionsSenegal.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div className="field-group">
          <label>Email</label>
          <input
            type="email"
            name="orga_email"
            value={data_organization.orga_email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Téléphone */}
        <div className="field-group">
          <label>Téléphone</label>
          <input
            name="orga_phone"
            value={data_organization.orga_phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Commentaire */}
        <div className="field-group">
          <label>Commentaire</label>
          <textarea
            name="orga_comment"
            value={data_organization.orga_comment}
            onChange={handleChange}
          />
        </div>

        <div className="signup-actions">
          <button type="submit" className="btn-primary">
            Valider
          </button>
          <button
            type="button"
            className="btn-link"
            onClick={() => navigate("/")}
          >
            Retour à l’accueil
          </button>
        </div>
      </form>
    </div>
  );
}
