import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";


const Contact = () => {
  const [data_contact, setdata_contact] = useState({
      name_contact: "",
      email_contact: "",
      message_contact: "",
      type_orga_id: ""
    });
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchType_orga = async () => {
      const { data, error } = await supabase
      .from("type_organization")
      .select("*");
      console.log(data)
      if (error) {
        console.error("Erreur :", error);
        return;
      }
      setTypes(data || []);
    };
    fetchType_orga();
  }, []);

  const handleChange = (e) => {
        setdata_contact({ ...data_contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from("contact")
            .insert([data_contact]);

        if (error) {
            console.log("Erreur:", error);
            return;
        }

        const { data: typeData, error: typeError } = await supabase
            .from("type_organization")
            .select("type_name")
            .eq("id_type", data_contact.type_orga_id)
            .single();

        if (typeError) {
            console.log("Erreur type:", typeError);
            return;
        }

        const fullData = {
            ...data_contact,
            orga_type_name: typeData.type_name
        };

        const { data: emailResponse, error: emailError } = await supabase.functions.invoke("SendContactEmail", {
            body: fullData,
        });

        if (emailError) {
            console.error("Erreur lors de l'envoi de l'email");
        } else {
            console.log("Réponse de la fonction :", emailResponse);
        }
        navigate("/Sucess-Contact")
    };


  return (
    <section className="section section-light section--centered" id="contact">
      <div className="section-inner" style={{ maxWidth: "640px" }}>
        <h2 className="section-title">Contact</h2>
        <p className="section-text" style={{ marginBottom: "2rem" }}>
          Pour recevoir plus d’informations, laissez-nous vos coordonnées. Nous vous recontacterons dans les plus brefs délais.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.35rem" }}>
              Nom complet
            </label>
            <input
              name="name_contact"
              id="name"
              type="text"
              value={data_contact.name_contact}
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.35rem" }}>
              Email
            </label>
            <input
              name="email_contact"
              id="email"
              type="email"
              value={data_contact.email_contact}
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="org" style={{ display: "block", marginBottom: "0.35rem" }}>
              Organisation
            </label>
            <select
              name="type_orga_id"
              id="org"
              value={data_contact.type_orga_id}
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
              onChange={handleChange}
              required
            >
               <option value="">Sélectionner…</option>
               {types.map(orga_type => (
                <option key={orga_type.id_type} value={orga_type.id_type}>{orga_type.type_name}</option>
                ))}
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="message" style={{ display: "block", marginBottom: "0.35rem" }}>
              Message
            </label>
            <textarea
              name="message_contact"
              id="message"
              rows="4"
              value={data_contact.message_contact}
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
