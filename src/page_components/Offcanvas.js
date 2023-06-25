import React, { useState, forwardRef, useImperativeHandle } from "react";
import "../styling/offcanvas.css";
import { Offcanvas, Button, CloseButton } from "react-bootstrap";
import Head from "../common_components/Head";

const OffCanvasExample = forwardRef(({ name, ...props }, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let Create = props.create;

  let showslider = props.show;
  let head = <Head />;
  let show2 = props.show2;

  useImperativeHandle(ref, () => ({
    smash() {
      handleShow();
    },
    closing() {
      handleClose();
    },
  }));

  return (
    <>
      {showslider ? handleShow : handleClose}
      {/* {show2 ? handleShow : null} */}

      <div>
        <Offcanvas
          className={showslider ? null : "w-50"}
          style={{
            backgroundColor: showslider ? "white" : "#F4F5F7",
            marginTop: showslider ? "68px" : null,
          }}
          show={show}
          onHide={handleClose}
          {...props}
        >
          {props.showing ? (
            <Head onshow={handleClose} />
          ) : (
            <>
              <div
                className="w-100 border text-center d-flex justify-content-center fw-bolder border-bottom mx-auto p-2 fs-5"
                style={{ backgroundColor: "#DFE1E6" }}
              >
                List Of Department
                <div className="justify-content-end ">
                  <CloseButton onClick={() => setShow(false)} className="" />
                </div>
              </div>
            </>
          )}

          <Offcanvas.Header>
            <Offcanvas.Title className="w-100"></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              padding: showslider ? "0px" : null,
            }}
          >
            {Create}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
});

export default OffCanvasExample;
