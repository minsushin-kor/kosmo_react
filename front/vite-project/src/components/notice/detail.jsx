import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../utils/api.js";

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Priority 1: Fetch notice details directly from the backend DB using custom fetch wrapper
    request(`/notice/detail/${id}`)
      .then((data) => {
        setNotice(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend notice detail API is currently offline. Using localStorage fallback.", err);
        
        // Priority 2: Fallback to localStorage cache
        const savedNotices = localStorage.getItem("maum_notices");
        if (savedNotices) {
          try {
            const list = JSON.parse(savedNotices);
            const found = list.find((n) => n.id === parseInt(id));
            if (found) {
              setNotice(found);
              setLoading(false);
              return;
            }
          } catch (storageErr) {
            console.error("Error parsing notices for detail view", storageErr);
          }
        }
        setNotice(null);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
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
        <p>공지글을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="card" style={{ padding: "64px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <span style={{ fontSize: "3rem" }}>⚠️</span>
        <h3 style={{ marginTop: "16px", color: "var(--text-h)" }}>공지사항을 찾을 수 없습니다.</h3>
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "24px" }}>삭제되었거나 유효하지 않은 게시물 번호입니다.</p>
        <button onClick={() => navigate("/notice")} className="btn btn-primary">
          공지 목록으로 가기 ↩️
        </button>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in-up" style={{ padding: "40px", textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
      {/* Title block */}
      <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "20px", marginBottom: "24px" }}>
        <h2 style={{
          fontSize: "1.8rem",
          fontWeight: "800",
          color: "var(--text-h)",
          lineHeight: "1.4",
          margin: "0 0 16px 0"
        }}>
          {notice.title}
        </h2>
        
        <div style={{
          display: "flex",
          gap: "24px",
          fontSize: "0.88rem",
          color: "var(--text)",
          opacity: 0.85
        }}>
          <span>✍️ 작성자: <strong style={{ color: "var(--text-h)" }}>{notice.author || "관리자"}</strong></span>
          <span>📅 등록일: {formatDate(notice.createAt)}</span>
        </div>
      </div>

      {/* Content body */}
      <div style={{
        fontSize: "1rem",
        lineHeight: "1.8",
        color: "var(--text)",
        whiteSpace: "pre-line",
        minHeight: "200px",
        paddingBottom: "32px"
      }}>
        {notice.content}
      </div>

      {/* Action Footer */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid var(--border)",
        paddingTop: "24px",
        marginTop: "16px"
      }}>
        <button 
          onClick={() => {
            // Simple navigation helper to open previous/next notices if desired
            navigate("/notice");
          }} 
          className="btn btn-secondary"
          style={{ padding: "10px 20px" }}
        >
          목록으로 돌아가기
        </button>

        <span style={{ fontSize: "0.85rem", opacity: 0.6 }}>
          마음식빵 소식지 # {notice.id}
        </span>
      </div>
    </div>
  );
}

export default NoticeDetail;