import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { add_data } from "../firebase/Queries";
import OffCanvasExample from "../page_components/Offcanvas";
import "../styling/offcanvas.css";
import { CloseButton } from "react-bootstrap";
import { calc_exp } from "./common_funs";
import { storage } from "../firebase/firebase_con";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

let obj = [
  "",
  "Account Department",
  "Android and IOS Department",
  "Design Department",
  "Development Department",
  "Hr Department",
  "Marketing Department",
  "Technical Department",
];

let id = 0;
function Lists() {
  const [search, setsearch] = useState("");
  const [ob, setob] = useState(obj);

  const { add_user, setdata_obj, data_obj } = useContext(Appcontext2);

  function finding(val) {
    setsearch(val);

    let obj2 = [];
    obj.map((item) => {
      if (item.toLowerCase().includes(search.toLowerCase())) {
        obj2.push(item);
      }
    });

    console.log(obj2);
    setob(obj2);
  }

  return (
    <div className="w-100">
      <div className="w-100 p-2 ">
        <input
          type="search"
          className="ms-5 w-75  offset-md-3 rounded p-1 ps-2"
          placeholder="search here"
          onKeyUp={(e) => {
            finding(e.target.value);
          }}
        />
        <button className="btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div className="text-start w-75 text-center mb-3 fw-bold">
        <a
          href="#"
          style={{
            color: "#2F3990",
          }}
          onClick={() => {
            obj.push(prompt("Enter Department"));
          }}
        >
          Create new Department
        </a>
      </div>

      <div class="list-group w-100">
        {ob.map((item, index) => {
          return (
            <li
              onClick={() => {
                id = index;
                document.getElementById("t6").value = ob[id];
                setdata_obj({ ...data_obj, dept: ob[id] });
              }}
              class="list-group-item  list-group-item-action list-group-item-light listing"
            >
              {item}
            </li>
          );
        })}
      </div>
    </div>
  );
}

export const Appcontext2 = createContext({});

function Create_user2() {
  let create = (
    <>
      <div
        className="w-100 border text-center fw-bolder border-bottom mx-auto p-2 fs-5"
        style={{ backgroundColor: "#DFE1E6" }}
      >
        List Of Department
        <CloseButton
          onClick={() => setshow(false)}
          className="col-4 col-md-4"
        />
      </div>
    </>
  );

  const [show, setshow] = useState(false);

  const [data_obj, setdata_obj] = useState({});

  const [img, setimg] = useState({ image: null });

  const [pic, setpic] = useState("");
  const [states, setstates] = useState(true);
  const [focused, setfocused] = useState({});
  const [unfocused, setunfocused] = useState({});
  const refer = useRef();
  const refer2 = useRef();
  const [dis, setdis] = useState(true);

  useEffect(() => {
    if (
      focused.t1 == "true" ||
      focused.t2 == "true" ||
      focused.t3 == "true" ||
      focused.t4 == "true" ||
      focused.t5 == "true"
    ) {
      console.log(unfocused);
      // refer.current.disabled = true;
      setdis(true);
    }
    if (
      unfocused.t1 == "true" &&
      unfocused.t2 == "true" &&
      unfocused.t3 == "true" &&
      unfocused.t4 == "true" &&
      unfocused.t5 == "true"
    ) {
      console.log("hello world");
      setdis(false);
    }
  }, [focused, unfocused]);

  let picture = "";

  const add_user = async () => {
    if (img.image != null) {
      console.log(img);
      let path = `image/${img.image.name + v4()}`;
      const imgref = ref(storage, path);
      setstates(false);

      await uploadBytes(imgref, img.image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("img url", url);
          setpic(url.toString());
          picture = url.toString();
          console.log("pic", picture);

          add_data("employees", { ...data_obj, image: picture, reff: path });
          add_data("attendance", { name: data_obj.name, mail: data_obj.mail });
        });
      });
      setstates(true);
      console.log("data", data_obj);
      alert("Employee Added successfully");
    } else {
      alert("please select image");
    }
  };

  return (
    <Appcontext2.Provider value={{ setdata_obj, data_obj }}>
      <OffCanvasExample
        placement="end"
        name="end"
        create={<Lists />}
        show={show}
      />

      <div className="bg-white w-75 p-3 fw-bold rounded">
        <div class="rectangle">
          <form>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-3 col-form-label">
                Name <font color="red">*</font>
              </label>  
              <div class="col-sm-8">
                <input
                  type="text"
                  onChange={(e) => {
                    setdata_obj({ ...data_obj, name: e.target.value });
                  }}
                  class="form-control"
                  id="t1"
                  name="name"
                  onBlur={() => {
                    setfocused({ ...focused, t1: "true" });
                    setunfocused({ ...unfocused, t1: "true" });
                  }}
                  unfocused={unfocused.t1}
                  focused={focused.t1}
                  required={true}
                  pattern="^[A-Z a-z]{5,25}$"
                  placeholder="Name here"
                />

                <p>name is required and length should be between 5-25</p>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-3 col-form-label">
                Work Email<font color="red">*</font>
              </label>
              <div class="col-sm-8">
                <input
                  type="email"
                  name="mail"
                  onChange={(e) => {
                    setdata_obj({ ...data_obj, mail: e.target.value });
                  }}
                  class="form-control"
                  id="t2"
                  onBlur={() => {
                    setfocused({ ...focused, t2: "true" });
                    setunfocused({ ...unfocused, t2: "true" });
                  }}
                  unfocused={unfocused.t2}
                  focused={focused.t2}
                  required={true}
                  placeholder="Email Adress"
                ></input>
                <p>please enter valid email</p>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputtext" class="col-sm-3 col-form-label">
                Position<font color="red">*</font>
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  name="position"
                  onChange={(e) => {
                    setdata_obj({ ...data_obj, position: e.target.value });
                  }}
                  class="form-control"
                  id="t3"
                  onBlur={() => {
                    setfocused({ ...focused, t3: "true" });
                    setunfocused({ ...unfocused, t3: "true" });
                  }}
                  unfocused={unfocused.t3}
                  focused={focused.t3}
                  required={true}
                  pattern="^[A-Z a-z.]{5,16}$"
                  placeholder="Position"
                ></input>

                <p>position is required and length should be between 5-16</p>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputtext" class="col-sm-3 col-form-label">
                Status<font color="red">*</font>
              </label>
              <div class="col-sm-8">
                <select
                  class="form-select w-25"
                  name="status"
                  required={true}
                  selected={false}
                  onChange={(e) => {
                    setdata_obj({ ...data_obj, status: e.target.value });
                  }}
                  id="t4"
                >
                  <option selected>Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <p>select status</p>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputtext" class="col-sm-3 col-form-label">
                Date of Joining:<font color="red">*</font>
              </label>
              <div class="col-sm-8">
                <input
                  type="date"
                  name="doj"
                  max={new Date()}
                  onChange={(e) => {
                    const days = calc_exp(e.target.value);
                    let day = new Date(days[0]);

                    setdata_obj({
                      ...data_obj,
                      exp: [day.toDateString(), days[1]],
                    });
                  }}
                  class="form-control"
                  onBlur={() => {
                    setfocused({ ...focused, t4: "true" });
                    setunfocused({ ...unfocused, t4: "true" });
                  }}
                  unfocused={unfocused.t4}
                  focused={focused.t4}
                  required={true}
                  id="t5"
                ></input>

                <p>select date</p>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputtext" class="col-sm-3 col-form-label">
                Department<font color="red">*</font>
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  name="dept"
                  id="t6"
                  placeholder="select"
                  onClick={(e) => {
                    setshow(!show);
                    console.log(data_obj);
                  }}
                  class="form-control"
                  onBlur={() => {
                    setfocused({ ...focused, t5: "true" });
                    setunfocused({ ...unfocused, t5: "true" });
                  }}
                  unfocused={unfocused.t5}
                  focused={focused.t5}
                  required={true}
                ></input>

                <p>select department (click and select)</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-3 col-form-label">
                Select Image<font color="red">*</font>
              </label>
              <div class="col-sm-8  h-25 d-flex">
                <input
                  type="file"
                  id="t7"
                  name="img"
                  class="form-control"
                  required
                  onChange={(e) => {
                    setimg({ ...img, image: e.target.files[0] });
                    console.log(img);
                  }}
                  accept="image/*"
                />
              </div>
              <p>select profile image</p>
            </div>
            {states ? (
              <>
                <button
                  className="btn ms-2"
                  type="button"
                  ref={refer}
                  disabled={dis}
                  // id="sub"
                  onClick={() => add_user()}
                  style={{
                    backgroundColor: "#2f3990",
                    padding: "3px 14px 3px 14px",
                    color: "white",
                  }}
                >
                  Create
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn ms-2"
                  type="button"
                  id="sub"
                  style={{
                    backgroundColor: "#2f3990",
                    padding: "3px 14px 3px 14px",
                    color: "white",
                  }}
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              </>
            )}
            <input hidden id="dc" ref={refer2}></input>
          </form>
        </div>
      </div>
    </Appcontext2.Provider>
  );
}

export default Create_user2;
