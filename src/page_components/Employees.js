import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";

import { fetch_data, delete_data } from "../firebase/Queries";
import { deleteObject, ref } from "firebase/storage";
import xlsx from "json-as-xlsx";

import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Offcanvas, Button } from "react-bootstrap";
import "../styling/offcanvas.css";

import OffCanvasExample from "./Offcanvas";
import OffCanvas2 from "./Edit_details/offcanvas2";
import * as XLSX from "xlsx";

import { Three_circles } from "../common_components/common_funs";
import Create_user2, { Appcontext2 } from "../common_components/Create_user2";
import { storage, db } from "../firebase/firebase_con";

function Head(props) {
  const reff = useRef();
  const [show, setshow] = useState(false);
  const { create_user, data_obj } = useContext(Appcontext2);

  return (
    <div>
      <div
        className="w-100 border d-flex fw-bolder border-bottom bg-white p-3 fs-5"
        style={{ color: "#2F3990" }}
      >
        {console.log("data", data_obj)}

        <div className="col-sm-6 col-md-8">Create Employee</div>
        <div className="col-5 col-md-4">
          <button
            role="button"
            aria-disabled="true"
            onClick={() => create_user()}
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
            className="btn ms-3 border-1 cancel"
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
}

export const Empcont = createContext();

function Employees() {
  let [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const [id, setid] = useState(false);
  const [showdata, setshowdata] = useState([]);

  useEffect(() => {
    setloading(true);

    fetch_data("employees").then((e) => {
      setdata(e);
      setshowdata(e);
    });
    // console.log("hello guys");
    // console.log(data);
    setloading(false);
  }, []);

  const d = data;

  const dele = async (id, user, refer, mail) => {
    setid(true);

    if (!window.confirm("Are you sure you want to delete record " + user)) {
      return;
    }

    delete_data("employees", id);

    /////////////////////

    const dref = query(collection(db, "attendance"), where("mail", "==", mail));

    const uid = (await getDocs(dref)).docs[0].id;
    delete_data("attendance", uid);

    ////////////////////

    const refrence = ref(storage, refer);
    await deleteObject(refrence)
      .then(() => {
        console.log(" image deleted");
      })
      .catch((err) => {
        alert(err.message);
      });

    setid(false);
  };

  //download data as excel file

  function downloadexcel() {
    let xlsx = require("json-as-xlsx");

    let data3 = data.forEach((val) => {
      delete val["image"];
      delete val["reff"];
    });
    console.log(data3);

    let data2 = [
      {
        sheet: "Adults",
        columns: [
          { label: "User", value: "id" }, // Top level data
          { label: "Name", value: "name" }, // Custom format
          { label: "Work Email", value: "mail" },
          { label: "Job position", value: "position" },
          { label: "Department", value: "dept" },
          { label: "Status", value: "status" },
          { label: "Date Of Joining", value: (row) => row.exp[0] },
          { label: "Current Experiance", value: (row) => row.exp[1] },
          {
            label: "CTC",
            value: (row) => (row.ctc ? row.ctc : ""),
          },
          {
            label: "Manager",
            value: (row) => (row.manager ? row.manager : ""),
          },
        ],
        content: data,
      },
    ];

    let settings = {
      fileName: "Employees Data", // Name of the resulting spreadsheet
      extraLength: 5, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    xlsx(data2, settings);
  }

  const [identity, setidentity] = useState("");
  const [edituser, setedituser] = useState({});

  const reff = useRef();
  const reff2 = useRef();

  //const [show, setshow] = useState(false);

  const create = <Create_user2 />;
  const values = { identity, edituser };

  let f;

  const head = <Head />;

  return (
    <>
      {showdata.length == 0 ? (
        <div
          className=" d-flex justify-content-center h-100"
          style={{ marginTop: "400px" }}
        >
          <Three_circles />
        </div>
      ) : (
        <Empcont.Provider value={values}>
          <div className="row border-bottom pt-2 pb-2 shadow-sm">
            <div className="col d-flex ms-2 fs-3 " style={{ color: "#2f3990" }}>
              Employees
            </div>

            <div className="col  justify-content-end mt-1">
              <input
                type="text"
                className="my-auto w-50 ps-2 border"
                onKeyUp={(e) => {
                  let data2 = [];
                  let data3 = data;
                  const rows = data.map((val) => {
                    if (
                      (val.name &&
                        val.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase().trim())) ||
                      (val.user &&
                        val.user
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase().trim())) ||
                      (val.mail &&
                        val.mail
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase().trim())) ||
                      (val.position &&
                        val.position
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase().trim())) ||
                      (val.dept &&
                        val.dept
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase().trim())) ||
                      (val.status &&
                        val.status
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase().trim())) ||
                      (val.exp[0] &&
                        val.exp[0]
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase().trim()))
                    ) {
                      data2.push(val);
                    }
                  });

                  setshowdata(data2);
                }}
                placeholder="Search Here"
                style={{
                  borderRadius: "5px",
                  padding: "3px 14px 3px 14px",
                }}
              ></input>

              <button
                class="btn nav-item dropdown  dropdown-toggle border ms-2   "
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ padding: "3px 14px 3px 14px" }}
              >
                <i class="fa-sharp fa-solid fa-filter fa-2xs me-2"></i>
                <span class="f">Filter</span>
              </button>

              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className="List">
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
              </ul>

              <button
                class="btn border ms-2"
                style={{ padding: "3px 14px 3px 14px" }}
              >
                <i class="fa-solid fa-bars fa-2xs me-2"></i>
                <span class="f">Group By</span>
                <i class="fa-solid fa-chevron-down fa-2xs ms-2"></i>
              </button>

              <Button
                className="ms-2"
                onClick={() => reff.current.smash()}
                ref={reff}
                style={{
                  backgroundColor: "#2f3990",
                  padding: "3px 14px 3px 14px",
                }}
              >
                Create
              </Button>

              <button
                role="button"
                className="btn ms-2 border-1"
                onClick={() => downloadexcel()}
                style={{
                  background: "white",
                  color: "#2F3990",
                  padding: "3px 14px 3px 14px",
                  border: "1px solid #2F3990",
                }}
              >
                Import
              </button>
            </div>
          </div>

          <OffCanvasExample
            placement="end"
            name="end"
            head={<Head />}
            create={create}
            showing={true}
            ref={reff}
          />

          <OffCanvas2 ref={reff2} name={"end"} placement="end" />

          <table
            class="table mt-4 align-middle   bg-white "
            style={{ marginInlineEnd: "5px" }}
          >
            <thead class="bg-light">
              <tr>
                <th>User Id</th>
                <th>Employees name</th>
                <th>work Email</th>
                <th>Job Position</th>
                <th>Department</th>
                <th>Status</th>
                <th>Date Of Joining</th>
                <th>Current Experiance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {showdata.map((val, i) => {
                return (
                  <tr className="align-items-center th2">
                    <td>
                      <img
                        src={
                          val.image != ""
                            ? val.image
                            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="user"
                        style={{ width: "40px", height: "40px" }}
                        class="rounded-circle me-3 d-inline"
                      />
                      {i + 100}
                    </td>
                    <td>{val.name}</td>
                    <td>{val.mail}</td>
                    <td>{val.position}</td>
                    <td>{val.dept}</td>
                    <td>
                      <i
                        class="fa-solid fa-circle fa-2xs me-2"
                        style={{
                          color: val.status == "Active" ? "#20C997" : "#fa0000",
                        }}
                      ></i>

                      {val.status}
                    </td>
                    <td>{val.exp[0]}</td>
                    <td>{val.exp[1]}</td>
                    <td>
                      <i
                        class="fa-solid fa-eye"
                        style={{ color: "#2f3990" }}
                      ></i>

                      <i
                        class="fa-regular fa-pen-to-square ms-2 i1"
                        onClick={() => {
                          setid(val.id);
                          setidentity(val.id);
                          setedituser(val);
                          console.log("user", val);
                          reff2.current.smash();
                        }}
                        style={{ color: "#2f3990" }}
                      ></i>

                      <i
                        style={{ color: "#2f3990" }}
                        class="fa-sharp fa-solid fa-trash ms-2 i1"
                        onClick={() =>
                          dele(val.id, val.name, val.reff, val.mail)
                        }
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Empcont.Provider>
      )}
    </>
  );
}

export default Employees;
