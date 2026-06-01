import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  // Baking Schedule Timeline Data
  const schedule = [
    { time: "08:30", name: "🧈 클래식 우유 식빵", desc: "매일 아침을 여는 부드럽고 쫄깃한 시그니처 우유 식빵" },
    { time: "09:30", name: "🌾 100% 통밀 잡곡 식빵", desc: "천연 발효종과 통밀을 듬뿍 넣어 구수하고 속이 편한 건강 식빵" },
    { time: "10:30", name: "🌰 지리산 알밤 식빵", desc: "달콤하게 졸인 공주 알밤을 통째로 넣어 씹는 맛이 있는 간식 식빵" },
    { time: "11:30", name: "🧀 먹물 더블 치즈 식빵", desc: "고소한 오징어 먹물 도우 속에 롤치즈와 체다치즈가 가득한 식빵" },
    { time: "13:30", name: "🌿 유기농 단호박 식빵", desc: "국산 단호박 퓨레를 반죽에 넣어 은은한 단맛과 고운 노란빛을 내는 식빵" },
  ];

  // Best Sellers Data
  const bestSellers = [
    {
      id: 1,
      name: "클래식 우유 식빵",
      price: "5,500원",
      image: "🥛",
      tag: "BEST #1",
      desc: "유기농 우유 100% 반죽으로 닭고기처럼 찢어지는 쫄깃함을 자랑합니다."
    },
    {
      id: 2,
      name: "지리산 알밤 식빵",
      price: "6,800원",
      image: "🌰",
      tag: "BEST #2",
      desc: "화학 첨가물 없이 고소한 알밤과 유기농 밀가루로 건강한 단맛을 채웠습니다."
    },
    {
      id: 3,
      name: "먹물 더블 치즈 식빵",
      price: "7,200원",
      image: "🧀",
      tag: "BEST #3",
      desc: "짭조름한 체다치즈와 부드러운 에멘탈 치즈가 듬뿍 녹아있는 식사 대용 빵."
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px", paddingBottom: "48px" }}>
      {/* Premium Hero Banner Section */}
      <section style={{
        background: "linear-gradient(135deg, rgba(194, 120, 63, 0.08) 0%, rgba(245, 236, 224, 0.4) 100%)",
        borderRadius: "32px",
        padding: "clamp(40px, 8vw, 80px) 20px",
        margin: "0 0px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxSizing: "border-box"
      }}>
        {/* Decorative Floating Background Items */}
        <div style={{ position: "absolute", top: "10%", left: "5%", fontSize: "3rem", opacity: "0.15" }} className="animate-float">🥐</div>
        <div style={{ position: "absolute", bottom: "10%", right: "5%", fontSize: "3rem", opacity: "0.15" }} className="animate-float">🧈</div>
        
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "var(--code-bg)",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "700",
            color: "var(--accent)",
            marginBottom: "24px",
            border: "1px solid var(--border)"
          }}>
            🌾 100% 당일 생산 · 당일 판매 원칙
          </div>
          
          <h1 className="hero-title" style={{
            fontFamily: "var(--heading)",
            fontWeight: "900",
            color: "var(--text-h)",
            marginBottom: "24px"
          }}>
            갓 구운 따스함이<br />당신의 마음까지 닿도록
          </h1>
          
          <p className="hero-desc" style={{
            color: "var(--text)",
            maxWidth: "600px",
            margin: "0 auto 40px auto",
            opacity: "0.9",
            lineHeight: "1.7"
          }}>
            '마음식빵'은 화학 첨가물 없이, 오직 천연 발효종과 신선한 유기농 밀가루만을 고집하여 매일 새벽 정성껏 구워냅니다. 속 편한 아침을 선물해 드립니다.
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/product")} className="btn btn-primary" style={{ padding: "14px 28px" }}>
              식빵 메뉴 둘러보기 🍞
            </button>
            <button onClick={() => navigate("/qna")} className="btn btn-secondary" style={{ padding: "14px 28px" }}>
              단체 주문 및 문의 💬
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid Content: Time Table & Brand Story */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "32px"
      }}>
        {/* Baking Schedule Timeline */}
        <div className="card" style={{ padding: "32px", textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
            <h2 style={{ fontSize: "1.5rem", margin: 0, fontWeight: "800" }}>⏰ 빵 출고 시간표</h2>
            <span style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: "600" }}>오전 08:30부터 순차출고</span>
          </div>
          <p style={{ fontSize: "0.92rem", opacity: "0.8", marginBottom: "28px" }}>
            갓 나온 따끈따끈한 식빵을 원하신다면 아래 시간대에 맞춰 매장을 방문해 주세요!
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
            {/* Timeline Vertical Bar */}
            <div 
              className="timeline-bar"
              style={{
                position: "absolute",
                left: "23px",
                top: "10px",
                bottom: "10px",
                width: "2px",
                backgroundColor: "var(--border)",
                zIndex: 1
              }} 
            />

            {schedule.map((item, idx) => (
              <div key={idx} style={{ display: "flex", gap: "20px", position: "relative", zIndex: 2 }}>
                {/* Time Indicator Circle */}
                <div 
                  className="timeline-circle"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "var(--code-bg)",
                    border: "2px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "0.9rem",
                    color: "var(--text-h)",
                    flexShrink: 0,
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  {item.time}
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "1.05rem", color: "var(--text-h)" }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text)", opacity: "0.85" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Promise / Story */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div className="card" style={{ padding: "32px", textAlign: "left", flex: 1, background: "linear-gradient(to right bottom, var(--accent-light), var(--bg))" }}>
            <span style={{ fontSize: "2rem" }}>🌾</span>
            <h3 style={{ fontSize: "1.35rem", margin: "16px 0 10px 0" }}>우리가 고집하는 3가지 약속</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <strong>100% 무방부제 천연 발효:</strong><br />
                인공 이스트를 최소화하고 당사에서 직접 배양한 밀 발효종을 사용해 오랫동안 속이 편안합니다.
              </li>
              <li>
                <strong>유기농 최상급 재료:</strong><br />
                화학 비료를 주지 않은 프랑스산/캐나다산 유기농 밀가루와 100% 천연 버터, 천일염만을 엄선해 굽습니다.
              </li>
              <li>
                <strong>당일 기부 원칙:</strong><br />
                신선도를 지키기 위해 매일 오후 8시 이후 남은 모든 식빵은 푸드뱅크를 통해 도움이 필요한 이웃에게 전액 기부됩니다.
              </li>
            </ul>
          </div>

          <div className="card" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px", textAlign: "left" }}>
            <div style={{ fontSize: "2.3rem" }}>📍</div>
            <div>
              <h4 style={{ margin: "0 0 4px 0" }}>위치 및 방문안내</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: "0.9" }}>
                홍대입구역 3번 출구 도보 5분 거리 (연남 밀밭길 1층)<br />
                전화 예약 및 포장 단체 주문: <strong>02-123-4567</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Products Showcase */}
      <section style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>👑 대표 시그니처 3선</h2>
        <p style={{ fontSize: "0.95rem", color: "var(--text)", opacity: "0.85", marginBottom: "32px" }}>
          방문 고객 10명 중 9명이 재구매하시는 마음식빵의 베스트셀러입니다.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px"
        }}>
          {bestSellers.map((item) => (
            <div key={item.id} className="card" style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              position: "relative"
            }}>
              {/* Product Image Placeholder Icon with warm BG */}
              <div style={{
                height: "200px",
                background: "var(--accent-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "6rem",
                userSelect: "none",
                position: "relative"
              }}>
                <span className="animate-float">{item.image}</span>
                <span style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  background: "var(--accent)",
                  color: "#FFFDF9",
                  fontSize: "0.75rem",
                  fontWeight: "800",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  {item.tag}
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: "24px", textAlign: "left", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                  <h3 style={{ fontSize: "1.2rem", margin: 0 }}>{item.name}</h3>
                  <strong style={{ color: "var(--accent)", fontSize: "1.1rem" }}>{item.price}</strong>
                </div>
                <p style={{ fontSize: "0.88rem", opacity: "0.85", flex: 1, margin: "0 0 20px 0", lineHeight: "1.5" }}>
                  {item.desc}
                </p>
                <button 
                  onClick={() => navigate("/product")}
                  className="btn btn-outline" 
                  style={{ width: "100%", borderRadius: "10px", fontSize: "0.85rem", padding: "8px" }}
                >
                  상세 성분 및 구매 안내
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
