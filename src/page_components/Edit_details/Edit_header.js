import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
} from "react";
import { storage } from "../../firebase/firebase_con";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { update_data } from "../../firebase/Queries";
import { calc_exp } from "../../common_components/common_funs";

const Edit_header = forwardRef(({ name, ...props }, ref2) => {
  const obj = props.user;
  const [data, setdata] = useState(props.user);

  useImperativeHandle(props.refer, () => ({
    async show() {
      update_data("employees", props.id, data);
      console.log(data);
    },
    showitems() {
      alert("hello");
    },
  }));

  const reff2 = useRef();
  const reff1 = useRef();

  async function changeimg(e) {
    let url = window.URL.createObjectURL(e);
    reff1.current.src = url;
    console.log("picture", e);

    if (e != null) {
      const imgref = ref(storage, obj.reff);

      console.log(obj.reff);

      await uploadBytes(imgref, e).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setdata({ ...data, image: url });
        });
      });
    }
  }

  function change() {
    reff2.current.click();
  }

  return (
    <div>
      <div className=" bg-white rounded p-3 d-flex w-75 ">
        <div class=" ">
          <img
            src={
              obj.image != ""
                ? obj.image
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            ref={reff1}
            onClick={change}
            alt="please wait ..."
            className="border myimage border-2 border-secondary  p-1 rounded"
            height="130px"
            width="130px"
          ></img>
          <input
            ref={reff2}
            id="i2"
            onChange={(e) => changeimg(e.target.files[0])}
            type="file"
            style={{ display: "none" }}
          ></input>
        </div>

        <div className="ms-5  w-100">
          <div class="mb-2 row ">
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              Name
            </label>
            <div class="col-sm-3">
              <input
                type="text"
                onKeyUp={(e) => {
                  setdata({ ...data, name: e.target.value });
                }}
                defaultValue={obj.name}
                class="form-control"
                id="t1"
                placeholder="Name here"
              />
            </div>
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              Work Email
            </label>
            <div class="col-sm-3">
              <input
                type="email"
                onKeyUp={(e) => {
                  setdata({ ...data, mail: e.target.value });
                }}
                defaultValue={obj.mail}
                class="form-control"
                id="t2"
                placeholder="Email here"
              />
            </div>
          </div>
          <div class="mb-2 row">
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              Department
            </label>
            <div class="col-sm-3">
              <input
                type="text"
                defaultValue={obj.dept}
                onKeyUp={(e) => {
                  setdata({ ...data, dept: e.target.value });
                }}
                class="form-control"
                id="t3"
                placeholder="Department here"
              />
            </div>
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              Designation
            </label>
            <div class="col-sm-3">
              <input
                type="text"
                class="form-control"
                id="t4"
                placeholder="designation here"
              />
            </div>
          </div>
          <div class="mb-2 row">
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              Job position
            </label>
            <div class="col-sm-3">
              <input
                type="text"
                onKeyUp={(e) => {
                  setdata({ ...data, position: e.target.value });
                }}
                defaultValue={obj.position}
                class="form-control"
                id="t5"
                placeholder="Position"
              />
            </div>
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              Manager
            </label>
            <div class="col-sm-3">
              <input
                type="text"
                defaultValue={obj.manager != undefined ? obj.manager : null}
                class="form-control"
                onKeyUp={(e) => {
                  setdata({ ...data, manager: e.target.value });
                }}
                id="t6"
                placeholder="Manager here"
              />
            </div>
          </div>
          <div class="mb-2 row">
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              Date Of Joining
            </label>
            <div class="col-sm-3 d-flex">
              <span
                className="p-2 rounded text-center"
                style={{
                  backgroundColor: "#2F3990",
                  marginRight: "-2",
                  height: "40px",
                  width: "40px",
                }}
              >
                <i
                  class="fa-solid fa-calendar-days"
                  style={{ color: "white" }}
                ></i>
              </span>
              <input
                type="date"
                onChange={(e) => {
                  setdata({ ...data, exp: calc_exp(e.target.value) });
                }}
                class="form-control"
                id="t7"
                placeholder="date here"
              />
            </div>
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              salary structure
            </label>
            <div class="col-sm-3">
              <input
                type="text"
                class="form-control"
                defaultValue={
                  obj.salarystructure != undefined ? obj.salarystructure : null
                }
                onKeyUp={(e) => {
                  setdata({ ...data, salarystructure: e.target.value });
                }}
                id="t8"
                placeholder="Salary structure here"
              />
            </div>
          </div>
          <div class="mb-2 row">
            <label for="staticEmail" class="col-sm-2 col-form-label fw-bold">
              CTC
            </label>
            <div class="col-sm-3  d-flex">
              <span
                className="p-2 rounded text-center"
                style={{
                  backgroundColor: "#2F3990",
                  marginRight: "-2",
                  height: "40px",
                  width: "40px",
                }}
              >
                <i
                  class="fa-solid fa-indian-rupee-sign"
                  style={{ color: "#ffffff" }}
                ></i>
              </span>
              <input
                type="number"
                min={0}
                defaultValue={obj.ctc != undefined ? obj.ctc : null}
                class="form-control"
                onKeyUp={(e) => {
                  setdata({ ...data, ctc: Math.abs(Number(e.target.value)) });
                }}
                id="t9"
                placeholder="CTC here"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Edit_header;
