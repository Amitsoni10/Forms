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
      emailtype1: { type: String },
    };
  }

  constructor() {
    super();

    this.emailtype1 = "";
    this.employeeForm = {
      name: { value: "", isValidName: false, errorMessage: "" },
      emailtype: {
        personal: { value: "", isValidName: false, errorMessage: "" },
        official: { value: "", isValidName: false, errorMessage: "" },
      },
      // email: { value: "", isValidName: false, errorMessage: "" },
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
      <div class="container">
        <div class="container1">
          <form @submit=${this.submit}>
            <div class="label-container">
              <label>Name</label>
              <input
                class="${this.employeeForm.name.errorMessage ? "boxerror" : ""}"
                type="text"
                id="name"
                @input=${(e) => this.validateForm(e, "Name")}
                autocomplete="off"
              />
              <span class="error">${this.employeeForm.name.errorMessage}</span
              ><br />
            </div>

            <div class="label-container">
              <label>Email Type </label>
              <select
                name="emailtype"
                id="emailtype"
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
              <label>Email</label>
              <input
                type=""
                disabled
                required
                id="email"
                @input=${(e) => this.validateForm(e, "Email")}
                autocomplete="off"
              />
              <span class="error" id="emailerror"
                >${
                  this.employeeForm.emailtype.personal.errorMessage ||
                  this.employeeForm.emailtype.official.errorMessage
                }</span
              ><br />
            </div>

            <div class="label-container">
              <label>Employee Code</label>
              <input
                class="${
                  this.employeeForm.empCode.errorMessage ? "boxerror" : ""
                }"
                type="text"
                id="empcode"
                @input=${(e) => this.validateForm(e, "EmpCode")}
                autocomplete="off"
              />
              <span class="error"
                >${this.employeeForm.empCode.errorMessage}</span
              ><br />
            </div>

            <div class="label-container">
              <label>Choose a Designation </label>
              <select
                name="department"
                id="department"
                class="${
                  this.employeeForm.designation.errorMessage ? "boxerror" : ""
                }"
                @input=${(e) => this.validateForm(e, "designation")}
              >
                ${repeat(
                  designation,
                  (items) =>
                    html`<option class="options">${items.designation}</option>`
                )}
              </select>
              <span class="error"
                >${this.employeeForm.designation.errorMessage}</span
              ><br />
            </div>

            <div class="label-container">
              <label>Choose a Department </label>
              <select
                name="department"
                id="department"
                class="${
                  this.employeeForm.department.errorMessage ? "boxerror" : ""
                }"
                @input=${(e) => this.validateForm(e, "department")}
              >
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

            <div class="label-container">
              <h4>Correspondence Address</h4>
              <label>Address Line 1</label>
              <input
                type="text"
                id="addressline1"
                autocomplete="off"
                @input=${(e) => this.validateForm(e, "addressline1")}
              /><span class="error"
                >${
                  this.employeeForm.address.correspondence.addressline1
                    .errorMessage
                }</span
              ><br /><br />
            </div>

            <div class="label-container">
              <label>Address Line 2</label>
              <input
                type="text"
                id="addressline2"
                @input=${(e) => this.validateForm(e, "addressline2")}
                autocomplete="off"
              /><br /><br />
            </div>

            <div class="label-container">
              <label>Landmark</label>
              <input
                type="text"
                id="landmark"
                @input=${(e) => this.validateForm(e, "landmark")}
                autocomplete="off"
              />
              <span class="error"
                >${
                  this.employeeForm.address.correspondence.landmark.errorMessage
                }</span
              ><br /><br />
            </div>

            <div class="label-container">
              <label>Country</label>
              <select required @input=${(e) => this.validateForm(e, "country")}>
                ${repeat(
                  country,
                  (items) =>
                    html`<option class="options">${items.country}</option>`
                )}
              </select>
              <span class="error"></span>

              <br />
            </div>

            <div class="label-container">
              <label>State</label>
              <select @input=${(e) => this.validateForm(e, "state")} required>
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
              <label>City</label>
              <select @input=${(e) => this.validateForm(e, "city")}>
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
              <label>Zip Code</label>
              <input
                @input=${(e) => this.validateForm(e, "zipcode")}
                autocomplete="off"
              />
              <span class="error"
                >${
                  this.employeeForm.address.correspondence.zipcode.errorMessage
                }</span
              ><br /><br />
            </div>

            <div class="label-container">
            <label for="myCheck"
              >Permanent Address same as Correspondence Address:</label
            >
            <input type="checkbox" id="myCheck" @click=${this.checkbox} /><div>

            <div class="label-container">
              <h4>Permanent Address</h4>
              <label>Address Line 1</label>
              <input value=${
                this.employeeForm.address.permanent.addressline1.value
              }
                type="text"
                id="addressline1"
                autocomplete="off"
              /><br /><br />
            </div>

            <div class="label-container">
              <label>Address Line 2</label>
              <input value=${
                this.employeeForm.address.permanent.addressline2.value
              }
                type="text"
                id="addressline2"
                autocomplete="off"
              /><br /><br />
            </div>

            <div class="label-container">
              <label>Landmark</label>
              <input value=${
                this.employeeForm.address.permanent.landmark.value
              } type="text" id="landmark" autocomplete="off" /><br /><br />
            </div>

            <div class="label-container">
              <label>Country</label>
              <select ><option class="options">${
                this.employeeForm.address.permanent.country.value
              }</option>
                ${repeat(
                  country,
                  (items) =>
                    html`<option class="options">${items.country}</option>`
                )}
              </select>
              <span class="error"></span>

              <br />
            </div>

            <div class="label-container">
              <label>State</label>
              <select ><option class="options">${
                this.employeeForm.address.permanent.state.value
              }</option>
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
              <label>City</label>
              <select ><option class="options">${
                this.employeeForm.address.permanent.city.value
              }</option>
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
              <label>Zip Code</label>
              <input value=${
                this.employeeForm.address.permanent.zipcode.value
              } autocomplete="off" />
              <span></span><br /><br />
            </div>

            <div class="label-container">
              <h4>Contact Info</h4>
              <label>Primary Number</label>
              <input
                class="${
                  this.employeeForm.contact.primary.errorMessage
                    ? "boxerror"
                    : ""
                }"
                type=""
                id="primary"
                @input=${(e) => this.validateForm(e, "primary")}
                autocomplete="off"
              />
              <span class="error"
                >${this.employeeForm.contact.primary.errorMessage}</span
              ><br />
            </div>

            <div class="label-container">
              <label>Secondary Number</label>
              <input
                class="${
                  this.employeeForm.contact.secondary.errorMessage
                    ? "boxerror"
                    : ""
                }"
                type=""
                id="primary"
                @input=${(e) => this.validateForm(e, "secondary")}
                autocomplete="off"
              />
              <span class="error"
                >${this.employeeForm.contact.secondary.errorMessage}</span
              ><br />
            </div>

            <div class="label-container">
              <label>Emergency Number</label>
              <input
                class="${
                  this.employeeForm.contact.emergency.errorMessage
                    ? "boxerror"
                    : ""
                }"
                type=""
                id="primary"
                @input=${(e) => this.validateForm(e, "emergency")}
                autocomplete="off"
              />
              <span class="error"
                >${this.employeeForm.contact.emergency.errorMessage}</span
              ><br />
            </div>

            <button class="btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    `;
  }

  checkbox() {
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
    // console.log("clicked");
    const checkBox = this.renderRoot.querySelector("#myCheck");
    if (checkBox.checked == true) {
      console.log(this.employeeForm.address.correspondence.zipcode.value);
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
      console.log(this.employeeForm);
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
          } else {
            this.employeeForm = {
              ...this.employeeForm,
              name: {
                value: `${e.target.value}`,
                isValidName: true,
                errorMessage: "",
              },
            };
          }
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
                errorMessage: "Length Exceeds",
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
                errorMessage: "Invalid",
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
              emailtype: {
                ...this.employeeForm.emailtype,
                personal: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            };
            if (!this.employeeForm.emailtype.personal.value) {
              this.employeeForm = {
                ...this.employeeForm,
                emailtype: {
                  ...this.employeeForm.emailtype,
                  personal: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Can't be Empty",
                  },
                },
              };
            } else if (
              this.employeeForm.emailtype.personal.value.match(
                /^[^\s@]+@gmail\.com$/
              )
            ) {
              this.employeeForm = {
                ...this.employeeForm,
                emailtype: {
                  ...this.employeeForm.emailtype,
                  personal: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              };
            } else {
              this.employeeForm = {
                ...this.employeeForm,
                emailtype: {
                  ...this.employeeForm.emailtype,
                  personal: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Invalid",
                  },
                },
              };
            }
          } else if (this.emailtype1 === "Official") {
            this.employeeForm = {
              ...this.employeeForm,
              emailtype: {
                ...this.employeeForm.emailtype,
                official: {
                  value: `${e.target.value}`,
                  isValidName: false,
                  errorMessage: "",
                },
              },
            };
            if (!this.employeeForm.emailtype.official.value) {
              this.employeeForm = {
                ...this.employeeForm,
                emailtype: {
                  ...this.employeeForm.emailtype,
                  official: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Can't be Empty",
                  },
                },
              };
            } else if (
              this.employeeForm.emailtype.official.value.match(
                /^[^\s@]+@annalect\.com$/
              )
            ) {
              this.employeeForm = {
                ...this.employeeForm,
                emailtype: {
                  ...this.employeeForm.emailtype,
                  official: {
                    value: `${e.target.value}`,
                    isValidName: true,
                    errorMessage: "",
                  },
                },
              };
            } else {
              this.employeeForm = {
                ...this.employeeForm,
                emailtype: {
                  ...this.employeeForm.emailtype,
                  official: {
                    value: `${e.target.value}`,
                    isValidName: false,
                    errorMessage: "Invalid",
                  },
                },
              };
            }
          } else {
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
                    errorMessage: "Please enter a valid address",
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
                    errorMessage: "Invalid ZipCode",
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
                  errorMessage: "Invalid Number",
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
                  errorMessage: "Invalid Number",
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
                  errorMessage: "Invalid Number",
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
      this.employeeForm.name.value.length > 3
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

    // if (!this.employeeForm.emailtype.personal.value) {
    //   this.employeeForm = {
    //     ...this.employeeForm,
    //     emailtype: {
    //       ...this.employeeForm.emailtype,
    //       personal: {
    //         value: `${e.target.value}`,
    //         isValidName: false,
    //         errorMessage: "Can't be Empty",
    //       },
    //     },
    //   };
    // } else if (!this.employeeForm.emailtype.official.value) {
    //   this.employeeForm = {
    //     ...this.employeeForm,
    //     emailtype: {
    //       ...this.employeeForm.emailtype,
    //       official: {
    //         value: `${e.target.value}`,
    //         isValidName: false,
    //         errorMessage: "Can't be Empty",
    //       },
    //     },
    //   };
    // }

    // if(this.emailtype1===""){
    //   this.employeeForm = {
    //         ...this.employeeForm,
    //         emailtype: {
    //           ...this.employeeForm.emailtype,
    //           official: {
    //             value: `${e.target.value}`,
    //             isValidName: false,
    //             errorMessage: "Can't be Empty",
    //           },
    //           personal:{
    //             value: `${e.target.value}`,
    //             isValidName: false,
    //             errorMessage: "Can't be Empty",
    //           }
    //         },
    //       };
    // }
    // else if(this.emailtype1==="Personal"){
    //   this.employeeForm = {
    //     ...this.employeeForm,
    //     emailtype: {
    //       ...this.employeeForm.emailtype,
    //       personal: {
    //         value: `${e.target.value}`,
    //         isValidName: false,
    //         errorMessage: "Can't be Empty Personal",
    //       },
    //     },
    //   };
    // }
    // else if(this.emailtype1==="Official"){
    //   this.employeeForm = {
    //     ...this.employeeForm,
    //     emailtype: {
    //       ...this.employeeForm.emailtype,
    //       official: {
    //         value: `${e.target.value}`,
    //         isValidName: false,
    //         errorMessage: "Can't be Empty Official",
    //       },
    //     },
    //   };
    // }

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
      (this.employeeForm.emailtype.official.isValidName === true ||
        this.employeeForm.emailtype.personal.isValidName === true) &&
      this.employeeForm.empCode.isValidName === true &&
      this.employeeForm.department.isValidName === true &&
      this.employeeForm.designation.isValidName === true &&
      this.employeeForm.contact.primary.isValidName === true &&
      this.employeeForm.contact.secondary.isValidName === true &&
      this.employeeForm.contact.emergency.isValidName === true
    ) {
      const form = this.renderRoot.querySelector("form");
      form.submit();
      console.log("submitted");
      localStorage.setItem("MyEmployeeList", JSON.stringify(this.employeeForm));
    }
  }

  static get styles() {
    return css`
      .container {
        border: 2px solid black;
        margin: 50px auto;
        border-radius: 12px;
        width: 400px;
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
        background-color: yellow;
        color: black;
        padding: 3px 30px;
        font-size: 16px;
        cursor: pointer;
      }
      select {
        text-align: center;
      }
      .error {
        color: red;
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
