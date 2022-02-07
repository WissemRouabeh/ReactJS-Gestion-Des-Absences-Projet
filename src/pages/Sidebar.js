import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryIcon from "@mui/icons-material/History";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import BadgeIcon from "@mui/icons-material/AssignmentInd";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import "./sidebar.css";
function Sidebar({ SetSectionName }) {
  let navigate = useNavigate();
  return (
    <div>
      <div className="sidebar-container">
        <span className="sidebar-logo" style={{ cursor: "pointer" }}>
          Wissem
        </span>
        <div className="sidebar-selects">
          <div
            className="sidebar-select"
            onClick={() => {
              SetSectionName("dashboard");
            }}
          >
            <div className="sidebar-select-inner">
              <DashboardIcon />
              <span>Accueil</span>
            </div>
          </div>
          <div
            style={{
              display:
                localStorage.getItem("type") === "enseignant"
                  ? "none"
                  : "block",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Classes");
            }}
          >
            <div className="sidebar-select-inner">
              <SchoolIcon />
              <span>Les classes</span>
            </div>
          </div>
          <div
            style={{
              display:
                localStorage.getItem("type") === "enseignant"
                  ? "none"
                  : "block",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Etudiants");
            }}
          >
            {" "}
            <div className="sidebar-select-inner">
              <PersonIcon />
              <span>Les étudiants</span>
            </div>
          </div>
          <div
            style={{
              display:
                localStorage.getItem("type") === "enseignant"
                  ? "none"
                  : "block",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Enseignants");
            }}
          >
            <div className="sidebar-select-inner">
              <BadgeIcon />
              <span>Les enseignants</span>
            </div>
          </div>
          <div
            style={{
              display:
                localStorage.getItem("type") === "enseignant"
                  ? "none"
                  : "block",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Emplois");
            }}
          >
            <div className="sidebar-select-inner">
              <EventNoteIcon />
              <span>Les emplois</span>
            </div>
          </div>
          <div
            style={{
              display:
                localStorage.getItem("type") === "admin" ? "none" : "block",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("EmploisEns");
            }}
          >
            <div className="sidebar-select-inner">
              <EventNoteIcon />
              <span>Les emplois</span>
            </div>
          </div>

          <div
            style={{
              display: localStorage.getItem("type") === "admin" && "none",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Myclasses");
            }}
          >
            <div className="sidebar-select-inner">
              <SchoolIcon />
              <span>Mes classes</span>
            </div>
          </div>
          <div
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Absence");
            }}
          >
            <div className="sidebar-select-inner">
              <EventBusyIcon />
              <span>Marquer l'absence</span>
            </div>
          </div>
          <div
            style={{
              display: localStorage.getItem("type") === "enseignant" && "none",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Matieres");
            }}
          >
            <div className="sidebar-select-inner">
              <MenuBookIcon />
              <span>Les matiéres</span>
            </div>
          </div>
          <div
            style={{
              display: localStorage.getItem("type") === "admin" && "none",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("HistoriqueEns");
            }}
          >
            <div className="sidebar-select-inner">
              <HistoryIcon />
              <span>Historique d'absences</span>
            </div>
          </div>
          <div
            style={{
              display:
                localStorage.getItem("type") === "enseignant"
                  ? "none"
                  : "block",
            }}
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Historique");
            }}
          >
            <div className="sidebar-select-inner">
              <HistoryIcon />
              <span>Historique d'absences</span>
            </div>
          </div>
          <div
            className="sidebar-select"
            onClick={() => {
              SetSectionName("Historique");
            }}
          >
            <div
              className="sidebar-select-inner"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <ExitToAppIcon />
              <span>Déconnexion</span>
            </div>
          </div>
        </div>
        <div className="sidebar-footer">
          © Copyright reserved Wissem Rouabeh
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
