import React, { useState, useEffect } from "react";
import {
  deleteOtpLogsService,
  fetchSecondStepLogs,
} from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
// import axios from "axios";

const SecondStepLogs = ({ width }) => {
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
    fetchSecondStepLogs()
      .then((res) => {
        const groupedByParentDate = res?.data?.groupedOTPLogs.reduce(
          (acc, parent) => {
            const dateOnly = parent.createdAt.split(" ")[0]; // Extract just the date

            // Find or create the group
            let group = acc.find((g) => g.date === dateOnly);
            if (!group) {
              group = { date: dateOnly, logs: [] };
              acc.push(group);
            }

            group.logs.push(parent);
            return acc;
          },
          []
        );

        res.data.groupedOTPLogs = groupedByParentDate;
        setLogs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onHandleAnyTime = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    let tempFilter = {
      ...filters,
      anyTime: data.start_date_1,
    };
    setFilters({ ...tempFilter });
    setLoading({ ...loaders, anyTime: true });
    fetchSecondStepLogs(tempFilter)
      .then((res) => {
        const groupedByParentDate = res?.data?.groupedOTPLogs.reduce(
          (acc, parent) => {
            const dateOnly = parent.createdAt.split(" ")[0]; // Extract just the date

            // Find or create the group
            let group = acc.find((g) => g.date === dateOnly);
            if (!group) {
              group = { date: dateOnly, logs: [] };
              acc.push(group);
            }

            group.logs.push(parent);
            return acc;
          },
          []
        );

        res.data.groupedOTPLogs = groupedByParentDate;
        setLogs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({ ...loaders, anyTime: false });
      });
  };

  const onHandleIntervalOne = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    let tempFilter = {
      ...filters,
      fromDate: data.start_date_1,
      toDate: data.start_date_2,
    };
    setFilters({ ...tempFilter });
    setLoading({ ...loaders, intervalOne: true });
    fetchSecondStepLogs(tempFilter)
      .then((res) => {
        const groupedByParentDate = res?.data?.groupedOTPLogs.reduce(
          (acc, parent) => {
            const dateOnly = parent.createdAt.split(" ")[0]; // Extract just the date

            // Find or create the group
            let group = acc.find((g) => g.date === dateOnly);
            if (!group) {
              group = { date: dateOnly, logs: [] };
              acc.push(group);
            }

            group.logs.push(parent);
            return acc;
          },
          []
        );

        res.data.groupedOTPLogs = groupedByParentDate;
        setLogs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({ ...loaders, intervalOne: false });
      });
  };

  const onHandleIntervalTwo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    let tempFilter = {
      ...filters,
      fromDateOne: data.start_date_1,
      toDateOne: data.start_date_2,
    };
    setFilters({ ...tempFilter });
    setLoading({ ...loaders, intervalTwo: true });
    fetchSecondStepLogs(tempFilter)
      .then((res) => {
        const groupedByParentDate = res?.data?.groupedOTPLogs.reduce(
          (acc, parent) => {
            const dateOnly = parent.createdAt.split(" ")[0]; // Extract just the date

            // Find or create the group
            let group = acc.find((g) => g.date === dateOnly);
            if (!group) {
              group = { date: dateOnly, logs: [] };
              acc.push(group);
            }

            group.logs.push(parent);
            return acc;
          },
          []
        );

        res.data.groupedOTPLogs = groupedByParentDate;
        setLogs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({ ...loaders, intervalTwo: false });
      });
  };

  const onDeleteAttemptLogs = (phoneCode, phoneNumber) => {
    deleteOtpLogsService({ phoneCode, phoneNumber })
      .then((res) => {
        toast.success(res?.message);
        setLoading({ ...loaders, intervalTwo: true });
        fetchSecondStepLogs(filters)
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
        <div style={{ border: "4px solid black", marginBottom: "5px" }}>
          <div className="cardHeader">
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              Yesterday's Attempts
            </h2>
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              Today's Attempts
            </h2>
          </div>
          <div className="details">
            <div className="row">
              {/* Left Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary px-0">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsYesterday ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.totalLogsYesterday ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsYesterday > 0
                            ? logs?.stats?.totalLogsYesterday /
                              logs?.stats?.uniqueLogsYesterday
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsToday ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.totalLogsToday ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsToday > 0
                            ? logs?.stats?.totalLogsToday /
                              logs?.stats?.uniqueLogsToday
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ border: "4px solid black", marginBottom: "5px" }}>
          <div className="cardHeader">
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              Previous Month
            </h2>
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              This Month
            </h2>
          </div>
          <div className="details">
            <div className="row">
              {/* Left Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary px-0">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsLastMonth ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.totalLogsLastMonth ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsLastMonth > 0
                            ? logs?.stats?.totalLogsLastMonth /
                              logs?.stats?.uniqueLogsLastMonth
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsThisMonth ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.totalLogsThisMonth ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.uniqueLogsThisMonth > 0
                            ? logs?.stats?.totalLogsThisMonth /
                              logs?.stats?.uniqueLogsThisMonth
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ border: "4px solid black", marginBottom: "5px" }}>
          <div className="cardHeader">
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              All Time
            </h2>
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              Any Time
            </h2>
          </div>
          <div className="details">
            <div className="row">
              {/* Left Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary px-0">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.allUniqueLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.allLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.allUniqueLogs > 0
                            ? logs?.stats?.allLogs / logs?.stats?.allUniqueLogs
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.anyTimeUniqueLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.anyTimeAllLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.anyTimeUniqueLogs > 0
                            ? Number(
                                logs?.stats?.anyTimeAllLogs /
                                  logs?.stats?.anyTimeUniqueLogs
                              )?.toFixed(2)
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="details">
            <div class="row" style={{ paddingLeft: "7.5%" }}>
              <div class="col-sm-6 px-4"></div>
              <div class="col-sm-6 px-4">
                <form class="row text-align:center" onSubmit={onHandleAnyTime}>
                  <div class="row">
                    <input
                      class="col-sm-3 bg-secondary rounded"
                      type="date"
                      name="start_date_1"
                    />
                    <input
                      class="col-sm-2 btn btn-dark my-2 mx-1 rounded"
                      type="submit"
                      name="Search"
                    />
                    <input
                      class="col-sm-2 btn btn-dark my-2 mx-1 rounded"
                      type="reset"
                      name="Reset"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div style={{ border: "4px solid black", marginBottom: "5px" }}>
          <div className="cardHeader">
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              Interval 1
            </h2>
            <h2
              className="bg-primary"
              style={{
                float: "right",
                width: "47.5%",
                textAlign: "center",
                color: "white",
              }}
            >
              Interval 2
            </h2>
          </div>
          <div className="details">
            <div className="row">
              {/* Left Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary px-0">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.limitOneUniqueLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.limitOneAllLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.limitOneUniqueLogs > 0
                            ? logs?.stats?.limitOneAllLogs /
                              logs?.stats?.limitOneUniqueLogs
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.limitTwoUniqueLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-warning">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          All attempts
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.limitTwoAllLogs ?? 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Average a/u
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {logs?.stats?.limitTwoUniqueLogs > 0
                            ? logs?.stats?.limitTwoAllLogs /
                              logs?.stats?.limitTwoUniqueLogs
                            : 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="details">
            <div class="row" style={{ paddingLeft: "7.5%" }}>
              <div class="col-sm-6 px-4">
                <form
                  class="row text-align:center"
                  onSubmit={onHandleIntervalOne}
                >
                  <div class="row">
                    <input
                      class="col-sm-3 bg-secondary rounded"
                      type="date"
                      name="start_date_1"
                    />
                    <input
                      class="col-sm-3 bg-secondary rounded"
                      type="date"
                      placeholder="DD-MM-YYYY"
                      name="start_date_2"
                    />
                    <input
                      class="col-sm-2 btn btn-dark my-2 mx-1 rounded"
                      type="submit"
                      name="Search"
                    />
                    <input
                      class="col-sm-2 btn btn-dark my-2 mx-1 rounded"
                      type="reset"
                      name="Reset"
                    />
                  </div>
                </form>
              </div>
              <div class="col-sm-6 px-4">
                <form
                  class="row text-align:center"
                  onSubmit={onHandleIntervalTwo}
                >
                  <div class="row">
                    <input
                      class="col-sm-3 bg-secondary rounded"
                      type="date"
                      name="start_date_1"
                    />
                    <input
                      class="col-sm-3 bg-secondary rounded"
                      type="date"
                      placeholder="DD-MM-YYYY"
                      name="start_date_2"
                    />
                    <input
                      class="col-sm-2 btn btn-dark my-2 mx-1 rounded"
                      type="submit"
                      name="Search"
                    />
                    <input
                      class="col-sm-2 btn btn-dark my-2 mx-1 rounded"
                      type="reset"
                      name="Reset"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

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
                  <th className="text-center">Attempts</th>
                  <th className="text-center">More</th>
                  <th className="text-center">Del</th>
                </tr>
              </thead>
              <tbody>
                {logs?.groupedOTPLogs?.map((users, p_index) => {
                  const [year, month, day] = users?.date.split("-");
                  const formattedDate = `${day}-${month}-${year}`;
                  return (
                    <React.Fragment key={users.id}>
                      {/* Parent Row */}
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center text-light bg-secondary"
                        >
                          {/* {users?.date} */}
                          {formattedDate}
                        </td>
                      </tr>
                      {users?.logs?.map((user, index) => {
                        const [year, month, day] = user.createdAt
                          ?.split(" ")[0]
                          .split("-");
                        const formattedDate = `${day}-${month}-${year}`;
                        return (
                          <>
                            <tr>
                              <th className="text-center">{index + 1}</th>
                              <td className="text-center">{formattedDate}</td>
                              <td className="text-center">
                                {user.createdAt?.split(" ")[1]}
                              </td>
                              <td className="text-center">{user.phoneCode}</td>
                              <td className="text-center">
                                {user.phoneNumber}
                              </td>
                              <td className="text-center">
                                {user.children?.length}
                              </td>
                              <td className="text-center">
                                <FaArrowAltCircleDown
                                  className="clickable-btn"
                                  onClick={() => toggleRow(p_index, index)}
                                  style={{
                                    cursor: "pointer",
                                    transform: expandedRows[
                                      `${p_index}${index}`
                                    ]
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                    transition: "transform 0.3s ease",
                                  }}
                                />
                              </td>
                              <td className="text-center">
                                <TbTrash
                                  className="clickable-btn"
                                  onClick={() =>
                                    onDeleteAttemptLogs(
                                      user.phoneCode,
                                      user.phoneNumber
                                    )
                                  }
                                />
                              </td>
                            </tr>
                            {/* Child Rows */}
                            {expandedRows[`${p_index}${index}`] &&
                              user.children?.slice(1).map((child, i) => {
                                const [year, month, day] = child.date
                                  ?.split(" ")[0]
                                  .split("-");
                                const formattedDate = `${day}-${month}-${year}`;
                                return (
                                  <tr
                                    key={i}
                                    className={`child-row ${
                                      expandedRows[`${p_index}${index}`]
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
                                    <td className="text-center">
                                      {formattedDate}
                                    </td>
                                    <td className="text-center">
                                      {child.date?.split(" ")[1]?.substr(0, 8)}
                                    </td>
                                    <td className="text-center">
                                      {child.phoneCode}
                                    </td>
                                    <td className="text-center">
                                      {child.phoneNumber}
                                    </td>
                                    <td className="text-center">---</td>
                                    <td className="text-center"></td>
                                    <td className="text-center">---</td>
                                  </tr>
                                );
                              })}{" "}
                          </>
                        );
                      })}
                    </React.Fragment>
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

export default SecondStepLogs;
