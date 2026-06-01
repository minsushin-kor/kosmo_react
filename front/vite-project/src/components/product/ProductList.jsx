import React, { useState } from "react";
import Modal from "../common/Modal";

function ProductList() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: "all", label: "전체보기" },
    { id: "signature", label: "👑 시그니처" },
    { id: "sweet", label: "🍯 달콤한 맛" },
    { id: "savory", label: "🧀 짭조름/건강" },
  ];

  const products = [
    {
      id: 1,
      name: "클래식 우유 식빵",
      category: "signature",
      price: "5,500원",
      image: "🥛",
      desc: "유기농 우유 100% 반죽으로 구워 극강의 부드러움과 닭고기처럼 찢어지는 쫄깃함을 지닌 대표 식빵.",
      ingredients: "유기농 밀가루 (프랑스산), 천연 이스트, 국산 1등급 유기농 우유, 앵커 천연버터 (뉴질랜드산)",
      calories: "280 kcal (100g 당)",
      allergens: "우유, 밀 함유",
      tip: "손으로 결대로 찢어 드시면 본연의 쫄깃한 풍미를 가장 잘 느끼실 수 있습니다. 남은 빵은 지퍼백에 밀봉해 냉동 보관하신 후 180도 에어프라이어에 3분간 데워 드세요."
    },
    {
      id: 2,
      name: "지리산 알밤 식빵",
      category: "signature",
      price: "6,800원",
      image: "🌰",
      desc: "화학 첨가물 없이 고소하게 졸인 알밤과 부드러운 소보로 크럼블이 입안 가득 씹히는 간식 대용 식빵.",
      ingredients: "유기농 밀가루, 공주 알밤 35% (국산), 국산 소보로 크럼블, 천연 효모",
      calories: "320 kcal (100g 당)",
      allergens: "밀, 대두, 밤 함유",
      tip: "도톰하게 두께 3cm로 슬라이스하여 살짝 토스트해 드시면 알밤의 풍미와 아삭함이 두 배가 됩니다."
    },
    {
      id: 3,
      name: "먹물 더블 치즈 식빵",
      category: "savory",
      price: "7,200원",
      image: "🧀",
      desc: "오징어 먹물로 건강을 더한 쫄깃한 반죽 속에 고소한 에멘탈 롤치즈와 진한 노란 체다치즈가 폭탄처럼 든 식빵.",
      ingredients: "유기농 밀가루, 오징어먹물 3% (스페인산), 에멘탈 롤치즈 (뉴질랜드산), 체다치즈 (미국산)",
      calories: "310 kcal (100g 당)",
      allergens: "우유, 밀, 오징어 함유",
      tip: "전자레인지에 20초만 살짝 데우면 속 안의 더블 치즈가 폭포처럼 녹아내려 풍미가 극대화됩니다!"
    },
    {
      id: 4,
      name: "100% 유기농 통밀 식빵",
      category: "savory",
      price: "6,500원",
      image: "🌾",
      desc: "통밀 씨눈과 껍질까지 통째로 갈아 넣어 식이섬유가 풍부하고, 오랜 저온 숙성으로 구수한 정통 건강 식빵.",
      ingredients: "유기농 통밀가루 100% (캐나다산), 천연 사워도우 효모종, 정제염, 정밀 정제수",
      calories: "220 kcal (100g 당)",
      allergens: "밀 함유",
      tip: "비건 분들에게 적극 추천합니다! 올리브오일과 발사믹 식초를 곁들이거나, 아보카도를 올려 오픈 샌드위치로 드셔보세요."
    },
    {
      id: 5,
      name: "메이플 무화과 호두 식빵",
      category: "sweet",
      price: "7,000원",
      image: "🍯",
      desc: "캐나다산 최고급 메이플 시럽에 졸인 달콤한 무화과 다이스와 오븐에 구워 고소한 호두 분태가 콕콕 박힌 식빵.",
      ingredients: "유기농 밀가루, 유기농 반건조 무화과 18% (터키산), 리얼 메이플시럽 (캐나다산), 캘리포니아 호두",
      calories: "305 kcal (100g 당)",
      allergens: "밀, 호두 함유",
      tip: "진한 에스프레소나 밀크티와 훌륭한 조화를 이룹니다. 크림치즈를 듬뿍 발라 드셔도 환상적입니다."
    },
    {
      id: 6,
      name: "달콤 시나몬 초코 마블",
      category: "sweet",
      price: "6,300원",
      image: "🍫",
      desc: "벨기에산 다크 초콜릿 가나슈와 부드러운 시나몬 파우더를 마블 모양으로 겹겹이 롤링하여 구운 달콤 매혹의 식빵.",
      ingredients: "유기농 밀가루, 벨기에산 다크초콜릿 가나슈 22%, 유기농 시나몬 분말, 천연 버터",
      calories: "340 kcal (100g 당)",
      allergens: "우유, 밀, 대두 함유",
      tip: "따뜻하게 데운 우유와 함께 드시면 가나슈의 달콤함과 계피의 알싸함이 완벽히 어우러집니다."
    }
  ];

  // Filtering products based on selected tab
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Category Tabs (Scrollable on Mobile) */}
      <div className="scroll-tabs" style={{ 
        justifyContent: "center", 
        gap: "12px", 
        borderBottom: "1px solid var(--border)",
        paddingBottom: "16px"
      }}>
        {categories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 24px",
              borderRadius: "30px",
              border: activeTab === tab.id ? "1px solid var(--accent)" : "1px solid var(--border)",
              backgroundColor: activeTab === tab.id ? "var(--accent)" : "var(--bg)",
              color: activeTab === tab.id ? "#FFFDF9" : "var(--text)",
              fontFamily: "var(--sans)",
              fontWeight: "600",
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: activeTab === tab.id ? "var(--shadow-sm)" : "none"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sourcing Certification Badge banner */}
      <div className="card" style={{
        background: "var(--accent-light)",
        border: "1px solid var(--accent-border)",
        padding: "16px 24px",
        textAlign: "center",
        fontSize: "0.9rem",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        color: "var(--text-h)",
        fontWeight: "500"
      }}>
        🛡️ <strong>마음식빵 안심 원천제:</strong> 모든 제품에는 표백제를 쓰지 않는 캐나다산 및 프랑스산 1등급 유기농 밀가루만을 사용하여 아토피나 밀가루 알레르기가 있으신 분들도 비교적 속 편하게 드실 수 있습니다.
      </div>

      {/* Product Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "32px",
        marginTop: "16px"
      }}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="card" style={{
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}>
            {/* Hover Bread Emoji Illustration Box */}
            <div style={{
              height: "220px",
              background: "linear-gradient(135deg, var(--accent-light) 0%, rgba(245,236,224,0.4) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "7rem",
              userSelect: "none",
              transition: "all 0.3s ease"
            }}>
              <span className="animate-float" style={{ display: "inline-block" }}>{product.image}</span>
            </div>

            {/* Product Body */}
            <div style={{ padding: "24px", textAlign: "left", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "1.25rem", margin: 0, fontWeight: "700", color: "var(--text-h)" }}>{product.name}</h3>
                <strong style={{ color: "var(--accent)", fontSize: "1.15rem" }}>{product.price}</strong>
              </div>

              <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
                <span style={{
                  fontSize: "0.7rem",
                  padding: "2px 8px",
                  background: "var(--code-bg)",
                  borderRadius: "4px",
                  color: "var(--text-h)",
                  fontWeight: "600"
                }}>
                  🌾 1등급 유기농 밀
                </span>
                {product.category === "signature" && (
                  <span style={{
                    fontSize: "0.7rem",
                    padding: "2px 8px",
                    background: "rgba(194, 120, 63, 0.15)",
                    borderRadius: "4px",
                    color: "var(--accent)",
                    fontWeight: "600"
                  }}>
                    👑 대표 시그니처
                  </span>
                )}
              </div>

              <p style={{
                fontSize: "0.88rem",
                color: "var(--text)",
                opacity: 0.9,
                lineHeight: "1.6",
                marginBottom: "24px",
                flex: 1
              }}>
                {product.desc}
              </p>

              <button 
                onClick={() => setSelectedProduct(product)}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "0.9rem",
                  borderRadius: "12px"
                }}
              >
                상세 성분 및 섭취 가이드 보기 📄
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct ? `${selectedProduct.name} 영양 및 상세 정보` : ""}
        width="600px"
      >
        {selectedProduct && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "16px",
              background: "var(--accent-light)",
              borderRadius: "16px",
              border: "1px solid var(--border)"
            }}>
              <span style={{ fontSize: "4.5rem" }}>{selectedProduct.image}</span>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "1.3rem" }}>{selectedProduct.name}</h4>
                <strong style={{ fontSize: "1.1rem", color: "var(--accent)" }}>{selectedProduct.price}</strong>
              </div>
            </div>

            <div>
              <h5 style={{ margin: "0 0 6px 0", fontSize: "0.95rem", color: "var(--text-h)" }}>🌾 함유 원재료</h5>
              <p style={{ margin: 0, fontSize: "0.88rem", background: "var(--code-bg)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", lineHeight: "1.5" }}>
                {selectedProduct.ingredients}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <h5 style={{ margin: "0 0 6px 0", fontSize: "0.95rem", color: "var(--text-h)" }}>🔥 열량 (칼로리)</h5>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--accent)" }}>
                  {selectedProduct.calories}
                </div>
              </div>
              <div>
                <h5 style={{ margin: "0 0 6px 0", fontSize: "0.95rem", color: "var(--text-h)" }}>⚠️ 알레르기 성분</h5>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#EF4444" }}>
                  {selectedProduct.allergens}
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
              <h5 style={{ margin: "0 0 8px 0", fontSize: "0.95rem", color: "var(--text-h)" }}>💡 더욱 맛있게 먹는 보관 팁</h5>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: "0.9", lineHeight: "1.6" }}>
                {selectedProduct.tip}
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <button 
                onClick={() => {
                  alert(`${selectedProduct.name}이 모바일 장바구니에 담겼습니다. (디자인 데모)`);
                  setSelectedProduct(null);
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: "12px" }}
              >
                장바구니 담기 🛒
              </button>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="btn btn-secondary"
                style={{ flex: 1, padding: "12px" }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProductList;
