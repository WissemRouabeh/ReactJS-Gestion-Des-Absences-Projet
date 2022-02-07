import React, { useState, useEffect } from "react";
import "./appel.css";
import api from "../utils/api";

function Appel() {
  const [classes, setClasses] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [seances, setSeances] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [classeid, setClasseid] = useState("default");
  const [matiereid, setMatiereid] = useState("default");
  const [seanceid, setSeanceid] = useState("default");
  const [showsecondsection, setShowsecondsection] = useState(false);
  const [showthirdsection, setShowthirdsection] = useState(false);
  const [absenceList, setAbsenceList] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [myClasses, setMyClasses] = useState([]);

  const enseignantid = localStorage.getItem("tid");
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

  var today = new Date();
  var month =
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1;
  var DDMMYYYY = today.getFullYear() + "-" + month + "-" + today.getDate();
  var days = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  var dayName = days[today.getDay()];

  useEffect(() => {
    if (classeid === "default") {
      setShowsecondsection(false);
      setShowthirdsection(false);
    }
    async function fetchData() {
      await api
        .get("api/emploisclsens/" + classeid + "/" + enseignantid)
        .then((res) => {
          setMatieres([]);
          res.data.forEach(async (data) => {
            await api.get("api/matieres/" + data.matiereId).then((res) => {
              setMatieres([...matieres, res.data]);
            });
          });
        });
    }
    async function fetchEtudiants() {
      await api.get("api/Etudiantscls/" + classeid).then((res) => {
        setEtudiants(res.data);
      });
    }
    classeid !== "default" && setShowsecondsection(true);
    matiereid !== "default" && setShowthirdsection(true);
    classeid !== "default" && fetchData();
    classeid !== "default" && fetchEtudiants();
    // eslint-disable-next-line
  }, [classeid]);

  useEffect(() => {
    if (classeid === "default") {
      setShowsecondsection(false);
      setShowthirdsection(false);
      setMatiereid("default");
      setSeanceid("default");
    }
    if (matiereid === "default") {
      setSeanceid("default");
      setSeances([]);
      setShowthirdsection(false);
    }
  }, [classeid, matiereid]);

  useEffect(() => {
    if (matiereid === "default") {
      setShowthirdsection(false);
    }

    async function fetchData() {
      classeid !== "default" &&
        matiereid !== "default" &&
        (await api
          .get(
            "api/GetEmploisclsensmat/" +
              classeid +
              "/" +
              enseignantid +
              "/" +
              matiereid
          )
          .then((res) => {
            setSeances(res.data);
          }));
    }
    matiereid !== "default" && setShowthirdsection(true);
    fetchData();
    // eslint-disable-next-line
  }, [matiereid, classeid]);
  useEffect(() => {
    async function affectList() {
      var abslist = [];
      await etudiants.forEach((et) => {
        abslist.push({
          day: dayName,
          date: DDMMYYYY,
          abs: false,
          etudiantId: Number(String(et.id)),
          emploiId: Number(seanceid),
          enseignantId: Number(String(enseignantid)),
          matiereId: Number(matiereid),
          classeId: Number(classeid),
        });
      });
      setAbsenceList(abslist);
    }
    affectList();
    // eslint-disable-next-line
  }, [seanceid]);
  function doAbsence(e, eid) {
    var find = absenceList.findIndex((abe) => {
      return String(abe.etudiantId) === String(eid);
    });
    absenceList[find] = {
      day: dayName,
      date: DDMMYYYY,
      abs: e.target.checked,
      etudiantId: Number(String(eid)),
      emploiId: Number(seanceid),
      enseignantId: Number(String(enseignantid)),
      matiereId: Number(matiereid),
      classeId: Number(classeid),
    };
  }

  function fetchListAbs() {
    absenceList.map(async (data) => {
      if (
        seanceid !== "default" ||
        matiereid !== "default" ||
        classeid !== "default"
      )
        await api.post("api/absences", data).then((res) => console.log(res));
    });
  }
  return (
    <div>
      <div className="appel-container">
        <h1>Marquer l'absence</h1>

        <select
          name="type"
          id="classe"
          onChange={(e) => {
            setMatieres([]);
            setSeances([]);
            setClasseid("default");

            setSeanceid("default");
            setClasseid(e.target.value);
          }}
        >
          <option value="default">-Classe-</option>

          {showSelect &&
            MyfinalClasses.map((classe) => {
              return (
                <option key={classe.id} value={classe.id}>
                  {classe.niveau} {classe.libSpec} {classe.lib}
                </option>
              );
            })}
        </select>
        {showsecondsection && (
          <select
            name="type"
            id="classe"
            onChange={(e) => {
              setMatiereid(e.target.value);

              setSeances([]);
            }}
          >
            <option value="default">-Matiere-</option>

            {matieres.map((matiere) => {
              return (
                <option key={matiere.id} value={matiere.id}>
                  {matiere.lib}
                </option>
              );
            })}
          </select>
        )}
        {showthirdsection && (
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
        )}
        {showthirdsection && (
          <div>
            <div className="table-section">
              <table className="appel-table">
                <tbody>
                  <tr>
                    <th>
                      <strong>Absent(e)</strong>
                    </th>
                    <th>
                      <strong>Nom</strong>
                    </th>
                    <th>
                      <strong>Prenom</strong>
                    </th>
                    <th>
                      <strong>Numéro d'inscription</strong>
                    </th>
                    <th>
                      <strong>Email</strong>
                    </th>
                  </tr>
                  {etudiants.map((etudiant) => {
                    return (
                      <tr key={etudiant.id}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              doAbsence(e, etudiant.id);
                            }}
                          />
                        </td>
                        <td>{etudiant.nom}</td>
                        <td>{etudiant.prenom}</td>
                        <td>{etudiant.numIns}</td>
                        <td>{etudiant.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              className="btnAjout"
              disabled={false}
              onClick={() => {
                fetchListAbs();
                console.log(absenceList);
              }}
            >
              soumettre
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appel;
