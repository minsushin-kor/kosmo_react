import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/api.js";

function NoticeList() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const mockNotices = [
    {
      id: 4,
      title: "🎁 5월 가정의 달 맞이 마음식빵 선물세트 특별 사전 예약 안내",
      author: "지배인",
      createAt: "2026-05-24T09:00:00",
      content: "안녕하세요, 마음식빵 지배인입니다. \n\n가정의 달 5월을 맞이하여 부모님과 소중한 분들께 따뜻함을 전할 수 있도록 마음식빵 선물세트 패키지를 출시했습니다. \n\n[선물세트 구성]\n1. 클래식 우유 식빵 + 밤 식빵 + 메이플 무화과 식빵\n2. 잼 스프레드 2종 세트 (수제 밀크잼, 얼그레이잼)\n3. 프리미엄 친환경 린넨 식빵 보관 보자기\n\n- 예약 기간: 5월 25일 ~ 5월 31일\n- 수령 기간: 6월 1일 ~ 6월 8일\n- 예약 방법: 매장 방문 혹은 고객센터 전화(02-123-4567)\n\n매일 구워낼 수 있는 한정 수량이 존재하므로 조기 마감될 수 있습니다. 따스한 하루 보내시길 바랍니다. 감사합니다."
    },
    {
      id: 3,
      title: "⏰ 현충일(6월 6일) 매장 정상 영업 및 구움 시간표 안내",
      author: "지배인",
      createAt: "2026-05-20T10:30:00",
      content: "안녕하세요, 마음식빵입니다. \n\n다가오는 6월 6일 현충일 임시공휴일에도 마음식빵은 정상 영업을 실시합니다. \n\n- 영업 시간: 오전 8시 ~ 오후 8시 (동일)\n- 빵 나오는 시간표 역시 공휴일 동일하게 정상 출고됩니다.\n\n가족분들과 함께 행복한 연휴 맞이하시길 바라며, 당일 빵 굽는 수량을 평소 대비 20% 증량하여 준비할 예정이오니 편안하게 들러주세요!"
    },
    {
      id: 2,
      title: "📸 [SNS 이벤트] 마음식빵 인스타그램 후기 남기고 프랑스 고메버터 받자!",
      author: "마케팅팀",
      createAt: "2026-05-15T14:20:00",
      content: "마음식빵을 아껴주시는 고객님들을 위한 아기자기한 이벤트를 준비했습니다. \n\n[이벤트 참여 방법]\n1. 인스타그램에 마음식빵 제품 또는 매장 풍경 사진을 찍어 올린다.\n2. 필수 해시태그 (#마음식빵 #연남동빵집 #유기농식빵)를 태그한다.\n3. 매장 카운터 직원에게 업로드 화면을 인증한다.\n\n[참여 혜택]\n- 갓 구운 식빵과 찰떡궁합인 프랑스산 엘르앤비르 미니 포션 고메버터 1개를 즉시 증정합니다!\n많은 참여 부탁드립니다."
    },
    {
      id: 1,
      title: "🛡️ [인증] 캐나다 유기농 원맥 밀가루 1등급 친환경 수입 검사 통과 공지",
      author: "관리자",
      createAt: "2026-05-01T09:00:00",
      content: "안녕하세요. 마음식빵을 총괄하는 관리자입니다. \n\n당사는 정직한 빵만을 굽기 위해 1등급 친환경 캐나다 청정 밀가루만을 수입하여 사용하고 있습니다. 금일 농림축산식품부 정밀 수입 검사를 통과하여 표백제 잔류 0.00% 무방부제 정식 유기농 인증서를 갱신하였기에 고객님들께 신뢰와 안심을 위해 첨부하여 알립니다.\n\n늘 내 아이가 먹는 빵이라 생각하고 가장 건강하고 깨끗하게 굽겠습니다. 감사합니다."
    }
  ];

  useEffect(() => {
    // Priority 1: ALWAYS fetch from backend API first to get live DB records!
    request("/notice/list")
      .then((data) => {
        if (Array.isArray(data)) {
          setNotices(data);
          // Sync with localStorage to keep detail views and fallback updated
          localStorage.setItem("maum_notices", JSON.stringify(data));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend notice API is currently offline. Using localStorage fallback.", err);
        
        // Priority 2: Fallback to localStorage if the backend is offline
        const savedNotices = localStorage.getItem("maum_notices");
        if (savedNotices) {
          try {
            const parsed = JSON.parse(savedNotices);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setNotices(parsed);
              setLoading(false);
              return;
            }
          } catch (storageErr) {
            console.error("Failed to parse saved notices", storageErr);
          }
        }

        // Priority 3: Fallback to mockNotices if localStorage is also empty
        setNotices(mockNotices);
        localStorage.setItem("maum_notices", JSON.stringify(mockNotices));
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Filter notice list based on search term
  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.content && n.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
      {/* Search Header & Registration Button */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        marginBottom: "8px"
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2 style={{ fontSize: "1.6rem", margin: 0, fontWeight: "800" }}>📢 소식 및 공지사항</h2>
            
            {/* Create Notice Button */}
            <button
              onClick={() => navigate("/notice/write")}
              className="btn btn-primary animate-float"
              style={{
                padding: "8px 16px",
                fontSize: "0.85rem",
                borderRadius: "20px"
              }}
            >
              공지 등록 ✍️
            </button>
          </div>
          <span style={{ fontSize: "0.9rem", color: "var(--text)", opacity: 0.8 }}>마음식빵의 다양한 이야기와 혜택을 전합니다.</span>
        </div>

        {/* Real-time search box */}
        <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
          <input
            type="text"
            placeholder="공지 검색하기..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              borderRadius: "30px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text-h)",
              fontSize: "0.9rem",
              fontFamily: "var(--sans)",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />
          <span style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.6,
            fontSize: "1.1rem"
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{ padding: "80px", textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "3px solid var(--border)",
            borderTopColor: "var(--accent)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px auto"
          }} />
          <p>공지사항을 가져오는 중입니다...</p>
        </div>
      ) : (
        <div className="card" style={{ overflow: "hidden" }}>
          {filteredNotices.length === 0 ? (
            <div style={{ padding: "64px", textAlign: "center", opacity: 0.7 }}>
              <span style={{ fontSize: "3rem" }}>📭</span>
              <p style={{ marginTop: "16px", fontSize: "0.95rem" }}>검색어와 일치하는 공지사항이 없습니다.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "0.95rem"
              }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--code-bg)" }}>
                    <th style={{ padding: "16px 24px", color: "var(--text-h)", fontWeight: "700", width: "80px", textAlign: "center" }}>번호</th>
                    <th style={{ padding: "16px 24px", color: "var(--text-h)", fontWeight: "700" }}>제목</th>
                    <th style={{ padding: "16px 24px", color: "var(--text-h)", fontWeight: "700", width: "120px", textAlign: "center" }}>작성자</th>
                    <th style={{ padding: "16px 24px", color: "var(--text-h)", fontWeight: "700", width: "140px", textAlign: "center" }}>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotices.map((notice) => (
                    <tr
                      key={notice.id}
                      onClick={() => navigate(`/notice/${notice.id}`)}
                      style={{
                        borderBottom: "1px solid var(--border)",
                        cursor: "pointer",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--accent-light)"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td style={{ padding: "20px 24px", textAlign: "center", color: "var(--text)", opacity: 0.8 }}>
                        {notice.id}
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontWeight: "700", color: "var(--text-h)" }}>{notice.title}</span>
                          {notice.content && (
                            <span style={{ fontSize: "0.82rem", color: "var(--text)", opacity: 0.7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "500px" }}>
                              {notice.content.substring(0, 80)}...
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "20px 24px", textAlign: "center" }}>
                        <span style={{
                          fontSize: "0.75rem",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          backgroundColor: "var(--code-bg)",
                          color: "var(--text-h)",
                          fontWeight: "500"
                        }}>
                          {notice.author || "관리자"}
                        </span>
                      </td>
                      <td style={{ padding: "20px 24px", textAlign: "center", color: "var(--text)", opacity: 0.8 }}>
                        {formatDate(notice.createAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NoticeList;