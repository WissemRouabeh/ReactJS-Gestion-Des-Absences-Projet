import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./ajoutseance.css";
function AjoutSeance({ SetSectionName, classeAjouteSeance }) {
  const [matieres, setMatieres] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [seance, setSeance] = useState({
    jour: "",
    seance: "",
    salle: "",
    classeId: classeAjouteSeance,
    enseignantId: "",
    matiereId: "",
  });
  useEffect(() => {
    async function fetchEns() {
      await api.get("api/enseignants").then((res) => {
        setEnseignants(res.data);
      });
    }
    async function fetchMat() {
      await api.get("api/matieres").then((res) => {
        setMatieres(res.data);
      });
    }

    fetchEns();
    fetchMat();
  }, []);
  async function addSeance() {
    await api
      .post("api/emplois", seance)
      .then((res) => SetSectionName("Emplois"));
  }
  return (
    <div>
      <div className="formseance">
        <h1>Nouveau seance</h1>
        <div className="ajoutetud-form">
          <select
            name="type"
            id="classe"
            onChange={(e) => {
              setSeance({
                ...seance,
                jour: e.target.value,
              });
            }}
          >
            <option value="default">--Jour--</option>
            <option value="lundi">lundi</option>
            <option value="mardi">mardi</option>
            <option value="mercredi">mercredi</option>
            <option value="jeudi">jeudi</option>
            <option value="vendredi">vendredi</option>
            <option value="samedi">samedi</option>
          </select>
          <select
            name="type"
            id="classe"
            onChange={(e) => {
              setSeance({
                ...seance,
                seance: e.target.value,
              });
            }}
          >
            <option value="default">--Seance--</option>
            <option value="s1">s1</option>
            <option value="s2">s2</option>
            <option value="s3">s3</option>
            <option value="s4">s4</option>
            <option value="s5">s5</option>
            <option value="s6">s6</option>
          </select>
          <input
            type="text"
            id="classe"
            placeholder="Salle"
            value={seance.salle}
            onChange={(e) => {
              setSeance({ ...seance, salle: e.target.value });
            }}
          />
          <select
            name="type"
            id="classe"
            onChange={(e) => {
              setSeance({
                ...seance,
                enseignantId: e.target.value,
              });
            }}
          >
            <option value="default">-Enseignant-</option>

            {enseignants.map((ens) => {
              return (
                <option key={ens.id} value={ens.id}>
                  {ens.nom} {ens.prenom} {ens.cin}
                </option>
              );
            })}
          </select>
          <select
            name="type"
            id="classe"
            onChange={(e) => {
              setSeance({
                ...seance,
                matiereId: e.target.value,
              });
            }}
          >
            <option value="default">-Matiere-</option>

            {matieres.map((mat) => {
              return (
                <option key={mat.id} value={mat.id}>
                  {mat.lib}
                </option>
              );
            })}
          </select>
          <button className="ajouterbtn" onClick={addSeance}>
            Ajouter
          </button>
          <button
            className="retourbtn"
            onClick={() => {
              SetSectionName("Emplois");
            }}
          >
            retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default AjoutSeance;
