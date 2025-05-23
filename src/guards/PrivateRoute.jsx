import React from "react";
import { Navigate } from "react-router-dom";
import AuthAdmin from "../services/admin.services";

const PrivateRoute = ({ element }) => {
  const { token } = AuthAdmin();
  return token ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
