import React, { useEffect } from "react";

function Modal({ isOpen, onClose, title, children, width = "500px" }) {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(44, 27, 17, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.25s ease-out",
        padding: "16px"
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          width: "100%",
          maxWidth: width,
          background: "var(--bg)",
          borderRadius: "24px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden"
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: "24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "700", color: "var(--text-h)" }}>
            {title}
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: "var(--text)",
              cursor: "pointer",
              lineHeight: "1",
              padding: "4px",
              opacity: 0.7,
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.7}
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div style={{
          padding: "24px",
          overflowY: "auto",
          flex: 1
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
