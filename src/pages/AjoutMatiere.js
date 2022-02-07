import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./ajoutmatiere.css";
function AjoutMatiere({ SetSectionName }) {
  const [matiere, setMatiere] = useState({
    lib: "",
    classeId: "default",
    // classe: {},
  });
  const [classes, setClasses] = useState([]);
  const [finalClasses, setFinalClasses] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/classes").then((res) => {
        setClasses(res.data);
      });
    }
    fetchData();
    filter();
  }, [specialites]);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/specialites").then((res) => {
        setSpecialites(res.data);
      });
    }
    fetchData();
  }, []);

  async function addMatiere() {
    if (matiere.classeId === "default" && matiere.lib === "") {
    } else {
      await api
        .post("api/matieres", matiere)
        .then((res) => SetSectionName("Matieres"));
    }
  }

  function filter() {
    let arr = [];
    classes.map((classe) => {
      let cl = classe;
      cl.specialite = specialites.find((e) => e.id === cl.specialiteId);
      cl.specialite =
        cl.specialite === undefined ? specialites[0] : cl.specialite;
      return arr.push(cl);
    });
    setFinalClasses(arr);
  }

  return (
    <div>
      <div className="formmatiere">
        <h1>Nouvelle matiére</h1>
        <div className="ajoutmatiere-form">
          <input
            type="text"
            placeholder="Matiére"
            value={matiere.lib}
            onChange={(e) => {
              setMatiere({ ...matiere, lib: e.target.value });
            }}
          />
          <select
            name="type"
            id="classe"
            onChange={(e) => {
              setMatiere({
                ...matiere,
                classeId: e.target.value,
              });
            }}
          >
            <option value="default">----</option>

            {finalClasses.map((classe) => {
              return (
                <option key={classe.id} value={classe.id}>
                  {classe.niveau} {classe.specialite.lib} {classe.lib}
                </option>
              );
            })}
          </select>
          <button className="ajouterbtn" onClick={addMatiere}>
            Ajouter
          </button>
          <button
            className="retourbtn"
            onClick={() => {
              SetSectionName("Matieres");
            }}
          >
            retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default AjoutMatiere;
