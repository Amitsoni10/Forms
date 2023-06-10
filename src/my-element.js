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
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/checkbox/checkbox.js";
import { serialize } from "@shoelace-style/shoelace/dist/utilities/form.js";

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
        "#correspondencelandmark": "correspondencelandmark",
        "#correspondencecountry": "correspondencecountry",
        "#correspondencestate": "correspondencestate",
        "#correspondencecity": "correspondencecity",
        "#correspondencezipcode": "correspondencezipcode",
        "#permanentaddressline1": "permanentaddressline1",
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
      <div class="body-container">

        <div class="container">
          <sl-spinner
            style="font-size: 7rem; --track-width: 8px; --indicator-color: #2563eb; --track-color: #dbeafe;"
            class="spinner invisible"
          ></sl-spinner>
          <header>
            ${this.isEditing ? "UPDATE DETAILS" : "REGISTRATION FORM"}
          </header>

          <form>
            <hr />

            <div class="form first">
              <div class="details personal">
                <span class="title"><sl-icon class="icon" name="person-workspace"></sl-icon> PERSONAL DETAILS</span>

                <div class="fields">
                  <div class="blocks">
                    <div class="input-field">
                      <sl-input
                        required
                        label="Name"
                        class="${this.employeeForm.name.errorMessage
                          ? "boxerror"
                          : ""}"
                        type="text"
                        id="name"
                        placeholder="Enter Your Name"
                        name="name"
                        @input=${(e) => this.formToggle(e, "name")}
                        help-text=${this.employeeForm.name.errorMessage
                          ? this.employeeForm.name.errorMessage
                          : ""}
                      ></sl-input>
                    </div>

                    <div class="input-field">
                      <sl-select
                        placeholder="--Select--"
                        label="Choose Email Type"
                        name="emailtype"
                        id="emailtype"
                        required
                        @click=${(e) => this.emailtypetoggle(e, "emailtype")}
                      >
                        ${repeat(
                          emaildata,
                          (items) =>
                            html`<sl-option value=${items.email}
                              >${items.email}</sl-option
                            >`
                        )}
                      </sl-select>
                    </div>

                    <div class="input-field">
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
                        help-text=${this.employeeForm.email.errorMessage
                          ? this.employeeForm.email.errorMessage
                          : ""}
                      ></sl-input>
                    </div>
                  </div>

                  <div class="blocks">
                    <div class="input-field">
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
                        help-text=${this.employeeForm.empCode.errorMessage
                          ? this.employeeForm.empCode.errorMessage
                          : ""}
                      ></sl-input>
                    </div>

                    <div class="input-field">
                      <sl-select
                        placeholder="--Select--"
                        label="Choose Designation"
                        name="designation"
                        id="designation"
                        required
                        @click=${(e) => this.formToggle(e, "designation")}
                      >
                        ${repeat(
                          designation,
                          (items) =>
                            html`<sl-option value=${items.designation}>
                              ${items.designation}
                            </sl-option>`
                        )}
                      </sl-select>
                    </div>

                    <div class="input-field">
                      <sl-select
                        placeholder="--Select--"
                        label="Choose Department"
                        name="department"
                        id="department"
                        required
                        @click=${(e) => this.formToggle(e, "department")}
                      >
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
                </div>
              </div>

              <div class="details contact">
                <span class="title"><sl-icon class="icon" name="telephone"></sl-icon> CONTACT DETAILS</span>

                <div class="fields">
                  <div class="blocks">
                    <div class="input-field">
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
                        help-text=${this.employeeForm.primary.errorMessage
                          ? this.employeeForm.primary.errorMessage
                          : ""}
                      ></sl-input>
                    </div>

                    <div class="input-field">
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
                        help-text=${this.employeeForm.secondary.errorMessage
                          ? this.employeeForm.secondary.errorMessage
                          : ""}
                      ></sl-input>
                    </div>

                    <div class="input-field">
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
                        help-text=${this.employeeForm.emergency.errorMessage
                          ? this.employeeForm.emergency.errorMessage
                          : ""}
                      ></sl-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blocks"></div>
              <div class="buttons">
                ${this.isEditing
                  ? html`<button class="nextBtn" @click=${this.nextBtnEdit}>
                      <span class="btnText">Next</span>
                    </button>`
                  : html`<button class="nextBtn" @click=${this.nextBtn}>
                      <span class="btnText">Next</span>
                    </button>`}
                <slot name="next"></slot>
                <sl-alert
                  class="alert"
                  id="nextAlert"
                  duration="2000"
                  closable
                  variant="danger"
                >
                  <sl-icon slot="icon" name="info-circle"></sl-icon>
                  <strong
                    >Please fill all the mandatory inputs correctly to go to
                    next page</strong
                  ><br />
                </sl-alert>
              </div>
            </div>

            <div class="form second invisible">
              <div class="details correspondence">
                <span class="title"><sl-icon class="icon" name="house-add"></sl-icon> CORRESPONDENCE ADDRESS</span>

                <div class="fields">
                  <div class="blocks">
                    <div class="input-field">
                      <sl-input
                        placeholder="Enter Your Address"
                        label="Address"
                        id="correspondenceaddressline1"
                        name="correspondenceaddressline1"
                        class="${this.employeeForm.correspondenceaddressline1
                          .errorMessage
                          ? "boxerror"
                          : ""}"
                        required
                        help-text=${this.employeeForm.correspondenceaddressline1
                          .errorMessage
                          ? this.employeeForm.correspondenceaddressline1
                              .errorMessage
                          : ""}
                        @input=${(e) => {
                          this.formToggle(e, "correspondenceaddressline1");
                          this.toggleCheckbox();
                        }}
                      ></sl-input>
                    </div>

                    <div class="input-field">
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
                        @input=${(e) => {
                          this.formToggle(e, "correspondencelandmark");
                          this.toggleCheckbox();
                        }}
                        help-text=${this.employeeForm.correspondencelandmark
                          .errorMessage
                          ? this.employeeForm.correspondencelandmark
                              .errorMessage
                          : ""}
                      ></sl-input>
                    </div>

                    <div class="input-field">
                      <sl-select
                        placeholder="--Select--"
                        label="Choose Country"
                        id="correspondencecountry"
                        name="correspondencecountry"
                        required
                        @click=${(e) => {
                          this.formToggle(e, "correspondencecountry");
                          this.toggleCheckbox();
                        }}
                      >
                        ${repeat(
                          country,
                          (items) =>
                            html`<sl-option value=${items.country}
                              >${items.country}</sl-option
                            >`
                        )}
                      </sl-select>
                    </div>
                  </div>

                  <div class="blocks">
                    <div class="input-field">
                      <sl-select
                        placeholder="--Select--"
                        label="Choose State"
                        @click=${(e) => {
                          this.formToggle(e, "correspondencestate");
                          this.toggleCheckbox();
                        }}
                        id="correspondencestate"
                        name="correspondencestate"
                        required
                      >
                        ${repeat(
                          state,
                          (items) =>
                            html`<sl-option value=${items.state}
                              >${items.state}</sl-option
                            >`
                        )}
                      </sl-select>
                    </div>

                    <div class="input-field">
                      <sl-select
                        placeholder="--Select--"
                        label="Choose City"
                        @click=${(e) => {
                          this.formToggle(e, "correspondencecity");
                          this.toggleCheckbox();
                        }}
                        id="correspondencecity"
                        name="correspondencecity"
                        required
                      >
                        ${repeat(
                          city,
                          (items) =>
                            html`<sl-option value=${items.city}
                              >${items.city}</sl-option
                            >`
                        )}
                      </sl-select>
                    </div>

                    <div class="input-field">
                      <sl-input
                        label="Zip"
                        @input=${(e) => {
                          this.formToggle(e, "correspondencezipcode");
                          this.toggleCheckbox();
                        }}
                        id="correspondencezipcode"
                        name="correspondencezipcode"
                        placeholder="Enter Zipcode"
                        required
                        help-text=${this.employeeForm.correspondencezipcode
                          .errorMessage
                          ? this.employeeForm.correspondencezipcode.errorMessage
                          : ""}
                        class="${this.employeeForm.correspondencezipcode
                          .errorMessage
                          ? "boxerror"
                          : ""}"
                      ></sl-input>
                    </div>
                  </div>
                </div>
              </div>

              <div class="details permanent">
                <span class="title"><sl-icon class="icon" name="house-add"></sl-icon> PERMANENT ADDRESS</span>

                <div class="blocks">
                  ${!this.isEditing
                    ? html`<sl-checkbox
                        class="checkbox"
                        disabled
                        @sl-change=${this.checkbox}
                        >Same as correspondence</sl-checkbox
                      >`
                    : ""}
                </div>

                <div class="fields">
                  <div class="blocks">
                    <div class="input-field">
                      <sl-input
                        label="Address"
                        value=${this.employee.permanentaddressline1}
                        @input=${(e) =>
                          this.formToggle(e, "permanentaddressline1")}
                        type="text"
                        id="permanentaddressline1"
                        name="permanentaddressline1"
                        placeholder="Enter Your Address"
                      ></sl-input>
                    </div>

                    <div class="input-field">
                      <sl-input
                        label="Landmark"
                        value=${this.employee.permanentlandmark}
                        @input=${(e) => this.formToggle(e, "permanentlandmark")}
                        type="text"
                        id="permanentlandmark"
                        name="permanentlandmark"
                        placeholder="Enter Landmark"
                      ></sl-input>
                    </div>

                    <div class="input-field">
                      <sl-select
                        label="Choose Country"
                        placeholder="--Select--"
                        @click=${(e) => this.formToggle(e, "permanentcountry")}
                        name="permanentcountry"
                        id="permanentcountry"
                        value=${this.employee.permanentcountry}
                      >
                        ${repeat(
                          country,
                          (items) =>
                            html`<sl-option value=${items.country}>
                              ${items.country}
                            </sl-option>`
                        )}
                      </sl-select>
                    </div>
                  </div>

                  <div class="blocks">
                    <div class="input-field">
                      <sl-select
                        label="Choose State"
                        placeholder="--Select--"
                        @click=${(e) => this.formToggle(e, "permanentstate")}
                        id="permanentstate"
                        name="permanentstate"
                        value=${this.employee.permanentstate}
                      >
                        ${repeat(
                          state,
                          (items) =>
                            html`<sl-option value=${items.state}
                              >${items.state}</sl-option
                            >`
                        )}
                      </sl-select>
                    </div>

                    <div class="input-field">
                      <sl-select
                        label="Choose City"
                        placeholder="--Select--"
                        @click=${(e) => this.formToggle(e, "permanentcity")}
                        name="permanentcity"
                        id="permanentcity"
                        value=${this.employee.permanentcity}
                      >
                        ${repeat(
                          city,
                          (items) =>
                            html` <sl-option value=${items.city}
                              >${items.city}</sl-option
                            >`
                        )}
                      </sl-select>
                    </div>

                    <div class="input-field">
                      <sl-input
                        label="Zip"
                        value=${this.employee.permanentzipcode}
                        @input=${(e) => this.formToggle(e, "permanentzipcode")}
                        id="permanentzipcode"
                        name="permanentzipcode"
                        placeholder="Enter Zipcode"
                      ></sl-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="buttons">
                <button type="button" @click=${this.backBtn} class="backBtn">
                  <span class="btnText">Previous</span>
                </button>
                ${!this.isEditing
                  ? html`<button
                      type="submit"
                      @click=${this.submit}
                      class="btn"
                    >
                      <span class="btnText">Submit</span>
                    </button>`
                  : html`<button
                      class="btn"
                      type="submit"
                      @click=${this.saveEdit}
                    >
                      <span class="btnText">Update</span>
                    </button>`}
                <slot></slot>
                <sl-alert
                  id="submitAlert"
                  duration="2000"
                  closable
                  variant="danger"
                >
                  <sl-icon slot="icon" name="info-circle"></sl-icon>
                  <strong>Please fill all the mandatory inputs correctly</strong
                  ><br />
                </sl-alert>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  nextBtnEdit(e) {
    let form = this.renderRoot.querySelector("form");
    form.reportValidity();
    e.preventDefault();
    let first = this.renderRoot.querySelector(".first");
    let second = this.renderRoot.querySelector(".second");
    let spinner = this.renderRoot.querySelector(".spinner");
    spinner.classList.remove("invisible");
    spinner.classList.add("visible");
    setTimeout(() => {
      first.classList.add("invisible");
      second.classList.remove("invisible");
      second.classList.add("visible");
      spinner.classList.remove("visible");
      spinner.classList.add("invisible");
    }, 300);
  }

  nextBtn(e) {
    let form = this.renderRoot.querySelector("form");
    form.reportValidity();
    e.preventDefault();
    console.log("nxt after deafuat");
    let first = this.renderRoot.querySelector(".first");
    let second = this.renderRoot.querySelector(".second");
    let spinner = this.renderRoot.querySelector(".spinner");

    if (
      this.employeeForm.name.isValidName === true &&
      this.employeeForm.email.isValidName === true &&
      this.employeeForm.empCode.isValidName === true &&
      this.employeeForm.primary.isValidName === true &&
      this.employeeForm.secondary.isValidName === true &&
      this.employeeForm.emergency.isValidName === true &&
      this.employee.department &&
      this.employee.designation
    ) {
      spinner.classList.remove("invisible");
      spinner.classList.add("visible");
      setTimeout(() => {
        first.classList.add("invisible");
        second.classList.remove("invisible");
        second.classList.add("visible");
        spinner.classList.remove("visible");
        spinner.classList.add("invisible");
      }, 300);
    } else {
      let alert = this.renderRoot.querySelector("#nextAlert");
      alert.show();
    }
  }

  backBtn() {
    let first = this.renderRoot.querySelector(".first");
    let second = this.renderRoot.querySelector(".second");
    let spinner = this.renderRoot.querySelector(".spinner");
    spinner.classList.remove("invisible");
    spinner.classList.add("visible");
    setTimeout(() => {
      second.classList.remove("visible");
      second.classList.add("invisible");
      first.classList.remove("invisible");
      first.classList.add("visible");
      spinner.classList.remove("visible");
      spinner.classList.add("invisible");
    }, 300);
  }

  formToggle(e, type) {
    if (this.isEditing) {
      this.editData[type] = e.target.value;
      this.validateForm(e, type);
    } else {
      this.employee[type] = e.target.value;
      console.log(e.target.value);
      this.validateForm(e, type);
    }
  }

  emailtypetoggle(e, type) {
    if (this.isEditing) {
      this.emailtype = e.target.value;
      this.editData.emailtype = e.target.value;
      this.validateForm(e, type);
    } else {
      this.emailtype = e.target.value;
      this.validateForm(e, type);
    }
  }

  saveEdit(e) {
    let form = this.renderRoot.querySelector("form");
    form.reportValidity();
    e.preventDefault();
    if (
      this.editData.designation &&
      this.editData.department &&
      this.editData.correspondencecountry &&
      this.editData.correspondencestate &&
      this.editData.correspondencecity &&
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

  toggleCheckbox() {
    console.log("entered");
    if (
      this.employeeForm.correspondenceaddressline1.isValidName === true &&
      this.employeeForm.correspondencelandmark.isValidName === true &&
      this.employeeForm.correspondencezipcode.isValidName === true &&
      this.employee.correspondencecountry &&
      this.employee.correspondencestate &&
      this.employee.correspondencecity
    ) {
      let checkBox = this.renderRoot.querySelector(".checkbox");
      checkBox.disabled = false;
      this.checkbox();
    } else {
      console.log("error");
      let checkBox = this.renderRoot.querySelector(".checkbox");
      checkBox.disabled = true;
    }
  }

  checkbox() {
    let checkBox = this.renderRoot.querySelector(".checkbox");

    if (checkBox.checked) {
      console.log("chekced");
      this.employee.permanentaddressline1 =
        this.employee.correspondenceaddressline1;
      this.employee.permanentlandmark = this.employee.correspondencelandmark;
      this.employee.permanentcountry = this.employee.correspondencecountry;
      this.employee.permanentstate = this.employee.correspondencestate;
      this.employee.permanentcity = this.employee.correspondencecity;
      this.employee.permanentzipcode = this.employee.correspondencezipcode;
      this.requestUpdate();
    } else {
      console.log("not cliced");
      this.employee.permanentaddressline1 = "";
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
    const value = e.target.value;

    const errorMessages = {
      name: {
        condition: value.length > 40,
        message: "Length can't exceed 40 characters",
      },
      empCode: {
        condition:
          value.length > 7 ||
          !(
            value.match(/[A-Z]{1}[0-9]{6}/) ||
            value.match(/[0-9][A-Z]{1}[0-9]{5}/) ||
            value.match(/[0-9]{2}[A-Z]{1}[0-9]{4}/) ||
            value.match(/[0-9]{3}[A-Z]{1}[0-9]{3}/) ||
            value.match(/[0-9]{4}[A-Z]{1}[0-9]{2}/) ||
            value.match(/[0-9]{5}[A-Z]{1}[0-9]/) ||
            value.match(/[0-9]{6}[A-Z]{1}/)
          ),
        message:
          "Emp code should be of 6 digit and 1 capital alphabet only (i.e-1234A56)",
      },
      emailtype: {
        condition: true,
        message: "",
      },
      email: {
        condition:
          (this.emailtype === "Personal" || this.emailtype === "Official") &&
          (this.emailtype === "Personal"
            ? !value.match(/^[^\s@]+@gmail\.com$/)
            : !value.match(/^[^\s@]+@annalect\.com$/)),
        message:
          this.emailtype === "Personal"
            ? "Domain should be- '@gmail.com'"
            : "Domain should be '@annalect.com'",
      },
      correspondenceaddressline1: {
        condition: value.length > 80,
        message: "Length can't exceed 80 characters",
      },
      correspondencelandmark: {
        condition: value.length > 50,
        message: "Length can't exceed 50 characters",
      },
      correspondencezipcode: {
        condition: value.length !== 6 || !value.match(/[0-9]{6}/),
        message: "Can be of only 6 digit",
      },
      primary: {
        condition: value.length !== 10 || !value.match(/[0-9]{10}/),
        message: "Can be of only 10 digit",
      },
      secondary: {
        condition: value.length !== 10 || !value.match(/[0-9]{10}/),
        message: "Can be of only 10 digit",
      },
      emergency: {
        condition: value.length !== 10 || !value.match(/[0-9]{10}/),
        message: "Can be of only 10 digit",
      },
    };

    if (type === "emailtype") {
      const emailField = this.renderRoot.querySelector("#email");
      emailField.disabled = !(
        this.emailtype === "Personal" || this.emailtype === "Official"
      );
    }

    if (!value) {
      this.errormessage(type, "Can't be empty");
    } else if (errorMessages[type].condition) {
      this.errormessage(type, errorMessages[type].message);
    } else {
      this.errormessage_true(type, "");
    }
  }

  submit(e) {
    // console.log("in submit");
    let form = this.renderRoot.querySelector("form");
    form.reportValidity();
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
      this.employeeForm.correspondencezipcode.isValidName === true &&
      this.employee.designation &&
      this.employee.department &&
      this.employee.correspondencecountry &&
      this.employee.correspondencecity &&
      this.employee.correspondencestate
    ) {
      const formData = this.renderRoot.querySelector("form");
      const userdata = serialize(formData);
      const myData = JSON.parse(localStorage.getItem("MyEmployeeList") || "[]");
      myData.push(userdata);
      localStorage.setItem("MyEmployeeList", JSON.stringify(myData));
      alert("Form Submitted Successfully");
      form.submit();
      this.requestUpdate();
    } else {
      let alert = this.renderRoot.querySelector("#submitAlert");
      alert.show();
    }
  }

  static get styles() {
    return css`
      .body-container {
        min-height: 100vh;
        background-color: #f0f2f5;
        padding: 10px;
        position: relative;
        background-image: linear-gradient(45deg, #b3d5e5 0%, #5a83f3f0 44%);
      }
      .body-container:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 500px;
        background: url(https://media.geeksforgeeks.org/wp-content/uploads/20200326181026/wave3.png);
        background-size: cover;
        background-repeat: no-repeat;
      }
      .container {
        position: relative;
        max-width: 900px;
        border-radius: 6px;
        padding: 30px;
        margin: 0px 15px;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 8px rgba(0, 0, 0, 0.2);
        margin: 20px auto;
      }
      .container .spinner {
        position: absolute;
        top: 50%;
        right: 50%;
        z-index: 2;
      }

      .container header {
        position: relative;
        text-align: center;
        font-size: 25px;
        padding-top: 12px;
        padding-bottom: 12px;
        border-radius: 2px;
        background-color: #1d4ed8;
        color: #fff;
        font-family: "Raleway";
        font-weight: 700;
        letter-spacing: 0.05em;
      }

      .blocks {
        display: flex;
        width: 100%;
        margin-top: 14px;
      }
      .container form {
        position: relative;
        margin-top: 18px;
        background-color: #fff;
      }

      .visible {
        display: block;
      }
      .invisible {
        display: none;
      }

      .container form .details.personal {
        margin-top: 20px;
        padding: 20px 10px;
        background-color: #b1dcf040;
        border-radius: 4px;
      }
      .container form .details.contact {
        margin-top: 40px;
        padding: 20px 10px;
        background-color: #b1dcf040;
        border-radius: 4px;
      }
      .container form .details.correspondence {
        margin-top: 20px;
        padding: 20px 10px;
        background-color: #b1dcf040;
        border-radius: 4px;
      }
      .container form .details.permanent {
        margin-top: 40px;
        padding: 20px 10px;
        background-color: #b1dcf040;
        border-radius: 4px;
      }
      .container form .title {
        display: block;
        margin-left: 15px;
        margin-bottom: 8px;
        font-size: 19px;
        color: #333;
        font-family: "Roboto";
        font-weight: 500;
      }
     .container form .title .icon{
        font-size:16px;
      }
      .container form .fields {
        display: flex;
        flex-wrap: wrap;
      }
      form .fields .input-field {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 4px 0;
      }
      .container form .nextBtn,
      .backBtn,
      .btn {
        height: 45px;
        max-width: 200px;
        width: 100%;
        border: none;
        color: #fff;
        border-radius: 5px;
        margin: 25px 0;
        cursor: pointer;
        font-size: 18px;
        font-family: "Roboto";
        font-weight: 500;
        background-color: #1d4ed8;
        letter-spacing: 0.05em;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }

      form .nextBtn:hover,
      .backBtn:hover,
      .btn:hover {
        background-color: #fff;
        color: #1d4ed8;
        border: 1px solid #1d4ed8;
        -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      }

      form .nextBtn:active,
      .backBtn:active,
      .btn:active {
        background-color: #678cf3a7;
      }

      form .buttons {
        display: flex;
        align-items: center;
      }
      form .buttons .nextBtn,
      .backBtn {
        margin-right: 14px;
      }
      .warningDiv {
        font-family: "Lora", serif;
        font-size: 16px;
        color: #ff0000;
      }
      .checkbox {
        font-family: "Lora", serif;
        color: #000000;
        margin-right: 8px;
        margin-bottom: 9px;
        margin-left: 15px;
        font-size: 16px;
        font-family: Roboto;
        font-weight: 500;
        margin-top: 10px;
      }
      #myCheck {
        margin-top: 6px;
      }
      #submitAlert {
        margin-left: 20px;
      }
      .boxerror::part(base) {
        border-color: var(--sl-color-danger-600);
        box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.33);
      }
      .boxerror::part(form-control-label) {
        color: var(--sl-color-danger-500);
      }
      sl-input::part(form-control-label) {
        margin-bottom: 8px;
        margin-left: 2px;
        font-family: "Roboto";
        font-weight: 500;
      }
      sl-select::part(form-control-label) {
        margin-bottom: 8px;
        margin-left: 2px;
        font-family: "Roboto";
        font-weight: 500;
      }
      sl-input::part(form-control-help-text) {
        margin-top: 5px;
        font-family: "Roboto";
      }
      sl-select::part(form-control-help-text) {
        margin-top: 5px;
      }
      .boxerror::part(form-control-help-text) {
        color: var(--sl-color-danger-500);
      }
      sl-input::part(form-control) {
        padding: 0 15px;
      }
      sl-select::part(form-control) {
        padding: 0 15px;
      }
      sl-option::part(form-control) {
        font-family: "Roboto";
        padding: 0 15px;
      }
    `;
  }
}

window.customElements.define("my-element", MyElement);
