"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center py-5 position-relative overflow-hidden bg-light">
      {/* Global Embedded Styles for Animations & Effects */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(102, 126, 234, 0); }
        }

        .feature-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
        }

        .btn-gradient {
          transition: all 0.2s ease;
        }
        .btn-gradient:hover {
          transform: translateY(-1px);
          opacity: 0.95;
          box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.2);
        }

        .gradient-text-purple {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-text-blue {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-text-pink {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Animated Background Mesh */}
      <div
        style={{
          position: "fixed",
          top: "-30%",
          left: "-20%",
          width: "150%",
          height: "150%",
          background: "radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 60%)",
          animation: "float 18s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-30%",
          right: "-20%",
          width: "150%",
          height: "150%",
          background: "radial-gradient(circle, rgba(245, 87, 108, 0.12) 0%, transparent 60%)",
          animation: "float 22s ease-in-out infinite reverse",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <main className="container position-relative" style={{ maxWidth: "1140px", zIndex: 1 }}>
        {/* Hero / Header Section */}
        <div className="text-center mb-5" style={{ animation: "fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div
            className="badge rounded-pill mb-3 px-3 py-2"
            style={{
              background: "rgba(102, 126, 234, 0.08)",
              border: "1px solid rgba(102, 126, 234, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="gradient-text-purple fw-bold">🚀 Dynamic Form Builder</span>
          </div>

          <h1 className="fw-extrabold display-4 mb-3 tracking-tight text-dark" style={{ letterSpacing: "-0.03em", fontWeight: 800 }}>
            Generic Form Engine
          </h1>

          <p
            className="lead text-muted mx-auto mb-4"
            style={{
              maxWidth: "640px",
              fontSize: "1.15rem",
              lineHeight: "1.6",
            }}
          >
            Build, test, and render custom JSON-driven forms seamlessly with built-in support for inline layouts and interactive modals.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {/* JSON Playground Card */}
          <div className="col" style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" }}>
            <div
              className="card h-100 rounded-4 feature-card shadow-sm"
              style={{
                borderColor: hoveredCard === "playground" ? "rgba(102, 126, 234, 0.4)" : undefined,
              }}
              onMouseEnter={() => setHoveredCard("playground")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body p-4 p-xl-5 d-flex flex-column">
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center mb-4 text-white"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontSize: "1.6rem",
                    boxShadow: hoveredCard === "playground" ? "0 8px 20px rgba(102, 126, 234, 0.35)" : "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  🛠️
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-5">JSON Playground</h5>
                <p className="card-text text-muted mb-4 flex-grow-1" style={{ fontSize: "0.925rem", lineHeight: "1.5" }}>
                  Interactive schema editor to compose JSON structures, validate schemas live, and preview real-time form outputs.
                </p>
                <Link
                  href="/playground"
                  className="btn btn-gradient text-white fw-semibold rounded-3 py-2 px-3 w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  Open Playground <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Inline Form Demo Card */}
          <div className="col" style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}>
            <div
              className="card h-100 rounded-4 feature-card shadow-sm"
              style={{
                borderColor: hoveredCard === "inline" ? "rgba(79, 172, 254, 0.4)" : undefined,
              }}
              onMouseEnter={() => setHoveredCard("inline")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body p-4 p-xl-5 d-flex flex-column">
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center mb-4 text-white"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    fontSize: "1.6rem",
                    boxShadow: hoveredCard === "inline" ? "0 8px 20px rgba(79, 172, 254, 0.35)" : "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  📄
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-5">Inline Form Demo</h5>
                <p className="card-text text-muted mb-4 flex-grow-1" style={{ fontSize: "0.925rem", lineHeight: "1.5" }}>
                  Explore embedded forms designed to seamlessly blend directly inside application layouts, content pages, and dashboards.
                </p>
                <Link
                  href="/demo/inline"
                  className="btn btn-gradient text-white fw-semibold rounded-3 py-2 px-3 w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    border: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  View Inline Demo <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Popup Form Demo Card */}
          <div className="col" style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
            <div
              className="card h-100 rounded-4 feature-card shadow-sm"
              style={{
                borderColor: hoveredCard === "popup" ? "rgba(245, 87, 108, 0.4)" : undefined,
              }}
              onMouseEnter={() => setHoveredCard("popup")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body p-4 p-xl-5 d-flex flex-column">
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center mb-4 text-white"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    fontSize: "1.6rem",
                    boxShadow: hoveredCard === "popup" ? "0 8px 20px rgba(245, 87, 108, 0.35)" : "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  🪟
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-5">Popup Form Demo</h5>
                <p className="card-text text-muted mb-4 flex-grow-1" style={{ fontSize: "0.925rem", lineHeight: "1.5" }}>
                  Test overlay modals triggered by user actions, ideal for surveys, quick configurations, and step-by-step dialogs.
                </p>
                <Link
                  href="/demo/popup"
                  className="btn btn-gradient text-white fw-semibold rounded-3 py-2 px-3 w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    border: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  View Popup Demo <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="row py-4 border-top border-bottom my-5"
          style={{
            borderColor: "rgba(0, 0, 0, 0.08) !important",
            animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
          }}
        >
          <div className="col-md-4 text-center my-2">
            <h3 className="fw-extrabold display-6 mb-1 gradient-text-purple">100%</h3>
            <p className="small text-muted mb-0 fw-medium">JSON Schema Compatible</p>
          </div>
          <div className="col-md-4 text-center my-2">
            <h3 className="fw-extrabold display-6 mb-1 gradient-text-blue">Fast</h3>
            <p className="small text-muted mb-0 fw-medium">Lightning-Fast Rendering</p>
          </div>
          <div className="col-md-4 text-center my-2">
            <h3 className="fw-extrabold display-6 mb-1 gradient-text-pink">Easy</h3>
            <p className="small text-muted mb-0 fw-medium">Simple & Intuitive API</p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center text-muted small mt-4"
          style={{
            animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
          }}
        >
          Powered by Next.js & React • Generic Form Component Architecture
        </div>
      </main>
    </div>
  );
}