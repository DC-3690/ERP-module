import React, { useState, useEffect } from "react";
import { fetch_data, add_data, delete_data } from "../../firebase/Queries";

function Education_details() {
  const [obj, setobj] = useState({});
  const [flag, setflag] = useState(false);
  const [data, setdata] = useState([]);

  const add = async () => {
    setflag(true);
    add_data("Education", obj);
    setflag(false);
  };

  const dele = async (id) => {
    setflag(true);
    delete_data("Education", id);

    setflag(false);
  };

  useEffect(() => {
    fetch_data("Education").then((e) => {
      setdata(e);
    });
  }, [flag]);

  const Rows = (
    <>
      <td>
        <div class="col-sm-9">
          <input
            type="text"
            onChange={(e) => {
              setobj({ ...obj, education: e.target.value });
            }}
            class="form-control"
            id="t3"
            placeholder="Enter name"
          />
        </div>
      </td>
      <td>
        <div class="col-md-13">
          <input
            type="text"
            class="form-control"
            onChange={(e) => {
              setobj({ ...obj, board: e.target.value });
            }}
            id="t3"
            placeholder="select"
          />
        </div>
      </td>
      <td>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            onChange={(e) => {
              setobj({ ...obj, marks: e.target.value });
            }}
            id="t3"
            placeholder="select"
          />
        </div>
      </td>
      <td>
        <div class="col-sm-9 d-flex">
          <span
            className="p-2 rounded text-center"
            style={{
              backgroundColor: "#2F3990",
              marginRight: "-2",
              height: "40px",
              width: "40px",
            }}
          >
            <i class="fa-solid fa-calendar-days" style={{ color: "white" }}></i>
          </span>
          <input
            type="date"
            onChange={(e) => {
              setobj({ ...obj, year: e.target.value });
            }}
            class="form-control"
            id="t3"
            placeholder="select"
          />
        </div>
      </td>
      <td>
        <div class="col-sm-12">
          <input
            type="text"
            onKeyUp={(e) => {
              setobj({ ...obj, grade: e.target.value });
              console.log("data", obj);
            }}
            class="form-control"
            id="t3"
            placeholder="select"
          />
        </div>
      </td>
      <td className="text-center col-sm-4  d-flex ">
        <button className="btn ">
          <i class="fa-regular fa-trash-can fa-xl" style={{ color: "red" }}></i>
        </button>

        <button className="btn col-sm-4">
          <i
            style={{ color: "green  " }}
            class="fa-solid fa-check fa-xl  "
            onClick={(e) => {
              add();
            }}
          ></i>
        </button>
      </td>
    </>
  );

  return (
    <div>
      {" "}
      <table class="table  " style={{ borderRadius: "5px" }}>
        <thead
          className=""
          style={{ backgroundColor: "#DFE1E6", borderRadius: "5px" }}
        >
          <tr>
            <th scope="col" class="col-sm-2">
              Education
            </th>
            <th scope="col" class="col-sm-3">
              Name of Board/University
            </th>
            <th scope="col" class="col-sm-3">
              Mark Obatined(%)
            </th>
            <th scope="col">Passing Year</th>
            <th scope="col" class="col-sm-2">
              Grade
            </th>
            <th class="col-sm-1"></th>
          </tr>
        </thead>

        <tbody style={{ backgroundColor: "#F4F5F7", borderRadius: "5px" }}>
          <tr>{Rows}</tr>
          {data.map((val, i) => {
            return (
              <tr>
                <td>{val.education}</td>
                <td>{val.board}</td>
                <td>{val.marks}</td>
                <td>{val.year}</td>
                <td>{val.grade}</td>
                <td>
                  <button className="btn" onClick={() => dele(val.id)}>
                    <i
                      class="fa-regular fa-trash-can fa-xl"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Education_details;
