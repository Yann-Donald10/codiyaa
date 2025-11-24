import React from "react";

const Contact = () => {
  return (
    <section className="section section-light section--centered" id="contact">
      <div className="section-inner" style={{ maxWidth: "640px" }}>
        <h2 className="section-title">Contact</h2>
        <p className="section-text" style={{ marginBottom: "2rem" }}>
          Parlez-nous de votre projet ou de vos besoins. Nous reviendrons vers vous avec des
          propositions adaptées à votre contexte.
        </p>

        <form className="contact-form">
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.35rem" }}>
              Nom complet
            </label>
            <input
              id="name"
              type="text"
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.35rem" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="org" style={{ display: "block", marginBottom: "0.35rem" }}>
              Organisation
            </label>
            <select
              id="org"
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
            >
              <option value="">Sélectionner</option>
              <option value="ong">ONG / fondation</option>
              <option value="ministry">Ministère / institution publique</option>
              <option value="school">École / centre éducatif</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="message" style={{ display: "block", marginBottom: "0.35rem" }}>
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid #ddd" }}
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
