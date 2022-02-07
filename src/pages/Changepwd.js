import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./ajoutclasse.css";
function Changepwd({ SetSectionName }) {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useState({});
  const [pwd, setPwd] = useState({ actuel: "", nouv: "", conf: "" });
  useEffect(() => {
    async function fetchData() {
      await api
        .get(
          "api/" +
            localStorage.getItem("type") +
            "s/" +
            localStorage.getItem("tid")
        )
        .then((res) => setUserInfo(res.data));
    }
    if (localStorage.getItem("type") == "admin")
      setUserInfo({ nom: "ADMIN", prenom: "" });
    else fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await api
        .get("api/users/" + localStorage.getItem("uid"))
        .then((res) => setUser(res.data));
    }
    fetchData();
  }, []);

  function changePwd() {
    async function change() {
      await api.put("api/users/" + user.id, user).then((res) => {
        console.log(res.data);
        SetSectionName("Accueil");
      });
    }
    if (pwd.actuel === user.password) {
      if (pwd.nouv === pwd.conf) {
        user.password = String(pwd.nouv);
        change();
        console.log(user);
      } else {
        alert("Mot de passe de confirmation n'est pas valide");
      }
    } else {
      alert("Mot de passe actuel est incorrect");
    }
  }

  return (
    <div>
      <div className="formclasse">
        <h1>Changer le mot de passe</h1>
        <div className="ajoutclasse-form">
          <input
            type="text"
            placeholder={`${userInfo.nom} ${userInfo.prenom}`}
            disabled
          />

          <input
            type="text"
            placeholder="Mot de passe actuel"
            onChange={(e) => {
              setPwd({ ...pwd, actuel: e.target.value });
            }}
            value={pwd.actuel}
          />
          <input
            type="text"
            placeholder="Nouveau mot de passe"
            onChange={(e) => {
              setPwd({ ...pwd, nouv: e.target.value });
            }}
            value={pwd.nouv}
          />
          <input
            type="text"
            placeholder="Confirmer le mot de passe"
            onChange={(e) => {
              setPwd({ ...pwd, conf: e.target.value });
            }}
            value={pwd.conf}
          />

          <button
            className="ajouterbtn"
            onClick={() => {
              changePwd();
            }}
          >
            Soumettre
          </button>
          <button
            className="retourbtn"
            onClick={() => {
              SetSectionName("dashboard");
            }}
          >
            retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default Changepwd;
