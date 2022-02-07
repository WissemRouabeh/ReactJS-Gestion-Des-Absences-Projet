import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./main.css";
import Prof from "./Prof";
import Etud from "./Etud";
import AjoutEtud from "./AjoutEtud";
import AjoutProf from "./AjoutProf";
import Emploi from "./Emploi";
import AjoutMatiere from "./AjoutMatiere";
import AjoutSeance from "./AjoutSeance";
import AjoutClasse from "./AjoutClasse";
import AjoutSpecialite from "./AjoutSpecialite";
import Classe from "./Classe";
import Matiere from "./Matiere";
import Appel from "./Appel";
import Dashboard from "./Dashboard";
import AbsencesHistory from "./AbsencesHistory";
import AccountCircleRoundedIcon from "@mui/icons-material/Settings";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Myclasses from "./Myclasses";
import MyhistoryEns from "./MyhistoryEns";
import Changepwd from "./Changepwd";
import EmploiEns from "./EmploiEns";

function Main() {
  const [sectionName, SetSectionName] = useState("dashboard");
  const [showInfo, setShowInfo] = useState(false);
  const [user, setUser] = useState({});
  const [classeAjouteSeance, SetClasseAjouteSeance] = useState("1");
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("uid")) navigate("/login");
  }, []);
  useEffect(() => {
    localStorage.getItem("type") !== "admin" &&
      api
        .get(
          "api/" +
            localStorage.getItem("type") +
            "s/" +
            localStorage.getItem("tid")
        )
        .then((res) => {
          setUser(res.data);
        });
  }, []);
  useEffect(() => {
    setShowInfo(true);
  }, [user]);
  function showSection() {
    switch (sectionName) {
      case "dashboard":
        return <Dashboard />;

      case "Classes":
        return <Classe SetSectionName={SetSectionName} />;
      case "Enseignants":
        return <Prof SetSectionName={SetSectionName} />;
      case "Matieres":
        return <Matiere SetSectionName={SetSectionName} />;
      case "Absence":
        return <Appel />;
      case "Etudiants":
        return <Etud SetSectionName={SetSectionName} />;
      case "Emplois":
        return (
          <Emploi
            SetSectionName={SetSectionName}
            SetClasseAjouteSeance={SetClasseAjouteSeance}
          />
        );
      case "Historique":
        return <AbsencesHistory />;
      case "AjouterClasse":
        return <AjoutClasse SetSectionName={SetSectionName} />;
      case "AjouterEnseignant":
        return <AjoutProf SetSectionName={SetSectionName} />;
      case "AjouterMatiere":
        return <AjoutMatiere SetSectionName={SetSectionName} />;
      case "AjouterEtudiant":
        return <AjoutEtud SetSectionName={SetSectionName} />;
      case "AjouterSeance":
        return (
          <AjoutSeance
            SetSectionName={SetSectionName}
            classeAjouteSeance={classeAjouteSeance}
          />
        );
      case "AjouterSpecialite":
        return <AjoutSpecialite SetSectionName={SetSectionName} />;
      case "HistoriqueEns":
        return <MyhistoryEns />;
      case "Setting":
        return <Changepwd SetSectionName={SetSectionName} />;

      case "Myclasses":
        return <Myclasses />;
      case "EmploisEns":
        return <EmploiEns />;

      default:
        break;
    }
  }
  return (
    <div>
      {showInfo && (
        <div
          className="login-section"
          onClick={() => {
            SetSectionName("Setting");
          }}
        >
          <span className="login-icon">
            <AccountCircleRoundedIcon />
          </span>
          <span className="login-info">
            {user.nom} {user.prenom}
          </span>
        </div>
      )}
      <div className="main-container">
        <div className="sidebar">
          <Sidebar SetSectionName={SetSectionName} />
        </div>
        <div className="sidepage">{showSection()}</div>
      </div>
    </div>
  );
}

export default Main;
