import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Home() {
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    const currentTime = new Date();
    setEntries([...entries, currentTime]);
  };

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
    </div>
  );
}