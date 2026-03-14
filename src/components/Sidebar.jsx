import React, { useEffect, useRef, useState } from "react";
import "../assets/css/Admin.css";
import blueLogo from "../assets/images/blue_new_logo.png";
import { removeAccessToken } from "../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { IoLink } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FaEye, FaSignOutAlt } from "react-icons/fa";
import { SiPronounsdotpage } from "react-icons/si";
import { PiNumberSquareThreeBold, PiNumberSquareTwoBold } from "react-icons/pi";
import AuthAdmin from "../services/admin.services";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";

const Sidebar = ({ widthUpd }) => {
  const { logout } = AuthAdmin();
  const location = useLocation();
  const divRef = useRef(null);
  const [current, setCurrent] = useState(
    location.pathname == "/admin/all-attempts"
      ? "attempts"
      : location.pathname == "/admin/all-users"
      ? "users"
      : location.pathname == "/admin/support-requests"
      ? "support"
      : ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      widthUpd(rect.width);
    }
  }, []);

  return (
    <>
      <div
        className={`${
          location.pathname == "/admin/login" && "d-none"
        } navigation`}
        ref={divRef}
      >
        <ul style={{ paddingLeft: 0 }}>
          <li className="d-flex flex-row align-items-center justify-content-start mt-3 ps-4">
            <span className="">
              <img
                src={blueLogo}
                alt="logo"
                style={{ width: "25px", height: "25px" }}
              />
            </span>
            <span className="d-flex align-items-center ms-3 text-white fs-5">
              Shortchat
            </span>
          </li>

          <li className={current == "form-usage" ? "hovered" : ""}
          onClick={() => {
              setCurrent("form-usage");
              navigate("/admin/form-usage");
            }}
          >
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <IoLink size={27} className="me-2 icon-color" />
              <span className="title">Form Usage</span>
            </a>
          </li>

          <li
            className={current == "users" ? "hovered" : ""}
            onClick={() => {
              setCurrent("users");
              navigate("/admin/all-users");
            }}
          >
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <FiUsers size={24} className="me-2 icon-color" />
              <span className="title">All Users</span>
            </a>
          </li>

          <li className="">
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <FaEye size={24} className="me-2 icon-color" />
              <span className="title">All Views</span>
            </a>
          </li>

          <li
            className={current == "attempts" ? "hovered" : ""}
            onClick={() => {
              setCurrent("attempts");
              navigate("/admin/all-attempts");
            }}
          >
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <SiPronounsdotpage size={24} className="me-2 icon-color" />
              <span className="title">All Attempts</span>
            </a>
          </li>
          <li
            className={current == "transactions" ? "hovered" : ""}
            onClick={() => {
              setCurrent("transactions");
              navigate("/admin/all-transactions");
            }}
          >
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <MdOutlinePayments size={24} className="me-2 icon-color" />
              <span className="title">All Transactions</span>
            </a>
          </li>
          <li
            className={current == "support" ? "hovered" : ""}
            onClick={() => {
              setCurrent("support");
              navigate("/admin/support-requests");
            }}
          >
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <MdOutlineSupportAgent size={24} className="me-2 icon-color" />
              <span className="title">Support Requests</span>
            </a>
          </li>
          <li className="" onClick={logout}>
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <FaSignOutAlt size={24} className="me-2 icon-color" />
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
