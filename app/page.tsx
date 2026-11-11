"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh" }} className="d-flex flex-column justify-content-center py-5 position-relative overflow-hidden">
      {/* Animated background elements */}
      <div
        style={{
          position: "fixed",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
          animation: "float 20s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-50%",
          right: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(245, 87, 108, 0.1) 0%, transparent 70%)",
          animation: "float 25s ease-in-out infinite reverse",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <main className="container" style={{ maxWidth: "1200px", position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <div className="text-center mb-5" style={{ animation: "fadeInDown 0.8s ease-out" }}>
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(245, 87, 108, 0.05) 100%)",
              padding: "0.75rem 1.5rem",
              borderRadius: "50px",
              border: "1px solid rgba(102, 126, 234, 0.2)",
              marginBottom: "1.5rem",
              backdropFilter: "blur(10px)",
            }}
            className="badge"
          >
            <span style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 600 }}>
              🚀 Dynamic Form Builder
            </span>
          </div>

          <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Generic Form Engine
          </h1>

          <p
            className="lead"
            style={{
              maxWidth: "600px",
              margin: "0 auto 2rem",
              fontSize: "1.2rem",
              fontWeight: 500,
              opacity: 0.7,
            }}
          >
            Build, test, and render custom JSON-driven forms seamlessly with support for inline layouts and interactive popups.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {/* JSON Playground Card */}
          <div className="col" style={{ animation: "fadeInUp 0.8s ease-out 0.1s both" }}>
            <div
              className="card"
              style={{
                height: "100%",
                cursor: "pointer",
                border: hoveredCard === "playground" ? "1px solid rgba(102, 126, 234, 0.3)" : "1px solid rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={() => setHoveredCard("playground")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body p-5 d-flex flex-column">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    fontSize: "1.8rem",
                    animation: hoveredCard === "playground" ? "pulse-glow 2s ease-in-out" : "none",
                  }}
                >
                  🛠️
                </div>
                <h5 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }} className="card-title">
                  JSON Playground
                </h5>
                <p className="card-text" style={{ flex: 1, fontSize: "0.95rem", opacity: 0.7, marginBottom: "1.5rem" }}>
                  Live interactive editor to write, load templates, validate JSON schemas, and test live form outputs.
                </p>
                <Link
                  href="/playground"
                  className="btn fw-semibold rounded-3 w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.95rem",
                  }}
                >
                  Open Playground <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Inline Form Demo Card */}
          <div className="col" style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}>
            <div
              className="card"
              style={{
                height: "100%",
                cursor: "pointer",
                border: hoveredCard === "inline" ? "1px solid rgba(79, 172, 254, 0.3)" : "1px solid rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={() => setHoveredCard("inline")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body p-5 d-flex flex-column">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    fontSize: "1.8rem",
                    animation: hoveredCard === "inline" ? "pulse-glow 2s ease-in-out" : "none",
                  }}
                >
                  📄
                </div>
                <h5 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }} className="card-title">
                  Inline Form Demo
                </h5>
                <p className="card-text" style={{ flex: 1, fontSize: "0.95rem", opacity: 0.7, marginBottom: "1.5rem" }}>
                  Explore how embedded inline forms render directly inside pages, content blocks, and dashboards.
                </p>
                <Link
                  href="/demo/inline"
                  className="btn fw-semibold rounded-3 w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.95rem",
                  }}
                >
                  View Inline Demo <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Popup Form Demo Card */}
          <div className="col" style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}>
            <div
              className="card"
              style={{
                height: "100%",
                cursor: "pointer",
                border: hoveredCard === "popup" ? "1px solid rgba(245, 87, 108, 0.3)" : "1px solid rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={() => setHoveredCard("popup")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body p-5 d-flex flex-column">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    fontSize: "1.8rem",
                    animation: hoveredCard === "popup" ? "pulse-glow 2s ease-in-out" : "none",
                  }}
                >
                  🪟
                </div>
                <h5 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }} className="card-title">
                  Popup Form Demo
                </h5>
                <p className="card-text" style={{ flex: 1, fontSize: "0.95rem", opacity: 0.7, marginBottom: "1.5rem" }}>
                  Test modal popups triggered by user interactions for dialogs, surveys, and quick data entry.
                </p>
                <Link
                  href="/demo/popup"
                  className="btn fw-semibold rounded-3 w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.95rem",
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
          className="row mt-5 pt-5"
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            animation: "fadeInUp 0.8s ease-out 0.4s both",
          }}
        >
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <h3 style={{ fontSize: "2rem", fontWeight: 700, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              100%
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>JSON Compatible</p>
          </div>
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <h3 style={{ fontSize: "2rem", fontWeight: 700, background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Fast
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Lightning Quick Rendering</p>
          </div>
          <div className="col-md-4 text-center">
            <h3 style={{ fontSize: "2rem", fontWeight: 700, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Easy
            </h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Simple & Intuitive</p>
          </div>
        </div>

        {/* Footer info */}
        <div
          className="text-center"
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            opacity: 0.6,
            fontSize: "0.85rem",
            animation: "fadeInUp 0.8s ease-out 0.5s both",
          }}
        >
          Powered by Next.js & React • Generic Form Component Architecture
        </div>
      </main>
    </div>
  );
}