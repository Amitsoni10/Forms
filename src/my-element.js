import { LitElement, css, html } from "lit";

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
    };
  }

  render() {
    return html`

    <form @submit=${this.submit}>
      <label>Name:</label>
      <input
        type="text"
        id="name"
        @input=${(e) => this.validateForm(e, "Name")}  
        
     />
      <span class="error">${this.employeeForm.name.errorMessage}</span><br /><br />

      <label>Email:</label>
      <input
        type="email"
        id="email"
        @input=${(e) => this.validateForm(e, "Email")}
      />
      <span class="error">${this.employeeForm.email.errorMessage}</span><br /><br />

      <label>Emp Code:</label>
      <input
        type="text"
        id="empcode"
        @input=${(e) => this.validateForm(e, "EmpCode")} 
      autocomplete="off"/>
      <span class="error">${this.employeeForm.empCode.errorMessage}</span><br /><br />

      <button type="submit">Submit</button>

  </form>

    `;
  }



  validateForm(e, type) {


    switch (type) {

      // Validation For Name
      case "Name": {
        this.employeeForm = {
          ...this.employeeForm,
          name: {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "",
          },
        };

         if(!this.employeeForm.name.value  ||
          this.employeeForm.name.value.length > 3){
          const newName = {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Please Enter a valid Employee name",
          };
          this.employeeForm = {
            ...this.employeeForm,
            name: newName,
          };

        }
        else {
          this.employeeForm = {
            ...this.employeeForm,
            name: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          
          };

         
        }
      }break;

      // Email Validation
      case "Email": {

        this.employeeForm = {
          ...this.employeeForm,
          email: {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "",
          },
        };

        if (
          !this.employeeForm.email.value 
        ) {
          this.employeeForm = {
            ...this.employeeForm,
            email:{
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Can't be Empty",}
          };

        }else if(this.employeeForm.email.value.match(/^[^\s@]+@annalect\.com$/) || 
        this.employeeForm.email.value.match(/^[^\s@]+@gmail\.com$/))  {
          this.employeeForm = {
            ...this.employeeForm,
            email:{
            value: `${e.target.value}`,
            isValidName: true,
            errorMessage:"",}
          };

        } else {
          this.employeeForm = {
            ...this.employeeForm,
            email:{
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage:"Invalid",}
          };
  
        }
      }break;

      // Validation for EmpCode
      case "EmpCode": {

        this.employeeForm = {
          ...this.employeeForm,
          empCode: {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "",
          },
        };
    

        if(!this.employeeForm.empCode.value){
          this.employeeForm = {
            ...this.employeeForm,
            empCode:{
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Can't be empty",}
          };
        }
    
        else if (
            this.employeeForm.empCode.value.length>7
          ) {
            this.employeeForm = {
              ...this.employeeForm,
              empCode:{
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "Length Exceeds",}
            };

          } 
         else if(
          this.employeeForm.empCode.value.match(/[A-Z]{1}[0-9]{6}/)  ||  this.employeeForm.empCode.value.match(/[0-9][A-Z]{1}[0-9]{5}/)  || this.employeeForm.empCode.value.match(/[0-9]{2}[A-Z]{1}[0-9]{4}/) || this.employeeForm.empCode.value.match(/[0-9]{3}[A-Z]{1}[0-9]{3}/)  || this.employeeForm.empCode.value.match(/[0-9]{4}[A-Z]{1}[0-9]{2}/) || 
          this.employeeForm.empCode.value.match(/[0-9]{5}[A-Z]{1}[0-9]/) ||  this.employeeForm.empCode.value.match(/[0-9]{6}[A-Z]{1}/)
        ) {
          this.employeeForm = {
            ...this.employeeForm,
            empCode:{
            value: `${e.target.value}`,
            isValidName: true,
            errorMessage:"",}
          };

        } 
        else{
          this.employeeForm = {
            ...this.employeeForm,
            empCode:{
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Invalid",}
          };
        }
      }break;




    }
  }

  submit(e){
    e.preventDefault();

    if(this.employeeForm.name.isValidName===true && this.employeeForm.email.isValidName===true && this.employeeForm.empCode.isValidName===true){
      const form = this.renderRoot.querySelector('form');
      form.reset();
      console.log("submitted")
      localStorage.setItem("MyEmployeeList", JSON.stringify(this.employeeForm));
    }
  }


  static get styles() {
    return css`
      .error {
        color:red;
      }
    `;
  }
}

window.customElements.define("my-element", MyElement);
