import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/api.js";

function NoticeWrite() {
  const navigate = useNavigate();
  const data = useRef({ title: "", author: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.current.title || !data.current.content) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    // Retrieve existing notices from localStorage
    const savedNotices = localStorage.getItem("maum_notices");
    let noticeList = [];
    if (savedNotices) {
      try {
        noticeList = JSON.parse(savedNotices);
      } catch (err) {
        console.error("Failed to parse saved notices", err);
      }
    }

    // Generate a new ID (highest ID + 1)
    const nextId = noticeList.length > 0
      ? Math.max(...noticeList.map(n => n.id)) + 1
      : 1;

    const newNotice = {
      id: nextId,
      title: data.current.title,
      author: data.current.author || "관리자",
      createAt: new Date().toISOString(),
      content: data.current.content
    };

    // Save to localStorage for instant UI responsiveness
    localStorage.setItem("maum_notices", JSON.stringify([newNotice, ...noticeList]));

    // POST to the backend (exclude id so JPA performs an INSERT instead of an UPDATE)
    const apiPayload = {
      title: newNotice.title,
      author: newNotice.author,
      content: newNotice.content
    };

    // POST to the backend using custom fetch wrapper (token and Content-Type injected automatically)
    request("/notice/create", {
        method: "POST",
        body: JSON.stringify(apiPayload)
    })
    .then((res) => {
      console.log("Successfully posted notice to backend", res);
    })
    .catch((err) => {
      console.warn("Backend is currently offline or errored during create, but local save succeeded.", err);
    });

    alert("🧁 새로운 공지사항이 성공적으로 등록되었습니다!");
    navigate("/notice");
  };

  return (
    <div className="card animate-fade-in-up" style={{ padding: "32px", textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
      <h3 style={{ fontSize: "1.5rem", marginBottom: "8px", fontWeight: "800" }}>✍️ 공지사항 작성</h3>
      <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "32px" }}>
        마음식빵 식구들에게 전할 정성 어린 이야기를 적어주세요.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>공지 제목</label>
          <input
            type="text"
            placeholder="공지사항 제목을 입력해 주세요."
            onChange={(e) => {
              data.current.title = e.target.value;
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text-h)",
              fontSize: "0.95rem",
              fontFamily: "var(--sans)",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>작성자</label>
          <input
            type="text"
            placeholder="관리자 (미입력 시 '관리자'로 등록)"
            onChange={(e) => {
              data.current.author = e.target.value;
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text-h)",
              fontSize: "0.95rem",
              fontFamily: "var(--sans)",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-h)" }}>상세 공지 내용</label>
          <textarea
            placeholder="공지사항의 본문 내용을 입력해 주세요. 따뜻한 마음을 나누는 공간입니다."
            onChange={(e) => {
              data.current.content = e.target.value;
            }}
            rows="10"
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text-h)",
              fontSize: "0.95rem",
              fontFamily: "var(--sans)",
              resize: "none",
              boxSizing: "border-box",
              lineHeight: "1.7"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "16px", marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: "14px" }}>
            공지 등록하기 💌
          </button>
          <button type="button" onClick={() => navigate("/notice")} className="btn btn-secondary" style={{ flex: 1, padding: "14px" }}>
            취소하고 돌아가기
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeWrite;
