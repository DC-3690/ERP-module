import React, { useRef, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Appcontext2 } from "./Create_user2";

const Head = (props) => {
  const reff = useRef();
  const [show, setshow] = useState(props.show);

  const { add_user, data_obj, name } = useContext(Appcontext2);

  console.log("data", useContext(Appcontext2));

  return (
    <div>
      <div
        className="w-100 d-flex fw-bolder border-bottom bg-white p-3 fs-5"
        style={{ color: "#2F3990" }}
      >
        <div className="col-sm-6 col-md-8">Create Employee</div>
        <div className="col-5  d-flex justify-content-end col-md-4">
          <button
            role="button"
            value="Invite"
            aria-disabled="true"
            className="btn border"
            style={{
              background: "#2F3990",
              color: "white",
              padding: "3px 14px 3px 14px",
            }}
          >
            Invite
          </button>

          <button
            role="button"
            aria-disabled="true"
            className="btn ms-3 border-1 "
            onClick={() => {
              props.onshow();
            }}
            style={{
              background: "white",
              color: "#2F3990",

              padding: "3px 14px 3px 14px",
              border: "1px solid #2F3990",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Head;
