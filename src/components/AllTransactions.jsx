import React, { useState, useEffect } from "react";
import {
  AllCallUserListService,
  fetchAttemptLLogs,
  fetchUsers,
} from "../services/admin.services";
import axios from "axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import AllTxnTab from "./AllTxnTab";
import AllSuccessTxnTab from "./AllSuccessTxnTab";
import AllUnderProcessTxnTab from "./AllUnderProcessTxnTab";
import AllRefundTxnTab from "./AllRefundTxnTab";
import AllUnderProcessTxnInactivatedTab from "./AllUnderProccessTxnInactivated";
import CallUser from "./CallUser";
import RefundedTxnTab from "./RefundedTxnTab";
// import axios from "axios";

const AttemptLogs = ({ width }) => {
  const [current, setCurrent] = useState("AllTxn");

  const onHandleChange = (param) => {
    setCurrent(param);
  };

  return (
    <React.Fragment>
      <div
        className="details mb-0 pb-0"
        style={{ width: width, float: "right" }}
      >
        <span
          className={`btn btn-sm ${
            current == "AllTxn" ? "btn-primary" : "btn-secondary"
          } me-2 my-2`}
          onClick={() => onHandleChange("AllTxn")}
        >
          All Transactions
        </span>
        <span
          className={`btn btn-sm ${
            current == "SuccessTxn" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("SuccessTxn")}
        >
          Success Transactions
        </span>
        <span
          className={`btn btn-sm ${
            current == "UnderTxn" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("UnderTxn")}
        >
          Under Process Transactions (Active)
        </span>

        <span
          className={`btn btn-sm ${
            current == "inactive" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("inactive")}
        >
          Under Process Transactions (Inactive)
        </span>
        <span
          className={`btn btn-sm ${
            current == "refundTxn" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("refundTxn")}
        >
          Refund Transactions
        </span>
        <span
          className={`btn btn-sm ${
            current == "refunededTxn" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("refunededTxn")}
        >
          Refunded Transactions
        </span>
        <span
          className={`btn btn-sm ${
            current == "calluser" ? "btn-primary" : "btn-secondary"
          }  me-2 my-2`}
          onClick={() => onHandleChange("calluser")}
        >
          Call User
        </span>
      </div>
      {(current == "AllTxn" || !current) && <AllTxnTab width={width} />}
      {current == "SuccessTxn" && <AllSuccessTxnTab width={width} />}
      {current == "UnderTxn" && <AllUnderProcessTxnTab width={width} />}
      {current == "refundTxn" && <AllRefundTxnTab width={width} />}
      {current == "inactive" && (
        <AllUnderProcessTxnInactivatedTab width={width} />
      )}
      {current == "calluser" && <CallUser width={width} />}
      {current == "refunededTxn" && <RefundedTxnTab width={width} />}
    </React.Fragment>
  );
};

export default AttemptLogs;
