import React, { useState, useContext, useEffect, useRef } from "react";
import Department, { dept_context } from "../page_components/Department";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function MyVerticallyCenteredModal(props) {
  const { data2, dates, showdata, getnum, adddata, rowsum } =
    useContext(dept_context);
  let arr = [];
  let arr2 = [];
  let j = 0;

  // i in department == date - 1
  // j in department == props.id

  let today = new Date();
  let today1 = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  dates.forEach((item, k) => {
    if ((k + 1) % 5 != 0) {
      arr.push(item);
    } else {
      arr.push(item);
      arr2.push(arr);
      arr = [];
    }
  });

  if (dates.length > 30) {
    arr2.push([dates[dates.length - 1]]);
  }

  // console.log(arr2);

  return (
    <dept_context>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className=" w-100">
            <div
              className="d-flex justify-content-between"
              style={{ color: "#2F3990" }}
            >
              <span> {data2[props.id].name}</span>
              <span> {today1}</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="ms-2">Kindly fill attendance</h5>

          <table style={{ border: "0px" }}>
            <tbody>
              {arr2.map((item, k) => {
                return (
                  <tr>
                    {item.map((item2, i) => {
                      // console.log(j);
                      return (
                        <td className="col-sm-1 p-2" style={{ border: "0px" }}>
                          <div>
                            <span
                              style={{
                                color:
                                  item2.day == "Sa" || item2.day == "Su"
                                    ? "red"
                                    : "black",
                              }}
                            >
                              {`${item2.date}-${item2.day}`}
                            </span>
                            <input
                              type="number"
                              onKeyUp={(e) =>
                                getnum(e.target.value, item2.date - 1, props.id)
                              }
                              defaultValue={
                                item2.day == "Sa" || item2.day == "Su"
                                  ? 0
                                  : showdata(data2[props.id], item2.date - 1)
                              }
                              disabled={
                                item2.day == "Sa" || item2.day == "Su"
                                  ? true
                                  : false
                              }
                              className="border fw-bold numbox text-secondary  col col-sm-12 text-center rounded"
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div className=" d-flex w-100 text-2   justify-content-between">
            <span className="fw-bold" style={{ color: "#2F3990" }}>
              Total | {rowsum[props.id]}
            </span>

            <div>
              <button
                className="btn ms-3 ps-3 pe-3 pt-0 pb-0 btn1"
                onClick={() => adddata(props.id, data2[props.id].id)}
              >
                Save
              </button>
              <button
                className="btn ms-3 ps-3 pe-3 pt-0 pb-0 btn1"
                onClick={props.onHide}
              >
                Close
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </dept_context>
  );
}

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
