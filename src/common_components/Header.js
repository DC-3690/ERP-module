import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import Alian from "../assets/alian.png";
import Menu from "../assets/menu1.png";
import Que from "../assets/que.png";
import DC from "../assets/DC.jpg";

import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import About from "../page_components/About";
import "../styling/edit.css";
import Auth_context, { Authcont } from "./Auth_context";
import { db } from "../firebase/firebase_con";
import { collection, getDocs } from "firebase/firestore";

function Header() {
  document.title = "Home";

  const { currentuser, logout } = useContext(Authcont);
  const Navigate = useNavigate();

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      alert("logout successfull", currentuser.email);
      Navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const mail = useParams();

  const collect = collection(db, "employees");
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [count, setcount] = useState(0);
  let record;
  useEffect(() => {
    setcount(count + 1);
    // console.log(count);
    let show = async () => {
      let records = await getDocs(collect);
      setdata(records.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      record = records.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    };
    show();
  }, [data.length]);

  useEffect(() => {
    setcount(count + 1);
    // console.log(count);
    setdata1(data.filter((val) => val.mail == mail.mail)[0]);
  }, [data.length]);

  // console.log("data", data1);
  const [activelink, setactivelink] = useState("");
  // const [name, setname] = useState(data1.name);
  // const [image, setimage] = useState(data1.image);

  return (
    <Auth_context>
      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ backgroundColor: "#2f3990" }}
      >
        <div className="container-fluid">
          <img src={Alian} />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                onClick={() => setactivelink("menu")}
                className={`nav-item ${
                  activelink == "menu" ? "active2" : null
                }`}
              >
                <NavLink className="nav-link  ms-2 me-2" to="About">
                  <img src={Menu} />
                </NavLink>
              </li>
              <li
                onClick={() => setactivelink("dashboard")}
                className={`nav-item ${
                  activelink == "dashboard" ? "active2" : null
                }`}
              >
                <NavLink className="nav-link  text-light" to="Dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li
                onClick={() => setactivelink("employee")}
                className={`nav-item ${
                  activelink == "employee" ? "active2" : null
                }`}
              >
                <NavLink className="nav-link  text-light" to="Employees">
                  Employees
                </NavLink>
              </li>
              <li
                onClick={() => setactivelink("dept")}
                className={`nav-item ${
                  activelink == "dept" ? "active2" : null
                }`}
              >
                <NavLink className="nav-link  text-light" to="Department">
                  Department
                </NavLink>
              </li>

              <li class="nav-item  dropdown">
                <a
                  class="nav-link dropdown-toggle text-light"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reporting
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="List">
                    <a class="dropdown-item " href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-light"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Configuration
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <a className="nav-link text-secondary disabled" href="#">
                Company
              </a>
              <a className="nav-link text-light ms-2" href="#">
                Exxon mobile corp
              </a>

              <a className="nav-link text-light" href="#">
                <i
                  id="noti"
                  class="fa-regular fa-bell ms-2"
                  onClick={(e) => {
                    e.target.classList.add("fa-shake");
                  }}
                  onMouseOut={(e) => {
                    e.target.classList.remove("fa-shake");
                  }}
                ></i>
              </a>

              <li
                class="nav-item dropdown ms-2"
                style={{ listStyleType: "none" }}
              >
                <a
                  class="nav-link dropdown-toggle text-light"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  (US-Houston Campus)
                </a>

                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                </ul>
              </li>

              <li
                class="nav-item dropdown ms-2"
                style={{ listStyleType: "none" }}
              >
                <a
                  class="nav-link dropdown-toggle text-light"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Support
                </a>

                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                </ul>
              </li>

              <div className="nav-item d-flex ms-3">
                <Link className="nav-link  text-light">
                  {count >= 2 && data1.name}
                  <img
                    src={count >= 2 && data1.image}
                    className="rounded-circle ms-3"
                    style={{ height: "30px", width: "30px" }}
                  ></img>
                </Link>
                <span>
                  <i
                    class="fa-solid fa-arrow-right-from-bracket ms-2 fa-lg"
                    style={{ color: "#ffffff" }}
                    onClick={handlelogout}
                  ></i>
                </span>
              </div>
            </form>
          </div>
        </div>
      </nav>

      <Outlet />
    </Auth_context>
  );
}

export default Header;
