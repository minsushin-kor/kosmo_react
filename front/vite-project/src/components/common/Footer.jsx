import React from "react";

function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--accent-light)",
      borderTop: "1px solid var(--border)",
      color: "var(--text)",
      padding: "56px 24px 32px 24px",
      marginTop: "auto",
      boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "40px",
        textAlign: "left"
      }}>
        {/* Brand Column */}
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
            fontFamily: "var(--heading)",
            fontSize: "1.4rem",
            fontWeight: "800",
            color: "var(--text-h)"
          }}>
            <span>🍞</span>
            <span>마음식빵</span>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6", opacity: "0.85" }}>
            매일 아침 유기농 밀가루와 천연 효모를 사용하여 속이 편안하고 쫄깃한 프리미엄 수제 식빵을 굽습니다. 당신의 하루 시작이 '마음식빵'과 함께 따뜻하기를 바랍니다.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <span style={{ fontSize: "1.2rem", cursor: "pointer", filter: "grayscale(1) opacity(0.7)" }}>📸</span>
            <span style={{ fontSize: "1.2rem", cursor: "pointer", filter: "grayscale(1) opacity(0.7)" }}>💬</span>
            <span style={{ fontSize: "1.2rem", cursor: "pointer", filter: "grayscale(1) opacity(0.7)" }}>🗺️</span>
          </div>
        </div>

        {/* Operating Hours Column */}
        <div>
          <h4 style={{ 
            fontSize: "1.1rem", 
            marginBottom: "20px", 
            borderBottom: "2px solid var(--border)", 
            paddingBottom: "8px",
            color: "var(--text-h)"
          }}>
            영업 및 구움 시간
          </h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0", fontSize: "0.9rem", lineHeight: "1.8" }}>
            <li>📅 <strong>매일 영업</strong> (연중무휴)</li>
            <li>⏰ <strong>운영 시간:</strong> 08:00 - 20:00 (빵 소진 시 조기 마감)</li>
            <li>🔥 <strong>첫 빵 출고:</strong> 오전 08:30 (우유 식빵)</li>
            <li>🌾 <strong>당일 판매 원칙:</strong> 남은 식빵은 전량 기부됩니다.</li>
          </ul>
        </div>

        {/* Contacts Column */}
        <div>
          <h4 style={{ 
            fontSize: "1.1rem", 
            marginBottom: "20px", 
            borderBottom: "2px solid var(--border)", 
            paddingBottom: "8px",
            color: "var(--text-h)"
          }}>
            매장 및 고객 지원
          </h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0", fontSize: "0.9rem", lineHeight: "1.8" }}>
            <li>📍 서울특별시 마포구 연남동 123-45 (밀밭길 1층)</li>
            <li>📞 02-123-4567</li>
            <li>✉️ support@maumbread.com</li>
            <li>🏢 <strong>대량 주문 문의:</strong> 최소 3일 전 예약</li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "40px auto 0 auto",
        paddingTop: "24px",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
        fontSize: "0.85rem",
        opacity: "0.7",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>&copy; 2026 마음식빵 (Maum Bread). All Rights Reserved.</div>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#privacy" style={{ color: "var(--text)", opacity: "0.8" }}>개인정보처리방침</a>
          <a href="#terms" style={{ color: "var(--text)", opacity: "0.8" }}>이용약관</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
