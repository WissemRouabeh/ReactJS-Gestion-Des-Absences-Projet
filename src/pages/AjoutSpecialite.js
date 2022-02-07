import React, { useState } from "react";
import api from "../utils/api";
import "./ajoutspecialite.css";
function AjoutSpecialite({ SetSectionName }) {
  const [specialite, setSpecialite] = useState({ lib: "" });
  async function addSpecialite() {
    if (specialite.lib !== "")
      await api
        .post("api/Specialites", specialite)
        .then((res) => SetSectionName("Classes"));
    else alert("Merci de completer le champ.");
  }

  return (
    <div>
      <div className="formspecialite">
        <h1>Nouvelle specialite</h1>
        <div className="AjoutSpecialite-form">
          <input
            type="text"
            placeholder="Spécialité"
            value={specialite.lib}
            onChange={(e) => {
              setSpecialite({ lib: e.target.value });
            }}
          />

          <button
            className="ajouterbtn"
            onClick={() => {
              addSpecialite();
            }}
          >
            Ajouter
          </button>
          <button
            className="retourbtn"
            onClick={() => {
              SetSectionName("Classes");
            }}
          >
            retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default AjoutSpecialite;
