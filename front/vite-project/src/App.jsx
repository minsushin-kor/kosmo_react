import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Layout from "./components/common/Layout.jsx";
import { request } from "./utils/api.js";

// Page Components
import HeroSection from "./components/home/HeroSection.jsx";
import ProductList from "./components/product/ProductList.jsx";
import NoticeList from "./components/notice/list.jsx";
import NoticeDetail from "./components/notice/detail.jsx";
import NoticeWrite from "./components/notice/write.jsx";
import QnaBoard from "./components/qna/QnaBoard.jsx";

// Separated Member Components
import Login from "./components/member/Login.jsx";
import Signup from "./components/member/Signup.jsx";
import MyPage from "./components/member/MyPage.jsx";

function App() {
  // Shared Membership Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Persistent Token Auto-Login Effect
  useEffect(() => {
    const token = localStorage.getItem("maum_auth_token");
    if (token) {
      if (token.startsWith("MOCK-OFFLINE-TOKEN")) {
        // Restore offline mockup user session for design reviews
        setUserInfo({
          username: "test",
          name: "김식빵 (임시)",
          email: "test@example.com",
          phone: "010-9876-5432",
          stamps: 6,
          joinDate: "2026-02-14",
          orders: [
            { id: "ORD-20260527-99", date: "2026-05-27", items: "🍞 클래식 우유 식빵 2개", price: "11,000원", status: "🚚 배달 중" }
          ]
        });
        setIsLoggedIn(true);
      } else {
        // Query backend database using custom fetch wrapper (token is injected automatically)
        request("/member/me")
        .then((data) => {
          setUserInfo({
            username: data.username,
            name: data.name,
            email: data.email,
            phone: "010-9876-5432",
            stamps: 6,
            joinDate: "2026-02-14",
            orders: [
              { id: "ORD-20260527-99", date: "2026-05-27", items: "🍞 클래식 우유 식빵 2개, 🌰 지리산 알밤 식빵 1개", price: "17,800원", status: "🚚 배달 중" },
              { id: "ORD-20260512-41", date: "2026-05-12", items: "🧀 먹물 더블 치즈 식빵 1개, 🍫 달콤 시나몬 초코 마블 1개", price: "13,500원", status: "✓ 수령 완료" }
            ]
          });
          setIsLoggedIn(true);
          console.log("Successfully restored user session via secure token.");
        })
        .catch((err) => {
          console.warn("Failed auto-login check, clearing stale token.", err);
          localStorage.removeItem("maum_auth_token");
        });
      }
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 1. Global Navigation Sticky Header */}
      <Header 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userInfo={userInfo}
      />

      {/* 2. Cohesive animated Layout Wrapper containing Router Routes */}
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/write" element={<NoticeWrite />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/qna" element={<QnaBoard isLoggedIn={isLoggedIn} />} />
          
          {/* Separated Login/Join/MyPage Routes */}
          <Route path="/login" element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
          } />
          <Route path="/join" element={
            <Signup setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
          } />
          <Route path="/mypage" element={
            <MyPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userInfo={userInfo} />
          } />
          
          {/* Obsolete path fallback redirection */}
          <Route path="/member" element={<Navigate to="/mypage" replace />} />
          <Route path="*" element={<HeroSection />} />
        </Routes>
      </Layout>

      {/* 3. Global Footer containing business coordinates */}
      <Footer />
    </div>
  );
}

export default App;
