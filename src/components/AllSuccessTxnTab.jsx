import React, { useState, useEffect } from "react";
import {
  AllSuccessListService,
  AllTransactionListService,
  deleteOtpLogsService,
  fetchReAttemptsStepLogs,
} from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
// import axios from "axios";

const AllSuccessTxnTab = ({ width }) => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

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

  useEffect(() => {
    setLoading(true);
    AllSuccessListService()
      .then((res) => {
        setLogs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onDeleteAttemptLogs = (phoneCode, phoneNumber) => {
    deleteOtpLogsService({ phoneCode, phoneNumber })
      .then((res) => {
        toast.success(res?.message);
        setLoading({ ...loaders, intervalTwo: true });
        fetchReAttemptsStepLogs(filters)
          .then((res) => {
            setLogs(res?.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading({ ...loaders, intervalTwo: false });
          });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
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
                  <th className="text-center">More</th>
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
                              <td className="text-center">{child.status}</td>
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
    </>
  );
};

export default AllSuccessTxnTab;
