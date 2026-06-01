import React, { useState } from "react";
import Modal from "../common/Modal";

function QnaBoard({ isLoggedIn }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  
  // Form fields
  const [qTitle, setQTitle] = useState("");
  const [qContent, setQContent] = useState("");
  const [qCat, setQCat] = useState("order");

  // Q&A Categories
  const categories = [
    { id: "all", label: "전체" },
    { id: "order", label: "📦 주문/예약" },
    { id: "storage", label: "🍞 보관/섭취" },
    { id: "general", label: "🏢 매장/기타" },
  ];

  // Initial Seed Q&As
  const [qnas, setQnas] = useState([
    {
      id: 1,
      category: "order",
      question: "식빵 단체 주문은 최소 며칠 전까지 연락드려야 하나요?",
      answer: "식빵 단체 주문(30개 이상)은 원재료 유기농 수급 및 저온 숙성 발효를 위해 최소 3일 전까지 매장 연락처(02-123-4567) 또는 홈페이지 게시판으로 사전에 예약을 주셔야 당일 오전 구움 완료가 가능합니다. 수량이 대량일 경우 서울 전 지역 무료 배달도 지원해 드리고 있으니 언제든 상담 문의 부탁드립니다.",
      author: "김*현",
      date: "2026-05-26",
      isAnswered: true
    },
    {
      id: 2,
      category: "storage",
      question: "남은 식빵을 실온에 두었더니 딱딱해졌어요. 부드럽게 되돌리는 법이 있나요?",
      answer: "마음식빵은 화학 첨가물 및 방부제가 첨가되지 않아 실온 노출 시 전분 노화가 빠르게 일어납니다. \n\n만약 딱딱해졌다면, 분무기로 물을 식빵 표면에 1~2회 가볍게 분사한 뒤 토스터기나 180도 에어프라이어에 2~3분 데우시면 갓 구운 것처럼 겉바속촉해집니다. \n\n가장 좋은 방법은 구매 후 드실 만큼만 남기고 3cm 내외로 지퍼백에 밀봉 밀폐 후 즉시 냉동실에 보관해 주시는 것입니다! (냉장고 보관은 수분을 뺏어가므로 절대 피해주세요.)",
      author: "이*희",
      date: "2026-05-25",
      isAnswered: true
    },
    {
      id: 3,
      category: "general",
      question: "유기농 통밀 식빵은 비건(Vegan) 제품인가요? 우유나 버터가 들어가나요?",
      answer: "네! 마음식빵의 '100% 유기농 통밀 식빵'은 동물성 원료(우유, 버터, 달걀, 꿀)가 일절 들어가지 않은 순수 '비건(Vegan)' 안전 빵입니다. \n캐나다산 유기농 통밀가루와 천연 사워도우 효모, 소금, 물만을 사용해 담백하고 식이섬유가 매우 높아 다이어트나 채식을 지향하시는 고객님들도 완전히 안심하고 맛있게 즐기실 수 있습니다.",
      author: "정*우",
      date: "2026-05-22",
      isAnswered: true
    },
    {
      id: 4,
      category: "order",
      question: "모바일 예약 결제 후 당일 픽업 시간을 늦추거나 변경할 수 있나요?",
      answer: "네, 예약 픽업 시간 변경은 당일 매장 상황에 따라 가능합니다! 다만 식빵 출고 시간 기준으로 매장에서 온도를 맞춰 보관하기 때문에 최상의 풍미를 위해 픽업 예정 시간보다 30분 이상 변경될 경우 매장 전화로 성함과 시간 변경을 미리 말씀해 주시면 변질 없이 따뜻하게 보관 상자에 킵해드리도록 최선을 다하겠습니다.",
      author: "박*연",
      date: "2026-05-18",
      isAnswered: true
    },
    {
      id: 5,
      category: "general",
      question: "마음식빵 스탬프 적립은 어떻게 이루어지나요?",
      answer: "매장 오프라인 구매 혹은 모바일 가입 회원님들은 식빵 1개 구매 시마다 '식빵 스탬프'가 1개씩 자동 적립됩니다. \n스탬프 10개를 모으시면 다음 방문 시 '클래식 우유 식빵 1개 교환권' 또는 5,000원 즉시 할인 쿠폰이 모바일 회원 카드로 자동 지급됩니다. 회원가입만 하셔도 웰컴 스탬프 2개가 기본 지급됩니다!",
      author: "최*진",
      date: "2026-05-10",
      isAnswered: true
    }
  ]);

  // Handle Accordion Toggle
  const toggleAccordion = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  // Filter Q&As based on Category and Search Query
  const filteredQnas = qnas.filter((q) => {
    const matchesCategory = activeCategory === "all" || q.category === activeCategory;
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle new question submit
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!qTitle || !qContent) {
      alert("질문 제목과 내용을 모두 입력해 주세요.");
      return;
    }

    const newQ = {
      id: qnas.length + 1,
      category: qCat,
      question: qTitle,
      answer: "안녕하세요, 마음식빵 지배인입니다. 소중한 질문 감사드립니다. 문의하신 내용에 대해 담당자가 확인 중에 있으며, 24시간 이내에 신속하게 자세한 답변을 등록해 드리겠습니다. 조금만 기다려 주시면 감사하겠습니다!",
      author: isLoggedIn ? "본인" : "비회원",
      date: new Date().toISOString().split("T")[0],
      isAnswered: true // Mock answered status
    };

    setQnas([newQ, ...qnas]);
    setIsAskModalOpen(false);
    
    // Reset forms
    setQTitle("");
    setQContent("");
    
    alert("🧁 질문이 정상적으로 접수되었습니다. 마음식빵의 정성스러운 답변이 조만간 업로드됩니다!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header and Controls */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div style={{ textAlign: "left" }}>
          <h2 style={{ fontSize: "1.6rem", margin: 0 }}>💬 질문답변 (Q&A) 게시판</h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", opacity: "0.8" }}>식빵 조리법, 대량 예약, 알레르기 성분 등 무엇이든 따뜻하게 답변해 드립니다.</p>
        </div>

        <button 
          onClick={() => {
            if (!isLoggedIn) {
              alert("회원 질문 작성을 원하시면 로그인이 필요합니다. (비회원 작성도 모의 가능합니다.)");
            }
            setIsAskModalOpen(true);
          }}
          className="btn btn-primary"
          style={{ padding: "12px 24px", borderRadius: "30px" }}
        >
          질문하기 ✍️
        </button>
      </div>

      {/* Search and Categories row */}
      <div className="card" style={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        background: "var(--accent-light)",
        border: "1px solid var(--border)"
      }}>
        {/* Category filters (Scrollable on Mobile) */}
        <div className="scroll-tabs" style={{ gap: "8px" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: activeCategory === cat.id ? "1px solid var(--accent)" : "1px solid var(--border)",
                backgroundColor: activeCategory === cat.id ? "var(--accent)" : "var(--bg)",
                color: activeCategory === cat.id ? "#FFFDF9" : "var(--text)",
                fontSize: "0.85rem",
                fontFamily: "var(--sans)",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Real-time Q&A Search bar */}
        <div style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="자주 묻는 질문 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 16px 10px 36px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text-h)",
              fontSize: "0.85rem",
              fontFamily: "var(--sans)",
              outline: "none"
            }}
          />
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.6 }}>🔍</span>
        </div>
      </div>

      {/* Accordion Questions List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredQnas.length === 0 ? (
          <div className="card" style={{ padding: "64px", textAlign: "center", opacity: 0.7 }}>
            <span style={{ fontSize: "3rem" }}>❓</span>
            <p style={{ marginTop: "16px", fontSize: "0.95rem" }}>아직 등록된 질문이나 일치하는 검색어가 없습니다.</p>
          </div>
        ) : (
          filteredQnas.map((qna) => (
            <div 
              key={qna.id} 
              className="card"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                textAlign: "left"
              }}
            >
              {/* Question Header */}
              <div 
                onClick={() => toggleAccordion(qna.id)}
                style={{
                  padding: "24px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  userSelect: "none"
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  {/* Badge */}
                  <span style={{
                    fontSize: "0.8rem",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    background: qna.category === "order" ? "#FEF3C7" : qna.category === "storage" ? "#D1FAE5" : "#E0F2FE",
                    color: qna.category === "order" ? "#B45309" : qna.category === "storage" ? "#065F46" : "#0369A1",
                    fontWeight: "700"
                  }}>
                    {categories.find(c => c.id === qna.category)?.label.split(" ")[1] || "기타"}
                  </span>
                  
                  <span style={{
                    fontWeight: "700",
                    fontSize: "1.05rem",
                    color: expandedId === qna.id ? "var(--accent)" : "var(--text-h)",
                    lineHeight: "1.4"
                  }}>
                    Q. {qna.question}
                  </span>
                </div>

                {/* Chevron icon */}
                <span style={{
                  fontSize: "1.2rem",
                  transform: expandedId === qna.id ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: "var(--text)",
                  opacity: 0.6
                }}>
                  ▼
                </span>
              </div>

              {/* Accordion Answer Content (Collapsible) */}
              <div style={{
                maxHeight: expandedId === qna.id ? "500px" : "0",
                opacity: expandedId === qna.id ? 1 : 0,
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                borderTop: expandedId === qna.id ? "1px solid var(--border)" : "1px solid transparent",
                backgroundColor: "var(--accent-light)"
              }}>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "var(--accent)", lineHeight: "1" }}>A.</span>
                    <p style={{
                      margin: 0,
                      fontSize: "0.95rem",
                      color: "var(--text)",
                      lineHeight: "1.7",
                      whiteSpace: "pre-line"
                    }}>
                      {qna.answer}
                    </p>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    gap: "16px",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "12px"
                  }}>
                    <span>작성자: {qna.author}</span>
                    <span>작성일: {qna.date}</span>
                    <span style={{ color: "var(--accent)", fontWeight: "600" }}>✓ 답변 완료</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ask Question Modal popup */}
      <Modal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        title="✍️ 마음식빵 1:1 질문 작성"
        width="550px"
      >
        <form onSubmit={handleQuestionSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>질문 분류</label>
            <select
              value={qCat}
              onChange={(e) => setQCat(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text-h)",
                fontSize: "0.9rem",
                fontFamily: "var(--sans)"
              }}
            >
              <option value="order">📦 주문 / 단체 대량 예약 관련</option>
              <option value="storage">🍞 빵 섭취 / 알레르기 보관법 관련</option>
              <option value="general">🏢 매장 운영 / 스탬프 적립 / 기타 문의</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>질문 제목</label>
            <input
              type="text"
              placeholder="예시: 단단해진 식빵 활용법이 있나요?"
              value={qTitle}
              onChange={(e) => setQTitle(e.target.value)}
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
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>상세 내용</label>
            <textarea
              placeholder="여기에 문의하고 싶으신 상세 내용을 적어주세요. 갓 구운 친절로 신속히 답변 드리겠습니다."
              value={qContent}
              onChange={(e) => setQContent(e.target.value)}
              rows="6"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text-h)",
                fontSize: "0.9rem",
                fontFamily: "var(--sans)",
                resize: "none",
                boxSizing: "border-box",
                lineHeight: "1.6"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: "12px" }}>
              등록하기 💌
            </button>
            <button type="button" onClick={() => setIsAskModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, padding: "12px" }}>
              취소
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default QnaBoard;
