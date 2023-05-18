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

export class UserData extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      editingIndex: { tyer: Number },
      countries: { type: Array },
      editData:{type:Object},

    };
  }

  constructor() {
    super();
    this.editData={
        editName:"",
        editEmpCode:"",
        editEmailType:"",
        editEmail:"",
        editDesignation:"",
        editDepartment:"",
        editCorrespondenceLine1:"",
        editCorrespondenceLine2:"",
        editCorrespondenceLandmark:"",
        editCorrespondenceCountry:"",
        editCorrespondenceState:"",
        editCorrespondenceCity:"",
        editCorrespondenceZipCode:"",
        editPermanentLine1:"",
        editPermanentLine2:"",
        editPermanentLandmark:"",
        editPermanentCountry:"",
        editPermanentState:"",
        editPermanentCity:"",
        editPermanentZipCode:"",
        editPrimaryNumber:"",
        editSecondaryNumber:"",
        editEmergencyNumber:"",
    }
    this.countries = [];
    this.editingIndex = -1;
    this.data = [];
  }
  connectedCallback() {
    super.connectedCallback();
    // console.log(this.data);
    this.loadCountries();
    this.loadData();
  }
  loadData() {
    const storedData = localStorage.getItem("MyEmployeeList");
    if (storedData) {
      this.data = JSON.parse(storedData);
      this.requestUpdate();
    }
  }
  storeData() {
    localStorage.setItem("MyEmployeeList", JSON.stringify(this.data));
  }
  async loadCountries() {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    this.countries = data;
  }

  render() {
    return html`

            <dialog class="modal" id="modal">
            <form method="dialog">

                <label>Name</label>
                <input type="text" id="name" value=${this.editData.editName}/><br>

                <label>Employee Code</label>
                <input type="text" id="empcode" value=${this.editData.editEmpCode}/><br>

                <label >Email Type</label>
                <select 
                  id="emailtype"
                ><option>${this.editData.editEmailType}</option>
                  ${repeat(
                    emaildata,
                    (items) =>
                      html`<option class="options">${items.email}</option>`
                  )}
                </select><br>
                
                <label>Email</label>
                <input type="text" id="email" value=${this.editData.editEmail}/><br>

                <label >Choose a Designation </label>
                <select 
                  id="designation"
                ><option >${this.editData.editDesignation }</option>
                  ${repeat(
                    designation,
                    (items) =>
                      html`<option class="options">
                        ${items.designation}
                      </option>`
                  )}
                </select><br>

                <label >Choose a Department </label>
                <select
                  id="department"
                ><option >${this.editData.editDepartment }</option>
                  ${repeat(
                    department,
                    (items) =>
                      html`<option class="options">${items.department}</option>`
                  )}
                </select><br>

                <h3>Correspondence Address</h3>
                  <label >Address Line 1</label>
                  <input
                    type="text"
                    id="correspondenceaddressline1"
                    value=${this.editData.editCorrespondenceLine1}
                    autocomplete="off"
                  /><br>

                  <label >Address Line 2</label>
                  <input
                    type="text"
                    id="correspondenceaddressline2"
                    value=${this.editData.editCorrespondenceLine2}
                    autocomplete="off"
                  /><br>

                  <label >Landmark</label>
                  <input
                    type="text"
                    id="correspondencelandmark"
                    value=${ this.editData.editCorrespondenceLandmark}
                    autocomplete="off"
                  /><br>

                  <label>Country</label>
                  <select
                  id="correspondencecountry">
                    <option>${this.editData.editCorrespondenceCountry}</option>
                    ${repeat(
                      this.countries,
                      (items) =>
                        html`<option class="options">${items.name}</option>`
                    )}
                  </select><br>

                  <label >State</label>
                  <select    
                    id="correspondencestate"
                  >
                    <option>${this.editData.editCorrespondenceState}</option>
                    ${repeat(
                      state,
                      (items) =>
                        html`<option class="options">${items.state}</option>`
                    )}
                  </select><br>

                  <label >City</label>
                  <select
                   id="correspondencecity"
                   >
                    <option>${this.editData.editCorrespondenceCity}</option>
                    ${repeat(
                      city,
                      (items) =>
                        html`<option class="options">${items.city}</option>`
                    )}
                  </select><br>

                  <label >Zip Code</label>
                  <input
                    type="number"
                    value=${this.editData.editCorrespondenceZipCode}
                    id="correspondencezipcode"   
                  /><br>
                <h3>Permanent Address</h3>
                  <label >Address Line 1</label>
                  <input
                    type="text"
                    id="permanentaddressline1"
                    value=${this.editData.editPermanentLine1}
                    autocomplete="off"
                  /><br>

                  <label >Address Line 2</label>
                  <input
                    type="text"
                    id="permanentaddressline2"
                    value=${this.editData.editPermanentLine2}
                    autocomplete="off"
                  /><br>

                  <label >Landmark</label>
                  <input
                    type="text"
                    id="permanentlandmark"
                    value=${this.editData.editPermanentLandmark}
                    autocomplete="off"
                  /><br>

                  <label>Country</label>
                  <select
                  id="permanentcountry">
                    <option>${this.editData.editPermanentCountry}</option>
                    ${repeat(
                      this.countries,
                      (items) =>
                        html`<option class="options">${items.name}</option>`
                    )}
                  </select><br>

                  <label >State</label>
                  <select    
                    id="permanentstate"
                  >
                    <option>${this.editData.editPermanentState}</option>
                    ${repeat(
                      state,
                      (items) =>
                        html`<option class="options">${items.state}</option>`
                    )}
                  </select><br>

                  <label >City</label>
                  <select
                   id="permanentcity"
                   >
                    <option>${this.editData.editPermanentCity}</option>
                    ${repeat(
                      city,
                      (items) =>
                        html`<option class="options">${items.city}</option>`
                    )}
                  </select><br>

                  <label >Zip Code</label>
                  <input
                    type="number"
                    value=${this.editData.editPermanentZipCode}
                    id="permanentzipcode"   
                  /><br>

                  <label >Primary Number</label>
                <input
                  id="primarynumber"
                  value=${this.editData.editPrimaryNumber} 
                /><br>

                  <label >Secondary Number</label>
                <input
                  id="secondarynumber"
                  value=${this.editData.editSecondaryNumber}
                /><br>

                  <label >Emergency Number</label>
                <input
                  id="emergencynumber"
                  value=${this.editData.editEmergencyNumber}
                /><br>

                <button  @click=${this.cancelEdit}>Cancel</button>
                <button  @click=${this.saveEdit}>Save</button>
            </form>
          </dialog> 
      <div >

      <!-- Main Data display  -->
        <table>
        <tr >
          <th>Name</th>
          <th>Emp Code</th>
          <th>Email Type</th>
          <th>Email</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Correspondence Address</th>
          <th>Permanent Address</th>
          <th>Primary Number</th>
          <th>Secondary Number</th>
          <th>Emergency Number</th>
          <th>Action</th>

        </tr>

        ${repeat(
          this.data,
          (items, index) => html` <tr>
            <td>${items.Name}</td>
            <td>${items.EmployeeCode}</td>
            <td>${items.EmailType}</td>
            <td>${items.Email}</td>

            <td>${items.Designation}</td>
            <td>${items.Department}</td>
            <td>
              <p><strong>AddressLine1:</strong>${
                items.CorrespondenceAddressLine1
              }</p><br>
              <p><strong>AddressLine2:</strong>${
                items.CorrespondenceAddressLine2
              }</p><br>
              <p><strong>Landmark:</strong>${items.CorrespondenceLandmark}</p>
              <p><strong>Country:</strong>${items.CorrespondenceCountry}</p>
              <p><strong>State:</strong>${items.CorrespondenceState}</p>
              <p><strong>City:</strong>${items.CorrespondenceCity}</p>
              <p><strong>ZipCode:</strong>${items.CorrespondenceZipCode}</p>
            </td>
            <td>
            <p ><strong>AddressLine1:</strong>${
              items.PermanentAddressLine1
            }</p><br>
             <p> <strong>AddressLine2:</strong>${
               items.PermanentAddressLine2
             }</p><br>
              <p><strong>Landmark:</strong>${items.PermanentLandmark}</p>
             <p> <strong>Country:</strong>${items.PermanentCountry}</p>
             <p> <strong>State:</strong>${items.PermanentState}</p>
             <p> <strong>City:</strong>${items.PermanentCity}</p>
             <p> <strong>ZipCode:</strong>${items.PermanentZipCode}</p></td>
              <td>${items.PrimaryNumber}</td>
              <td>${items.SecondaryNumber}</td>
              <td>${items.EmergencyNumber}</td>
            <td>
              <button @click=${() => this.editItem(index)}>Edit</button>
              <button @click=${() =>
                this.DeleteConfirmation(items)}>Delete</button>
            </td>
          </tr>
          </table>`
        )}              
      </div>

 
    `;
  }

  openmodal() {
    let modal = this.renderRoot.querySelector("#modal");
    modal.showModal();
  }
  closemodel() {
    let modal = this.renderRoot.querySelector("#modal");
    modal.close();
  }

  editItem(index) {
    this.editingIndex = index;
    const item = this.data[index];
    this.editData.editName = item.Name;
    this.editData.editEmpCode = item.EmployeeCode
    this.editData.editEmailType = item.EmailType
    this.editData.editEmail = item.Email;
    this.editData.editDesignation = item.Designation
    this.editData.editDepartment = item.Department
    this.editData.editCorrespondenceLine1 = item.CorrespondenceAddressLine1
    this.editData.editCorrespondenceLine2 = item.CorrespondenceAddressLine2
    this.editData.editCorrespondenceLandmark = item.CorrespondenceLandmark
    this.editData.editCorrespondenceCountry = item.CorrespondenceCountry
    this.editData.editCorrespondenceState = item.CorrespondenceState
    this.editData.editCorrespondenceCity = item.CorrespondenceCity
    this.editData.editCorrespondenceZipCode = item.CorrespondenceZipCode
    this.editData.editPermanentLine1 = item.PermanentAddressLine1
    this.editData.editPermanentLine2 = item.PermanentAddressLine2
    this.editData.editPermanentLandmark = item.PermanentLandmark
    this.editData.editPermanentCountry = item.PermanentCountry
    this.editData.editPermanentState = item.PermanentState
    this.editData.editPermanentCity = item.PermanentCity
    this.editData.editPermanentZipCode = item.PermanentZipCode

    this.editData.editPrimaryNumber = item.PrimaryNumber
    this.editData.editSecondaryNumber = item.SecondaryNumber
    this.editData.editEmergencyNumber = item.EmergencyNumber
    this.openmodal();
  }

  cancelEdit() {
    window.location.reload();
    this.requestUpdate();
    this.closemodel();
  }

  saveEdit(e) {
    e.preventDefault();
    const newName = this.renderRoot.querySelector("#name").value;
    const newEmpCode = this.renderRoot.querySelector("#empcode").value;
    const newEmailType = this.renderRoot.querySelector("#emailtype").value;
    const newEmail = this.renderRoot.querySelector("#email").value;
    const newDesignation = this.renderRoot.querySelector("#designation").value;
    const newDepartment = this.renderRoot.querySelector("#department").value;
    const newCorrespondenceLine1 = this.renderRoot.querySelector("#correspondenceaddressline1").value;
    const newCorrespondenceLine2 = this.renderRoot.querySelector("#correspondenceaddressline2").value;
    const newCorrespondenceLandmark = this.renderRoot.querySelector("#correspondencelandmark").value;
    const newCorrespondenceCountry = this.renderRoot.querySelector("#correspondencecountry").value;
    const newCorrespondenceState = this.renderRoot.querySelector("#correspondencestate").value;
    const newCorrespondenceCity = this.renderRoot.querySelector("#correspondencecity").value;
    const newCorrespondenceZipcode = this.renderRoot.querySelector("#correspondencezipcode").value;
    const newPermanentLine1 = this.renderRoot.querySelector("#permanentaddressline1").value;
    const newPermanentLine2 = this.renderRoot.querySelector("#permanentaddressline2").value;
    const newPermanentLandmark = this.renderRoot.querySelector("#permanentlandmark").value;
    const newPermanentCountry = this.renderRoot.querySelector("#permanentcountry").value;
    const newPermanentState = this.renderRoot.querySelector("#permanentstate").value;
    const newPermanentCity = this.renderRoot.querySelector("#permanentcity").value;
    const newPermanentZipcode = this.renderRoot.querySelector("#permanentzipcode").value;
    const newPrimaryNumber = this.renderRoot.querySelector("#primarynumber").value;
    const newSecondaryNumber = this.renderRoot.querySelector("#secondarynumber").value;
    const newEmergencyNumber = this.renderRoot.querySelector("#emergencynumber").value;

    if (newName.trim() !== "" && newEmail.trim() !== "") {
      const item = this.data[this.editingIndex];
      item.Name = newName;
      item.EmployeeCode = newEmpCode;
      item.EmailType = newEmailType
      item.Email = newEmail;
      item.Designation = newDesignation;
      item.Department = newDepartment;
      item.CorrespondenceAddressLine1 = newCorrespondenceLine1;
      item.CorrespondenceAddressLine2 = newCorrespondenceLine2;
      item.CorrespondenceLandmark = newCorrespondenceLandmark;
      item.CorrespondenceCountry = newCorrespondenceCountry;
      item.CorrespondenceState = newCorrespondenceState;
      item.CorrespondenceCity = newCorrespondenceCity;
      item.CorrespondenceZipCode = newCorrespondenceZipcode;
      item.PermanentAddressLine1 = newPermanentLine1;
      item.PermanentAddressLine2 = newPermanentLine2;
      item.PermanentLandmark = newPermanentLandmark;
      item.PermanentCountry = newPermanentCountry;
      item.PermanentState = newPermanentState;
      item.PermanentCity = newPermanentCity;
      item.PermanentZipCode = newPermanentZipcode;
      item.PrimaryNumber = newPrimaryNumber;
      item.SecondaryNumber = newSecondaryNumber;
      item.EmergencyNumber = newEmergencyNumber;

      this.storeData();
      window.location.reload();
      this.requestUpdate();
      this.closemodel();
    }
  }

  DeleteConfirmation(items) {
    if (
      confirm(
        `WARNING!!!!!!!!!!!!!!!\nAre you sure you want to delete? ${items.Name}'s Data\nThis Action will delete the data permanently!!`
      )
    ) {
      this.deleteItem(items);
    }
  }

  deleteItem(items) {
    const index = this.data.indexOf(items);
    if (index > this.editingIndex) {
      this.data.splice(index, 1);
      this.storeData();
      window.location.reload();
      this.requestUpdate();
    }
  }

  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .modal{
        border:2px solid red;
        padding:1em;
        width:50ch;
      }
      .modal::backdrop{
        background:linear-gradient(#fd0101)
        opacity:1;
      }
      dialog{
        margin:0px auto;
      }

      /* .addressline1{
        line-break:strict;
      } */


      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        /* width: 100%; */
    }

        td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        /* line-break:strict; */
        }

        tr{
            background-color: #dddddd;
        }


      /* .container {
        display: flex;
        gap: 30px;
        border-bottom: 1px solid black;
      }
      .outer-container {
        margin: 10px 10px;
        padding: 10px 10px;
        border: 1px solid black;
      } */
      /* td {
        display: inline-block;
        width: 100%;
      }
      th {
        display: inline-block;
        width: 100%;
      } */
    `;
  }
}

window.customElements.define("my-userdata", UserData);
