import { useState } from "react";

export default function Home() {
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    const currentTime = new Date().toLocaleTimeString();
    setEntries([...entries, currentTime]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Willkommen beim Toiletten-Tracker</h1>
      <p>Trage bitte ein, um wie viel Uhr du aufs Klo gegangen bist.</p>
      <button onClick={addEntry} style={{ padding: "10px", fontSize: "16px" }}>Eintrag hinzufügen</button>
      <h2>Protokoll:</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}