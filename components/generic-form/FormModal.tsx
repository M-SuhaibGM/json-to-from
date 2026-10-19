"use client";

import { useEffect } from "react";

export function FormModal({
  open, 
  onClose, 
  title, 
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  // Handle ESC key press and body overflow lock
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(2px)" }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="modal-header bg-light px-4 py-3 border-bottom">
            <h5 className="modal-title fw-semibold text-dark">{title ?? "Form"}</h5>
            <button 
              type="button" 
              className="btn-close shadow-none" 
              onClick={onClose} 
              aria-label="Close"
            />
          </div>
          <div className="modal-body p-4 bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}