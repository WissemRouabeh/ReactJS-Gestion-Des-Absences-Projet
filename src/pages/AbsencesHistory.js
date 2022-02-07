import React, { useState, useEffect } from "react";
import "./appel.css";
import api from "../utils/api";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function AbsencesHistory() {
  const [classes, setClasses] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [seances, setSeances] = useState([]);
  const [listAbsences, setListAbsences] = useState([]);
  const [listAbsencesFinal, setListAbsencesFinal] = useState([]);
  const [classeid, setClasseid] = useState("default");
  const [matiereid, setMatiereid] = useState("default");
  const [seanceid, setSeanceid] = useState("default");
  const [etudiants, setEtudiants] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [showTable, setShowTable] = useState(false);
  const [finalMatieres, setFinalMatieres] = useState([]);
  useEffect(async () => {
    await api.get("api/classes").then((res) => {
      setClasses(res.data);
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      await api.get("api/emploiscls/" + classeid).then((res) => {
        setMatieres([]);
        res.data.forEach(async (data) => {
          await api.get("api/matieres/" + data.matiereId).then((res) => {
            setMatieres((oldmat) => [...oldmat, res.data]);
          });
        });
      });
    }
    async function fetchEtudiants() {
      await api.get("/api/etudiants").then((res) => {
        setEtudiants(res.data);
      });
    }

    classeid !== "default" && fetchData();
    classeid !== "default" && fetchEtudiants();
    // eslint-disable-next-line
  }, [classeid]);
  useEffect(() => {
    for (let m of matieres) {
      finalMatieres.findIndex((object) => object.id === m.id) === -1 &&
        setFinalMatieres((olds) => [...olds, m]);
    }
  }, [matieres]);

  useEffect(() => {
    async function fetchData() {
      await api
        .get("api/emploisclsmat/" + classeid + "/" + matiereid)
        .then((res) => {
          setSeances(res.data);
        });
    }
    matiereid !== "default" && fetchData();
  }, [matiereid]);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  useEffect(() => {
    async function fetchData() {
      let date = String(formatDate(startDate)).replace("/", "-");
      console.log(date);
      await api
        .get("api/absencesbyseancedate/" + seanceid + "/" + date)
        .then((res) => {
          setListAbsences(res.data);
          setShowTable(true);
        });
    }

    seanceid !== "default" && fetchData();
  }, [seanceid, startDate]);
  useEffect(() => {
    filter();
  }, [listAbsences]);
  function filter() {
    let arr = [];
    listAbsences.map((absence) => {
      let abs = absence;
      abs.etudiant = etudiants.find((e) => e.id === abs.etudiantId);
      abs.etudiant = abs.etudiant === undefined ? etudiants[0] : abs.etudiant;
      return arr.push(abs);
    });
    setListAbsencesFinal(arr);
  }
  return (
    <div>
      <div className="appel-container">
        <h2>Historique d'absences</h2>
        <select
          name="type"
          id="classe"
          onChange={(e) => {
            setFinalMatieres([]);
            setClasseid(e.target.value);
          }}
        >
          <option value="default">-Classe-</option>

          {classes.map((classe) => {
            return (
              <option key={classe.id} value={classe.id}>
                {classe.niveau} {classe.libSpec} {classe.lib}
              </option>
            );
          })}
        </select>
        <select
          name="type"
          id="classe"
          onChange={(e) => {
            setMatiereid(e.target.value);
          }}
        >
          <option value="default">-Matiere-</option>

          {finalMatieres.map((matiere) => {
            return (
              <option key={matiere.id} value={matiere.id}>
                {matiere.lib}
              </option>
            );
          })}
        </select>
        <select
          name="type"
          id="classe"
          onChange={(e) => {
            setSeanceid(e.target.value);
          }}
        >
          <option value="default">-Seance-</option>

          {seances.map((seance) => {
            return (
              <option key={seance.id} value={seance.id}>
                {seance.jour} {seance.seance}
              </option>
            );
          })}
        </select>
        <DatePicker
          id="date-picker"
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setStartDate(date)}
        />

        {showTable && (
          <div>
            <div className="table-section">
              <table className="appel-table">
                <tbody>
                  <tr>
                    <th>
                      <strong>Absent(e)</strong>
                    </th>
                    <th>
                      <strong>Date</strong>
                    </th>
                    <th>
                      <strong>Nom</strong>
                    </th>
                    <th>
                      <strong>Prenom</strong>
                    </th>
                    <th>
                      <strong>Email</strong>
                    </th>
                  </tr>
                  {listAbsencesFinal.map((absence) => {
                    return (
                      <tr key={absence.id}>
                        <td>
                          {absence.abs ? (
                            <span
                              style={{
                                color: "Green",
                                fontWeight: "500",
                                fontSize: "0.9rem",
                              }}
                            >
                              Present
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "Red",
                                fontWeight: "500",
                                fontSize: "0.9rem",
                              }}
                            >
                              Absent(e)
                            </span>
                          )}
                        </td>
                        <td>{absence.date}</td>
                        <td>{absence.etudiant.nom}</td>
                        <td>{absence.etudiant.prenom}</td>
                        <td>{absence.etudiant.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AbsencesHistory;
