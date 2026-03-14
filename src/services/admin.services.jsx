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

export const fetchReAttemptsStepLogs = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_reattempts.php",
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

export const deleteOtpLogsService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/delete_second_step.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        phoneCode: filters?.phoneCode ?? "",
        phoneNumber: filters?.phoneNumber ?? "",
      },
    }
  );
  return response.data;
};

export const UsersListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_login_accounts.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Transaction apis
export const AllTransactionListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_all_transactions.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: filters,
    }
  );
  return response.data;
};

export const AllSupportRequestListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/support_request.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: filters,
    }
  );
  return response.data;
};


export const DeleteSupportRequestByIdService = async (id) => {
  const token = Cookies.get("admin-token");
  const response = await axios.delete(
    `https://shortchat.app/apis/dashboard/admin/delete_support_request.php?requestId=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return response.data;
};


export const AllSuccessListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_success_transactions.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const AllUnderProcessTxnsListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_under_process_transaction.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const AllUnderProcessTxnsInactivatedListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_under_process_transaction_inactivated.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const AllRefundTxnsListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_refund_transaction.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const AllRefundedTxnsListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/get_refunded_transaction.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const AllCallUserListService = async (filters) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    "https://shortchat.app/apis/dashboard/admin/call_user.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const DeleteTransactionService = async (id) => {
  const token = Cookies.get("admin-token");
  const response = await axios.get(
    `https://shortchat.app/apis/dashboard/admin/delete_order.php?id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const RefundTransactionService = async (data) => {
  const token = Cookies.get("admin-token");
  const response = await axios.post(
    `https://shortchat.app/apis/dashboard/admin/refund_transaction.php`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const ApproveRefundTransactionService = async (data) => {
  const token = Cookies.get("admin-token");
  const response = await axios.post(
    `https://shortchat.app/apis/dashboard/admin/approve_refund_txn.php`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const DeclineRefundTransactionService = async (data) => {
  const token = Cookies.get("admin-token");
  const response = await axios.post(
    `https://shortchat.app/apis/dashboard/admin/decline_refund_transaction.php`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const AddNotesService = async (data) => {
  const token = Cookies.get("admin-token");
  const response = await axios.post(
    `https://shortchat.app/apis/dashboard/admin/add_order_note.php`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

