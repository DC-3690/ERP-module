import Header from "../common_components/Header";
import About from "../page_components/About";
import Dashboard from "../page_components/Dashboard";

import { Route, Routes, Navigate } from "react-router-dom";

import Employees from "../page_components/Employees";
import Department from "../page_components/Department";
import Login from "../page_components/login";
import { useContext, useState } from "react";
import { Authcont } from "../common_components/Auth_context";

function Header_route({ uid }) {
  const [id, setid] = useState(uid);
  // console.log("uid", uid);

  const { currentuser, flag } = useContext(Authcont);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Header/:mail" element={<Header />}>
          <Route path="About" element={<About />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Employees" element={<Employees />} />
          <Route path="Department" element={<Department />} />
        </Route>

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default Header_route;
