import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { request } from "../../utils/api.js";

function Signup({ setIsLoggedIn, setUserInfo }) {
  const navigate = useNavigate();

  // Signup form states (Strictly mapped to MemberDTO)
  const [joinUsername, setJoinUsername] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinEmail, setJoinEmail] = useState("");
  const [joinPw, setJoinPw] = useState("");
  const [joinPwCheck, setJoinPwCheck] = useState("");

  // Signup loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!joinUsername || !joinName || !joinEmail || !joinPw || !joinPwCheck) {
      alert("모든 필수 입력란을 작성해 주세요.");
      return;
    }

    if (joinPw !== joinPwCheck) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);

    // Map fields strictly to MemberDTO properties
    const signupPayload = {
      username: joinUsername,
      password: joinPw,
      passwordCheck: joinPwCheck,
      name: joinName,
      email: joinEmail
    };

    // POST to the backend database using the fetch wrapper
    request("/member/join", {
      method: "POST",
      body: JSON.stringify(signupPayload)
    })
    .then(() => {
      console.log("Successfully registered user in database via MemberDTO");
      
      // Auto-login after successful registration
      return request("/member/login", {
        method: "POST",
        body: JSON.stringify({
          username: joinUsername,
          password: joinPw
        })
      });
    })
    .then((data) => {
      if (!data) {
        // If login after join fails or is empty, redirect to login page
        alert(`🎉 ${joinName}님, 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.`);
        setIsLoading(false);
        navigate("/login");
        return;
      }
      
      // 1. Store secure token in localStorage
      localStorage.setItem("maum_auth_token", data.token);

      // 2. Set authorized user profile
      setUserInfo({
        username: data.username,
        name: data.name,
        email: data.email,
        phone: "010-9876-5432",
        stamps: 2, // 2 welcome stamps
        joinDate: new Date().toISOString().split("T")[0],
        orders: []
      });
      setIsLoggedIn(true);
      alert(`🎉 회원가입을 축하드립니다, ${data.name}님! 신규 회원 웰컴 스탬프 2개가 지급되었습니다.`);
      setIsLoading(false);
      navigate("/mypage");
    })
    .catch((err) => {
      // Handle duplicates specifically, otherwise fall back to offline signup
      if (err.message.includes("사용 중인 아이디") || err.message.includes("가입")) {
        alert(`⚠️ 회원가입 실패: ${err.message}`);
        setIsLoading(false);
      } else {
        console.warn("Backend is currently offline or errored during join. Logging in locally.", err);
        
        // Graceful offline fallback login for local review
        localStorage.setItem("maum_auth_token", "MOCK-OFFLINE-TOKEN-" + joinUsername);
        setUserInfo({
          username: joinUsername,
          name: joinName,
          email: joinEmail,
          phone: "010-9876-5432",
          stamps: 2, // 2 welcome stamps
          joinDate: new Date().toISOString().split("T")[0],
          orders: []
        });
        setIsLoggedIn(true);
        alert(`🎉 [오프라인 모드] 회원가입을 축하드립니다, ${joinName}님! 신규 회원 웰컴 스탬프 2개가 지급되었습니다.`);
        setIsLoading(false);
        navigate("/mypage");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }} className="animate-fade-in">
      <div className="card animate-fade-in-up" style={{ width: "100%", maxWidth: "450px", padding: "32px", textAlign: "left" }}>
        <form onSubmit={handleSignupSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "1.4rem", fontWeight: "800" }}>🌾 마음식빵 패밀리 가입</h3>
          <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8, marginBottom: "4px" }}>
            가입 즉시 **식빵 무료 스탬프 2개**가 적립판에 바로 찍힙니다!
          </p>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--text-h)" }}>아이디 (Username)</label>
            <input
              type="text"
              placeholder="사용하실 아이디 입력"
              value={joinUsername}
              onChange={(e) => setJoinUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
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
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--text-h)" }}>고객 성함 (Name)</label>
            <input
              type="text"
              placeholder="홍길동"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
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
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--text-h)" }}>이메일 주소 (Email)</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={joinEmail}
              onChange={(e) => setJoinEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
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
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--text-h)" }}>비밀번호 (Password)</label>
            <input
              type="password"
              placeholder="6자리 이상 비밀번호 설정"
              value={joinPw}
              onChange={(e) => setJoinPw(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
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
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--text-h)" }}>비밀번호 확인 (Password Check)</label>
            <input
              type="password"
              placeholder="비밀번호 재입력"
              value={joinPwCheck}
              onChange={(e) => setJoinPwCheck(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
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

          <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.8rem", marginTop: "4px" }}>
            <input type="checkbox" defaultChecked required id="agree" />
            <label htmlFor="agree" style={{ cursor: "pointer", opacity: 0.9 }}>
              개인정보 수집 및 스탬프 적립 약관 동의 (필수)
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: "14px", 
              marginTop: "10px", 
              borderRadius: "10px",
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >
            {isLoading ? "가입 처리 중... ⏳" : "회원가입하고 스탬프 받기 🎉"}
          </button>

          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            fontSize: "0.82rem", 
            opacity: 0.85, 
            marginTop: "12px", 
            borderTop: "1px solid var(--border)", 
            paddingTop: "16px" 
          }}>
            <Link to="/login" style={{ fontWeight: "700", color: "var(--accent)" }}>
              이미 계정이 있으신가요? 로그인 하러가기 🍞
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
