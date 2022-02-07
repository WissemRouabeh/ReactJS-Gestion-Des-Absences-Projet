import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./ajoutclasse.css";
function AjoutClasse({ SetSectionName }) {
  const [specialites, setSpecialites] = useState([]);
  const [classe, setClasse] = useState({
    specialite: "",
    niveau: "",
    lib: "",
    libSpec: "",
  });
  useEffect(() => {
    async function fetchData() {
      await api.get("api/specialites").then((res) => setSpecialites(res.data));
    }
    fetchData();
  }, []);
  async function addClasse() {
    console.log(add());
    let c = { ...classe, libSpec: add() };
    await api.post("api/classes", c).then((res) => {
      console.log(res.data);
      SetSectionName("Classes");
    });
  }
  function add() {
    for (let s of specialites) {
      if (String(s.id) == String(classe.specialiteId)) {
        return s.lib;
      }
    }
  }
  return (
    <div>
      <div className="formclasse">
        <h1>Nouvelle classe</h1>
        <div className="ajoutclasse-form">
          <input
            type="text"
            placeholder="Niveau"
            onChange={(e) => {
              setClasse({ ...classe, niveau: e.target.value });
            }}
            value={classe.niveau}
          />
          <select
            name="type"
            id="specialite"
            onChange={(e) => {
              setClasse({
                ...classe,
                specialiteId: e.target.value,
              });
            }}
          >
            <option value="default">-Specialite-</option>

            {specialites.map((specialite) => {
              return (
                <option key={specialite.id} value={specialite.id}>
                  {specialite.lib}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Classe"
            onChange={(e) => {
              setClasse({ ...classe, lib: e.target.value });
            }}
            value={classe.lib}
          />
          <button
            className="ajouterbtn"
            onClick={() => {
              addClasse();
            }}
          >
            Ajouter
          </button>
          <button
            className="retourbtn"
            onClick={() => {
              SetSectionName("AjouterSpecialite");
            }}
          >
            {" "}
            Ajouter specialité
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

export default AjoutClasse;
