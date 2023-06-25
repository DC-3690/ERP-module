function Personal_info(props) {
  return (
    <div className="bg-white">
      {/* personal details */}
      <div className="ms-5 w-100">
        <font className="fw-bold text-2 mb-2" size="4">
          {" "}
          Personal Details{" "}
        </font>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            DOB
          </label>

          <div class="col-sm-3 d-flex ">
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
              class="form-control"
              id="t1"
              placeholder="date here"
            />
          </div>
          <label for="staticEmail" class="col-sm-2 col-form-label ms-5 ">
            Gender
          </label>
          <div class="col-sm-4">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Male"
                checked
              />
              <label class="form-check-label" for="inlineRadio1">
                Male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Female"
              />
              <label class="form-check-label" for="inlineRadio2">
                Female
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Other"
              />
              <label class="form-check-label" for="inlineRadio3">
                Other
              </label>
            </div>
          </div>
        </div>

        <div class="mb-2 row">
          <label for="staticEmail" class="col-sm-2 col-form-label ">
            maritial status
          </label>
          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t3"
              placeholder="Maritial status"
            />
          </div>
          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Blood Group
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
      </div>

      {/* contact details */}
      <div className="ms-5">
        <hr className="mt-5" />

        <font className="fw-bold text-2 mb-2" size="4">
          {" "}
          Contact Details{" "}
        </font>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Email
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="email"
              class="form-control"
              id="t1"
              placeholder="Email here..."
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Mobile No.
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="+91 | "
            />
          </div>
        </div>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Phone No.
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="+91 | "
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Emergency Contact No.
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="+91 | "
            />
          </div>
        </div>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Current Adress
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Address here"
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Country
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Country here"
            />
          </div>
        </div>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            State
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="State here"
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            City
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="City here"
            />
          </div>
        </div>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            pincode
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="0000-0000"
            />
          </div>
        </div>
        <div class=" ">
          <input
            type="checkbox"
            className="me-2"
            id="t1"
            style={{ height: "20px", width: "20px" }}
          />
          Permanant Address is same as Above
        </div>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Permanant Adress
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Address here"
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Country
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Country here"
            />
          </div>
        </div>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            State
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="State here"
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            City
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="City here"
            />
          </div>
        </div>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            pincode
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="0000-0000"
            />
          </div>
        </div>
      </div>

      {/*Other Detail  */}
      <div className="ms-5 ">
        <hr className="mt-5" />

        <font className="fw-bold text-2 mb-2" size="4">
          {" "}
          Other Details{" "}
        </font>

        <div class="mb-2 row mt-2  ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Physically Challenged
          </label>

          <div class="col-sm-3 d-flex ">
            <div class="form-check form-check-inline my-auto">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Yes"
                checked
              />
              <label class="form-check-label" for="inlineRadio1">
                Yes
              </label>
            </div>

            <div class="form-check form-check-inline my-auto">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="No"
              />
              <label class="form-check-label" for="inlineRadio1">
                No
              </label>
            </div>
          </div>
        </div>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label"></label>

          <div class="col-sm-3 d-flex ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Enter here"
            />
          </div>
          <label for="staticEmail" class="col-sm-2 ms-5 col-form-label">
            Enter % of Level PH
          </label>

          <div class="col-sm-3 d-flex ">
            <input
              type="date"
              class="form-control"
              id="t1"
              placeholder="date here"
            />
          </div>
        </div>
      </div>

      {/* Nominee Details */}
      <div className="ms-5">
        <hr className="mt-5" />

        <font className="fw-bold text-2 mb-2" size="4">
          {" "}
          Nominee Details{" "}
        </font>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Nominee Name
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Name here..."
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Relation with the Employee
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Enter Relation "
            />
          </div>
        </div>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Nominee DOB
          </label>

          <div class="col-sm-3  ms-3 ">
            <input type="date" class="form-control" id="t1" />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Nominee Age
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder=" "
              disabled
            />
          </div>
        </div>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Email
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="email"
              class="form-control"
              id="t1"
              placeholder="Email here"
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Mobile
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="+91 |"
            />
          </div>
        </div>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Phone No.
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="+91 | "
            />
          </div>
        </div>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Nominee Adress
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Address here"
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Country
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Country here"
            />
          </div>
        </div>

        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            State
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="State here"
            />
          </div>

          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            City
          </label>

          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="City here"
            />
          </div>
        </div>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            pincode
          </label>

          <div class="col-sm-3  ms-3 ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="0000-0000"
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="ms-5 ">
        <hr className="mt-5" />
        <font className="fw-bold text-2 mb-2" size="4">
          {" "}
          Bank Details{" "}
        </font>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Bank Name
          </label>

          <div class="col-sm-3 d-flex ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Bank name here"
            />
          </div>
          <label for="staticEmail" class="col-sm-2 col-form-label ms-5 ">
            Branch name
          </label>
          <div class="col-sm-3 d-flex ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="branch name here"
            />
          </div>
        </div>

        <div class="mb-2 row">
          <label for="staticEmail" class="col-sm-2 col-form-label ">
            IFSC Code
          </label>
          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t3"
              placeholder="IFSC code here"
            />
          </div>
          <label for="staticEmail" class="col-sm-2 col-form-label ms-5">
            Account No.
          </label>
          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t4"
              placeholder="Account here"
            />
          </div>
        </div>
        <div class="mb-2 row">
          <label for="staticEmail" class="col-sm-2 col-form-label ">
            Account Holder Name
          </label>
          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t3"
              placeholder="Account Holder here"
            />
          </div>
        </div>
      </div>

      {/* Identity Details */}
      <div className="ms-5 ">
        <hr className="mt-5" />
        <font className="fw-bold text-2 mb-2" size="4">
          {" "}
          Identity Information{" "}
        </font>
        <div class="mb-2 row mt-2 ">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Adhar No.
          </label>

          <div class="col-sm-3 d-flex ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Adhar here"
            />
          </div>
          <label for="staticEmail" class="col-sm-2 col-form-label ms-5 ">
            Pan No.
          </label>
          <div class="col-sm-3 d-flex ">
            <input
              type="text"
              class="form-control"
              id="t1"
              placeholder="Pan here"
            />
          </div>
        </div>

        <div class="mb-2 row">
          <label for="staticEmail" class="col-sm-2 col-form-label ">
            Passport No.
          </label>
          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="t3"
              placeholder="Passport here"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal_info;
