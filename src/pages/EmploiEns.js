import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./emploi.css";
function EmploiEns({ SetSectionName }) {
  const [classes, setClasses] = useState([]);
  const [emplois, setEmplois] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [classeid, setClasseid] = useState("1");
  const [finalEmplois, setFinalEmplois] = useState([]);
  const [fetchSelect, setFetchSelect] = useState(false);
  const [myClasses, setMyClasses] = useState([]);
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

  function arrangeEmploi() {
    finalEmplois.forEach((s) => {
      document.getElementById(`${s.jour}${s.seance}`).innerHTML = `
        
        <span className="emploi-mat" style=" 
        line-height: -1vh;
        font-weight: 500;
        font-size: 1.6vh;">
        ${s.matiere.lib}
        </span>
        <span
          className="emploi-prof"
          style="
            position: absolute;
            bottom: 0;
            right: 1px;
            font-size: 1.3vh;
            "
        > 
        ${s.enseignant.nom} ${s.enseignant.prenom}
        </span>
        <span
          className="emploi-salle"
          style="
          position: absolute;
          top: 0;
          left: 2px;
          font-size: 1.4vh;
          "
        >${s.salle}
        </span>
        
        `;
    });
  }
  function emptyEmploi() {
    finalEmplois.forEach((s) => {
      document.getElementById(`${s.jour}${s.seance}`).innerHTML = "";
    });
  }
  useEffect(() => {
    async function fetchData() {
      await api.get("api/enseignants").then((res) => setEnseignants(res.data));
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/matieres").then((res) => setMatieres(res.data));
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await api.get("api/emploiscls/" + classeid).then((res) => {
        setEmplois(res.data);
      });
    }
    fetchData();
    emptyEmploi();
    // eslint-disable-next-line
  }, [classeid]);
  useEffect(() => {
    filter();
    // eslint-disable-next-line
  }, [emplois]);
  useEffect(() => {
    arrangeEmploi();
    // eslint-disable-next-line
  }, [finalEmplois]);

  function filter() {
    let arr = [];
    emplois.map((emploi) => {
      let emp = emploi;
      emp.enseignant = enseignants.find((e) => e.id === emp.enseignantId);
      emp.enseignant =
        emp.enseignant === undefined ? enseignants[0] : emp.enseignant;
      emp.matiere = matieres.find((e) => e.id === emp.matiereId);
      emp.matiere = emp.matiere === undefined ? enseignants[0] : emp.matiere;
      return arr.push(emp);
    });
    setFinalEmplois(arr);
  }
  return (
    <div>
      <div className="emploi-container">
        <h1>Gérer les emplois de temps</h1>
        <select
          name="type"
          id="classe"
          onChange={(e) => {
            setClasseid(e.target.value);
          }}
        >
          <option value="default">----</option>

          {showSelect &&
            MyfinalClasses.map((classe) => {
              return (
                <option key={classe.id} value={classe.id}>
                  {classe.niveau} {classe.libSpec} {classe.lib}
                </option>
              );
            })}
        </select>
        <div className="emploi-table">
          <table>
            <tbody>
              <tr>
                <span className="emploi-jour">Jour</span>
                <th>8h:30-10h:00</th>
                <th>10h:15-11h:45</th>
                <th>12h:00-13h:30</th>
                <th>13h:45-15h:15</th>
                <th>15h:30-17h:00</th>
                <th>17h:15-18h:45</th>
              </tr>
              <tr>
                <span className="emploi-jour">Lundi</span>
                <td id="lundis1"></td>
                <td id="lundis2"></td>
                <td id="lundis3"></td>
                <td id="lundis4"></td>
                <td id="lundis5"></td>
                <td id="lundis6"></td>
              </tr>
              <tr>
                <span className="emploi-jour">Mardi</span>
                <td id="mardis1"></td>
                <td id="mardis2"></td>
                <td id="mardis3"></td>
                <td id="mardis4"></td>
                <td id="mardis5"></td>
                <td id="mardis6"></td>
              </tr>
              <tr>
                <span className="emploi-jour">Mercredi</span>
                <td id="mercredis1"></td>
                <td id="mercredis2"></td>
                <td id="mercredis3"></td>
                <td id="mercredis4"></td>
                <td id="mercredis5"></td>
                <td id="mercredis6"></td>
              </tr>
              <tr>
                <span className="emploi-jour">Jeudi</span>
                <td id="jeudis1"></td>
                <td id="jeudis2"></td>
                <td id="jeudis3"></td>
                <td id="jeudis4"></td>
                <td id="jeudis5"></td>
                <td id="jeudis6"></td>
              </tr>
              <tr>
                <span className="emploi-jour">Vendredi</span>
                <td id="vendredis1"></td>
                <td id="vendredis2"></td>
                <td id="vendredis3"></td>
                <td id="vendredis4"></td>
                <td id="vendredis5"></td>
                <td id="vendredis6"></td>
              </tr>
              <tr>
                <span className="emploi-jour">Samedi</span>
                <td id="samedis1"></td>
                <td id="samedis2"></td>
                <td id="samedis3"></td>
                <td id="samedis4"></td>
                <td id="samedis5"></td>
                <td id="samedis6"></td>
                <div className="divi"></div>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divi"></div>
      </div>
    </div>
  );
}

export default EmploiEns;
