import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

function MyPage({ isLoggedIn, setIsLoggedIn, userInfo }) {
  const navigate = useNavigate();

  // Route security guard: Redirect to /login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Generate Stamp Indicators (10 cells grid, fluid size for RWD)
  const renderStampCard = () => {
    const stampCount = userInfo?.stamps || 0;
    const totalStamps = 10;
    const stamps = [];
    
    for (let i = 1; i <= totalStamps; i++) {
      const isStamped = i <= stampCount;
      stamps.push(
        <div 
          key={i} 
          style={{
            width: "clamp(36px, 10.5vw, 56px)",
            height: "clamp(36px, 10.5vw, 56px)",
            borderRadius: "50%",
            backgroundColor: isStamped ? "var(--accent-light)" : "var(--code-bg)",
            border: isStamped ? "2px solid var(--accent)" : "1px dashed var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isStamped ? "clamp(1.1rem, 4.5vw, 1.8rem)" : "clamp(0.7rem, 3vw, 0.9rem)",
            color: isStamped ? "var(--accent)" : "var(--text)",
            opacity: isStamped ? 1 : 0.4,
            boxShadow: isStamped ? "var(--shadow-sm)" : "none",
            position: "relative",
            transition: "all 0.3s ease"
          }}
        >
          {isStamped ? "🍞" : i}
          {isStamped && (
            <span style={{
              position: "absolute",
              bottom: "-4px",
              right: "-4px",
              background: "var(--accent)",
              color: "#fff",
              fontSize: "0.55rem",
              padding: "1px 4px",
              borderRadius: "10px",
              fontWeight: "800"
            }}>
              OK
            </span>
          )}
        </div>
      );
    }
    return stamps;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "left" }} className="animate-fade-in">
      {/* Welcome greeting card */}
      <div className="card" style={{
        padding: "32px",
        background: "linear-gradient(135deg, var(--accent-light) 0%, rgba(245,236,224,0.3) 100%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px"
      }}>
        <div>
          <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--accent)", textTransform: "uppercase" }}>🍞 VIP Membership</span>
          <h2 style={{ fontSize: "1.8rem", margin: "8px 0 12px 0", fontWeight: "800" }}>
            {userInfo?.name}님의 따뜻한 마이페이지
          </h2>
          <p style={{ margin: 0, fontSize: "0.95rem", opacity: "0.9" }}>
            가입일: {userInfo?.joinDate} | 연락처: {userInfo?.phone || "미등록"} | 이메일: {userInfo?.email}
          </p>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem("maum_auth_token");
            setIsLoggedIn(false);
            alert("정상적으로 로그아웃되었습니다.");
            navigate("/");
          }} 
          className="btn btn-outline"
          style={{ border: "1px solid var(--border)", color: "var(--text-h)" }}
        >
          로그아웃
        </button>
      </div>

      {/* Loyalty Stamp Panel & Coupons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
        {/* Stamp board */}
        <div className="card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.3rem", margin: 0 }}>📋 식빵 적립 쿠폰판</h3>
            <strong style={{ color: "var(--accent)" }}>{userInfo?.stamps} / 10 적립됨</strong>
          </div>
          <p style={{ fontSize: "0.85rem", opacity: "0.8", marginBottom: "24px" }}>
            식빵 1개당 1 스탬프가 적립됩니다! 10개를 다 채우시면 <strong>'우유 식빵 1개 무료 교환권'</strong>을 발급해 드립니다.
          </p>
          
          {/* Stamps Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
            justifyItems: "center",
            padding: "16px",
            background: "var(--bg)",
            borderRadius: "16px",
            border: "1px solid var(--border)"
          }}>
            {renderStampCard()}
          </div>
        </div>

        {/* Quick Stats / Coupons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" style={{ padding: "24px", flex: 1, display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ fontSize: "3rem" }}>🎫</div>
            <div>
              <h4 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>보유한 특별 쿠폰</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.9 }}>
                • <strong>신규 회원 가입 감사 1,000원 쿠폰</strong> (만료: 30일 이내)<br />
                • <strong>비오는 날 한정 밤 식빵 15% 할인권</strong> (상시 대기)
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: "24px", flex: 1, display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ fontSize: "3rem" }}>📦</div>
            <div>
              <h4 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>보관 예약 픽업 락커</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.9 }}>
                • 현재 보관 중인 예약 식빵이 없습니다. 모바일 예약을 완료하시면 픽업 락커 번호가 이곳에 노출됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="card" style={{ padding: "32px" }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>🚚 최근 식빵 주문 내역</h3>
        {userInfo?.orders && userInfo.orders.length === 0 ? (
          <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>최근 30일 동안 주문하신 내역이 없습니다. 마음식빵의 빵들을 골라보세요!</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)", backgroundColor: "var(--code-bg)" }}>
                  <th style={{ padding: "12px 16px", color: "var(--text-h)", fontWeight: "700" }}>주문번호</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-h)", fontWeight: "700" }}>주문일자</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-h)", fontWeight: "700" }}>상품 정보</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-h)", fontWeight: "700", textAlign: "right" }}>결제 금액</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-h)", fontWeight: "700", textAlign: "center" }}>주문 상태</th>
                </tr>
              </thead>
              <tbody>
                {userInfo?.orders?.map((ord, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "16px", fontWeight: "600", color: "var(--text-h)" }}>{ord.id}</td>
                    <td style={{ padding: "16px", color: "var(--text)", opacity: 0.8 }}>{ord.date}</td>
                    <td style={{ padding: "16px", fontWeight: "500" }}>{ord.items}</td>
                    <td style={{ padding: "16px", textAlign: "right", fontWeight: "700", color: "var(--accent)" }}>{ord.price}</td>
                    <td style={{ padding: "16px", textAlign: "center" }}>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        backgroundColor: ord.status.includes("중") ? "rgba(217, 119, 6, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        color: ord.status.includes("중") ? "var(--accent)" : "#10B981"
                      }}>
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
