import React, { useState, useEffect } from "react";
import { fetchAttemptLLogs, fetchUsers } from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import AllAttemptLogs from "./AllAttemptLogs";
import SecondStepLogs from "./SecondStepLogs";
import ThirdStepLogs from "./ThirdStepLogs";
import ReAttemptLogs from "./ReAttemptLogs";
// import axios from "axios";

const AttemptLogs = ({ width }) => {
  const [current, setCurrent] = useState("SecondStepLogs");

  const onHandleChange = (param) => {
    setCurrent(param);
  };

  return (
    <React.Fragment>
      <div
        className="details mb-0 pb-0"
        style={{ width: width, float: "right" }}
      >
        {/* <span
          className={`btn btn-sm ${
            current == "AllAttempts" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("AllAttempts")}
        >
          All Attempts
        </span> */}
        <span
          className={`btn btn-sm ${
            current == "SecondStepLogs" ? "btn-primary" : "btn-secondary"
          } me-2 my-2`}
          onClick={() => onHandleChange("SecondStepLogs")}
        >
          Second Steps
        </span>
        <span
          className={`btn btn-sm ${
            current == "ThirdStepLogs" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("ThirdStepLogs")}
        >
          Third Steps
        </span>
        <span
          className={`btn btn-sm ${
            current == "ReAttemptLogs" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("ReAttemptLogs")}
        >
          Re-Attempt Logs
        </span>
      </div>
      {(current == "AllAttempts" || !current) && (
        <AllAttemptLogs width={width} />
      )}
      {current == "SecondStepLogs" && <SecondStepLogs width={width} />}
      {current == "ThirdStepLogs" && <ThirdStepLogs width={width} />}
      {current == "ReAttemptLogs" && <ReAttemptLogs width={width} />}
    </React.Fragment>
  );
};

export default AttemptLogs;
