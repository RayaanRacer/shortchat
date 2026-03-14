import React, { useState, useEffect } from "react";
import {
  AllRefundTxnsListService,
  AllSuccessListService,
  AllTransactionListService,
  AllUnderProcessTxnsListService,
  ApproveRefundTransactionService,
  DeclineRefundTransactionService,
  deleteOtpLogsService,
  fetchReAttemptsStepLogs,
} from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { MdCancel, MdCheck, MdNotes } from "react-icons/md";
import { Dropdown, Modal, ModalBody } from "react-bootstrap";
import NotesManager from "./NotesManager";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import axios from "axios";

const MySwal = withReactContent(Swal);

const AllRefundTab = ({ width }) => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const handleSubmitRemark = async () => {
    const { value: remark } = await MySwal.fire({
      title: "Submit Remark",
      input: "textarea",
      inputLabel: "Your Remark",
      inputPlaceholder: "Type your remark here...",
      inputAttributes: {
        "aria-label": "Type your remark here",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    });

    if (remark) {
      // Example: sending remark to API
      // await fetch("/api/remarks", { method: "POST", body: JSON.stringify({ remark }) });

      MySwal.fire({
        icon: "success",
        title: "Submitted!",
        text: `Your remark: ${remark}`,
      });

      console.log("Submitted Remark:", remark);
    }
  };

  const toggleRow = (p_index, index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [`${p_index}${index}`]: !prev[`${p_index}${index}`],
    }));
  };
  const [loaders, setLoaders] = useState({
    anyTime: false,
    intervalOne: false,
    intervalTwo: false,
  });
  const [filters, setFilters] = useState({
    anyTime: "",
    fromDate: "",
    toDate: "",
    fromDateOne: "",
    toDateOne: "",
  });

  const onRefreshTxn = () => {
    setLoading(true);
    AllRefundTxnsListService()
      .then((res) => {
        setLogs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    onRefreshTxn();
  }, []);

  const onApproveRefundTxn = (id) => {
    const data = { paymentId: id };
    ApproveRefundTransactionService(data)
      .then((res) => {
        toast.success(res?.message);
        onRefreshTxn();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  const onDeclineRefundTxn = async (id) => {
    const { value: remark } = await MySwal.fire({
      title: "Submit Remark",
      input: "textarea",
      inputLabel: "Your Remark",
      inputPlaceholder: "Type your remark here...",
      inputAttributes: {
        "aria-label": "Type your remark here",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    });

    if (remark) {
      const data = { paymentId: id, remark };
      DeclineRefundTransactionService(data)
        .then((res) => {
          // toast.success(res?.message);
          onRefreshTxn();
          MySwal.fire({
            icon: "success",
            title: "Submitted!",
            text: res?.message,
          });
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        })
        .finally(() => {});
    } else {
      MySwal.fire({
        icon: "error",
        title: "Cancelled Rejection !",
      });
    }
  };

  const onShowModal = (id, data, isReject = false) => {
    setIsRejectOpen(isReject);
    setShow(true);
    setNotes(data);
    setId(id);
  };

  const onClose = () => {
    setIsRejectOpen(false);
    setShow(false);
    onRefreshTxn();
    setNotes([]);
    setId(null);
  };

  return (
    <>
      <div className="details" style={{ width: width, float: "right" }}>
        <div className="details-inner mx-sm-0">
          <div className="cardHeader py-3">
            <h2>Statistics</h2>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr className="table-dark">
                  <th className="text-center">#</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Phone Code</th>
                  <th className="text-center">Phone Number</th>
                  <th className="text-center">Order Id</th>
                  <th className="text-center">Transaction Id</th>
                  <th className="text-center">UTR / BR Id</th>
                  <th className="text-center">Refund Status</th>
                  <th className="text-center">Approve</th>
                </tr>
              </thead>
              <tbody>
                {logs?.groupedOTPLogs?.map((user, index) => {
                  return (
                    <>
                      <tr>
                        <th className="text-center">{index + 1}</th>
                        <td className="text-center">{"--"}</td>
                        <td className="text-center">{"--"}</td>
                        <td className="text-center">{user.phoneCode}</td>
                        <td className="text-center">{user.phone}</td>
                        <td className="text-center">
                          {user.transactions?.length}
                        </td>
                        <td className="text-center">{"--"}</td>
                        <td className="text-center">{"--"}</td>
                        <td className="text-center">
                          <FaArrowAltCircleDown
                            className="clickable-btn"
                            onClick={() => {
                              toggleRow(index, index);
                            }}
                            style={{
                              cursor: "pointer",
                              transform: expandedRows[`${index}${index}`]
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </td>
                        <td className="text-center">--</td>
                      </tr>
                      {/* Child Rows */}
                      {expandedRows[`${index}${index}`] &&
                        user.transactions?.map((child, i) => {
                          const [year, month, day] = child.created_at
                            ?.split(" ")[0]
                            .split("-");
                          const formattedDate = `${day}-${month}-${year}`;
                          return (
                            <tr
                              key={i}
                              className={`child-row ${
                                expandedRows[`${index}${index}`]
                                  ? "show"
                                  : "hide"
                              }`}
                              style={{
                                transition: "all 0.3s ease",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              <td className="text-center">
                                <b> {i + 2} </b>
                              </td>
                              <td className="text-center">{formattedDate}</td>
                              <td className="text-center">
                                {child.created_at?.split(" ")[1]?.substr(0, 8)}
                              </td>
                              <td className="text-center">{user.phoneCode}</td>
                              <td className="text-center">{user.phone}</td>
                              <td className="text-center">{child.txnId}</td>
                              <td className="text-center">
                                {child.originalTransactionId}
                              </td>
                              <td className="text-center">{child.brId}</td>
                              <td className="text-center">{child.refund}</td>
                              {/* <td className="text-center clickable-btn">
                                <MdCheck
                                  size={20}
                                  className="me-2"
                                  title="Approve"
                                  onClick={() => onApproveRefundTxn(child.id)}
                                />
                                <MdCancel
                                  size={20}
                                  title="Reject"
                                  onClick={() => onDeclineRefundTxn(child.id)}
                                /> */}

                              <td
                                className="text-center"
                                style={{ height: "100%" }}
                              >
                                <Dropdown align="end">
                                  <Dropdown.Toggle
                                    as="span"
                                    className="btn p-0 border-0 bg-transparent"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <BsThreeDotsVertical size={20} />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() =>
                                        onApproveRefundTxn(child.id)
                                      }
                                      className="d-flex align-items-center"
                                    >
                                      <MdCheck
                                        size={20}
                                        className="me-2"
                                        title="Approve"
                                      />
                                      Approve
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      onClick={() =>
                                        onDeclineRefundTxn(child.id)
                                      }
                                      className="d-flex align-items-center"
                                    >
                                      <MdCancel className="me-2" /> Reject
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      onClick={() => {
                                        onShowModal(
                                          child.id,
                                          child.refundOrderNotes
                                        );
                                      }}
                                      className="d-flex align-items-center"
                                    >
                                      <MdNotes className="me-2" /> Notes
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => {
                                        onShowModal(
                                          child.id,
                                          child.rejected_notes,
                                          true
                                        );
                                      }}
                                      className="d-flex align-items-center"
                                    >
                                      <MdNotes className="me-2" /> Rejected
                                      Notes
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          );
                        })}{" "}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={onClose}>
        <ModalBody>
          <NotesManager
            onClose={onClose}
            paymentId={id}
            data={notes}
            type="REFUND"
            isRejectOpen={isRejectOpen}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AllRefundTab;
