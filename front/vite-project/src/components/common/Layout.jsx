import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  // Scroll to the top of the page when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine Layout banner details based on active pathname
  const getPageMeta = (pathname) => {
    if (pathname === "/product") {
      return {
        title: "식빵 메뉴 소개",
        subtitle: "100% 유기농 밀가루와 직접 배양한 천연 비법 효모종으로 지어낸 마음식빵 라인업을 만나보세요."
      };
    }
    if (pathname === "/notice") {
      return {
        title: "공지사항 & 소식",
        subtitle: "마음식빵의 건강한 소식, 신선한 이벤트 및 검사 인증서 결과를 공유해 드립니다."
      };
    }
    if (pathname === "/notice/write") {
      return {
        title: "공지사항 작성",
        subtitle: "마음식빵 식구들에게 들려줄 따뜻하고 새로운 소식을 등록합니다."
      };
    }
    if (pathname.startsWith("/notice/")) {
      return {
        title: "공지사항 상세보기",
        subtitle: "마음식빵이 준비한 따뜻하고 맛있는 이야기를 자세히 소개해 드립니다."
      };
    }
    if (pathname === "/qna") {
      return {
        title: "질문 답변 (Q&A)",
        subtitle: "단체 빵 주문, 조리법 문의, 정기 구독 등 어떠한 궁금증이든 따뜻하게 응대하겠습니다."
      };
    }
    if (pathname === "/login") {
      return {
        title: "로그인",
        subtitle: "마음식빵 멤버십 회원 로그인 페이지입니다. 갓 구운 하루를 함께 열어가세요."
      };
    }
    if (pathname === "/join") {
      return {
        title: "신규 회원가입",
        subtitle: "마음식빵 패밀리 멤버십 신규 가입 페이지입니다. 가입 즉시 보너스 스탬프 2개가 지급됩니다!"
      };
    }
    if (pathname === "/mypage") {
      return {
        title: "마이페이지",
        subtitle: "나의 식빵 스탬프 적립 쿠폰판, 보유 쿠폰 현황 및 최근 구매/예약 배달 내역을 조회해 보세요."
      };
    }
    return { title: "", subtitle: "" };
  };

  const { title, subtitle } = getPageMeta(location.pathname);
  const isHome = location.pathname === "/";

  return (
    <div className="animate-fade-in-up" style={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      width: "100%",
      boxSizing: "border-box"
    }}>
      {/* Dynamic Page Banner (Only shown if NOT homepage) */}
      {!isHome && (
        <section style={{
          background: "linear-gradient(135deg, var(--accent-light) 0%, rgba(245, 236, 224, 0.4) 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "50px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle Decorative SVG Backgrounds */}
          <div style={{
            position: "absolute",
            bottom: "-20px",
            right: "10%",
            fontSize: "7rem",
            opacity: "0.08",
            userSelect: "none",
            pointerEvents: "none"
          }} className="animate-float">
            🌾
          </div>
          <div style={{
            position: "absolute",
            top: "-10px",
            left: "8%",
            fontSize: "6rem",
            opacity: "0.08",
            userSelect: "none",
            pointerEvents: "none"
          }}>
            🥐
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <h1 style={{
              fontFamily: "var(--heading)",
              fontSize: "2.4rem",
              color: "var(--text-h)",
              margin: "0 0 12px 0",
              fontWeight: "800"
            }}>
              {title}
            </h1>
            <p style={{
              fontSize: "1.05rem",
              color: "var(--text)",
              opacity: "0.85",
              margin: 0,
              fontWeight: "400"
            }}>
              {subtitle}
            </p>
          </div>
        </section>
      )}

      {/* Main Page Content Wrapper */}
      <main style={{
        padding: isHome ? "0" : "48px 24px",
        flex: 1,
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box"
      }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
