import React, { useState, useEffect } from "react";
import api from "../utils/api";

import "./etud.css";
function Etud({ SetSectionName }) {
  const [classes, setClasses] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [finalClasses, setFinalClasses] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [classe, setClasse] = useState({
    id: "-1",
  });
  const [etudiants, setEtudiants] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/classes").then((res) => {
        setClasses(res.data);
      });
    }
    fetchData();
    // filter();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchData() {
      String(classe.id) !== "-1" &&
        (await api.get("api/Etudiantscls/" + classe.id).then((res) => {
          setEtudiants(res.data);
        }));
    }

    fetchData();
  }, [classe.id]);
  function findClasse(e) {
    function showTable() {
      if (String(e.target.value) !== "-1") setShowTable(true);
      else setShowTable(false);
    }
    showTable();
    classes.forEach((cl) => {
      let c = {};
      let found = false;

      if (String(cl.id) === e.target.value) {
        found = true;
        c = cl;
      }
      found && setClasse(c);
    });
  }

  return (
    <div>
      <div className="etud-container">
        <h1>Gérer les étudiants</h1>
        <select name="type" id="classe" onChange={findClasse}>
          <option value="-1">-Classe-</option>

          {classes.map((classe) => {
            return (
              <option key={classe.id} value={classe.id}>
                {classe.niveau} {classe.libSpec} {classe.lib}
              </option>
            );
          })}
        </select>
        {showTable && (
          <div className="table-section">
            <table className="etud-table">
              <tbody>
                <tr>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Cin</th>
                  <th>Téléphone</th>
                  <th>N° inscription</th>
                  <th>email</th>
                  <th>Classe</th>
                </tr>

                {etudiants.map((etudiant) => {
                  return (
                    <tr key={etudiant.id}>
                      <td>{etudiant.nom}</td>
                      <td>{etudiant.prenom}</td>
                      <td>{etudiant.cin}</td>
                      <td>{etudiant.numTel}</td>
                      <td>{etudiant.numIns}</td>
                      <td>{etudiant.email}</td>
                      <td>
                        {classe.niveau} {classe.libSpec} {classe.lib}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <button
          onClick={() => {
            SetSectionName("AjouterEtudiant");
          }}
        >
          Nouveau etudiant
        </button>
      </div>
    </div>
  );
}

export default Etud;
