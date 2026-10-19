"use client";

import { useState } from "react";
import { FormEngine } from "@/components/generic-form/FormEngine";
import type { FormSchema } from "@/components/generic-form/types";

const DEFAULT_JSON = JSON.stringify(
  {
    title: "User Registration",
    layout: "vertical",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        col: 6,
        placeholder: "John",
        validation: { required: true, message: "First name is required" }
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        col: 12,
        placeholder: "you@xyz.com",
        validation: {
          required: true,
          pattern: "^[\\w.+-]+@xyz\\..+$",
          message: "Must end with @xyz domain"
        }
      }
    ]
  },
  null,
  2
);

export function PlaygroundClient({ availableFiles }: { availableFiles: string[] }) {
  const [inputText, setInputText] = useState(DEFAULT_JSON);
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = e.target.value;
    setSelectedFile(url);
    
    if (!url) {
      setInputText(DEFAULT_JSON);
      return;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("File not found");
      const data = await res.json();
      setInputText(JSON.stringify(data, null, 2));
      setError(null);
    } catch (err: any) {
      setError("Failed to load file: " + err.message);
    }
  };

  const handleRender = () => {
    try {
      const parsed = JSON.parse(inputText);
      setSchema(parsed);
      setError(null);
      setSubmittedData(null);
      if (!parsed.path) setIsPopupOpen(true);
    } catch (err: any) {
      setError("Invalid JSON: " + err.message);
      setSchema(null);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputText);
      setInputText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError("Cannot format: Invalid JSON");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column p-0 bg-white">
      {/* Top Header */}
      <header className="bg-dark text-white px-4 py-3 d-flex justify-content-between align-items-center shadow-sm">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
            <span className="fw-bold text-white">⚡</span>
          </div>
          <div>
            <h5 className="mb-0 fw-semibold tracking-wide">JSON Form Playground</h5>
            <small className="text-white-50">Design, preview, and test dynamic form schemas</small>
          </div>
        </div>
        <button className="btn btn-primary px-4 fw-medium shadow-sm d-flex align-items-center gap-2" onClick={handleRender}>
          <span>▶</span> Render Form
        </button>
      </header>

      <div className="row g-0 flex-grow-1" style={{ overflow: "hidden" }}>
        
        {/* Left Column: JSON Editor */}
        <div className="col-md-5 bg-light border-end d-flex flex-column">
          
          {/* Toolbar / Template Selector */}
          <div className="p-3 bg-white border-bottom d-flex flex-wrap align-items-center justify-content-between gap-2 shadow-sm">
            <div className="d-flex align-items-center gap-2 flex-grow-1">
              <label className="small fw-semibold text-secondary mb-0 text-nowrap">
                Template:
              </label>
              <select 
                className="form-select form-select-sm shadow-none" 
                value={selectedFile} 
                onChange={handleFileChange}
              >
                <option value="">Choose a template...</option>
                {availableFiles.map((file) => (
                  <option key={file} value={`/forms/${file}`}>
                    {file.replace(".json", "")}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex align-items-center gap-1">
              <button 
                className="btn btn-outline-secondary btn-sm px-2 py-1" 
                onClick={handleFormat}
                title="Format JSON"
              >
                Format
              </button>
              <button 
                className="btn btn-outline-secondary btn-sm px-2 py-1" 
                onClick={handleCopy}
                title="Copy Code"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Editor Textarea */}
          <textarea
            className="form-control border-0 rounded-0 flex-grow-1 font-monospace text-dark bg-white"
            style={{ resize: "none", fontSize: "13.5px", padding: "16px", lineHeight: "1.5" }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            spellCheck={false}
          />

          {/* Editor Footer Status */}
          <div className="px-3 py-2 bg-light border-top small text-muted d-flex justify-content-between">
            <span>JSON Editor</span>
            <span>UTF-8</span>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="col-md-7 bg-white d-flex flex-column position-relative">
          <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
            <span className="small fw-bold text-uppercase text-secondary tracking-wider">
              Live Form Preview
            </span>
            {schema && (
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill small">
                Active Schema Loaded
              </span>
            )}
          </div>
          
          <div className="flex-grow-1 overflow-auto p-4 bg-white">
            {error && (
              <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center gap-3">
                <span className="fs-4">⚠️</span>
                <div>
                  <strong>Syntax Error:</strong>
                  <div className="small font-monospace mt-1">{error}</div>
                </div>
              </div>
            )}

            {!schema && !error && (
              <div className="text-center text-muted my-auto py-5">
                <div className="display-6 mb-3 text-secondary opacity-50">📝</div>
                <h6 className="fw-semibold text-dark">No Form Rendered Yet</h6>
                <p className="small text-muted max-w-xs mx-auto">
                  Modify or paste your schema JSON on the left, then click <strong>Render Form</strong> to preview it live.
                </p>
              </div>
            )}

            {schema && schema.path && (
              <div className="card border shadow-sm rounded-3">
                <div className="card-body p-4">
                  <FormEngine
                    key={JSON.stringify(schema)}
                    schema={schema}
                    onSubmit={(data) => {
                      setSubmittedData(data);
                    }}
                  />
                </div>
              </div>
            )}

            {schema && !schema.path && !isPopupOpen && (
              <div className="text-center my-5 py-5 border rounded-3 bg-light">
                <h6 className="fw-semibold">Popup Form Schema Detected</h6>
                <p className="text-muted small mb-3">This schema is configured to open inside a modal popup.</p>
                <button className="btn btn-success px-4 shadow-sm" onClick={() => setIsPopupOpen(true)}>
                  Launch Popup Form
                </button>
              </div>
            )}
            
            {schema && !schema.path && isPopupOpen && (
              <FormEngine
                key={JSON.stringify(schema)}
                schema={schema}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={(data) => {
                  setSubmittedData(data);
                  setIsPopupOpen(false);
                }}
              />
            )}

            {submittedData && (
              <div className="mt-5 p-4 border rounded-3 bg-light shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="text-success fw-bold mb-0 d-flex align-items-center gap-2">
                    <span>✅</span> Form Submitted Successfully
                  </h6>
                  <button 
                    className="btn btn-sm btn-outline-secondary py-0" 
                    onClick={() => setSubmittedData(null)}
                  >
                    Clear Output
                  </button>
                </div>
                <pre className="bg-dark text-light p-3 rounded font-monospace mb-0" style={{ fontSize: "12.5px", maxHeight: "200px", overflowY: "auto" }}>
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}