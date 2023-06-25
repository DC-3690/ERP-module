import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useContext,
  useRef,
} from "react";

import { Offcanvas, Tab, Tabs } from "react-bootstrap";
import Edit_header from "./Edit_header";
import Personal_info from "./Personal_info";
import Family_details from "./Family_details";
import Education_details from "./Education_details";

import Employees, { Empcont } from "../Employees";

function Tabbar(props) {
  return (
    <div>
      <Tabs
        defaultActiveKey="Personal info"
        id="justify-tab-example"
        className="mb-2 tabbar"
        style={{ fontWeight: "bold", textEmphasisColor: "red" }}
      >
        <Tab eventKey="Personal info" title="Personal info">
          <Personal_info id={props.id} />
        </Tab>
        <Tab eventKey="Family Details" title="Family details">
          <Family_details />
        </Tab>
        <Tab eventKey="Education details" title="Education details">
          <Education_details />
        </Tab>
        <Tab eventKey="TDS Data" title="TDS Data">
          <h1>hello4</h1>
        </Tab>
      </Tabs>
    </div>
  );
}

const OffCanvas2 = forwardRef(({ name, ...props }, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    smash() {
      handleShow();
    },
    closing() {
      handleClose();
    },
  }));
  // header of offcanvas

  const reff = useRef();

  console.log(props.uid);
  const header = (
    <>
      <div
        className="w-100 border d-flex justify-content-between fw-bolder border-bottom bg-white p-3 fs-5"
        style={{ color: "#2F3990" }}
      >
        <div className="col-sm-6  col-md-8">Edit Personal Info</div>
        <div className="col-5  col-md-2 ">
          <button
            role="button"
            value="Invite"
            aria-disabled="true"
            className="btn border"
            onClick={() => reff.current.show()}
            style={{
              background: "#2F3990",
              color: "white",
              padding: "3px 14px 3px 14px",
            }}
          >
            Save
          </button>

          <button
            role="button"
            aria-disabled="true"
            className="btn ms-3 border-1 "
            onClick={handleClose}
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
    </>
  );

  const { identity, edituser } = useContext(Empcont);

  return (
    <>
      <div className="offcanvas offcanvas-end">
        <Offcanvas
          show={show}
          className="w-75"
          style={{ backgroundColor: "#F4F5F7" }}
          onHide={handleClose}
          {...props}
        >
          {header}

          <Offcanvas.Header>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Edit_header id={identity} user={edituser} refer={reff} />

            <div className="w-75 mt-3 bg-white p-3 rounded">
              <Tabbar id={identity} />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
});

export default OffCanvas2;
