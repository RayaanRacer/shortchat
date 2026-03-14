import React, { useState, useEffect } from "react";
import {
  AllTransactionListService,
  deleteOtpLogsService,
  DeleteTransactionService,
  fetchReAttemptsStepLogs,
  RefundTransactionService,
} from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { MdCreditCard, MdDeleteForever, MdNotes } from "react-icons/md";
import { Dropdown, Modal, ModalBody } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import NotesManager from "./NotesManager";
// import axios from "axios";

const AllTxnTab = ({ width }) => {
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
    keyword: "",
  });

  const refreshAllTxn = () => {
    setLoading(true);
    AllTransactionListService(filters)
      .then((res) => {
        const sortedGroupedOTPLogs = res?.data?.groupedOTPLogs.map((user) => {
          const sortedTransactions = user.transactions.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });

          return {
            ...user,
            transactions: sortedTransactions,
          };
        });
        res.data.groupedOTPLogs = [...sortedGroupedOTPLogs];
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
    refreshAllTxn();
  }, [filters]);

  const onDeleteTransaction = (id) => {
    DeleteTransactionService(id)
      .then((res) => {
        toast.success(res?.message);
        AllTransactionListService()
          .then((res) => {
            const sortedGroupedOTPLogs = res?.data?.groupedOTPLogs.map(
              (user) => {
                const sortedTransactions = user.transactions.sort((a, b) => {
                  return new Date(b.created_at) - new Date(a.created_at);
                });

                return {
                  ...user,
                  transactions: sortedTransactions,
                };
              }
            );
            res.data.groupedOTPLogs = [...sortedGroupedOTPLogs];
            setLogs(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const onRefundTxn = (id) => {
    // setLoaders
    const data = {
      paymentId: id,
    };
    RefundTransactionService(data)
      .then((res) => {
        toast.success(res?.message);
        refreshAllTxn();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  const onShowModal = (id, data, isReject = false) => {
    setIsRejectOpen(isReject);
    setShow(true);
    setNotes(data);
    setId(id);
  };

  const onClose = () => {
    setShow(false);
    setIsRejectOpen(false);
    refreshAllTxn();
    setNotes([]);
    setId(null);
  };

  return (
    <>
      <div className="details" style={{ width: width, float: "right" }}>
        <div className="details-inner mx-sm-0">
          <div className="cardHeader py-3">
            <h2>Statistics</h2>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Type here to search..."
              onChange={(e) => setFilters({ keyword: e.target.value })}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr className="table-dark">
                  <th className="text-center">#</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Package</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Phone Code</th>
                  <th className="text-center">Phone Number</th>
                  <th className="text-center">Order Id</th>
                  <th className="text-center">Transaction Id</th>
                  <th className="text-center">BR.Id / UTR</th>
                  <th className="text-center">More</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                  {/* <th className="text-center">Del</th> */}
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
                        <td className="text-center">{"--"}</td>
                        <td className="text-center">{"--"}</td>
                        <td className="text-center">{user.phoneCode}</td>
                        <td className="text-center">{user.phone}</td>
                        <td className="text-center">
                          {user.transactions?.length}
                        </td>
                        <td className="text-center">{"--------"}</td>
                        <td className="text-center">{"--------"}</td>
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
                        <td className="text-center">{"--"}</td>
                        <td className="text-center">{"--"}</td>
                      </tr>
                      {/* Child Rows */}
                      {expandedRows[`${index}${index}`] &&
                        user.transactions?.map((child, i) => {
                          const [year, month, day] = child.created_at
                            ?.split(" ")[0]
                            .split("-");
                          const formattedDate = `${day}-${month}-${year}`;

                          let response = JSON.parse(child?.response ?? "{}");
                          if (response && response?.length != 0) {
                            response = response[0];
                          }

                          // Convert child.created_at to Date object
                          const txnDate = new Date(child.created_at);
                          const today = new Date();

                          // Check if the transaction is within the last 7 days
                          const diffInDays =
                            (today - txnDate) / (1000 * 60 * 60 * 24);
                          const isRecent = diffInDays <= 7;

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
                                backgroundColor: isRecent
                                  ? "#d1e7dd"
                                  : "#f8f9fa", // greenish for recent
                                borderTop: isRecent
                                  ? "2px solid #198754"
                                  : "2px solid #dee2e6", // optional visual partition
                                borderBottom: isRecent
                                  ? "2px solid #198754"
                                  : "2px solid #dee2e6",
                              }}
                            >
                              <td className="text-center">
                                <b> {i + 2} </b>
                              </td>
                              <td className="text-center">{formattedDate}</td>
                              <td className="text-center">
                                {child.created_at?.split(" ")[1]?.substr(0, 8)}
                              </td>
                              <td className="text-center">{child.packageId}</td>
                              <td className="text-center">{child.amount}</td>
                              <td className="text-center">{user.phoneCode}</td>
                              <td className="text-center">{user.phone}</td>
                              <td className="text-center">
                                {response?.order_id ?? "-------"}
                              </td>
                              <td className="text-center">
                                {response?.cf_payment_id ?? "-------"}
                              </td>
                              <td className="text-center">
                                {response?.bank_reference ?? "-------"}
                              </td>
                              <td className="text-center">
                                {response?.paymentDetails?.length
                                  ? response?.paymentDetails[0]?.rail?.utr
                                  : "-------"}
                              </td>
                              <td className="text-center">{child.status}</td>
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
                                        onDeleteTransaction(child.id)
                                      }
                                      className="d-flex align-items-center"
                                    >
                                      <MdDeleteForever className="me-2 text-danger" />{" "}
                                      Delete
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      onClick={() =>
                                        child.refund != "PENDING"
                                          ? onRefundTxn(child.id)
                                          : null
                                      }
                                      disabled={
                                        child.refund == "APPROVED" ||
                                        child.refund == "PENDING"
                                      }
                                      className="d-flex align-items-center"
                                    >
                                      <MdCreditCard className="me-2" /> Refund -{" "}
                                      {child.refund != "NO" ? child.refund : ""}
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      onClick={() => {
                                        onShowModal(
                                          child.id,
                                          child.allOrderNotes
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
            type="ALL"
            isRejectOpen={isRejectOpen}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AllTxnTab;
