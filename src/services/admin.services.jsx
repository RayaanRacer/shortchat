import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthAdmin = () => {
  const [token, setToken] = useState(Cookies.get("admin-token"));
  const navigate = useNavigate();

  const saveToken = (token) => {
    Cookies.set("admin-token", token, { expires: 1 }); // expires in 1 day
  };

  const logout = () => {
    Cookies.remove("admin-token");
    navigate("/admin/login");
  };

  const login = async (data) => {
    const response = await axios.post(
      "https://shortchat.app/apis/dashboard/admin/admin_login.php",
      data
    );

    if (response.data.status == "success") {
      saveToken(response.data.token);
    }
    return response.data;
  };

  return {
    token,
    saveToken,
    logout,
    login,
  };
};

export default AuthAdmin;

export const fetchUsers = async () => {
  const response = await axios.get("http://shortchat.app/apis/user_list.php");
  return response.data;
};

export const fetchAttemptLLogs = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_otp_logs.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        anyTime: filters?.anyTime ?? "",
        fromDate: filters?.fromDate ?? "",
        toDate: filters?.toDate ?? "",
        fromDateOne: filters?.fromDateOne ?? "",
        toDateOne: filters?.toDateOne ?? "",
      },
    }
  );
  return response.data;
};

export const fetchSecondStepLogs = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_second_logs.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        anyTime: filters?.anyTime ?? "",
        fromDate: filters?.fromDate ?? "",
        toDate: filters?.toDate ?? "",
        fromDateOne: filters?.fromDateOne ?? "",
        toDateOne: filters?.toDateOne ?? "",
      },
    }
  );
  return response.data;
};

export const fetchThirdStepLogs = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_third_logs.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        anyTime: filters?.anyTime ?? "",
        fromDate: filters?.fromDate ?? "",
        toDate: filters?.toDate ?? "",
        fromDateOne: filters?.fromDateOne ?? "",
        toDateOne: filters?.toDateOne ?? "",
      },
    }
  );
  return response.data;
};
