"use client";

import { useState } from "react";

type Algorithm = "caesar" | "substitution" | "rsa";
type Mode = "encrypt" | "decrypt";
// type key="e" | "d" | "n";

export default function CryptoDashboard() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("rsa");
  const [mode, setMode] = useState<Mode>("encrypt");
  const [inputData, setInputData] = useState("");
  // const [inputKey, setInputKey] = useState("");
  const [outputData, setOutputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Additional options state (e.g., Caesar shift key)
  const [shift, setShift] = useState<number>(3);

  const handleProcess = async () => {
    setLoading(true);
    setError("");
    setOutputData("");

    try {
      // For Caesar and Substitution, you can handle them client-side or send to an API.
      // For RSA, call your Next.js API route that triggers the C++ binary.
      if (algorithm === "rsa") {
        const response = await fetch("/api/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, message: inputData }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "RSA execution failed");
        
        setOutputData(
          mode === "encrypt" 
            ? `Ciphertext: ${data.ciphertext}\n\nPublic Key (e): ${data.e}\nModulus (n): ${data.n}` 
            : `Decrypted Text: ${data.decrypted}`
        );
      } else {
        // Placeholder for Caesar / Substitution logic
        if (algorithm === "caesar") {
          const response= await fetch("/api/ceaser/",{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({mode,key:shift,message:inputData}),
          });
          const data=await response.json();

          setOutputData(
            mode === "encrypt" 
              ?  `Ciphertext: ${data.res}`
              // ? `[Caesar Encrypted with shift ${shift}]: ${inputData.split('').map(c => String.fromCharCode(c.charCodeAt(0) + shift)).join('')}`
              // : `[Caesar Decrypted with shift ${shift}]: ${inputData.split('').map(c => String.fromCharCode(c.charCodeAt(0) - shift)).join('')}`
              :`Original Text: ${data.res}`
          );
        } else {
          setOutputData(`[Substitution Mock Output for]: ${inputData}`);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-400">
          Cryptographic Suite Visualizer
        </h1>

        {/* 1. Choose Algorithm */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Select Algorithm</label>
          <div className="grid grid-cols-3 gap-3">
            {(["caesar", "substitution", "rsa"] as Algorithm[]).map((algo) => (
              <button
                key={algo}
                onClick={() => setAlgorithm(algo)}
                className={`py-2 px-4 rounded-lg font-semibold uppercase text-sm transition-all ${
                  algorithm === algo
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {algo}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Choose Mode (Encrypt / Decrypt) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Select Operation</label>
          <div className="grid grid-cols-2 gap-3">
            {(["encrypt", "decrypt"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-2 px-4 rounded-lg font-semibold uppercase text-sm transition-all ${
                  mode === m
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional parameter for Caesar */}
        {algorithm === "caesar" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">Caesar Shift Key</label>
            <input
              type="number"
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
            />
          </div>
        )}

        {/* //conditional for rsa */}
        {/* {algorithm === "rsa" && (
          <div className="mb-4">
            <div>
              <button 
                
                onClick={()=> rsa_key_generate()}
                className="block text-sm font-medium mb-1 text-grey-300">Generate RSA keys</button>

            </div>
            <div>
              {(["e","d","n"] as key[]).map((m)=>(
                <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">{m}</label>

                <pre className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-emerald-400 font-mono text-sm whitespace-pre-wrap min-h-[100px] max-h-[200px] overflow-y-auto">
              
                
                </pre>
              
              </div>
              ))}
            </div>

          </div>
          
        )} */}
       

        {/* 3. Input Textbox */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-300">Input Text</label>
          <textarea
            rows={4}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder={mode === "encrypt" ? "Type your secret message..." : "Paste ciphertext or integer..."}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleProcess}
          disabled={loading || !inputData}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all mb-6"
        >
          {loading ? "Processing..." : `Run ${mode.toUpperCase()}`}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* 4. Output Display */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Output Result</label>
          <pre className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-emerald-400 font-mono text-sm whitespace-pre-wrap min-h-[100px] max-h-[200px] overflow-y-auto">
            {outputData || "Results will appear here..."}
          </pre>
        </div>
      </div>
    </main>
  );
}