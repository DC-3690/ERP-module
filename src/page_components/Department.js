import React, { useEffect, useRef, useState, createContext } from "react";
import Header from "../common_components/Header";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase_con";
import { Three_circles } from "../common_components/common_funs";
import { MyVerticallyCenteredModal } from "../common_components/Modal";

import "../styling/dept.css";
import { fetch_data } from "../firebase/Queries";
import { useNavigation } from "react-router-dom";

export const dept_context = createContext();

const Modal2 = (props) => {
  return (
    <div>
      <>
        {" "}
        <div className="ms-3">
          <button
            type="button"
            class="btn ms-3 ps-3 pe-3 pt-0 pb-0 btn1"
            data-toggle="modal"
            data-target="#exampleModalLong"
            style={{ height: "30px", width: "70px", padding: "2px" }}
          >
            Show
          </button>

          <div
            class="modal fade"
            id="exampleModalLong"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    {props.name}
                  </h5>
                </div>
                <div class="modal-body">cxdcsd</div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

function Department() {
  const [dates, setdates] = useState([]);
  const [flag, setflag] = useState(0);
  let date = new Date();
  let str = `${date.getFullYear()}-0${date.getMonth() + 1}`;
  let str2 = `${date.getMonth() + 1} / ${date.getFullYear()}`;
  const [month, setmonth] = useState(str);

  const [month2, setmonth2] = useState(
    `${month.split("-")[1]} / ${month.split("-")[0]}`
  );

  const dates2 = dates;
  const [rowsum, setrowsum] = useState([]);
  const [colsum, setcolsum] = useState([]);
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const reff1 = useRef();
  const [flag1, setFlag1] = useState(false);
  const [identity, setidentity] = useState();

  const [attarray, setattarray] = useState([]);
  const [currmonth, setcurrmonth] = useState(month2.split("/")[0].trim()[1]);
  const [curryear, setcurryear] = useState(month2.split("/")[1].trim());

  useEffect(() => {
    fetch_data("employees").then((e) => {
      setdata(e);
    });
    fetch_data("attendance").then((e) => {
      setdata2(e);
    });

    setmonth2(`${month.split("-")[1]} / ${month.split("-")[0]}`);
    setcurrmonth(month2.split("/")[0].trim()[1]);
    setcurryear(month2.split("/")[1].trim());

    // console.log(data2);
    getdays();
    setflag(1);
  }, [flag, month, month2]);
  const [sample, setsample] = useState();

  // console.log("data2", data2);

  useEffect(() => {
    data2.forEach((item, i) => {
      if (
        item[curryear] != undefined &&
        item[curryear][currmonth] != undefined
      ) {
        attarray[i] = item[curryear][currmonth];
      } else {
        attarray[i] = {};
      }
    });

    console.log("hello guys");
    setattarray(attarray);

    data2.map((item, i) => {
      if (
        item[curryear] != undefined &&
        item[curryear][currmonth] != undefined
      ) {
        let arr = Object.values(item[curryear][currmonth]);
        rowsum[i] = arr.reduce((a, b) => {
          return a + b;
        }, 0);
      } else {
        rowsum[i] = 0;
      }
      setrowsum(rowsum);
    });

    for (let index = 0; index < dates2.length; index++) {
      colwisesum(index, attarray);
    }
  }, [currmonth, rowsum]);

  const [modalShow, setModalShow] = useState({});

  async function adddata(i, id) {
    let d = month2.split("/");
    let obj = {};
    let obj2 = {};
    obj2[Number(d[0])] = attarray[i];
    obj[Number(d[1])] = obj2;
    let yr = String(d[1]).trim();

    console.log(data2[i][yr], yr);

    if (data2[i][yr] != undefined) {
      console.log("hiii");
      obj[Number(d[1])] = { ...data2[i][yr], ...obj2 };
    }

    setsample(obj);

    console.log("object", obj);

    const refrence = doc(db, "attendance", id);
    await updateDoc(refrence, { ...data2[i], ...obj });
    console.log("dataobj", { ...data2[i], ...obj });
    alert("Data has been added successfully");
  }

  function onlyNumber(event) {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 189) {
      console.log(keyCode);
      event.preventDefault();
    }
  }

  function getdays() {
    let str = month;
    // console.log("str", str);
    let d1 = new Date(Number(str.split("-")[0]), Number(str.split("-")[1] - 1));
    let currmonth = d1.getMonth();
    let curryear = d1.getFullYear();
    let date2 = [];
    let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    for (
      let index = 1;
      index <= new Date(curryear, currmonth + 1, 0).getDate();
      index++
    ) {
      let date1 = new Date(curryear, currmonth, index);
      date2.push({ day: days[date1.getDay()], date: date1.getDate() });
    }
    // date2.push(date1.getDay());
    // let date1 = new Date(curryear, currmonth, 5);
    setdates(date2);
    // console.log("days", dates);
  }

  function arrsum(val) {
    return (
      Math.floor(
        Object.values(val).reduce((a, b) => {
          return a + b;
        }) * 100
      ) / 100
    );
  }

  function rowwisesum(i, val) {
    rowsum[i] = arrsum(val);
    setrowsum(rowsum);

    // console.log(rowsum);
  }

  function colwisesum(i, value) {
    // ||
    //     dates2[i].day == "Su" ||
    //     dates2[i].day == "Sa"
    let arr2 = value.map((val, n) => {
      if (val[i] == undefined) {
        return 0;
      }
      return val[i];
    });

    colsum[i] = arrsum(arr2);
    setcolsum(colsum);
  }

  // const [value, setvalue] = useState([]);
  // let arr = [];

  const showdata = (val, i, j) => {
    if (
      val[curryear] != undefined &&
      val[curryear][currmonth] != undefined &&
      val[curryear][currmonth][i] != undefined
    ) {
      // setvalue(val[curryear][currmonth][i]);
      // rowsum[j][i] = val[curryear][currmonth][i];
      // colwisesum(i, attarray);

      return val[curryear][currmonth][i];
    } else {
      return 0;
    }
  };

  function getnum(val, i, j) {
    // console.log(val, i, j);
    let obj = {};
    setflag(1);

    data.forEach((val, k) => {
      if (attarray[k] === {}) {
        console.log(k);
        attarray[k] = {};
        rowsum[k] = 0.0;
      } else {
        console.log("else");
      }
    });

    setrowsum(rowsum);
    // setattarray(attarray);

    obj[i] = Math.abs(Number(val));

    // setting values to the array of object

    attarray[j] = { ...attarray[j], ...obj };
    setattarray(attarray);

    console.log("att", attarray);
    // console.log("att", attarray[j]);

    // calculating sum of attendances columnwise for individual Days
    colwisesum(i, attarray);

    // calculating sum of attendances Rowwise for individual employees
    // we have used floor in sum
    rowwisesum(j, attarray[j]);

    setflag(0);
  }

  // console.log("rowsum", dates);

  return (
    <dept_context.Provider
      value={{
        data2,
        identity,
        flag1,
        setFlag1,
        dates,
        showdata,
        getnum,
        adddata,
        rowsum,
      }}
    >
      {data2.length == 0 ? (
        <div
          className=" d-flex justify-content-center h-100"
          style={{ marginTop: "400px" }}
        >
          <Three_circles />
        </div>
      ) : (
        <div
          className=" pe-2 "
          style={{ backgroundColor: "#F4F5F7", height: "100%" }}
        >
          {/* Header */}

          <div className="row border-bottom pt-2 pb-2 bg-white shadow-sm">
            <div
              className="col d-flex fw-bold ms-2 fs-4 "
              style={{ color: "#3845b3" }}
            >
              Employee Attendance Management
            </div>

            <div className="col  justify-content-end mt-1">
              <input
                type="text"
                className="my-auto ms-5 w-50 ps-2 border"
                placeholder="Search Here"
                style={{
                  borderRadius: "5px",
                  padding: "3px 14px 3px 14px",
                }}
              ></input>

              <button
                class="btn border ms-5   "
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ padding: "3px 14px 3px 14px" }}
              >
                <i class="fa-sharp fa-solid fa-filter fa-2xs me-2"></i>
                <span class="f">Filter</span>
              </button>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>

              <button
                class="btn border ms-2"
                style={{ padding: "3px 14px 3px 14px" }}
              >
                <i class="fa-solid fa-bars fa-2xs me-2"></i>
                <span class="f">Group By</span>
                <i class="fa-solid fa-chevron-down fa-2xs ms-2"></i>
              </button>
            </div>
          </div>

          {/* Header finished */}
          <div className="d2">
            <div className=" mt-3  text-end pe-3">
              <span className="fw-bold" style={{ color: "#2f3990" }}>
                {month2}
              </span>

              <input
                type="month"
                max={new Date().toISOString().slice(0, 7)}
                className="ms-2 border border-secondary rounded p-1"
                onChange={(e) => {
                  setmonth(e.target.value);
                  setattarray([]);
                  setcolsum([]);
                  setrowsum([]);
                }}
                defaultValue={new Date().toISOString().slice(0, 7)}
                ref={reff1}
              ></input>
            </div>

            <table class="table tabs tables mt-3  table-sm">
              <thead className="th3 col-sm-1">
                <tr>
                  <th scope="col">User Id</th>
                  <th scope="col " className="col col-1 align-middle">
                    Employees Name
                  </th>

                  {dates2.map((date, i) => {
                    return (
                      <th
                        scope="col-md-auto"
                        className={
                          new Date().getDate() == i + 1 ? "currday" : null
                        }
                        style={{
                          backgroundColor:
                            new Date().getDate() != i + 1
                              ? date.day == "Sa" || date.day == "Su"
                                ? "white"
                                : "#dfe1e6"
                              : null,
                        }}
                      >
                        <div className=" day-date-wrapper">
                          <span>{date.day} </span>
                          <span>{date.date}</span>
                        </div>
                      </th>
                    );
                  })}

                  <th scope="col" className="align-middle">
                    Total Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {data2.map((val, j) => {
                  // console.log("dates", dates);
                  return (
                    <>
                      <tr className="th1">
                        <td scope="row">{j + 1}</td>
                        <td>{val.name}</td>
                        {dates.length ? (
                          dates.length > 0 ? (
                            dates.map((date, i) => {
                              return (
                                <>
                                  <td className="pt-2 ">
                                    <div
                                      style={{
                                        backgroundColor:
                                          date.day == "Sa" || date.day == "Su"
                                            ? "#DFE1E6"
                                            : "white",
                                      }}
                                      className="border fw-bold numbox text-secondary  col col-sm-12 text-center rounded"
                                    >
                                      {date.day == "Sa" || date.day == "Su"
                                        ? "WO"
                                        : Math.floor(
                                            showdata(val, i, j) * 100
                                          ) / 100}
                                    </div>
                                  </td>
                                </>
                              );
                            })
                          ) : null
                        ) : (
                          <>please select valid month and year</>
                        )}

                        <td className=" col-sm-1">
                          <div className="col justify-content-between d-flex ">
                            <div className="my-auto">
                              {rowsum[j] == undefined
                                ? 0
                                : Math.floor(rowsum[j] * 100) / 100}
                            </div>
                            <div className=" d-flex">
                              <i class="fa-solid my-auto  fa-eye"></i>

                              <button
                                className="btn ms-3 ps-3 pe-3 pt-0 pb-0 btn1"
                                onClick={() =>
                                  setModalShow({ ["show_" + j]: true })
                                }
                              >
                                Edit
                              </button>

                              <MyVerticallyCenteredModal
                                show={modalShow["show_" + j]}
                                onHide={() =>
                                  setModalShow({ ["show_" + j]: false })
                                }
                                name={val.name}
                                id={j}
                                objid={val.id}
                              />

                              {/* <Modal name={val.name} id={j} /> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>

              <tfoot className="th3 col-sm-1">
                <tr>
                  <th scope="col">Total</th>
                  <th scope="col " className="col col-1 align-middle"></th>

                  {dates2.map((date, i) => {
                    return (
                      <th scope="col-md-auto">
                        <div className=" day-date-wrapper">
                          {colsum[i] == undefined ? 0 : colsum[i]}
                        </div>
                      </th>
                    );
                  })}

                  <th scope="col" className="align-middle d-flex ">
                    {Math.floor(
                      rowsum.reduce((a, b) => {
                        return a + b;
                      }, 0) * 100
                    ) / 100}
                  </th>
                </tr>
              </tfoot>
            </table>

            {/* table  */}
          </div>
        </div>
      )}
    </dept_context.Provider>
  );
}

export default Department;
