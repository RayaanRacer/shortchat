import React, { useState, useEffect } from "react";
import {
  fetchAttemptLLogs,
  fetchUsers,
  UsersListService,
} from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Button } from "react-bootstrap";
// import axios from "axios";

const AllUsers = ({ width }) => {
  const [logs, setLogs] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [type, setType] = useState("loggedIn");
  const [loggedInUserList, setLoggedInUserList] = useState([]);
  const [loggedOutUserList, setLoggedOutUserList] = useState([]);
  const [userStats, setUserStats] = useState();

  useEffect(() => {
    UsersListService()
      .then((res) => {
        setLoggedInUserList(res?.data?.loggedInUsersList);
        setLoggedOutUserList(res?.data?.loggedOutUsersList);
        setUserStats(res?.data?.stats);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
                width: "100%",
                textAlign: "center",
                color: "white",
              }}
            >
              Registered Users
            </h2>
          </div>
          <div className="details">
            <div className="row">
              {/* Left Side */}
              <div className="col-sm-12 px-4">
                <div className="row px-3">
                  {/* Card 1 */}
                  <div className="col-sm-4 py-3">
                    <div className="card bg-secondary px-0">
                      <div className="card-body">
                        <h5
                          className="card-title text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Total Users &nbsp;
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {Number(userStats?.allLoggedInUsers ?? 0) +
                            Number(userStats?.allLoggedOutUsers ?? 0)}
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
                          Logged In Users
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {Number(userStats?.allLoggedInUsers ?? 0)}
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
                          Logged Out Users
                        </h5>
                        <h3 className="card-text text-light text-center">
                          {Number(userStats?.allLoggedOutUsers ?? 0)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-inner mx-sm-0 mt-2">
          <div className="cardHeader py-3">
            <h2>Statistics</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Button
                className={`btn btn-primary ${
                  type == "loggedIn" ? "active" : ""
                } me-2`}
                onClick={() => setType("loggedIn")}
              >
                Logged In Users
              </Button>
              <Button
                className={`btn btn-primary ${
                  type != "loggedIn" ? "active" : ""
                } `}
                onClick={() => setType("loggedOut")}
              >
                Logged Out Users
              </Button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr className="table-dark">
                  <th className="text-center">#</th>
                  <th className="text-center">Phone Code</th>
                  <th className="text-center">Phone Number</th>
                  <th className="text-center">Free Coins</th>
                  <th className="text-center">Earned Coins</th>
                </tr>
              </thead>
              <tbody>
                {type == "loggedIn" &&
                  loggedInUserList?.map((user, index) => (
                    <React.Fragment key={user.id}>
                      <tr>
                        <th className="text-center">{index + 1}</th>
                        <td className="text-center">{user?.phoneCode}</td>
                        <td className="text-center">{user?.phoneNumber}</td>
                        <td className="text-center">{user.free_coins}</td>
                        <td className="text-center">{user.earned_coins}</td>
                      </tr>
                    </React.Fragment>
                  ))}

                {type == "loggedOut" &&
                  loggedOutUserList?.map((user, index) => (
                    <React.Fragment key={user.id}>
                      <tr>
                        <th className="text-center">{index + 1}</th>
                        <td className="text-center">{user?.phoneCode}</td>
                        <td className="text-center">{user?.phoneNumber}</td>
                        <td className="text-center">{user.free_coins}</td>
                        <td className="text-center">{user.earned_coins}</td>
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

export default AllUsers;
