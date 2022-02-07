import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./classe.css";
function Classe({ SetSectionName }) {
  const [classes, setClasses] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [finalClasses, setFinalClasses] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/etudiants").then((res) => {
        setEtudiants(res.data);
      });
    }
    fetchData();
  }, [classes]);
  function countOccurences(classid) {
    let count = 0;
    etudiants.forEach((et) => {
      if (String(et.classeId) === String(classid)) count++;
    });
    return String(count);
  }
  useEffect(() => {
    async function fetchData() {
      await api.get("api/classes").then((res) => {
        setClasses(res.data);
      });
    }
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="classe-container">
        <h1> Gérer les classes</h1>
        <div className="table-section">
          <table className="classe-table ">
            <tbody>
              <tr>
                <th>Spécialité</th>
                <th>Niveau</th>
                <th>Classe</th>
                <th>Nombre d'etudiants</th>
              </tr>

              {classes.map((classe) => {
                return (
                  <tr key={classe.id}>
                    <td>{classe.libSpec}</td>
                    <td>{classe.niveau}</td>
                    <td>{classe.lib}</td>
                    <td>{countOccurences(classe.id)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => {
            SetSectionName("AjouterClasse");
          }}
        >
          Nouvelle classe
        </button>
      </div>
    </div>
  );
}

export default Classe;
