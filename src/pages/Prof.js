import React, { useState, useEffect } from "react";
import api from "../utils/api";

import "./prof.css";
function Prof({ SetSectionName }) {
  const [enseignants, setEnseignants] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/enseignants").then((res) => {
        setEnseignants(res.data);
      });
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="prof-container">
        <h1> Gérer les enseignants</h1>
        <div className="table-section table-responsive table table-responsive-md">
          <table className="prof-table">
            <tbody>
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Cin</th>
                <th>Téléphone</th>
                <th>email</th>
              </tr>

              {enseignants.map((enseignant) => {
                return (
                  <tr key={enseignant.id}>
                    <td>{enseignant.nom}</td>
                    <td>{enseignant.prenom}</td>
                    <td>{enseignant.cin}</td>
                    <td>{enseignant.numTel}</td>
                    <td>{enseignant.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => {
            SetSectionName("AjouterEnseignant");
          }}
        >
          Nouveau enseignant
        </button>
      </div>
    </div>
  );
}

export default Prof;
