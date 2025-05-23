import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AllUsers from "../../components/AllUsers";
import AttemptLogs from "../../components/AttemptLogs";

const AdminDashboard = () => {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const containerRef = useRef(null);
  const [tableWidth, setTableWidth] = useState("100%");

  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.getBoundingClientRect().width;
      const calculatedWidth = totalWidth - 300;
      setTableWidth(`${calculatedWidth}px`);
    }
  }, [sidebarWidth]);

  return (
    <>
      <div ref={containerRef}>
        <Sidebar widthUpd={setSidebarWidth} />
        <AttemptLogs width={tableWidth} />
      </div>
    </>
  );
};

export default AdminDashboard;
