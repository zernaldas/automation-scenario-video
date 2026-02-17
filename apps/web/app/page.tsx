"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5678/webhook/generate-scenario", {
        method: "POST",
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Automation Scenario Generator</h1>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Scenario"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Result</h2>
          <table border={1} cellPadding={10}>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{result.title}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{result.status}</td>
              </tr>
              <tr>
                <td>Message</td>
                <td>{result.message}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}