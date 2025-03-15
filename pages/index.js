import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Link from "next/link";

export default function Home() {
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    const currentTime = new Date();
    setEntries([...entries, currentTime]);
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    let storedData = JSON.parse(localStorage.getItem("monthlyEntries")) || [];
    if (!storedData.find(e => e.date === today)) {
      storedData.push({ date: today, count: entries.length });
      localStorage.setItem("monthlyEntries", JSON.stringify(storedData));
    }
  }, [entries]);

  const chartData = {
    labels: entries.map(entry => entry.toLocaleTimeString()),
    datasets: [
      {
        label: "Toilettengänge",
        data: entries.map((_, index) => index + 1),
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Willkommen beim Toiletten-Tracker</h1>
      <p>Trage bitte ein, um wie viel Uhr du aufs Klo gegangen bist.</p>
      <button onClick={addEntry} style={{ padding: "10px", fontSize: "16px" }}>Eintrag hinzufügen</button>
      <h2>Protokoll:</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>{entry.toLocaleTimeString()}</li>
        ))}
      </ul>
      <h2>Gesamtanzahl: {entries.length}</h2>
      <h2>Verlauf:</h2>
      <div style={{ width: "80%", margin: "auto" }}>
        <Line data={chartData} />
      </div>
      <Link href="/monatsuebersicht">
        <a style={{ display: "block", marginTop: "20px", fontSize: "16px" }}>Monatsübersicht anzeigen</a>
      </Link>
    </div>
  );
}
