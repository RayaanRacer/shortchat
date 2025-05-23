import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utils/utils";
import AuthAdmin from "../../services/admin.services";

const Login = () => {
  const { login } = AuthAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const navigateToDashboard = () => {
    navigate("/admin/all-attempts");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ password })
      .then((res) => {
        if (!res.token) {
          alert("Invalid credentials");
        } else {
          navigateToDashboard();
        }
      })
      .catch((err) => {
        console.log(err);

        alert(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-5"></h2>
            <div className="card my-5 mx-5">
              <form
                onSubmit={onSubmit}
                className="card-body p-lg-5"
                style={{ backgroundColor: "#ebf2fa" }}
              >
                <h2 className="text-center text-dark mb-5">Login</h2>
                <div className="mb-3">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    name="login"
                    value="Login"
                    className="btn btn-primary px-5 mb-5 w-100"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
