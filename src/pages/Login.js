import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("admin");
  useEffect(() => {
    if (localStorage.getItem("uid")) navigate("/");
  }, []);
  async function handleLocalStorageEtudiant(userid) {
    await api.get("api/etudiants").then((res) => {
      res.data.forEach((etudiant) => {
        if (String(etudiant.userId) === String(userid)) {
          localStorage.setItem("uid", String(userid));
          localStorage.setItem("tid", String(etudiant.id));
          localStorage.setItem("type", "etudiant");
          navigate("/");
        }
      });
    });
  }
  async function handleLocalStorageEnseignant(userid) {
    console.log("here");
    await api.get("api/enseignants").then((res) => {
      res.data.forEach((enseignant) => {
        if (String(enseignant.userId) == String(userid)) {
          localStorage.setItem("uid", String(userid));
          localStorage.setItem("tid", String(enseignant.id));
          localStorage.setItem("type", "enseignant");
          navigate("/");
        }
      });
    });
  }
  function handleLocalStorageAdmin(userid) {
    localStorage.setItem("uid", String(userid));
    localStorage.setItem("tid", String(userid));
    localStorage.setItem("type", "admin");
    navigate("/");
  }
  async function HandleLogin() {
    let users = [];
    let correct = false;
    let message = "login failed";
    await api.get("api/users").then((res) => {
      users = res.data;
    });
    users.forEach((user) => {
      if (
        String(user.username) === String(username) &&
        String(user.type) === String(type)
      ) {
        if (String(user.password) === String(password)) {
          switch (user.type) {
            case "admin":
              handleLocalStorageAdmin(user.id);
              break;
            case "enseignant":
              handleLocalStorageEnseignant(user.id);
              break;
            case "etudiant":
              handleLocalStorageEtudiant(user.id);
              break;

            default:
              break;
          }

          correct = true;

          message = "you're logged in";
        } else {
          message = "password incorrect";
        }
      }
    });
    console.log(message);
    return correct;
  }
  return (
    <div className="login-container">
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <select
              name="type"
              id="types"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="admin">---</option>
              <option value="enseignant">Enseignant</option>
              <option value="etudiant">Etudiant</option>
            </select>
            <button
              onClick={(e) => {
                e.preventDefault();
                HandleLogin();
              }}
            >
              S'authentifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
