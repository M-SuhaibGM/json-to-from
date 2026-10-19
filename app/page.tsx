import Link from "next/link";

export default function Home() {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column justify-content-center py-5">
      <main className="container max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-3">
            Dynamic Form Builder
          </span>
          <h1 className="display-4 fw-bold text-dark tracking-tight mb-3">
            Generic Form Engine
          </h1>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Build, test, and render custom JSON-driven forms seamlessly with support for inline layouts and interactive popups.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {/* JSON Playground Card */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow transition">
              <div className="card-body p-4 d-flex flex-column">
                <div className="bg-primary text-white rounded-3 p-3 mb-3 d-inline-block align-self-start">
                  <span className="fs-3">🛠️</span>
                </div>
                <h5 className="card-title fw-bold text-dark">JSON Playground</h5>
                <p className="card-text text-muted small grow">
                  Live interactive editor to write, load templates, validate JSON schemas, and test live form outputs.
                </p>
                <Link
                  href="/playground"
                  className="btn btn-primary fw-medium rounded-3 w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                >
                  Open Playground <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Inline Form Demo Card */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow transition">
              <div className="card-body p-4 d-flex flex-column">
                <div className="bg-secondary-subtle text-secondary rounded-3 p-3 mb-3 d-inline-block align-self-start">
                  <span className="fs-3">📄</span>
                </div>
                <h5 className="card-title fw-bold text-dark">Inline Form Demo</h5>
                <p className="card-text text-muted small flex-grow-1">
                  Explore how embedded inline forms render directly inside pages, content blocks, and dashboards.
                </p>
                <Link
                  href="/demo/inline"
                  className="btn btn-outline-secondary fw-medium rounded-3 w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                >
                  View Inline Demo <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Popup Form Demo Card */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow transition">
              <div className="card-body p-4 d-flex flex-column">
                <div className="bg-info-subtle text-info-emphasis rounded-3 p-3 mb-3 d-inline-block align-self-start">
                  <span className="fs-3">🪟</span>
                </div>
                <h5 className="card-title fw-bold text-dark">Popup Form Demo</h5>
                <p className="card-text text-muted small flex-grow-1">
                  Test modal popups triggered by user interactions for dialogs, surveys, and quick data entry.
                </p>
                <Link
                  href="/demo/popup"
                  className="btn btn-outline-secondary fw-medium rounded-3 w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                >
                  View Popup Demo <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-muted small pt-3 border-top">
          Powered by Next.js & React • Generic Form Component Architecture
        </div>
      </main>
    </div>
  );
}