import Link from "next/link";
import { useState, useEffect } from "react";

export default function Monatsuebersicht() {
  const [monthlyEntries, setMonthlyEntries] = useState([]);
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("monthlyEntries")) || [];
    setMonthlyEntries(storedData);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Monatsübersicht</h1>
      <table border="1" style={{ margin: "auto", width: "50%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Anzahl Toilettengänge</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 30 }, (_, i) => {
            const today = new Date();
            const day = new Date(today.getFullYear(), today.getMonth(), i + 1);
            const formattedDate = day.toLocaleDateString();
            const entry = monthlyEntries.find(e => e.date === formattedDate);
            return (
              <tr key={i} style={{ backgroundColor: day < today ? "white" : "#ddd" }}>
                <td>{formattedDate}</td>
                <td>{entry ? entry.count : (day < today ? "0" : "-")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <Link href="/">
        <a style={{ textDecoration: "none", fontSize: "16px" }}>Zurück zur Startseite</a>
      </Link>
    </div>
  );
}
