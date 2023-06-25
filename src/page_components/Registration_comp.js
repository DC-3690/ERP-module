import { React, useState, useContext, useRef } from "react";

import welcome from "../assets/login_image.png";
import Alian from "../assets/Alian_Logo.png";
import { NavLink, useNavigate } from "react-router-dom";

import Login from "./login";
import  { Authcont } from "../common_components/Auth_context";

function Registration_comp(props) {
  const [cls, setcls] = useState({
    icon: "fa-regular fa-eye-slash",
    typo: "password",
  });
  const [cls1, setcls1] = useState({
    icon: "fa-regular fa-eye-slash",
    typo: "password",
  });

  function pass(i) {
    switch (i) {
      case 1:
        if (cls.icon != "fa-regular fa-eye-slash") {
          setcls({ icon: "fa-regular fa-eye-slash", typo: "password" });
        } else {
          setcls({ icon: "fa-sharp fa-regular fa-eye", typo: "text" });
        }
        return;
      case 2:
        if (cls1.icon != "fa-regular fa-eye-slash") {
          setcls1({ icon: "fa-regular fa-eye-slash", typo: "password" });
        } else {
          setcls1({ icon: "fa-sharp fa-regular fa-eye", typo: "text" });
        }
    }
  }

  const { currentuser, signup, verify } = useContext(Authcont);

  const reff1 = useRef();
  const reff2 = useRef();
  const reff3 = useRef();
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState(false);

  const Navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      reff2.current.value != reff3.current.value ||
      reff1.current.value == "" ||
      reff2.current.value == "" ||
      reff3.current.value == ""
    ) {
      setmessage(true);
      console.log(message);
      return;
    }
    try {
      setloading(true);
      verify(reff1.current.value);
      await signup(reff1.current.value, reff2.current.value);

      alert("User Registered Successfully");
      props.fun(); // to navigate to login screen
      setloading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="mt-5 justify-content-left ">
        {message && alert("incorrect credentials")}

        <span className="d-flex mb-5">
          <img src={Alian}></img>
        </span>

        <span className="d-flex ">
          <h3>Welcome To Alian Hub</h3>
        </span>
        <span className="d-flex mb-3 ">
          Get access to exclusive features by creating an account
        </span>

        <div className="row ">
          <div class="col-md-5 ">
            <label for="validationTooltip01" class="d-flex mb-1 text-secondary">
              FirstName <font style={{ color: "red" }}>*</font>
            </label>

            <input
              type="Email"
              class="form-control w-100 "
              id="e1"
              required
              placeholder="First name"
              style={{ height: "50px" }}
            />
          </div>

          <div class="col-md-5 ">
            <label for="validationTooltip01" class="d-flex mb-1 text-secondary">
              LastName <font style={{ color: "red" }}>*</font>
            </label>

            <input
              type="Email"
              class="form-control w-100 "
              id="e1"
              required
              placeholder="Last name"
              style={{ height: "50px" }}
            />
          </div>
        </div>

        <div class="col-md-10 mt-3 ">
          <label for="validationTooltip01" class="d-flex text-secondary mb-1">
            Email <font style={{ color: "red" }}>*</font>
          </label>
          <div class="input-group mb-3 ">
            <input
              type="text"
              id="pass"
              ref={reff1}
              class="form-control"
              style={{ height: "50px" }}
              placeholder="eg mail@abc.com"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </div>
        </div>

        <div className="row ">
          <div class="col-md-5 d-flex ">
            <div>
              <label
                for="validationTooltip01"
                class="d-flex mb-1 text-secondary"
              >
                Password <font style={{ color: "red" }}>*</font>
              </label>
              <div className="d-flex">
                <input
                  type={cls.typo}
                  ref={reff2}
                  class="form-control w-100 "
                  id="e1"
                  required
                  placeholder="*****"
                  style={{ height: "50px" }}
                />
                <button
                  class="btn my-auto "
                  onClick={() => pass(1)}
                  type="button"
                >
                  <i class={cls.icon} style={{ color: "#0b4ec1" }}></i>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-5 d-flex ">
            <div>
              <label
                for="validationTooltip01"
                class="d-flex mb-1 text-secondary"
              >
                Current Password <font style={{ color: "red" }}>*</font>
              </label>
              <div className="d-flex">
                <input
                  type={cls1.typo}
                  ref={reff3}
                  class="form-control w-100 "
                  id="e1"
                  required
                  placeholder="*****"
                  style={{ height: "50px" }}
                />
                <button
                  class="btn h-50 my-auto "
                  onClick={() => pass(2)}
                  type="button"
                >
                  <i class={cls1.icon} style={{ color: "#0b4ec1" }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex  mt-2 justify-content-between col-sm-10 text-secondary my-auto ">
          <div className="d-flex  my-auto text-secondary  ">
            <input
              type="checkbox"
              className="d-flex mt-1 me-2"
              id="check"
              style={{
                height: "20px",
                width: "20px",
                borderColor: "#2f3990",
              }}
            />{" "}
            I agree to the Terms of Service and Privacy Policy
          </div>
        </div>

        <div class="col-md-10  mt-3">
          <button
            type="Email"
            disabled={loading}
            onClick={(e) => handlesubmit(e)}
            class="btn w-100  rounded-4 text-light fw-bold"
            placeholder="email@example."
            style={{ height: "50px", backgroundColor: "#2f3990" }}
          >
            Register
          </button>
        </div>
      </div>
      <span className="d-flex flex-row  justify-content-center w-75 font ms-3 fw-bold text-secondary mt-3">
        Already have an account?
        <NavLink
          onClick={() => props.fun()}
          className="ms-2"
          style={{ color: "#8594F9" }}
        >
          Login
        </NavLink>
      </span>
    </div>
  );
}

export default Registration_comp;
