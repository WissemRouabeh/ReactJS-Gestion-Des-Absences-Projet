import React, { useState, useEffect, useLayoutEffect } from "react";
import api from "../utils/api";

import "./etud.css";
function Myclasses({ SetSectionName }) {
  const [classes, setClasses] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [classe, setClasse] = useState({
    id: "-1",
  });
  const [etudiants, setEtudiants] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [MyfinalClasses, setMyfinalClasses] = useState([]);
  useEffect(async () => {
    await api
      .get("api/Emploisens/" + localStorage.getItem("tid"))
      .then((res) => {
        setMyClasses(res.data);
      });
  }, [classes]);
  useEffect(async () => {
    await api.get("api/classes/").then((res) => setClasses(res.data));
  }, []);

  useEffect(() => {
    let arr = [];
    for (let cl of myClasses) {
      for (let cls of classes) {
        cl.classeId == cls.id && arr.push(cls);
      }
    }
    setMyfinalClasses(arr);
  }, [myClasses]);

  useEffect(() => {
    setShowSelect(true);
  }, [MyfinalClasses]);

  useEffect(() => {
    async function fetchData() {
      String(classe.id) !== "-1" &&
        (await api.get("api/Etudiantscls/" + classe.id).then((res) => {
          setEtudiants(res.data);
        }));
    }

    fetchData();
  }, [classe]);
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
        <h1>Mes classes</h1>
        <select name="type" id="classe" onChange={findClasse}>
          <option value="-1">-Classe-</option>

          {showSelect &&
            MyfinalClasses.map((classe) => {
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
      </div>
    </div>
  );
}

export default Myclasses;
