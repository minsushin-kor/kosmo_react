import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { request } from "../../utils/api.js";

function Login({ setIsLoggedIn, setUserInfo }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    const loginPayload = {
      username: username,
      password: password
    };

    // Call the backend Token Login API using the fetch wrapper
    request("/member/login", {
      method: "POST",
      body: JSON.stringify(loginPayload)
    })
    .then((data) => {
      // 1. Store secure token in localStorage
      localStorage.setItem("maum_auth_token", data.token);

      // 2. Set authorized user profile
      setUserInfo({
        username: data.username,
        name: data.name,
        email: data.email,
        phone: "010-9876-5432",
        stamps: 6, // Mock stamps
        joinDate: "2026-02-14",
        orders: [
          { id: "ORD-20260527-99", date: "2026-05-27", items: "🍞 클래식 우유 식빵 2개, 🌰 지리산 알밤 식빵 1개", price: "17,800원", status: "🚚 배달 중" },
          { id: "ORD-20260512-41", date: "2026-05-12", items: "🧀 먹물 더블 치즈 식빵 1개, 🍫 달콤 시나몬 초코 마블 1개", price: "13,500원", status: "✓ 수령 완료" },
          { id: "ORD-20260430-10", date: "2026-04-30", items: "🌾 100% 유기농 통밀 식빵 3개", price: "19,500원", status: "✓ 수령 완료" }
        ]
      });
      setIsLoggedIn(true);
      alert(`🍞 반갑습니다! ${data.name}님 로그인이 완료되었습니다.`);
      navigate("/mypage");
    })
    .catch((err) => {
      // Check if it is a credentials failure or if the backend server is offline
      if (err.message.includes("비밀번호") || err.message.includes("아이디")) {
        alert(`⚠️ 로그인 실패: ${err.message}`);
      } else {
        console.warn("Backend login API is currently offline. Simulating local mock login for RWD review.", err);
        
        // Graceful offline fallback login for local review
        const mockName = username || "김식빵";
        localStorage.setItem("maum_auth_token", "MOCK-OFFLINE-TOKEN-12345");
        setUserInfo({
          username: username,
          name: mockName,
          email: `${username}@example.com`,
          phone: "010-9876-5432",
          stamps: 6,
          joinDate: "2026-02-14",
          orders: [
            { id: "ORD-20260527-99", date: "2026-05-27", items: "🍞 클래식 우유 식빵 2개, 🌰 지리산 알밤 식빵 1개", price: "17,800원", status: "🚚 배달 중" }
          ]
        });
        setIsLoggedIn(true);
        alert(`🍞 [오프라인 모드] 반갑습니다! ${mockName}님 임시 로그인되었습니다.`);
        navigate("/mypage");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }} className="animate-fade-in">
      <div className="card animate-fade-in-up" style={{ width: "100%", maxWidth: "450px", padding: "32px", textAlign: "left" }}>
        <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "1.4rem", fontWeight: "800" }}>🍞 따뜻하게 로그인하기</h3>
          <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8, marginBottom: "8px" }}>
            가입하신 아이디와 비밀번호를 입력해 적립금(식빵 스탬프)을 확인하세요!
          </p>
          
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>아이디 (ID)</label>
            <input
              type="text"
              placeholder="아이디를 입력해 주세요."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text-h)",
                fontSize: "0.9rem",
                fontFamily: "var(--sans)",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text-h)",
                fontSize: "0.9rem",
                fontFamily: "var(--sans)",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "14px", marginTop: "8px", borderRadius: "10px" }}>
            로그인 완료 🍯
          </button>

          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            fontSize: "0.82rem", 
            opacity: 0.85, 
            marginTop: "12px", 
            borderTop: "1px solid var(--border)", 
            paddingTop: "16px" 
          }}>
            <span style={{ cursor: "pointer" }}>ID/PW 분실 문의</span>
            <Link to="/join" style={{ fontWeight: "700", color: "var(--accent)" }}>
              계정이 없으신가요? 가입하기 🌾
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
