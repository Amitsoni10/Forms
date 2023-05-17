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

export class MyElement extends LitElement {
  static get properties() {
    return {
      employeeForm: { type: Object },
      employeedata:{type:Array},
      emailtype1: { type: String },
      countries: { type: Array },
    };
  }

  constructor() {
    super();
    this.employeedata=[];
    this.countries = [];
    this.emailtype1 = "";

    this.employeeForm = {
      name: { value: "", isValidName: false, errorMessage: "" },
      email:{value: "", isValidName: false, errorMessage: "" },
      empCode: { value: "", isValidName: false, errorMessage: "" },
      designation: { value: "", isValidName: false, errorMessage: "" },
      department: { value: "", isValidName: false, errorMessage: "" },
      address: {
        correspondence: {
          addressline1: { value: "", isValidName: false, errorMessage: "" },
          addressline2: { value: "", isValidName: false, errorMessage: "" },
          landmark: { value: "", isValidName: false, errorMessage: "" },
          country: { value: "", isValidName: false, errorMessage: "" },
          state: { value: "", isValidName: false, errorMessage: "" },
          city: { value: "", isValidName: false, errorMessage: "" },
          zipcode: { value: "", isValidName: false, errorMessage: "" },
        },
        permanent: {
          addressline1: { value: "", isValidName: false, errorMessage: "" },
          addressline2: { value: "", isValidName: false, errorMessage: "" },
          landmark: { value: "", isValidName: false, errorMessage: "" },
          country: { value: "", isValidName: false, errorMessage: "" },
          state: { value: "", isValidName: false, errorMessage: "" },
          city: { value: "", isValidName: false, errorMessage: "" },
          zipcode: { value: "", isValidName: false, errorMessage: "" },
        },
      },
      contact: {
        primary: { value: "", isValidName: false, errorMessage: "" },
        secondary: { value: "", isValidName: false, errorMessage: "" },
        emergency: { value: "", isValidName: false, errorMessage: "" },
      },
    };
  }

  render() {
    return html`
    <div class="bg-container">
      <div class="container">
        <div class="container1">
          <form @submit=${this.submit}>
            <h2>Employee Data Form</h2>
            <div class="first">
              <div class="label-container">
                <label for="name">Name*</label>
                <input
                  class="${this.employeeForm.name.errorMessage
                    ? "boxerror"
                    : ""}"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  @input=${(e) => this.validateForm(e, "Name")}
                  autocomplete="off"
                />
                <span class="error">${this.employeeForm.name.errorMessage}</span
                ><br />
              </div>

              <div class="label-container">
                <label for="empcode">Employee Code*</label>
                <input
                  class="${this.employeeForm.empCode.errorMessage
                    ? "boxerror"
                    : ""}"
                  type="text"
                  id="empcode"
                  name="empcode"
                  placeholder="Enter Employee Code"
                  @input=${(e) => this.validateForm(e, "EmpCode")}
                  autocomplete="off"
                />
                <span class="error"
                  >${this.employeeForm.empCode.errorMessage}</span
                ><br />
              </div>
            </div>

            <div class="first">
              <div class="label-container">
                <label for="emailtype">Email Type* </label>
                <select
                  name="emailtype"
                  id="emailtype"
                  required
                  @input=${(e) => this.validateForm(e, "emailtype")}
                >
                  ${repeat(
                    emaildata,
                    (items) =>
                      html`<option class="options">${items.email}</option>`
                  )}
                </select>
                <span class="error"></span><br />
              </div>

              <div class="label-container">
                <label for="email">Email*</label>
                <input
                  type=""
                  disabled
                  required
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  @input=${(e) => this.validateForm(e, "Email")}
                  autocomplete="off"
                />
                <span class="error" id="emailerror"
                  >${this.employeeForm.email.errorMessage}</span
                ><br />
              </div>
            </div>

            <div class="first">
              <div class="label-container">
                <label for="designation">Choose a Designation* </label>
                <select
                  name="designation"
                  id="designation"
                  required
                  class="${this.employeeForm.designation.errorMessage
                    ? "boxerror"
                    : ""}"
                  @input=${(e) => this.validateForm(e, "designation")}
                ><option></option>
                  ${repeat(
                    designation,
                    (items) =>
                      html`<option class="options">
                        ${items.designation}
                      </option>`
                  )}
                </select>
                <span class="error"
                  >${this.employeeForm.designation.errorMessage}</span
                ><br />
              </div>

              <div class="label-container">
                <label for="department">Choose a Department* </label>
                <select
                  name="department"
                  id="department"
                  required
                  class="${this.employeeForm.department.errorMessage
                    ? "boxerror"
                    : ""}"
                  @input=${(e) => this.validateForm(e, "department")}
                ><option ></option>
                  ${repeat(
                    department,
                    (items) =>
                      html`<option class="options">${items.department}</option>`
                  )}
                </select>
                <span class="error"
                  >${this.employeeForm.department.errorMessage}</span
                >

                <br />
              </div>
            </div>


            <div class="address-container">
              <div class="address">
                <div class="label-container">
                  <h3>Correspondence Address</h3>
                  <label for="correspondenceaddressline1">Address Line 1*</label>
                  <input
                    type="text"
                    id="correspondenceaddressline1"
                    name="correspondenceaddressline1"
                    placeholder="Enter Your Address"
                    class="${this.employeeForm.address.correspondence
                      .addressline1.errorMessage
                      ? "boxerror"
                      : ""}"
                    autocomplete="off"
                    @input=${(e) => this.validateForm(e, "addressline1")}
                  /><span class="error"
                    >${this.employeeForm.address.correspondence.addressline1
                      .errorMessage}</span
                  ><br />
                </div>

                <div class="label-container">
                  <label for="correspondenceaddressline2">Address Line 2</label>
                  <input
                    type="text"
                    id="correspondenceaddressline2"
                    name="correspondenceaddressline2"
                    placeholder="Optional"
                    @input=${(e) => this.validateForm(e, "addressline2")}
                    autocomplete="off"
                  /><br />
                </div>

                <div class="label-container">
                  <label for="correspondencelandmark">Landmark*</label>
                  <input
                    type="text"
                    id="correspondencelandmark"
                    name="correspondencelandmark"
                    placeholder="Enter Landmark"
                    class="${this.employeeForm.address.correspondence.landmark
                      .errorMessage
                      ? "boxerror"
                      : ""}"
                    @input=${(e) => this.validateForm(e, "landmark")}
                    autocomplete="off"
                  />
                  <span class="error"
                    >${this.employeeForm.address.correspondence.landmark
                      .errorMessage}</span
                  ><br />
                </div>

                <div class="label-container">
                  <label for="correspondencecountry">Country*</label>
                  <select
                  id="correspondencecountry"
                  name="correspondencecountry"
                    required
                    @input=${(e) => this.validateForm(e, "country")}
                  >
                    <option></option>
                    ${repeat(
                      this.countries,
                      (items) =>
                        html`<option class="options">${items.name}</option>`
                    )}
                  </select>
                  <span class="error"></span>

                  <br />
                </div>

                <div class="label-container">
                  <label for="correspondencestate">State*</label>
                  <select
                    @input=${(e) => this.validateForm(e, "state")}
                    id="correspondencestate"
                    name="correspondencestate"
                    required
                  >
                    <option></option>
                    ${repeat(
                      state,
                      (items) =>
                        html`<option class="options">${items.state}</option>`
                    )}
                  </select>
                  <span class="error"></span>
                  <br />
                </div>

                <div class="label-container">
                  <label for="correspondencecity">City*</label>
                  <select
                   @input=${(e) => this.validateForm(e, "city")}
                   id="correspondencecity"
                   name="correspondencecity"
                   required
                   >
                    <option></option>
                    ${repeat(
                      city,
                      (items) =>
                        html`<option class="options">${items.city}</option>`
                    )}
                  </select>
                  <span class="error"></span>
                  <br />
                </div>

                <div class="label-container">
                  <label for="correspondencezipcode">Zip Code*</label>
                  <input
                    @input=${(e) => this.validateForm(e, "zipcode")}
                    id="correspondencezipcode"
                    name="correspondencezipcode"
                    placeholder="Enter Zipcode"
                    autocomplete="off"
                    class="${this.employeeForm.address.correspondence.zipcode
                      .errorMessage
                      ? "boxerror"
                      : ""}"
                  />
                  <span class="error"
                    >${this.employeeForm.address.correspondence.zipcode
                      .errorMessage}</span
                  ><br />
                </div>
              </div>

              <div class="address">
                <div class="label-container">
                  <h3>Permanent Address</h3>
                  <label for="permanentaddressline1">Address Line 1</label>
                  <input
                    value=${this.employeeForm.address.permanent.addressline1
                      .value}
                    @input=${(e) => this.validateForm(e, "addressline12")}
                    type="text"
                    id="permanentaddressline1"
                    name="permanentaddressline1"
                    placeholder="Enter Your Address"
                    autocomplete="off"
                  /><span class="error"
                    >${this.employeeForm.address.permanent.addressline1
                      .errorMessage}</span
                  ><br />
                </div>

                <div class="label-container">
                  <label for="permanentaddressline2">Address Line 2</label>
                  <input
                    value=${this.employeeForm.address.permanent.addressline2
                      .value}
                    @input=${(e) => this.validateForm(e, "addressline22")}
                    type="text"
                    id="permanentaddressline2"
                    name="permanentaddressline2"
                    placeholder="Optional"
                    autocomplete="off"
                  /><br />
                </div>

                <div class="label-container">
                  <label for="permanentlandmark">Landmark</label>
                  <input
                    value=${this.employeeForm.address.permanent.landmark.value}
                    @input=${(e) => this.validateForm(e, "landmark2")}
                    type="text"
                    id="permanentlandmark"
                    name="permanentlandmark"
                    placeholder="Enter Landmark"
                    autocomplete="off"
                  />
                  <span class="error"
                    >${this.employeeForm.address.permanent.landmark
                      .errorMessage}</span
                  ><br />
                </div>

                <div class="label-container">
                  <label for="permanentcountry">Country</label>
                  <select @input=${(e) => this.validateForm(e, "country2")}
                  name="permanentcountry"
                  id="permanentcountry"
                  >
                    <option class="options">
                      ${this.employeeForm.address.permanent.country.value}
                    </option>
                    ${repeat(
                      this.countries,
                      (items) =>
                        html`<option class="options">${items.name}</option>`
                    )}
                  </select>
                  <span class="error"></span>

                  <br />
                </div>

                <div class="label-container">
                  <label for="permanentstate">State</label>
                  <select @input=${(e) => this.validateForm(e, "state2")}
                  id="permanentstate"
                  name="permanentstate"
                  >
                    <option class="options">
                      ${this.employeeForm.address.permanent.state.value}
                    </option>
                    ${repeat(
                      state,
                      (items) =>
                        html`<option class="options">${items.state}</option>`
                    )}
                  </select>
                  <span class="error"></span>
                  <br />
                </div>

                <div class="label-container">
                  <label for="permanentcity">City</label>
                  <select @input=${(e) => this.validateForm(e, "city2")}
                  name="permanentcity"
                  id="permanentcity"
                  >
                    <option class="options">
                      ${this.employeeForm.address.permanent.city.value}
                    </option>
                    ${repeat(
                      city,
                      (items) =>
                        html` <option class="options">${items.city}</option>`
                    )}
                  </select>
                  <span class="error"></span>
                  <br />
                </div>

                <div class="label-container">
                  <label for="permanentzipcode">Zip Code</label>
                  <input
                    value=${this.employeeForm.address.permanent.zipcode.value}
                    @input=${(e) => this.validateForm(e, "zipcode2")}
                    id="permanentzipcode"
                    name="permanentzipcode"
                    placeholder="Enter Zipcode"
                    autocomplete="off"
                  />
                  <span class="error"
                    >${this.employeeForm.address.permanent.zipcode
                      .errorMessage}</span
                  ><br />
                </div>
              </div>
            </div>

             <!-- <div class="label-container"> -->
             <label for="myCheck"
              ><u>Permanent Address same as Correspondence Address:</u></label
            >
            <input type="checkbox" id="myCheck" name="myCheck" @click=${this.checkbox} /><br><br>
            <!-- </div> -->

            <h3>Contact Information</h3>
            <div class="contact">
              <div class="label-container">
                <label for="primarynumber">Primary Number*</label>
                <input
                  class="${this.employeeForm.contact.primary.errorMessage
                    ? "boxerror"
                    : ""}"
                  type=""
                  id="primarynumber"
                  name="primarynumber"
                  placeholder="Enter Primary Number"
                  @input=${(e) => this.validateForm(e, "primary")}
                  autocomplete="off"
                />
                <span class="error"
                  >${this.employeeForm.contact.primary.errorMessage}</span
                ><br />
              </div>

              <div class="label-container">
                <label for="secondarynumber">Secondary Number*</label>
                <input
                  class="${this.employeeForm.contact.secondary.errorMessage
                    ? "boxerror"
                    : ""}"
                  type=""
                  name="secondarynumber"
                  id="secondarynumber"
                  placeholder="Enter Secondary Number"
                  @input=${(e) => this.validateForm(e, "secondary")}
                  autocomplete="off"
                />
                <span class="error"
                  >${this.employeeForm.contact.secondary.errorMessage}</span
                ><br />
              </div>

              <div class="label-container">
                <label for="emergencynumber">Emergency Number*</label>
                <input
                  class="${this.employeeForm.contact.emergency.errorMessage
                    ? "boxerror"
                    : ""}"
                  type=""
                  class="emergencynumber"
                  id="emergencynumber"
                  placeholder="Enter Emergency Number"
                  @input=${(e) => this.validateForm(e, "emergency")}
                  autocomplete="off"
                />
                <span class="error"
                  >${this.employeeForm.contact.emergency.errorMessage}</span
                ><br />
              </div>
            </div>
            <p>* Please Fill All Mandatory Fields</p>

            <button class="btn" type="submit" >Submit</button>
          </form>
        </div>
      </div>
     </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadCountries();
  }

  async loadCountries() {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    this.countries = data;
  }

  checkbox() {
    const checkBox = this.renderRoot.querySelector("#myCheck");
    if (checkBox.checked == true) {
      this.employeeForm = {
        ...this.employeeForm,
        address: {
          ...this.employeeForm.address,
          permanent: {
            ...this.employeeForm.address.permanent,
            addressline1: {
              value: `${this.employeeForm.address.correspondence.addressline1.value}`,
              isValidName: true,
              errorMessage: "",
            },
            addressline2: {
              value: `${this.employeeForm.address.correspondence.addressline2.value}`,
              isValidName: true,
              errorMessage: "",
            },
            landmark: {
              value: `${this.employeeForm.address.correspondence.landmark.value}`,
              isValidName: true,
              errorMessage: "",
            },
            country: {
              value: `${this.employeeForm.address.correspondence.country.value}`,
              isValidName: true,
              errorMessage: "",
            },
            state: {
              value: `${this.employeeForm.address.correspondence.state.value}`,
              isValidName: true,
              errorMessage: "",
            },
            city: {
              value: `${this.employeeForm.address.correspondence.city.value}`,
              isValidName: true,
              errorMessage: "",
            },
            zipcode: {
              value: `${this.employeeForm.address.correspondence.zipcode.value}`,
              isValidName: true,
              errorMessage: "",
            },
          },
        },
      };
    } else {
      console.log("not cliced");
    }
  }

  validateForm(e, type) {
    switch (type) {
      // Validation For Name
      case "Name":
        {
          this.employeeForm = {
            ...this.employeeForm,
            name: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "",
            },
          };

          !this.employeeForm.name.value ||
          this.employeeForm.name.value.length > 40
            ? (this.employeeForm = {
                ...this.employeeForm,
                name: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "Please Enter a valid Employee name",
                },
              })
            : (this.employeeForm = {
                ...this.employeeForm,
                name: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              });
        }
        break;

      // Validation for EmpCode
      case "EmpCode":
        {
          this.employeeForm = {
            ...this.employeeForm,
            empCode: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "",
            },
          };

          if (!this.employeeForm.empCode.value) {
            this.employeeForm = {
              ...this.employeeForm,
              empCode: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Can't be empty",
              },
            };
          } else if (this.employeeForm.empCode.value.length > 7) {
            this.employeeForm = {
              ...this.employeeForm,
              empCode: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Emp code should be of 6 digit and 1 alphabet only (i.e-1234A56)",
              },
            };
          } else if (
            this.employeeForm.empCode.value.match(/[A-Z]{1}[0-9]{6}/) ||
            this.employeeForm.empCode.value.match(/[0-9][A-Z]{1}[0-9]{5}/) ||
            this.employeeForm.empCode.value.match(/[0-9]{2}[A-Z]{1}[0-9]{4}/) ||
            this.employeeForm.empCode.value.match(/[0-9]{3}[A-Z]{1}[0-9]{3}/) ||
            this.employeeForm.empCode.value.match(/[0-9]{4}[A-Z]{1}[0-9]{2}/) ||
            this.employeeForm.empCode.value.match(/[0-9]{5}[A-Z]{1}[0-9]/) ||
            this.employeeForm.empCode.value.match(/[0-9]{6}[A-Z]{1}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              empCode: {
                value: `${e.target.value}`,
                isValidName: true,
                errorMessage: "",
              },
            };
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              empCode: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Emp code should be of 6 digit and 1 alphabet only (i.e-1234A56)",
              },
            };
          }
        }
        break;

      // Validation for emailtype
      case "emailtype":
        {
          this.emailtype1 = e.target.value;
          if (this.emailtype1 === "Personal") {
            this.renderRoot.querySelector("#email").disabled = false;
          } else if (this.emailtype1 === "Official") {
            this.renderRoot.querySelector("#email").disabled = false;
          } else {
            this.renderRoot.querySelector("#email").disabled = true;
          }
        }
        break;

      // Validation for Email
      case "Email":
        {
          if (this.emailtype1 === "Personal") {
            this.employeeForm = {
              ...this.employeeForm,
                email: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                
              },
            };
            if (!this.employeeForm.email.value) {
              this.employeeForm = {
                ...this.employeeForm, 
                email: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Can't be Empty",
                  },
                
              };
            } else if (
              this.employeeForm.email.value.match(
                /^[^\s@]+@gmail\.com$/
              )
            ) {
              this.employeeForm = {
                ...this.employeeForm,

                email: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                
              };
            } else {
              this.employeeForm = {
                ...this.employeeForm,
                email: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Invalid",
                  },
              };
            }
          } else if (this.emailtype1 === "Official") {
            this.employeeForm = {
              ...this.employeeForm,

              email: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              
            };
            if (!this.employeeForm.email.value) {
              this.employeeForm = {
                ...this.employeeForm,
                email: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Can't be Empty",
                  },
              };
            } else if (
              this.employeeForm.email.value.match(
                /^[^\s@]+@annalect\.com$/
              )
            ) {
              this.employeeForm = {
                ...this.employeeForm,
                email: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
              };
            } else {
              this.employeeForm = {
                ...this.employeeForm,

                email: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Invalid",
                  },

              };
            }
          } 
        }
        break;

      // Validation for department
      case "department":
        {
          this.employeeForm = {
            ...this.employeeForm,
            department: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "",
            },
          };

          if (this.employeeForm.department.value === "") {
            this.employeeForm = {
              ...this.employeeForm,
              department: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Please choose a department",
              },
            };
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              department: {
                value: `${e.target.value}`,
                isValidName: true,
                errorMessage: "",
              },
            };
          }
        }
        break;

      // validation for designation
      case "designation":
        {
          this.employeeForm = {
            ...this.employeeForm,
            designation: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "",
            },
          };

          if (this.employeeForm.designation.value === "") {
            this.employeeForm = {
              ...this.employeeForm,
              designation: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Please choose a designation",
              },
            };
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              designation: {
                value: `${e.target.value}`,
                isValidName: true,
                errorMessage: "",
              },
            };
          }
        }
        break;

      // validation for correspondence address line 1
      case "addressline1":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              correspondence: {
                ...this.employeeForm.address.correspondence,
                addressline1: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            },
          };

          if (
            !this.employeeForm.address.correspondence.addressline1.value ||
            this.employeeForm.address.correspondence.addressline1.value.length >
              80
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                correspondence: {
                  ...this.employeeForm.address.correspondence,
                  addressline1: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Please enter a valid address and can't exceed length of 80",
                  },
                },
              },
            };
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                correspondence: {
                  ...this.employeeForm.address.correspondence,
                  addressline1: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              },
            };
          }
        }
        break;

      // storing data for correspondence address line2
      case "addressline2":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              correspondence: {
                ...this.employeeForm.address.correspondence,
                addressline2: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // storing data  for correspondence country
      case "country":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              correspondence: {
                ...this.employeeForm.address.correspondence,
                country: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // storing data  for correspondence state
      case "state":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              correspondence: {
                ...this.employeeForm.address.correspondence,
                state: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // storing data  for correspondence city
      case "city":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              correspondence: {
                ...this.employeeForm.address.correspondence,
                city: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // validation for correspondence landmark
      case "landmark":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              correspondence: {
                ...this.employeeForm.address.correspondence,
                landmark: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            },
          };
          if (
            !this.employeeForm.address.correspondence.landmark.value ||
            this.employeeForm.address.correspondence.landmark.value.length > 50
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                correspondence: {
                  ...this.employeeForm.address.correspondence,
                  landmark: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Please enter a valid landmark",
                  },
                },
              },
            };
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                correspondence: {
                  ...this.employeeForm.address.correspondence,
                  landmark: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              },
            };
          }
        }
        break;

      // validation for correspondence zipcode
      case "zipcode":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              correspondence: {
                ...this.employeeForm.address.correspondence,
                zipcode: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            },
          };
          if (!this.employeeForm.address.correspondence.zipcode.value) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                correspondence: {
                  ...this.employeeForm.address.correspondence,
                  zipcode: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Can't be Empty",
                  },
                },
              },
            };
          } else if (
            this.employeeForm.address.correspondence.zipcode.value.length > 6 ||
            this.employeeForm.address.correspondence.zipcode.value.length < 6 ||
            !this.employeeForm.address.correspondence.zipcode.value.match(
              /[0-9]{6}/
            )
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                correspondence: {
                  ...this.employeeForm.address.correspondence,
                  zipcode: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Have to be Only of 6 digit",
                  },
                },
              },
            };
          } else if (
            this.employeeForm.address.correspondence.zipcode.value.match(
              /[0-9]{6}/
            )
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                correspondence: {
                  ...this.employeeForm.address.correspondence,
                  zipcode: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              },
            };
          }
        }
        break;

      // validation for permanent address line 1
      case "addressline12":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              permanent: {
                ...this.employeeForm.address.permanent,
                addressline1: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            },
          };

          if (
            !this.employeeForm.address.permanent.addressline1.value ||
            this.employeeForm.address.permanent.addressline1.value.length > 80
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                permanent: {
                  ...this.employeeForm.address.permanent,
                  addressline1: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Please enter a valid address and can't exceed length of 80",
                  },
                },
              },
            };
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                permanent: {
                  ...this.employeeForm.address.permanent,
                  addressline1: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              },
            };
          }
        }
        break;

      // storing data for permanent address line2
      case "addressline22":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              permanent: {
                ...this.employeeForm.address.permanent,
                addressline2: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // storing data  for permanent country
      case "country2":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              permanent: {
                ...this.employeeForm.address.permanent,
                country: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // storing data  for permanent state
      case "state2":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              permanent: {
                ...this.employeeForm.address.permanent,
                state: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // storing data  for permanent city
      case "city2":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              permanent: {
                ...this.employeeForm.address.permanent,
                city: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            },
          };
        }
        break;

      // validation for permanent landmark
      case "landmark2":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              permanent: {
                ...this.employeeForm.address.permanent,
                landmark: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            },
          };
          if (
            !this.employeeForm.address.permanent.landmark.value ||
            this.employeeForm.address.permanent.landmark.value.length > 50
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                permanent: {
                  ...this.employeeForm.address.permanent,
                  landmark: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Please enter a valid landmark",
                  },
                },
              },
            };
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                permanent: {
                  ...this.employeeForm.address.permanent,
                  landmark: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              },
            };
          }
        }
        break;

      // validation for permanent zipcode
      case "zipcode2":
        {
          this.employeeForm = {
            ...this.employeeForm,
            address: {
              ...this.employeeForm.address,
              permanent: {
                ...this.employeeForm.address.permanent,
                zipcode: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            },
          };
          console.log(this.employeeForm);
          if (!this.employeeForm.address.permanent.zipcode.value) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                permanent: {
                  ...this.employeeForm.address.permanent,
                  zipcode: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Can't be Empty",
                  },
                },
              },
            };
          } else if (
            this.employeeForm.address.permanent.zipcode.value.length > 6 ||
            this.employeeForm.address.permanent.zipcode.value.length < 6 ||
            !this.employeeForm.address.permanent.zipcode.value.match(/[0-9]{6}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                permanent: {
                  ...this.employeeForm.address.permanent,
                  zipcode: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Have to be Only of 6 digit",
                  },
                },
              },
            };
          } else if (
            this.employeeForm.address.permanent.zipcode.value.match(/[0-9]{6}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              address: {
                ...this.employeeForm.address,
                permanent: {
                  ...this.employeeForm.address.permanent,
                  zipcode: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              },
            };
          }
        }
        break;

      // validation for primary number
      case "primary":
        {
          this.employeeForm = {
            ...this.employeeForm,
            contact: {
              ...this.employeeForm.contact,
              primary: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "",
              },
            },
          };

          if (!this.employeeForm.contact.primary.value) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                primary: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "Can't be Empty",
                },
              },
            };
          } else if (
            this.employeeForm.contact.primary.value.length > 10 ||
            this.employeeForm.contact.primary.value.length < 10 ||
            !this.employeeForm.contact.primary.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                primary: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "Can Be Only Of 10 Digit",
                },
              },
            };
          } else if (
            this.employeeForm.contact.primary.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                primary: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            };
          }
        }
        break;

      // Validation for secondary number
      case "secondary":
        {
          this.employeeForm = {
            ...this.employeeForm,
            contact: {
              ...this.employeeForm.contact,
              secondary: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "",
              },
            },
          };

          if (!this.employeeForm.contact.secondary.value) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                secondary: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "Can't be Empty",
                },
              },
            };
          } else if (
            this.employeeForm.contact.secondary.value.length > 10 ||
            this.employeeForm.contact.secondary.value.length < 10 ||
            !this.employeeForm.contact.secondary.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                secondary: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "Can Be Only Of 10 Digit",
                },
              },
            };
          } else if (
            this.employeeForm.contact.secondary.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                secondary: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            };
          }
        }
        break;

      // Validation for emergency number
      case "emergency":
        {
          this.employeeForm = {
            ...this.employeeForm,
            contact: {
              ...this.employeeForm.contact,
              emergency: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "",
              },
            },
          };

          if (!this.employeeForm.contact.emergency.value) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                emergency: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "Can't be Empty",
                },
              },
            };
          } else if (
            this.employeeForm.contact.emergency.value.length > 10 ||
            this.employeeForm.contact.emergency.value.length < 10 ||
            !this.employeeForm.contact.emergency.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                emergency: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "Can Be Only Of 10 Digit",
                },
              },
            };
          } else if (
            this.employeeForm.contact.emergency.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              contact: {
                ...this.employeeForm.contact,
                emergency: {
                  value: `${e.target.value}`,
                  isValidName: true,
                  errorMessage: "",
                },
              },
            };
          }
        }
        break;
    }
  }

  submit(e) {
    e.preventDefault();

    if (
      !this.employeeForm.name.value ||
      this.employeeForm.name.value.length > 40
    ) {
      this.employeeForm = {
        ...this.employeeForm,
        name: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Please Enter a valid Employee name",
        },
      };
    }

    if (!this.employeeForm.address.correspondence.addressline1.value) {
      this.employeeForm = {
        ...this.employeeForm,
        address: {
          ...this.employeeForm.address,
          correspondence: {
            ...this.employeeForm.address.correspondence,
            addressline1: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "Can't be empty",
            },
          },
        },
      };
    }
    if (!this.employeeForm.address.correspondence.landmark.value) {
      this.employeeForm = {
        ...this.employeeForm,
        address: {
          ...this.employeeForm.address,
          correspondence: {
            ...this.employeeForm.address.correspondence,
            landmark: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "Can't be empty",
            },
          },
        },
      };
    }
    if (!this.employeeForm.address.correspondence.zipcode.value) {
      this.employeeForm = {
        ...this.employeeForm,
        address: {
          ...this.employeeForm.address,
          correspondence: {
            ...this.employeeForm.address.correspondence,
            zipcode: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "Can't be empty",
            },
          },
        },
      };
    }

    if (!this.employeeForm.empCode.value) {
      this.employeeForm = {
        ...this.employeeForm,
        empCode: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Can't be empty",
        },
      };
    }

    if (this.employeeForm.department.value === "") {
      this.employeeForm = {
        ...this.employeeForm,
        department: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Please choose a department",
        },
      };
    }

    if (this.employeeForm.designation.value === "") {
      this.employeeForm = {
        ...this.employeeForm,
        designation: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Please choose a designation",
        },
      };
    }

    if (!this.employeeForm.contact.primary.value) {
      this.employeeForm = {
        ...this.employeeForm,
        contact: {
          ...this.employeeForm.contact,
          primary: {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Can't be Empty",
          },
        },
      };
    }

    if (!this.employeeForm.contact.secondary.value) {
      this.employeeForm = {
        ...this.employeeForm,
        contact: {
          ...this.employeeForm.contact,
          secondary: {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Can't be Empty",
          },
        },
      };
    }
    if (!this.employeeForm.contact.emergency.value) {
      this.employeeForm = {
        ...this.employeeForm,
        contact: {
          ...this.employeeForm.contact,
          emergency: {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Can't be Empty",
          },
        },
      };
    }

    if (
      this.employeeForm.name.isValidName === true &&
      this.employeeForm.email.isValidName === true &&
      this.employeeForm.empCode.isValidName === true &&
      this.employeeForm.department.isValidName === true &&
      this.employeeForm.designation.isValidName === true &&
      this.employeeForm.contact.primary.isValidName === true &&
      this.employeeForm.contact.secondary.isValidName === true &&
      this.employeeForm.contact.emergency.isValidName === true &&
      this.employeeForm.address.correspondence.addressline1.isValidName ===
        true &&
      this.employeeForm.address.correspondence.landmark.isValidName === true &&
      this.employeeForm.address.correspondence.zipcode.isValidName === true
    ) {
      let userdata={
        Name:this.employeeForm.name.value,
        EmployeeCode:this.employeeForm.empCode.value,
        EmailType:this.emailtype1,
        Email:this.employeeForm.email.value,
        Designation:this.employeeForm.designation.value,
        Department:this.employeeForm.department.value,
        CorrespondenceAddressLine1:this.employeeForm.address.correspondence.addressline1.value,
        CorrespondenceAddressLine2:this.employeeForm.address.correspondence.addressline2.value,
        CorrespondenceLandmark:this.employeeForm.address.correspondence.landmark.value,
        CorrespondenceCountry:this.employeeForm.address.correspondence.country.value,
        CorrespondenceState:this.employeeForm.address.correspondence.state.value,
        CorrespondenceCity:this.employeeForm.address.correspondence.city.value,
        CorrespondenceZipCode:this.employeeForm.address.correspondence.zipcode.value,
        PermanentAddressLine1:this.employeeForm.address.permanent.addressline1.value,
        PermanentAddressLine2:this.employeeForm.address.permanent.addressline2.value,
        PermanentLandmark:this.employeeForm.address.permanent.landmark.value,
        PermanentCountry:this.employeeForm.address.permanent.country.value,
        PermanentState:this.employeeForm.address.permanent.state.value,
        PermanentCity:this.employeeForm.address.permanent.city.value,
        PermanentZipCode:this.employeeForm.address.permanent.zipcode.value,
        PrimaryNumber:this.employeeForm.contact.primary.value,
        SecondaryNumber:this.employeeForm.contact.secondary.value,
        EmergencyNumber:this.employeeForm.contact.emergency.value,
      }
      this.employeedata.push(userdata)
      localStorage.setItem("MyEmployeeList", JSON.stringify(this.employeedata));
      const form = this.renderRoot.querySelector("form");
     
      this.employeeForm.address.correspondence.addressline2.value="",
      this.employeeForm.address.permanent.addressline1.value="",
      this.employeeForm.address.permanent.addressline2.value="",
      this.employeeForm.address.permanent.landmark.value="",
      this.employeeForm.address.permanent.country.value=""
      this.employeeForm.address.permanent.state.value="",
      this.employeeForm.address.permanent.city.value="",
      this.employeeForm.address.permanent.zipcode.value="",
      alert("Form Submitted Successfully");
      form.reset();
    
    
    
    }
  
    
  }

  static get styles() {
    return css`
      
      @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
    .bg-container{
      background-image:radial-gradient(rgba(88, 255, 241, 0.952),rgba(113, 82, 255, 0.973));
    }
      input,
      select {
        border: 1px solid black;
        border-radius: 10px;
        font-size: 14px;
        padding: 2px;
        text-align: center;
      }
      .first {
        display: flex;
        gap: 5px;
      }
      .contact {
        display: flex;
        gap: 8px;
      }
      .address-container {
        /* border: 2px solid black; */
        display: flex;
      }
      .address {
        /* border: 2px solid black; */
        padding: 5px;
      }
      .container {
        font-family: "Raleway", sans-serif;
        border: 3px solid black;
        margin: 0px auto;
        border-radius: 12px;
        width: 660px;
        background-color: radial-gradient(rgba(88, 255, 241, 0.952),rgba(113, 82, 255, 0.973));
      }
      .container1 {
        /* border: 2px solid red; */
        text-align: center;
        padding: 10px;
        margin: 10px 10px;
        /* position:relative; */
      }
      .label-container {
        /* border: 2px solid yellow; */
        margin: 0px auto;
        width: 300px;
        display: flex;
        flex-direction: column;
      }
      .btn {
        border: 1px solid black;
        border-radius: 12px;
        background-color: rgba(89, 236, 89, 0.932);
        color: black;
        padding: 3px 30px;
        font-size: 16px;
        cursor: pointer;
      }
      .btn:hover {
        background-color: rgba(25, 146, 25, 0.932);
      }
      select {
        text-align: center;
      }
      .error {
        color: red;
        font-size:14px;
      }
      .boxerror {
        color: red;
        border: 2px solid red;
      }
      .options {
        color: black;
      }
    `;
  }
}

window.customElements.define("my-element", MyElement);
