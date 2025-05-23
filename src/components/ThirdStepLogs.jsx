import React, { useState, useEffect } from "react";
import { fetchThirdStepLogs } from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
// import axios from "axios";

const ThirdStepLogs = ({ width }) => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
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
    fetchThirdStepLogs()
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

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("reached");

      try {
        const response = await axios.get(
          "http://shortchat.app/apis/user_list.php"
        );
        if (response.data.status === "success") {
          setUsers(response.data.users);
        } else {
          setError("No users found");
        }
      } catch (err) {
        console.log(err);

        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
    fetchThirdStepLogs(tempFilter)
      .then((res) => {
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
    fetchThirdStepLogs(tempFilter)
      .then((res) => {
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
    fetchThirdStepLogs(tempFilter)
      .then((res) => {
        setLogs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({ ...loaders, intervalTwo: false });
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
              Yesterday
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
              Today
            </h2>
          </div>
          <div className="details">
            <div className="row">
              {/* Left Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3 mx-auto">
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
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3 mx-auto">
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
                  <div className="col-sm-4 py-3 mx-auto">
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
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3 mx-auto">
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
                  <div className="col-sm-4 py-3 mx-auto">
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
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3 mx-auto">
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
                      class="col-sm-2 btn btn-dark my-2 mx-1 text-center px-2 rounded"
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
                  <div className="col-sm-4 py-3 mx-auto">
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
                </div>
              </div>

              {/* Right Side */}
              <div className="col-sm-6 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3 mx-auto">
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
                      class="col-sm-2 btn btn-dark my-2 mx-1 rounded px-2"
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
                </tr>
              </thead>
              <tbody>
                {logs?.groupedOTPLogs?.map((user, index) => (
                  <React.Fragment key={user.id}>
                    {/* Parent Row */}
                    <tr>
                      <th className="text-center">{index + 1}</th>
                      <td className="text-center">
                        {user.createdAt?.split(" ")[0]}
                      </td>
                      <td className="text-center">
                        {user.createdAt?.split(" ")[1]}
                      </td>
                      <td className="text-center">{user.phoneCode}</td>
                      <td className="text-center">{user.phoneNumber}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThirdStepLogs;
