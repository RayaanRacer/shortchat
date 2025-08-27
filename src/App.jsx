import React, { useEffect, useRef, useState } from "react";
import Login from "./pages/admin/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRoute from "./guards/PrivateRoute";
import SecondStepLogs from "./components/SecondStepLogs";
import AttemptLogs from "./components/AttemptLogs";
import Sidebar from "./components/Sidebar";
import ThirdStepLogs from "./components/ThirdStepLogs";
import AllUsers from "./components/AllUsers";
import AllTransactions from "./components/AllTransactions";

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const containerRef = useRef(null);
  const [tableWidth, setTableWidth] = useState("75%");

  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.getBoundingClientRect().width;
      const calculatedWidth = totalWidth - 300;
      setTableWidth(`${calculatedWidth}px`);
    }
  }, [sidebarWidth]);
  return (
    <>
      <BrowserRouter>
        <React.Fragment ref={containerRef}>
          <Routes>
            <Route
              path="/admin/login"
              element={
                <>
                  {" "}
                  <Login />
                </>
              }
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute
                  element={
                    <>
                      <Sidebar widthUpd={setSidebarWidth} />
                      <AttemptLogs width={tableWidth} />
                    </>
                  }
                />
              }
            />

            <Route
              path="/admin/all-attempts"
              element={
                <PrivateRoute
                  element={
                    <>
                      <Sidebar widthUpd={setSidebarWidth} />
                      <AttemptLogs width={tableWidth} />
                    </>
                  }
                />
              }
            />

            <Route
              path="/admin/second-step-logs"
              element={
                <PrivateRoute
                  element={
                    <>
                      <Sidebar widthUpd={setSidebarWidth} />
                      <SecondStepLogs width={tableWidth} />
                    </>
                  }
                />
              }
            />

            <Route
              path="/admin/third-step-logs"
              element={
                <PrivateRoute
                  element={
                    <>
                      <Sidebar widthUpd={setSidebarWidth} />
                      <ThirdStepLogs width={tableWidth} />
                    </>
                  }
                />
              }
            />

            <Route
              path="/admin/all-users"
              element={
                <PrivateRoute
                  element={
                    <>
                      <Sidebar widthUpd={setSidebarWidth} />
                      <AllUsers width={tableWidth} />
                    </>
                  }
                />
              }
            />

            <Route
              path="/admin/all-transactions"
              element={
                <PrivateRoute
                  element={
                    <>
                      <Sidebar widthUpd={setSidebarWidth} />
                      <AllTransactions width={tableWidth} />
                    </>
                  }
                />
              }
            />
          </Routes>
        </React.Fragment>
      </BrowserRouter>
    </>
  );
}

export default App;
