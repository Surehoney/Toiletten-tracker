import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function ToiletTracker() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => console.log("Service Worker Registration Failed", err));
    }
  }, []);

  const addEntry = () => {
    const newEntry = { time: new Date().toLocaleTimeString() };
    setEntries([newEntry, ...entries]);
    localStorage.setItem("toiletEntries", JSON.stringify([newEntry, ...entries]));
  };

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("toiletEntries")) || [];
    setEntries(storedEntries);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="mb-4">
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-bold mb-2">Toiletten-Tracker</h2>
          <Button onClick={addEntry} className="w-full">Eintrag hinzufügen</Button>
        </CardContent>
      </Card>
      {entries.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Bisherige Einträge</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zeit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
