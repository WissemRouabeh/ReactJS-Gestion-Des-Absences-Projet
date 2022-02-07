import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./matiere.css";

function Matiere({ SetSectionName }) {
  const [matieres, setMatieres] = useState([]);
  const [finalMatieres, setFinalMatieres] = useState([]);
  const [classes, setClasses] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [showtable, setShowtable] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/matieres").then((res) => {
        setMatieres(res.data);
      });
    }
    fetchData();
    filter();
    // eslint-disable-next-line
  }, [classes]);

  useEffect(() => {
    async function fetchData() {
      await api.get("api/specialites").then((res) => {
        setSpecialites(res.data);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await api.get("api/classes").then((res) => setClasses(res.data));
    }

    fetchData();
  }, [specialites]);

  function filter() {
    let arr = [];
    matieres.map((matiere) => {
      let mat = matiere;
      mat.classe = classes.find((e) => e.id === mat.classeId);
      mat.classe = mat.classe === undefined ? classes[0] : mat.classe;

      return arr.push(mat);
    });
    setFinalMatieres(arr);
  }
  useEffect(() => {
    setShowtable(true);
  }, [finalMatieres]);
  return (
    <div>
      <div className="matiere-container">
        <h1> Gérer les matieres</h1>
        {showtable && (
          <div className="table-section">
            <table className="matiere-table">
              <tbody>
                <tr>
                  <th>Matiere</th>
                  <th>Spécialité</th>
                  <th>Niveau</th>
                  <th>Classe</th>
                </tr>

                {finalMatieres.map((matiere) => {
                  return (
                    <tr key={matiere.id}>
                      <td>{matiere.lib}</td>
                      <td>{matiere.classe.libSpec}</td>
                      <td>{matiere.classe.niveau}</td>
                      <td>{matiere.classe.lib}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => {
            SetSectionName("AjouterMatiere");
          }}
        >
          Nouvelle matiere
        </button>
      </div>
    </div>
  );
}

export default Matiere;
