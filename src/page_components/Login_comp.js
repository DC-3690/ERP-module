import { React, useContext, useRef, useState } from "react";

import welcome from "../assets/login_image.png";
import Alian from "../assets/Alian_Logo.png";
import { NavLink, useNavigate } from "react-router-dom";

import Auth_context, { Authcont } from "../common_components/Auth_context";

function Login_comp(props) {
  let [cls, setcls] = useState({
    icon: "fa-regular fa-eye-slash",
    typo: "password",
  });

  function pass() {
    if (cls.icon != "fa-regular fa-eye-slash") {
      setcls({ icon: "fa-regular fa-eye-slash", typo: "password" });
    } else {
      setcls({ icon: "fa-sharp fa-regular fa-eye", typo: "text" });
    }
  }

  const { signin, currentuser, forgotpassword } = useContext(Authcont);
  const [pass1, resetpass] = useState();
  const [str, setstr] = useState("Login");

  const reff1 = useRef();
  const reff2 = useRef();

  const Navigate = useNavigate();
  const [loading, setloading] = useState();

  const handlelogin = async (e) => {
    e.preventDefault();

    if (str == "Login") {
      if (reff1.current.value == "" || reff2.current.value == "") {
        alert("incorrect user or password");
        return;
      }
      try {
        setloading(true);
        await signin(reff1.current.value, reff2.current.value);
        Navigate(`/Header/${reff1.current.value}/Employees`);
        alert("signin successfull");
        console.log(currentuser);
        setloading(false);
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await forgotpassword(reff1.current.value);
        alert("Check your Email to reset password");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <div className="mt-5  justify-content-left ">
        <span className="d-flex mb-5">
          <img src={Alian}></img>
        </span>

        <span className="d-flex ">
          <h3>Login To Your Account</h3>
        </span>
        <span className="d-flex mb-3 ">
          See what is going on with your business
        </span>

        <div class="col-md-10 ">
          <label for="validationTooltip01" class="d-flex mb-1 text-secondary">
            Email <font style={{ color: "red" }}>*</font>
          </label>

          <input
            type="Email"
            ref={reff1}
            class="form-control w-100 "
            id="e1"
            required
            placeholder="email@example."
            style={{ height: "50px" }}
          />
        </div>
        <div class="col-md-10  ">
          <label for="validationTooltip01" class="d-flex text-secondary mb-1">
            Password <font style={{ color: "red" }}>*</font>
          </label>
          <div class="input-group mb-3 ">
            <input
              type={cls.typo}
              ref={reff2}
              id="pass"
              class="form-control"
              style={{ height: "50px" }}
              placeholder="Password"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />

            <div class="input-group-append ">
              <button class="btn border h-100" onClick={pass} type="button">
                <i class={cls.icon} style={{ color: "#0b4ec1" }}></i>
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between text-secondary my-auto ">
            <div className="d-flex my-auto ">
              <input
                type="checkbox"
                className="d-flex mt-1 p-3 me-2"
                id="check"
                style={{
                  height: "20px",
                  width: "20px",
                  borderColor: "#2f3990",
                }}
              />{" "}
              Remember me
            </div>
            <NavLink
              className="d-flex flex-row fw-bold "
              style={{ color: "#8594F9" }}
              onClick={() => {
                setstr("Reset Password");
              }}
            >
              Forgot Password?
            </NavLink>
          </div>
        </div>

        <div class="col-md-10  mt-3">
          <NavLink to="Header">
            <button
              type="Email"
              class="btn w-100  rounded-4 fw-bold text-light"
              placeholder="email@example."
              style={{ height: "50px", backgroundColor: "#2f3990" }}
              onClick={handlelogin}
            >
              {str}
            </button>
          </NavLink>
        </div>
      </div>
      <span className="d-flex flex-row  justify-content-center w-75 font ms-3 fw-bold text-secondary mt-3">
        Not Registered Yet?
        <NavLink
          onClick={() => props.fun()}
          className="ms-2"
          style={{ color: "#8594F9" }}
        >
          Create an Account
        </NavLink>
      </span>
    </div>
  );
}

export default Login_comp;
