import React, { useState, useEffect } from "react";
import "./dashboard.css";
import api from "../utils/api";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [dataC, setDataC] = useState([{ name: "", value: 0 }]);
  const [dataM, setDataM] = useState([{ name: "", value: 0 }]);
  const [dataTotal, setDataTotal] = useState([{ name: "", value: 0 }]);
  const [matieres, setMatieres] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [classes, setClasses] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  useEffect(async () => {
    await api.get("api/enseignants").then((res) => {
      setEnseignants(res.data);
    });
  }, []);
  useEffect(async () => {
    await api.get("api/specialites").then((res) => {
      setSpecialites(res.data);
    });
  }, []);
  useEffect(async () => {
    await api.get("api/etudiants").then((res) => {
      setEtudiants(res.data);
    });
  }, []);
  useEffect(async () => {
    await api.get("api/matieres").then((res) => {
      setMatieres(res.data);
    });
  }, [absences]);
  useEffect(async () => {
    await api.get("api/absences").then((res) => {
      setAbsences(res.data);
    });
  }, []);
  useEffect(async () => {
    await api.get("api/classes").then((res) => {
      setClasses(res.data);
    });
  }, [absences]);
  useEffect(() => {
    let array = [];
    let count = 0;
    let total = 0;
    absences.forEach((a) => {
      a.abs == false && count++;
      total++;
    });
    if (total !== 0) {
      setDataTotal([
        {
          name: "Present(e)",
          value: Math.trunc(((total - count) / total) * 100),
        },
        {
          name: "Absent(e)",
          value: Math.trunc((count / total) * 100),
        },
      ]);
    } else {
      setDataTotal([
        {
          name: "Present(e)",
          value: 0,
        },
        {
          name: "Absent(e)",
          value: 0,
        },
      ]);
    }
  }, [absences]);
  useEffect(() => {
    let array = [];
    matieres.forEach((m) => {
      let count = 0;
      let total = 0;
      absences.forEach((abs) => {
        if (abs.matiereId == m.id) {
          total++;
          abs.abs == false && count++;
        }
      });
      if (total !== 0) {
        array.push({
          name: m.lib,
          value: Math.trunc((count / total) * 100),
        });
      } else {
        array.push({
          name: m.lib,
          value: 0,
        });
      }
    });
    setDataM(array);
  }, [matieres]);

  useEffect(() => {
    let array = [];
    classes.forEach((c) => {
      let count = 0;
      let total = 0;
      absences.forEach((abs) => {
        if (abs.classeId == c.id) {
          total++;
          abs.abs == false && count++;
        }
      });
      if (total !== 0) {
        array.push({
          name: `${c.niveau} ${c.lib}`,
          value: Math.trunc((count / total) * 100),
        });
      } else {
        array.push({
          name: `${c.niveau} ${c.lib}`,
          value: 0,
        });
      }
    });
    setDataC(array);
  }, [classes]);
  return (
    <div>
      <div className="dashboard-container">
        <div className="dash-card">
          <span className="card-num">{enseignants.length}</span>
          <span className="card-title">Enseignants</span>
        </div>
        <div className="dash-card">
          <span className="card-num">{etudiants.length}</span>
          <span className="card-title">Etudiants</span>
        </div>
        <div className="dash-card">
          <span className="card-num">{specialites.length}</span>
          <span className="card-title">Spécialités</span>
        </div>
        <div>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataC}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#d22321c1"
              label
            />{" "}
            <Tooltip />
          </PieChart>
          <span className="chart">% d'absences par classe</span>
        </div>
        <div>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataM}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#d22321c1"
              label
            />{" "}
            <Tooltip />
          </PieChart>
          <span className="chart">% d'absences par matiere</span>
        </div>
        <div>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataTotal}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#d22321c1"
              label
            />{" "}
            <Tooltip />
          </PieChart>
          <span className="chart">% d'absences et de présence</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
