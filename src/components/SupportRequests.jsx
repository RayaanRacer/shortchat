import React, { useState, useEffect } from "react";
import { AllSupportRequestListService, DeleteSupportRequestByIdService } from "../services/admin.services";
import { FaArrowAltCircleDown, FaEye, FaTrash } from "react-icons/fa";

/* ─── Modal Component ─────────────────────────────────── */
const SupportDetailModal = ({ data, onClose }) => {
  if (!data) return null;
  const { userId, phone, item } = data;

  const rawDate = item.createdAt?.split(" ")[0];
  const [year, month, day] = rawDate ? rawDate.split("-") : ["--", "--", "--"];
  const formattedDate = rawDate ? `${day}-${month}-${year}` : "--";
  const time = item.createdAt?.split(" ")[1]?.substr(0, 8) ?? "--";

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1040,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
          zIndex: 1050,
          width: "480px",
          maxWidth: "95vw",
          animation: "fadeInScale 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
            borderRadius: "12px 12px 0 0",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ margin: 0, color: "#fff", fontWeight: 600 }}>
            Support Request Details
          </h5>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.18)",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              width: 32,
              height: 32,
              fontSize: 18,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <div
            style={{
              background: "#f0f4ff",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 18,
              display: "flex",
              gap: 32,
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>User ID</div>
              <div style={{ fontWeight: 700, color: "#1a73e8", fontSize: 16 }}>#{userId}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Phone</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{phone}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Ticket ID</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{item.id}</div>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Subject</div>
            <div style={{ background: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: 6, padding: "10px 14px", fontWeight: 600, fontSize: 15 }}>
              {item.subject}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Description</div>
            <div style={{ background: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: 6, padding: "12px 14px", fontSize: 14, color: "#333", whiteSpace: "pre-wrap", minHeight: 70 }}>
              {item.description}
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#666", marginTop: 4 }}>
            <span>📅 {formattedDate}</span>
            <span>🕐 {time}</span>
          </div>
        </div>

        <div style={{ padding: "12px 24px", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} className="btn btn-primary btn-sm" style={{ minWidth: 80 }}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
};

/* ─── Main Component ──────────────────────────────────── */
const SupportRequests = ({ width }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});
  const [modalData, setModalData] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDelete = (requestId) => {
    if (!window.confirm("Are you sure you want to delete this support request?")) return;
    setDeleting(requestId);
    DeleteSupportRequestByIdService(requestId)
      .then((res) => {
        if (res?.status === "success" || res?.status === 200) {
          // Remove deleted ticket from state
          setLogs((prev) =>
            prev
              .map((user) => ({
                ...user,
                contactSupport: user.contactSupport.filter(
                  (item) => item.id !== requestId
                ),
              }))
              .filter((user) => user.contactSupport.length > 0)
          );
        } else {
          alert(res?.message ?? "Failed to delete. Please try again.");
        }
      })
      .catch(() => alert("Error deleting the request."))
      .finally(() => setDeleting(null));
  };

  const openModal = (userId, phone, item) => setModalData({ userId, phone, item });
  const closeModal = () => setModalData(null);

  useEffect(() => {
    setLoading(true);
    AllSupportRequestListService()
      .then((res) => setLogs(res?.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="details" style={{ width: width, float: "right" }}>
        <div className="details-inner mx-sm-0">
          <div className="cardHeader py-3">
            <h2>Support Requests</h2>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr className="table-dark">
                    <th className="text-center">#</th>
                    <th className="text-center">User ID</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Requests</th>
                    <th className="text-center">Expand</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted">
                        No support requests found.
                      </td>
                    </tr>
                  ) : (
                    logs.map((user, index) => (
                      <React.Fragment key={index}>
                        {/* ── Parent Row ── */}
                        <tr
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleRow(index)}
                        >
                          <th className="text-center">{index + 1}</th>
                          <td className="text-center">{user.userId}</td>
                          <td className="text-center">{user.phone}</td>
                          <td className="text-center">
                            <span className="badge bg-primary">
                              {user.contactSupport?.length ?? 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <FaArrowAltCircleDown
                              style={{
                                transform: expandedRows[index]
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                                color: "#1a73e8",
                              }}
                            />
                          </td>
                        </tr>

                        {/* ── Child Rows ── */}
                        {expandedRows[index] && (
                          <tr>
                            <td colSpan={5} style={{ padding: 0, background: "#f0f4ff" }}>
                              <table className="table table-sm mb-0" style={{ background: "#f0f4ff" }}>
                                <thead>
                                  <tr style={{ background: "#dce8ff" }}>
                                    <th className="text-center" style={{ width: 50 }}>S.No</th>
                                    <th className="text-center">Ticket ID</th>
                                    <th className="text-center">Subject</th>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">View</th>
                                    <th className="text-center">Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {user.contactSupport?.map((item, i) => {
                                    const rawDate = item.createdAt?.split(" ")[0];
                                    const [yr, mo, dy] = rawDate ? rawDate.split("-") : ["--", "--", "--"];
                                    const formattedDate = rawDate ? `${dy}-${mo}-${yr}` : "--";
                                    return (
                                      <tr key={i}>
                                        <td className="text-center">{i + 1}</td>
                                        <td className="text-center text-muted">#{item.id}</td>
                                        <td className="text-center">{item.subject}</td>
                                        <td className="text-center">{formattedDate}</td>
                                        <td className="text-center">
                                          <button
                                            className="btn btn-sm btn-primary"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              openModal(user.userId, user.phone, item);
                                            }}
                                            title="View Details"
                                          >
                                            <FaEye />
                                          </button>
                                        </td>
                                        <td className="text-center">
                                          <button
                                            className="btn btn-sm btn-danger"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDelete(item.id);
                                            }}
                                            disabled={deleting === item.id}
                                            title="Delete Request"
                                          >
                                            {deleting === item.id ? (
                                              <span className="spinner-border spinner-border-sm" />
                                            ) : (
                                              <FaTrash />
                                            )}
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <SupportDetailModal data={modalData} onClose={closeModal} />
    </>
  );
};

export default SupportRequests;
