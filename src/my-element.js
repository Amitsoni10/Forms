import { LitElement, css, html } from "lit";
import { designation, department } from "./assets/data";
import { repeat } from "lit/directives/repeat.js";

export class MyElement extends LitElement {
  static get properties() {
    return {
      employeeForm: { type: Object },
    };
  }

  constructor() {
    super();
    this.employeeForm = {
      name: { value: "", isValidName: false, errorMessage: "" },
      email: { value: "", isValidName: false, errorMessage: "" },
      empCode: { value: "", isValidName: false, errorMessage: "" },
      designation: { value: "", isValidName: false, errorMessage: "" },
      department: { value: "", isValidName: false, errorMessage: "" },
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
              <label>Email</label>
              <input
                class="${this.employeeForm.email.errorMessage
                  ? "boxerror"
                  : ""}"
                type=""
                id="email"
                @input=${(e) => this.validateForm(e, "Email")}
                autocomplete="off"
              />
              <span class="error">${this.employeeForm.email.errorMessage}</span
              ><br />
            </div>

            <div class="label-container">
              <label>Emp Code</label>
              <input
                class="${this.employeeForm.empCode.errorMessage
                  ? "boxerror"
                  : ""}"
                type="text"
                id="empcode"
                @input=${(e) => this.validateForm(e, "EmpCode")}
                autocomplete="off"
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
                class="${this.employeeForm.designation.errorMessage
                  ? "boxerror"
                  : ""}"
                @input=${(e) => this.validateForm(e, "designation")}

              >
                ${repeat(
                  designation,
                  (items) => html`<option class="options">${items.designation}</option>`
                )}</select
              >
              <span class="error"
                >${this.employeeForm.designation.errorMessage}</span
              ><br />
            </div>

            <div class="label-container">
              <label>Choose a Department </label>
              <select
                name="department"
                id="department"
                class="${this.employeeForm.department.errorMessage
                  ? "boxerror"
                  : ""}"
                @input=${(e) => this.validateForm(e, "department")}
                
              >
                ${repeat(
                  department,
                  (items) => html`<option class="options">${items.department}</option>`
                )}
              </select>
              <span class="error"
                >${this.employeeForm.department.errorMessage}</span
              >

              <br />
            </div>

            <div class="label-container">
              <label>Primary Number</label>
              <input
                class="${this.employeeForm.contact.primary.errorMessage
                  ? "boxerror"
                  : ""}"
                type=""
                id="primary"
                @input=${(e) => this.validateForm(e, "primary")}
                autocomplete="off"
              />
              <span class="error"
                >${this.employeeForm.contact.primary.errorMessage}</span
              ><br />
            </div>

            <button class="btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    `;
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

      // Email Validation
      case "Email":
        {
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
            this.employeeForm.email.value.match(/^[^\s@]+@annalect\.com$/) ||
            this.employeeForm.email.value.match(/^[^\s@]+@gmail\.com$/)
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

          if (
            this.employeeForm.department.value===""
          ) {
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

          if (
            this.employeeForm.designation.value===""
          ) {
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


      // validation for primary number
      case "primary":
        {
          this.employeeForm.contact = {
            ...this.employeeForm.contact,
            primary: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "",
            },
          };
          console.log(this.employeeForm);

          if (!this.employeeForm.contact.primary.value) {
            this.employeeForm.contact = {
              ...this.employeeForm.contact,
              primary: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Please Enter your number",
              },
            };
          } else if (
            this.employeeForm.contact.primary.value.length > 10 ||
            this.employeeForm.contact.primary.value.length < 10 ||
            !this.employeeForm.contact.primary.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm.contact = {
              ...this.employeeForm.contact,
              primary: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Invalid Number",
              },
            };
          } else if (
            this.employeeForm.contact.primary.value.match(/[0-9]{10}/)
          ) {
            this.employeeForm.contact = {
              ...this.employeeForm.contact,
              primary: {
                value: `${e.target.value}`,
                isValidName: true,
                errorMessage: "",
              },
            };
          }
          // else {
          //   this.employeeForm = {
          //     ...this.employeeForm,
          //     name: {
          //       value: `${e.target.value}`,
          //       isValidName: true,
          //       errorMessage: "",
          //     },

          //   };

          // }
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

    if (!this.employeeForm.email.value) {
      this.employeeForm = {
        ...this.employeeForm,
        email: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Can't be Empty",
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

    if (
      this.employeeForm.department.value===""
    ) {
      this.employeeForm = {
        ...this.employeeForm,
        department: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Please choose a department",
        },
      };
    } 

    if (
      this.employeeForm.designation.value===""
    ) {
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
      this.employeeForm.contact = {
        ...this.employeeForm.contact,
        primary: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Please Enter your number",
        },
      };
    } 
    

    if (
      this.employeeForm.name.isValidName === true &&
      this.employeeForm.email.isValidName === true &&
      this.employeeForm.empCode.isValidName === true &&
      this.employeeForm.department.isValidName === true &&
      this.employeeForm.designation.isValidName === true &&
      this.employeeForm.contact.primary.isValidName === true 
    ) {
      const form = this.renderRoot.querySelector("form");
      form.reset();
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
        background-color: grey;
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
      .options{
        color:black;
      }
    `;
  }



}

window.customElements.define("my-element", MyElement);
