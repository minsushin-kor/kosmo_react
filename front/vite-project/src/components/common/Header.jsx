import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn, userInfo }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "홈", emoji: "🏠" },
    { path: "/product", label: "식빵소개", emoji: "🍞" },
    { path: "/notice", label: "공지사항", emoji: "📢" },
    { path: "/qna", label: "질문답변", emoji: "💬" },
  ];

  return (
    <header className="glass-header" style={{ padding: "0 clamp(10px, 2vw, 24px)", position: "relative" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "80px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box"
      }}>
        {/* Brand Logo Link (Conditionally collapses text on tiny screens) */}
        <Link 
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontFamily: "var(--heading)",
            fontWeight: "800",
            color: "var(--text-h)",
            userSelect: "none",
            textDecoration: "none",
            flexShrink: 0
          }}
        >
          <span className="animate-float" style={{ fontSize: "1.8rem", display: "inline-block" }}>🍞</span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.1" }}>
            <span className="logo-text" style={{ fontSize: "1.25rem", fontWeight: "900", letterSpacing: "1px", color: "var(--text-h)" }}>마음식빵</span>
            <span className="logo-subtext" style={{ fontSize: "0.65rem", opacity: "0.7", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600", color: "var(--text)" }}>Maum Bread</span>
          </span>
        </Link>

        {/* 1. Navigation Links (Always stays horizontally at the top, collapses text on mobile) */}
        <nav className="desktop-nav" style={{ flexShrink: 0 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  background: "none",
                  border: "none",
                  color: isActive ? "var(--accent)" : "var(--text)",
                  fontFamily: "var(--sans)",
                  fontWeight: isActive ? "700" : "500",
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  padding: "8px 4px",
                  position: "relative",
                  transition: "color 0.2s ease",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span className="nav-emoji" style={{ fontSize: "1.15rem" }}>{item.emoji}</span>
                <span className="nav-text">{item.label}</span>
                {isActive && (
                  <span className="nav-text" style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "0",
                    width: "100%",
                    height: "3px",
                    backgroundColor: "var(--accent)",
                    borderRadius: "2px",
                    animation: "fadeIn 0.2s ease"
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 2. User Auth Actions (Always stays horizontally at the top, collapses to circular icons on mobile) */}
        <div className="desktop-auth" style={{ flexShrink: 0 }}>
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div 
                onClick={() => navigate("/mypage")}
                style={{ 
                  fontSize: "0.9rem", 
                  color: "var(--text)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                className="user-greeting-text"
              >
                <span style={{ 
                  display: "inline-block", 
                  width: "8px", 
                  height: "8px", 
                  backgroundColor: "#10B981", 
                  borderRadius: "50%" 
                }} />
                <strong>{userInfo?.name || "고객"}</strong>님
              </div>
              <button 
                onClick={() => navigate("/mypage")}
                className="btn btn-secondary"
                style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                title="마이페이지"
              >
                <span style={{ fontSize: "1rem" }}>📋</span>
                <span className="btn-text"> 마이페이지</span>
              </button>
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  navigate("/");
                  alert("정상적으로 로그아웃되었습니다.");
                }}
                className="btn btn-outline"
                style={{ padding: "8px 16px", fontSize: "0.85rem", border: "1px solid var(--border)", color: "var(--text)" }}
                title="로그아웃"
              >
                <span style={{ fontSize: "1rem" }}>🚪</span>
                <span className="btn-text"> 로그아웃</span>
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button 
                onClick={() => navigate("/login")}
                className="btn btn-secondary"
                style={{ padding: "10px 18px", borderRadius: "30px", fontSize: "0.9rem" }}
                title="로그인"
              >
                <span style={{ fontSize: "1rem" }}>🔑</span>
                <span className="btn-text"> 로그인</span>
              </button>
              <button 
                onClick={() => navigate("/join")}
                className="btn btn-primary"
                style={{ padding: "10px 18px", borderRadius: "30px", fontSize: "0.9rem" }}
                title="회원가입"
              >
                <span style={{ fontSize: "1rem" }}>🌾</span>
                <span className="btn-text"> 회원가입</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
