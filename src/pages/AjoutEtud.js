import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./ajoutetud.css";
function AjoutEtud({ SetSectionName }) {
  const [classes, setClasses] = useState([]);
  const [etudiant, setEtudiant] = useState({
    nom: "",
    prenom: "",
    cin: "",
    email: "",
    numTel: "",
    numIns: "",
    classId: "default",
  });
  useEffect(() => {
    async function fetchData() {
      await api.get("api/classes").then((res) => {
        setClasses(res.data);
      });
    }
    fetchData();
  }, []);

  async function addEtudiant(userid) {
    if (etudiant.classeId === "default" && etudiant.lib === "") {
    } else {
      await api
        .post("api/etudiants", { ...etudiant, userId: userid })
        .then((res) => SetSectionName("Etudiants"));
    }
  }
  async function addUser() {
    await api
      .post("api/users", {
        username: etudiant.cin,
        password: etudiant.cin,
        type: "etudiant",
      })
      .then((res) => addEtudiant(res.data.id));
  }

  return (
    <div>
      <div className="formetud">
        <h1>Nouveau etudiant</h1>
        <div className="ajoutetud-form">
          <input
            type="text"
            placeholder="Nom"
            value={etudiant.nom}
            onChange={(e) => {
              setEtudiant({ ...etudiant, nom: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Prenom"
            value={etudiant.prenom}
            onChange={(e) => {
              setEtudiant({ ...etudiant, prenom: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Cin"
            value={etudiant.cin}
            onChange={(e) => {
              setEtudiant({ ...etudiant, cin: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Numéro d'inscription"
            value={etudiant.numIns}
            onChange={(e) => {
              setEtudiant({ ...etudiant, numIns: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Numéro de téléphone"
            value={etudiant.numTel}
            onChange={(e) => {
              setEtudiant({ ...etudiant, numTel: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={etudiant.email}
            onChange={(e) => {
              setEtudiant({ ...etudiant, email: e.target.value });
            }}
          />
          <select
            name="type"
            id="classe"
            onChange={(e) => {
              setEtudiant({
                ...etudiant,
                classeId: e.target.value,
              });
            }}
          >
            <option value="default">-Classe-</option>

            {classes.map((classe) => {
              return (
                <option key={classe.id} value={classe.id}>
                  {classe.id} {classe.niveau} {classe.specialite} {classe.lib}
                </option>
              );
            })}
          </select>
          <button className="ajouterbtn" onClick={addUser}>
            Ajouter
          </button>
          <button
            className="retourbtn"
            onClick={() => {
              SetSectionName("Etudiants");
            }}
          >
            retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default AjoutEtud;
