import React, { useState, useEffect } from "react";
import { fetch_data, add_data, delete_data } from "../../firebase/Queries";

function Family_details() {
  const [obj, setobj] = useState({});
  const [data, setdata] = useState([]);

  const Rows = (
    <>
      <td>
        <div class="col-sm-12">
          <input
            type="text"
            onChange={(e) => {
              setobj({ ...obj, name: e.target.value });
            }}
            class="form-control"
            id="t3"
            placeholder="Enter name"
          />
        </div>
      </td>
      <td>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            onChange={(e) => {
              setobj({ ...obj, Relation: e.target.value });
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
              setobj({ ...obj, contact: e.target.value });
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
              setobj({ ...obj, dob: e.target.value });
            }}
            class="form-control"
            id="t3"
            placeholder="select"
          />
        </div>
      </td>
      <td>
        <div class="col-sm-9">
          <input
            type="text"
            onKeyUp={(e) => {
              setobj({ ...obj, occupation: e.target.value });
              console.log("data", obj);
            }}
            class="form-control"
            id="t3"
            placeholder="select"
          />
        </div>
      </td>
      <td className="text-center   d-flex">
        <button className="btn">
          <i class="fa-regular fa-trash-can fa-xl" style={{ color: "red" }}></i>
        </button>

        <button className="btn">
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

  const [flag, setflag] = useState(false);

  useEffect(() => {
    fetch_data("Family").then((e) => {
      setdata(e);
    });
  }, [flag]);

  const add = async () => {
    setflag(true);
    add_data("Family", obj);
    setflag(false);
  };

  const dele = async (id) => {
    setflag(true);
    delete_data("Family", id);
    setflag(false);
  };

  return (
    <div
      className=""
      style={{ backgroundColor: "#F4F5F7", borderRadius: "10px" }}
    >
      <table class="table  " style={{ borderRadius: "5px" }}>
        <thead
          className=""
          style={{ backgroundColor: "#DFE1E6", borderRadius: "5px" }}
        >
          <tr>
            <th scope="col" class="col-sm-3">
              Family member Name
            </th>
            <th scope="col">Relation</th>
            <th scope="col">contact No.</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Occupation</th>
            <th></th>
          </tr>
        </thead>

        <tbody style={{ backgroundColor: "#F4F5F7", borderRadius: "5px" }}>
          <tr>{Rows}</tr>
          {data.map((val, i) => {
            return (
              <tr>
                <td>{val.name}</td>
                <td>{val.Relation}</td>
                <td>{val.contact}</td>
                <td>{val.dob}</td>
                <td>{val.occupation}</td>
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

      <a className="" href="#">
        Add Family Member
      </a>
    </div>
  );
}

export default Family_details;
