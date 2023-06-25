import React, { useState } from "react";
import welcome from "../assets/login_image.png";
import Alian from "../assets/Alian_Logo.png";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import Header_route from "../Routing/Header_route";
import Header from "../common_components/Header";
import Login_comp from "./Login_comp";
import Registration_comp from "./Registration_comp";
import Auth_context from "../common_components/Auth_context";

function Login(props) {
  document.title = "Login";
  console.log("hello", props.f);
  const [flag, setflag] = useState(0);

  let obj = [<Registration_comp fun={check} />, <Login_comp fun={check} />];
  console.log("Flag", flag);

  function check() {
    setflag(!flag);
  }

  return (
    <Auth_context>
      <div
        class="row w-100"
        style={{
          marginLeft: "-30px",
          marginTop: "-20px",
          height: "1000px",
        }}
      >
        <div class=" col col-md-8 ">
          <img
            className="justify-content-left d-inline w-100 h-100"
            src={welcome}
          ></img>
        </div>

        <div class="col w-25 mx-auto my-auto  col-lg-2">
          {flag ? (
            <Registration_comp fun={check} flags={flag} />
          ) : (
            <Login_comp fun={check} flags={flag} />
          )}
        </div>
      </div>
    </Auth_context>
  );
}

export default Login;
