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

const Sidebar = ({ widthUpd }) => {
  const { logout } = AuthAdmin();
  const location = useLocation();
  const divRef = useRef(null);
  const [current, setCurrent] = useState(
    location.pathname == "/admin/all-attempts" ? "attempts" : "second"
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

          <li className="">
            <a href="#" className="d-flex align-items-center flex-row ps-3">
              <IoLink size={27} className="me-2 icon-color" />
              <span className="title">Form Usage</span>
            </a>
          </li>

          <li className="">
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
