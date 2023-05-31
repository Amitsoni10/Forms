import { LitElement, css, html } from "lit";
import {
  designation,
  department,
  emaildata,
  country,
  state,
  city,
} from "./assets/data";
import { repeat } from "lit/directives/repeat.js";
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';




export class MyElement extends LitElement {
  static get properties() {
    return {
      employeeForm: { type: Object },
      employee: { type: Object },
      emailtype: { type: String },
      countries: { type: Array },
      isEditing: { type: Boolean },
      editData: { type: Object },
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.countries = [];
    this.emailtype = "";
    this.isEditing = false;
    this.employee = {};

    this.employeeForm = {
      name: { value: "", isValidName: false, errorMessage: "" },
      email: { value: "", isValidName: false, errorMessage: "" },
      empCode: { value: "", isValidName: false, errorMessage: "" },
      designation: { value: "", isValidName: false, errorMessage: "" },
      department: { value: "", isValidName: false, errorMessage: "" },
      correspondenceaddressline1: {
        value: "",
        isValidName: false,
        errorMessage: "",
      },
      correspondenceaddressline2: {
        value: "",
        isValidName: false,
        errorMessage: "",
      },
      correspondencelandmark: {
        value: "",
        isValidName: false,
        errorMessage: "",
      },
      correspondencecountry: {
        value: "",
        isValidName: false,
        errorMessage: "",
      },
      correspondencestate: { value: "", isValidName: false, errorMessage: "" },
      correspondencecity: { value: "", isValidName: false, errorMessage: "" },
      correspondencezipcode: {
        value: "",
        isValidName: false,
        errorMessage: "",
      },

      permanentaddressline1: {
        value: "",
        isValidName: false,
        errorMessage: "",
      },
      permanentaddressline2: {
        value: "",
        isValidName: false,
        errorMessage: "",
      },
      permanentlandmark: { value: "", isValidName: false, errorMessage: "" },
      permanentcountry: { value: "", isValidName: false, errorMessage: "" },
      permanentstate: { value: "", isValidName: false, errorMessage: "" },
      permanentcity: { value: "", isValidName: false, errorMessage: "" },
      permanentzipcode: { value: "", isValidName: false, errorMessage: "" },

      primary: { value: "", isValidName: false, errorMessage: "" },
      secondary: { value: "", isValidName: false, errorMessage: "" },
      emergency: { value: "", isValidName: false, errorMessage: "" },
    };
  }

  firstUpdated() {
    if (this.isEditing) {
      console.log("is editing");
      this.renderRoot.querySelector("#email").disabled = false;
      const values = {
        "#name": "name",
        "#empcode": "empCode",
        "#emailtype": "emailtype",
        "#email": "email",
        "#designation": "designation",
        "#department": "department",
        "#correspondenceaddressline1": "correspondenceaddressline1",
        "#correspondenceaddressline2": "correspondenceaddressline2",
        "#correspondencelandmark": "correspondencelandmark",
        "#correspondencecountry": "correspondencecountry",
        "#correspondencestate": "correspondencestate",
        "#correspondencecity": "correspondencecity",
        "#correspondencezipcode": "correspondencezipcode",
        "#permanentaddressline1": "permanentaddressline1",
        "#permanentaddressline2": "permanentaddressline2",
        "#permanentlandmark": "permanentlandmark",
        "#permanentcountry": "permanentcountry",
        "#permanentstate": "permanentstate",
        "#permanentcity": "permanentcity",
        "#permanentzipcode": "permanentzipcode",
        "#primarynumber": "primary",
        "#secondarynumber": "secondary",
        "#emergencynumber": "emergency",
      };

      Object.entries(values).forEach(([key, value]) => {
        const inputFields = this.renderRoot.querySelector(key);
        inputFields.value = this.editData[value];
      });
    } else {
      console.log("creating new");
    }
  }

  render() {
    return html`
    
        <div class="container">
          <header class="header">
            <h2>Employee Data Form</h2>
          </header>
          <div class="container1">
            <form
              class="form"
              @submit=${!this.isEditing ? this.submit : this.saveEdit}
            >
              <div class="first">
                <div class="label-container">

                <sl-input required
                label="Name"
                class="${this.employeeForm.name.errorMessage
                      ? "boxerror"
                      : ""}"
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    name="name"
                    @input=${(e) => this.formToggle(e, "name")}
                    help-text=${this.employeeForm.name.errorMessage?this.employeeForm.name.errorMessage:""}
                    autocomplete="off"
                     ></sl-input> 

                </div>

                <div class="label-container">

                  <sl-input
                    label="Employee Code"
                    class="${this.employeeForm.empCode.errorMessage
                      ? "boxerror"
                      : ""}"
                    type="text"
                    id="empcode"
                    name="empCode"
                    required
                    placeholder="Enter Employee Code"
                    @input=${(e) => this.formToggle(e, "empCode")}
                    autocomplete="off"
                    help-text=${this.employeeForm.empCode.errorMessage?this.employeeForm.empCode.errorMessage:""}
                  ></sl-input>
 
                </div>
              </div>

              <div class="first">
                <div class="label-container">
                  <sl-select 
                  placeholder="Select Email Type"
                  label="Email Type"
                    name="emailtype"
                    id="emailtype"
                    required
                    @click=${(e) => this.emailtypetoggle(e, "emailtype")}
                    >
                    <sl-option></sl-option>
                  ${repeat(
                      emaildata,
                      (items) =>
                        html`<sl-option value=${items.email} >${items.email}</sl-option>`
                    )}
                </sl-select>
                 
                </div>

                <div class="label-container">
                  <sl-input
                  placeholder="Enter Your Email"
                  label="Email"
                  class="${this.employeeForm.email.errorMessage
                      ? "boxerror"
                      : ""}"
                   disabled
                    required
                    id="email"
                    name="email"
                    @input=${(e) => this.formToggle(e, "email")}
                    autocomplete="off"
                    help-text=${this.employeeForm.email.errorMessage?this.employeeForm.email.errorMessage:""}
                  ></sl-input>
                 
                </div>
              </div>

              <div class="first">
                <div class="label-container">
                  
                  <sl-select
                    placeholder="Select Designation"
                    label="Designation"
                    name="designation"
                    id="designation"
                    required
                    class="${this.employeeForm.designation.errorMessage
                      ? "boxerror"
                      : ""}"
                    @click=${(e) => this.formToggle(e, "designation")}
                  >
                    <sl-option></sl-option>
                    ${repeat(
                      designation,
                      (items) =>
                        html`<sl-option  value=${items.designation}>
                          ${items.designation}
                        </sl-option>`
                    )}
                  </sl-select>
                </div>

                <div class="label-container">
                  <sl-select
                    placeholder="Select Designation"
                    label="Department"
                    name="department"
                    id="department"
                    required
                    @click=${(e) => this.formToggle(e, "department")}
                  >
                    <sl-option></sl-option>
                    ${repeat(
                      department,
                      (items) =>
                        html`<sl-option value="${items.department}">
                          ${items.department}
                        </sl-option>`
                    )}
                  </sl-select>
                </div>
              </div>

              <div class="address-container">
                <div class="address">
                  <h3>Correspondence Address</h3>
                  <sl-input
                    placeholder="Enter Your Address"
                    label="Address Line 1"
                    id="correspondenceaddressline1"
                    name="correspondenceaddressline1"
                    class="${this.employeeForm.correspondenceaddressline1
                      .errorMessage
                      ? "boxerror"
                      : ""}"
                    autocomplete="off"
                    required
                    help-text=${this.employeeForm.correspondenceaddressline1.errorMessage?this.employeeForm.correspondenceaddressline1.errorMessage:""}
                    @input=${(e) =>
                      this.formToggle(e, "correspondenceaddressline1")}
                  ></sl-input>


                  <sl-input
                    label="Address Line 2"
                    id="correspondenceaddressline2"
                    name="correspondenceaddressline2"
                    placeholder="Optional"
                    @input=${(e) =>
                      this.formToggle(e, "correspondenceaddressline2")}
                    autocomplete="off"
                  ></sl-input>

                  
                  <sl-input
                    label="Landmark"
                    id="correspondencelandmark"
                    name="correspondencelandmark"
                    placeholder="Enter Landmark"
                    required
                    class="${this.employeeForm.correspondencelandmark
                      .errorMessage
                      ? "boxerror"
                      : ""}"
                    @input=${(e) =>
                      this.formToggle(e, "correspondencelandmark")}
                    autocomplete="off"
                    help-text=${this.employeeForm.correspondencelandmark.errorMessage?this.employeeForm.correspondencelandmark.errorMessage:""}
                  ></sl-input>


                  <sl-select
                    placeholder="Select Country"
                    label="Country"
                    id="correspondencecountry"
                    name="correspondencecountry"
                    required
                    @click=${(e) => this.formToggle(e, "correspondencecountry")}
                  >
                    <sl-option></sl-option>
                    ${repeat(
                      country,
                      (items) =>
                        html`<sl-option value=${items.country}>${items.country}</sl-option>`
                    )}
                  </sl-select>



                  <sl-select
                    placeholder="Select State"
                    label="State"
                    @click=${(e) => this.formToggle(e, "correspondencestate")}
                    id="correspondencestate"
                    name="correspondencestate"
                    required
                  >
                    <sl-option></sl-option>
                    ${repeat(
                      state,
                      (items) =>
                        html`<sl-option value=${items.state}>${items.state}</sl-option>`
                    )}
                  </sl-select>


                  <sl-select
                    placeholder="Select City"
                    label="City"
                    @click=${(e) => this.formToggle(e, "correspondencecity")}
                    id="correspondencecity"
                    name="correspondencecity"
                    required
                  >
                    <sl-option></sl-option>
                    ${repeat(
                      city,
                      (items) =>
                        html`<sl-option value=${items.city}>${items.city}</sl-option>`
                    )}
                  </sl-select>


                  <sl-input
                    label="Zip Code"
                    @input=${(e) => this.formToggle(e, "correspondencezipcode")}
                    id="correspondencezipcode"
                    name="correspondencezipcode"
                    placeholder="Enter Zipcode"
                    autocomplete="off"
                    required
                    help-text=${this.employeeForm.correspondencezipcode.errorMessage?this.employeeForm.correspondencezipcode.errorMessage:""}
                    class="${this.employeeForm.correspondencezipcode
                      .errorMessage
                      ? "boxerror"
                      : ""}"
                  ></sl-input>
                </div>

                <div>
                  ${!this.isEditing
                    ? html`<label for="myCheck"
                          ><u
                            >Permanent Address same as Correspondence
                            Address:</u
                          ></label
                        >
                        <input
                          type="checkbox"
                          id="myCheck"
                          name="myCheck"
                          @click=${this.checkbox}
                        /><br />`
                    : ""}
                </div>

                <div class="address">
                  <div class="label-container">
                    <h3>Permanent Address</h3>
                    <sl-input
                      label="Address Line 1"
                      value=${this.employee.permanentaddressline1}
                      @input=${(e) =>
                        this.formToggle(e, "permanentaddressline1")}
                      type="text"
                      id="permanentaddressline1"
                      name="permanentaddressline1"
                      placeholder="Enter Your Address"
                      autocomplete="off"
                    ></sl-input>
                  </div>

                  <div class="label-container">
                    <sl-input
                      label="Address Line 2"
                      value=${this.employee.permanentaddressline2}
                      @input=${(e) =>
                        this.formToggle(e, "permanentaddressline2")}
                      type="text"
                      id="permanentaddressline2"
                      name="permanentaddressline2"
                      placeholder="Optional"
                      autocomplete="off"
                    ></sl-input>
                  </div>

                  <div class="label-container">
                    <sl-input
                      label="Landmark"
                      value=${this.employee.permanentlandmark}
                      @input=${(e) => this.formToggle(e, "permanentlandmark")}
                      type="text"
                      id="permanentlandmark"
                      name="permanentlandmark"
                      placeholder="Enter Landmark"
                      autocomplete="off"
                    ></sl-input>
                  </div>

                  <div class="label-container">
                    <sl-select
                      label="Country"
                      placeholder="Select Country"
                      @click=${(e) => this.formToggle(e, "permanentcountry")}
                      name="permanentcountry"
                      id="permanentcountry"
                      value=${this.employee.permanentcountry}
                    >
                      <sl-option >
                       
                      </sl-option>
                      ${repeat(
                        country,
                        (items) =>
                          html`<sl-option value=${items.country}>
                            ${items.country}
                          </sl-option>`
                      )}
                    </sl-select>

                  </div>

                  <div class="label-container">
  
                    <sl-select
                    label="State"
                      placeholder="Select State"
                      @click=${(e) => this.formToggle(e, "permanentstate")}
                      id="permanentstate"
                      name="permanentstate"
                      value=${this.employee.permanentstate}
                    >
                      <sl-option >

                      </sl-option>
                      ${repeat(
                        state,
                        (items) =>
                          html`<sl-option value=${items.state}>${items.state}</sl-option>`
                      )}
                    </sl-select>

                  </div>

                  <div class="label-container">

                    <sl-select
                     label="City"
                     placeholder="Select City"
                      @click=${(e) => this.formToggle(e, "permanentcity")}
                      name="permanentcity"
                      id="permanentcity"
                      value=${this.employee.permanentcity} 
                    >
                      <sl-option >          
                      </sl-option>
                      ${repeat(
                        city,
                        (items) =>
                          html` <sl-option value=${items.city}>${items.city}</sl-option>`
                      )}
                    </sl-select>
                  </div>

                  <div class="label-container">
                    <sl-input
                      label="Zip Code"
                      value=${this.employee.permanentzipcode}
                      @input=${(e) => this.formToggle(e, "permanentzipcode")}
                      id="permanentzipcode"
                      name="permanentzipcode"
                      placeholder="Enter Zipcode"
                      autocomplete="off"
                    ></sl-input>
                  </div>
                </div>
              </div>

              <h3>Contact Information</h3>
              <div class="contact">
                <div class="label-container">
                  <sl-input
                    label="Primary Number"
                    class="${this.employeeForm.primary.errorMessage
                      ? "boxerror"
                      : ""}"
                    id="primarynumber"
                    name="primary"
                    placeholder="Enter Primary Number"
                    required
                    @input=${(e) => this.formToggle(e, "primary")}
                    autocomplete="off"
                    help-text=${this.employeeForm.primary.errorMessage?this.employeeForm.primary.errorMessage:""}
           
                  ></sl-input>
                </div>

                <div class="label-container">
                  <sl-input
                    label="Secondary Number"
                    class="${this.employeeForm.secondary.errorMessage
                      ? "boxerror"
                      : ""}"
                    
                    name="secondary"
                    id="secondarynumber"
                    placeholder="Enter Secondary Number"
                    required
                    @input=${(e) => this.formToggle(e, "secondary")}
                    autocomplete="off"
                    help-text=${this.employeeForm.secondary.errorMessage?this.employeeForm.secondary.errorMessage:""}
                  ></sl-input>
                </div>

                <div class="label-container">

                  <sl-input
                    label="Emergency Number"
                    class="${this.employeeForm.emergency.errorMessage
                      ? "boxerror"
                      : ""}"
                    
                    name="emergency"
                    id="emergencynumber"
                    placeholder="Enter Emergency Number"
                    required
                    @input=${(e) => this.formToggle(e, "emergency")}
                    autocomplete="off"
                    help-text=${this.employeeForm.emergency.errorMessage?this.employeeForm.emergency.errorMessage:""}
                  ></sl-input>

                </div>
              </div>
              <p>* Please Fill All Mandatory Fields</p>

              ${!this.isEditing
                ? html`<button class="btn" type="submit">Submit</button>`
                : html`<button class="btn" type="submit">Update</button>`}
              <slot></slot>
            </form>
          </div>
        </div>
      
    `;
  }

  formToggle(e, type) {
    if (this.isEditing) {
      this.editData[type] = e.target.value;
      this.validateForm(e, type);
    } else {
      this.employee[type] = e.target.value;
      console.log(e.target.value)
      this.validateForm(e, type);
    }
  }

  emailtypetoggle(e, type) {
    if (this.isEditing) {
      this.emailtype = e.target.value;
      this.editData.emailtype = e.target.value;
      this.validateForm(e, type);
      this.validateForm(e, "email");
    } else {
      this.emailtype = e.target.value;
      this.validateForm(e, type);
      this.validateForm(e, "email");
    }
  }

  saveEdit(e) {
    e.preventDefault();
    if (
      this.employeeForm.name.errorMessage === "" &&
      this.employeeForm.email.errorMessage === "" &&
      this.employeeForm.empCode.errorMessage === "" &&
      this.employeeForm.department.errorMessage === "" &&
      this.employeeForm.designation.errorMessage === "" &&
      this.employeeForm.primary.errorMessage === "" &&
      this.employeeForm.secondary.errorMessage === "" &&
      this.employeeForm.emergency.errorMessage === "" &&
      this.employeeForm.correspondenceaddressline1.errorMessage === "" &&
      this.employeeForm.correspondencelandmark.errorMessage === "" &&
      this.employeeForm.correspondencezipcode.errorMessage === ""
    ) {
      console.log("here");
      localStorage.setItem("MyEmployeeList", JSON.stringify(this.data));
      window.location.reload();
    }
  }

  checkbox() {
    const checkBox = this.renderRoot.querySelector("#myCheck");
    if (checkBox.checked == true) {
      this.employee.permanentaddressline1 =
        this.employee.correspondenceaddressline1;
      this.employee.permanentaddressline2 =
        this.employee.correspondenceaddressline2;
      this.employee.permanentlandmark = this.employee.correspondencelandmark;
      this.employee.permanentcountry = this.employee.correspondencecountry;
      this.employee.permanentstate = this.employee.correspondencestate;
      this.employee.permanentcity = this.employee.correspondencecity;
      this.employee.permanentzipcode = this.employee.correspondencezipcode;
      this.requestUpdate();
    } else {
      console.log("not cliced");
      this.employee.permanentaddressline1 = "";
      this.employee.permanentaddressline2 = "";
      this.employee.permanentlandmark = "";
      this.employee.permanentcountry = "";
      this.employee.permanentstate = "";
      this.employee.permanentcity = "";
      this.employee.permanentzipcode = "";
      this.requestUpdate();
    }
  }

  errormessage(type, error) {
    this.employeeForm = {
      ...this.employeeForm,
      [type]: {
        isValidName: false,
        errorMessage: error,
      },
    };
  }

  errormessage_true(type, error) {
    this.employeeForm = {
      ...this.employeeForm,
      [type]: {
        isValidName: true,
        errorMessage: error,
      },
    };
  }

  validateForm(e, type) {
    switch (type) {
      // Validation For Name
      case "name":
        {
          if (!e.target.value || e.target.value.length > 40) {
            this.errormessage(
              "name",
              "Please provide a valid name and length can't exceed 40 characters"
            );
          } else {
            this.errormessage_true("name", "");
          }
        }
        break;

      // Validation for EmpCode
      case "empCode":
        {
          if (!e.target.value) {
            this.errormessage("empCode", "Can't be Empty");
          } else if (e.target.value.length > 7) {
            this.errormessage(
              "empCode",
              "Emp code should be of 6 digit and 1 alphabet only (i.e-1234A56)"
            );
          } else if (
            e.target.value.match(/[A-Z]{1}[0-9]{6}/) ||
            e.target.value.match(/[0-9][A-Z]{1}[0-9]{5}/) ||
            e.target.value.match(/[0-9]{2}[A-Z]{1}[0-9]{4}/) ||
            e.target.value.match(/[0-9]{3}[A-Z]{1}[0-9]{3}/) ||
            e.target.value.match(/[0-9]{4}[A-Z]{1}[0-9]{2}/) ||
            e.target.value.match(/[0-9]{5}[A-Z]{1}[0-9]/) ||
            e.target.value.match(/[0-9]{6}[A-Z]{1}/)
          ) {
            this.errormessage_true("empCode", "");
          } else {
            this.errormessage(
              "empCode",
              "Emp code should be of 6 digit and 1 alphabet only (i.e-1234A56)"
            );
          }
        }
        break;

      // Validation for emailtype
      case "emailtype":
        {
          if (this.emailtype === "Personal") {
            this.renderRoot.querySelector("#email").disabled = false;
          } else if (this.emailtype === "Official") {
            this.renderRoot.querySelector("#email").disabled = false;
          } else {
            this.renderRoot.querySelector("#email").disabled = true;
          }
        }
        break;

      // Validation for Email
      case "email":
        {
          if (this.emailtype === "Personal") {
            console.log(e.target.value)
            if (!e.target.value) {
              this.errormessage("email", "Can't be Empty");
            } else if (e.target.value.match(/^[^\s@]+@gmail\.com$/)) {
              this.errormessage_true("email", "");
            } else {
              this.errormessage("email", "will include '@gmail.com' at last");
            }
          } else if (this.emailtype === "Official") {
            console.log("in email validation official")
            if (!e.target.value) {
              this.errormessage("email", "Can't be Empty");
            } else if (e.target.value.match(/^[^\s@]+@annalect\.com$/)) {
              this.errormessage_true("email", "");
            } else {
              this.errormessage(
                "email",
                "will include '@annalect.com' at last"
              );
            }
          }else if (this.emailtype === "") {
            this.errormessage("email", "");
          }
        }
        break;

      // validation for correspondence address line 1
      case "correspondenceaddressline1":
        {
          if (!e.target.value || e.target.value.length > 80) {
            this.errormessage(
              "correspondenceaddressline1",
              "Please enter a valid address and can't exceed length of 80 character"
            );
          } else {
            this.errormessage_true("correspondenceaddressline1", "");
          }
        }
        break;

      // validation for correspondence landmark
      case "correspondencelandmark":
        {
          if (!e.target.value || e.target.value.length > 50) {
            this.errormessage(
              "correspondencelandmark",
              "Please enter a valid landmark and can't exceed lenght of 50 character"
            );
          } else {
            this.errormessage_true("correspondencelandmark", "");
          }
        }
        break;

      // validation for correspondence zipcode
      case "correspondencezipcode":
        {
          if (!e.target.value) {
            this.errormessage("correspondencezipcode", "Can't be Empty");
          } else if (
            e.target.value.length > 6 ||
            e.target.value.length < 6 ||
            !e.target.value.match(/[0-9]{6}/)
          ) {
            this.errormessage(
              "correspondencezipcode",
              "Have to be Only of 6 digit"
            );
          } else if (e.target.value.match(/[0-9]{6}/)) {
            this.errormessage_true("correspondencezipcode", "");
          }
        }
        break;

      // validation for primary number
      case "primary":
        {
          if (!e.target.value) {
            this.errormessage("primary", "Can't be Empty");
          } else if (
            e.target.value.length > 10 ||
            e.target.value.length < 10 ||
            !e.target.value.match(/[0-9]{10}/)
          ) {
            this.errormessage("primary", "Can Be Only Of 10 Digit");
          } else if (e.target.value.match(/[0-9]{10}/)) {
            this.errormessage_true("primary", "");
          }
        }
        break;

      // Validation for secondary number
      case "secondary":
        {
          if (!e.target.value) {
            this.errormessage("secondary", "Can't be Empty");
          } else if (
            e.target.value.length > 10 ||
            e.target.value.length < 10 ||
            !e.target.value.match(/[0-9]{10}/)
          ) {
            this.errormessage("secondary", "Can Be Only Of 10 Digit");
          } else if (e.target.value.match(/[0-9]{10}/)) {
            this.errormessage_true("secondary", "");
          }
        }
        break;

      // Validation for emergency number
      case "emergency":
        {
          if (!e.target.value) {
            this.errormessage("emergency", "Can't be Empty");
          } else if (
            e.target.value.length > 10 ||
            e.target.value.length < 10 ||
            !e.target.value.match(/[0-9]{10}/)
          ) {
            this.errormessage("emergency", "Can Be Only Of 10 Digit");
          } else if (e.target.value.match(/[0-9]{10}/)) {
            this.errormessage_true("emergency", "");
          }
        }
        break;
      default:
        return;
    }
  }

  submit(e) {
    e.preventDefault();

    if (
      this.employeeForm.name.isValidName === true &&
      this.employeeForm.email.isValidName === true &&
      this.employeeForm.empCode.isValidName === true &&
      this.employeeForm.primary.isValidName === true &&
      this.employeeForm.secondary.isValidName === true &&
      this.employeeForm.emergency.isValidName === true &&
      this.employeeForm.correspondenceaddressline1.isValidName === true &&
      this.employeeForm.correspondencelandmark.isValidName === true &&
      this.employeeForm.correspondencezipcode.isValidName === true
    ) {
      
      const form = this.renderRoot.querySelector("form");
      const userdata = serialize(form);
      const myData = JSON.parse(localStorage.getItem("MyEmployeeList") || "[]");
      myData.push(userdata);
      localStorage.setItem("MyEmployeeList", JSON.stringify(myData));
      

      alert("Form Submitted Successfully");
      form.submit();
      this.requestUpdate();
    }
  }

  static get styles() {
    return css`
    *{
      font-family: "Raleway", sans-serif;
     }

      .bg-container {
       padding: 10px;
       background-image: linear-gradient(90deg, #838c91, #5bdcfce3);
      }
      .container {
        font-family: "Raleway", sans-serif;
        border: 3px solid #04374e9f;
        margin: 10px auto;
        border-radius: 12px;
        width: 70%;
        box-shadow: 3px 0.4px 4px 0.9px #012f449f;
        background:#c7e4f0eb;
      }
      .container1 {
        /* border: 2px solid red; */
        /* text-align: left; */
        padding: 10px;
        margin: 10px 10px;
        /* position:relative; */
      }


      
      .header {
        background: #090155;
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 22px;
        color: #fff;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .first {
        display: flex;
        gap: 65px;
      }
      .first sl-input,
      .first sl-select {
        /* border: 1px solid black; */
        border-radius: 5px;
        font-size: 14px;
        /* gap:100px; */
        /* margin-right:0px; */
        width:110%;
        padding: 7px;
        /* text-align: left; */
      }
      .first .label-container {
        /* border: 2px solid yellow; */
        /* font-weight: bolder; */
        /* margin: 0px auto; */
        /* gap:100px; */
        width: 400px;
        /* display: flex; */
        /* flex-direction: column; */
        font-family: "Lato";
      }
      .contact {
        display: flex;
        /* gap: 30px; */
      }
      .contact sl-input {
        /* border: 1px solid black; */
        /* border-radius: 5px; */
        /* font-size: 14px; */
        /* font-weight: lighter; */
        padding-right:95px;
        width:120%;
        /* text-align: left; */
      }
      
      .contact .label-container {
        /* border: 2px solid yellow; */
        /* font-weight: bolder; */
        /* margin: 0px auto; */
        /* width: 300px; */
        /* display: flex;
        flex-direction: column; */
      }


      .address-container {
        /* border: 2px solid black; */
        padding: 0px;
      }
      .address {
        /* border: 2px solid yellow; */
        display: inline-block;
        /* margin: 10px; */
        width: 100%;
      }
      .address sl-input {
        /* border: 2px solid yellow; */
        display: inline-block;
        width: 100%;
        margin:5px 0px;
        /* border: 1px solid black; */
        /* border-radius: 5px; */
        font-size: 14px;
        padding: 7px;
        /* text-align: center; */
        
      }
      .address sl-select {
        margin:5px 0px;
        /* border: 2px solid yellow; */
        /* display: inline-block; */
        width: 100%;
        /* border: 1px solid black; */
        /* border-radius: 5px; */
        font-size: 14px;
        padding: 7px;
        /* text-align: center; */
      }



      
      .btn {
        border-radius: 2px;
        width:80%;
        background: linear-gradient(45deg, #090155, #11e3ff);
        -webkit-text-fill-color: #fff;
        padding: 15px 50px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
        border:none;
        outline:none;
        box-shadow: 2px 1px 4px 0.6px;
      }
      .btn:hover {
        background: linear-gradient(45deg, #11e3ff, #090155);
      }



      .boxerror::part(base) {
        border-color: var(--sl-color-danger-600);
        box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.33);
      }
      .boxerror::part(form-control-label) {
        color: var(--sl-color-danger-500);
      }
      sl-input::part(form-control-label){
        padding-bottom:5px;
      }
      sl-select::part(form-control-label){
        padding-bottom:5px;
      }
      .boxerror::part(form-control-help-text) {
        color: var(--sl-color-danger-500);
      }

    `;
  }
}

window.customElements.define("my-element", MyElement);
