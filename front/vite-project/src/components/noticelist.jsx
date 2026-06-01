import React, { useEffect, useState } from "react";
import "./noticelist.css";

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/notice/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 발생했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="notice-loading">
        <div className="spinner"></div>
        <p>공지사항을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notice-error">
        <p>⚠️ 오류 발생: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h2>공지사항 목록</h2>
        <span className="notice-count">전체 {notices.length}개</span>
      </div>
      
      {notices.length === 0 ? (
        <div className="notice-empty">
          <p>등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="notice-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id}>
                  <td className="col-id">{notice.id}</td>
                  <td className="col-title">
                    <div className="title-wrapper">
                      <span className="title-text">{notice.title}</span>
                      {notice.content && (
                        <span className="content-preview" title={notice.content}>
                          {notice.content.length > 50 
                            ? notice.content.substring(0, 50) + "..." 
                            : notice.content}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="col-author">
                    <span className="author-badge">{notice.author || "관리자"}</span>
                  </td>
                  <td className="col-date">{formatDate(notice.createAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NoticeList;
