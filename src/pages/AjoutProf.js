import React, { useState } from "react";
import api from "../utils/api";
import "./ajoutprof.css";
function AjoutProf({ SetSectionName }) {
  const [enseignant, setEnseignant] = useState({
    nom: "",
    prenom: "",
    cin: "",
    email: "",
    numTel: "",
  });

  async function addEnseignant(userid) {
    await api
      .post("api/enseignants", { ...enseignant, userId: userid })
      .then((res) => SetSectionName("Enseignants"));
  }
  async function addUser() {
    await api
      .post("api/users", {
        username: enseignant.cin,

        password: enseignant.cin,
        type: "enseignant",
      })
      .then((res) => addEnseignant(res.data.id));
  }
  return (
    <div>
      <div className="formprof">
        <h1>Nouveau enseignant</h1>
        <div className="ajoutprof-form">
          <input
            type="text"
            placeholder="Nom"
            value={enseignant.nom}
            onChange={(e) => {
              setEnseignant({ ...enseignant, nom: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Prenom"
            value={enseignant.prenom}
            onChange={(e) => {
              setEnseignant({ ...enseignant, prenom: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Cin"
            value={enseignant.cin}
            onChange={(e) => {
              setEnseignant({ ...enseignant, cin: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Numéro de téléphone"
            value={enseignant.numTel}
            onChange={(e) => {
              setEnseignant({ ...enseignant, numTel: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={enseignant.email}
            onChange={(e) => {
              setEnseignant({ ...enseignant, email: e.target.value });
            }}
          />
          <button className="ajouterbtn" onClick={addUser}>
            Ajouter
          </button>
          <button
            className="retourbtn"
            onClick={() => {
              SetSectionName("Enseignants");
            }}
          >
            retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default AjoutProf;
