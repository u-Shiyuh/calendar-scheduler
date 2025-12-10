import React, { useState } from "react";
import CameraCapture from "./cameraCapture";
import { runOCR } from "./ocrEngine";
import { downloadCSV, reconstructTable } from "./tableParser";

export default function App() {
  const [table, setTable] = useState([]);

  const handleImage = async (file) => {
    const ocrResult = await runOCR(file);
    const parsedTable = reconstructTable(ocrResult);
    setTable(parsedTable);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Table Extractor PWA</h1>
      <CameraCapture onCapture={handleImage} />
      {table.length > 0 && (
        <>
          <button onClick={() => downloadCSV(table)}>Download CSV</button>
          <pre>{JSON.stringify(table, null, 2)}</pre>
        </>
      )}
    </div>
  );
}