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
      editData: { type: Object },
      sortAscending: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.sortAscending = true;
    this.editData = {
      // editName:"",
      // editEmpCode:"",
      // editEmailType:"",
      // editEmail:"",
      // editDesignation:"",
      // editDepartment:"",
      // editCorrespondenceLine1:"",
      // editCorrespondenceLine2:"",
      // editCorrespondenceLandmark:"",
      // editCorrespondenceCountry:"",
      // editCorrespondenceState:"",
      // editCorrespondenceCity:"",
      // editCorrespondenceZipCode:"",
      // editPermanentLine1:"",
      // editPermanentLine2:"",
      // editPermanentLandmark:"",
      // editPermanentCountry:"",
      // editPermanentState:"",
      // editPermanentCity:"",
      // editPermanentZipCode:"",
      // editPrimaryNumber:"",
      // editSecondaryNumber:"",
      // editEmergencyNumber:"",
    };
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
                <div class="h-block">
                  <h2>Update Details</h2>
                <label>Name</label>
                <input type="text" id="name" value=${
                  this.editData.Name
                }  @input=${(e) => (this.editData.Name = e.target.value)}/>

                <label>Employee Code</label>
                <input type="text" id="empcode" value=${
                  this.editData.EmployeeCode
                }   @input=${(e) =>
      (this.editData.EmployeeCode = e.target.value)}/>
      </div>
      <div class="h1-block">
                <label >Email Type</label>
                <select 
                  id="emailtype"
                  @input=${(e) => (this.editData.EmailType = e.target.value)}
                ><option>${this.editData.EmailType}</option>
                  ${repeat(
                    emaildata,
                    (items) =>
                      html`<option class="options">${items.email}</option>`
                  )}
                </select>
                  
                
                <label>Email</label>
                <input type="text" id="email" value=${
                  this.editData.Email
                }   @input=${(e) =>
      (this.editData.Email = e.target.value)}/>
        </div>
        <div class="h2-block">
                <label >Choose a Designation </label>
                <select 
                  id="designation"
                  @input=${(e) => (this.editData.Designation = e.target.value)}
                ><option >${this.editData.Designation}</option>
                  ${repeat(
                    designation,
                    (items) =>
                      html`<option class="options">
                        ${items.designation}
                      </option>`
                  )}
                </select>

                <label >Choose a Department </label>
                <select
                  id="department"
                  @input=${(e) => (this.editData.Department = e.target.value)}
                ><option >${this.editData.Department}</option>
                  ${repeat(
                    department,
                    (items) =>
                      html`<option class="options">${items.department}</option>`
                  )}
                </select>
                  </div>
                
                    <div class="contain">
                      <div class="block1">
                <h3>Correspondence Address</h3>
                  <label >Address Line 1</label>
                  <input
                    type="text"
                    id="correspondenceaddressline1"
                    value=${this.editData.CorrespondenceAddressLine1}
                    @input=${(e) =>
                      (this.editData.CorrespondenceAddressLine1 =
                        e.target.value)}
                    autocomplete="off"
                  />

                  <label >Address Line 2</label>
                  <input
                    type="text"
                    id="correspondenceaddressline2"
                    value=${this.editData.CorrespondenceAddressLine2}
                    @input=${(e) =>
                      (this.editData.CorrespondenceAddressLine2 =
                        e.target.value)}
                    autocomplete="off"
                  />

                  <label >Landmark</label>
                  <input
                    type="text"
                    id="correspondencelandmark"
                    value=${this.editData.CorrespondenceLandmark}
                    @input=${(e) =>
                      (this.editData.CorrespondenceLandmark = e.target.value)}
                    autocomplete="off"
                  />
                  <label>Country</label>
                  <select
                  @input=${(e) =>
                    (this.editData.CorrespondenceCountry = e.target.value)}
                  id="correspondencecountry">
                    <option>${this.editData.CorrespondenceCountry}</option>
                    ${repeat(
                      this.countries,
                      (items) =>
                        html`<option class="options">${items.name}</option>`
                    )}
                  </select>

                  <label >State</label>
                  <select  
                  @input=${(e) =>
                    (this.editData.CorrespondenceState = e.target.value)}  
                    id="correspondencestate"
                  >
                    <option>${this.editData.CorrespondenceState}</option>
                    ${repeat(
                      state,
                      (items) =>
                        html`<option class="options">${items.state}</option>`
                    )}
                  </select>

                  <label >City</label>
                  <select
                   id="correspondencecity"
                   @input=${(e) =>
                     (this.editData.CorrespondenceCity = e.target.value)}  
                   >
                    <option>${this.editData.CorrespondenceCity}</option>
                    ${repeat(
                      city,
                      (items) =>
                        html`<option class="options">${items.city}</option>`
                    )}
                  </select>

                  <label >Zip Code</label>
                  <input
                    type="number"
                    @input=${(e) =>
                      (this.editData.CorrespondenceZipCode = e.target.value)}  
                    value=${this.editData.CorrespondenceZipCode}
                    id="correspondencezipcode"   
                  />
                    </div>
                  <div class="block2">
                <h3>Permanent Address</h3>
                  <label >Address Line 1</label>
                  <input
                    type="text"
                    id="permanentaddressline1"
                    value=${this.editData.PermanentAddressLine1}
                    @input=${(e) =>
                      (this.editData.PermanentAddressLine1 = e.target.value)} 
                    autocomplete="off"
                  />

                  <label >Address Line 2</label>
                  <input
                    type="text"
                    id="permanentaddressline2"
                    value=${this.editData.PermanentAddressLine2}
                    @input=${(e) =>
                      (this.editData.PermanentAddressLine2 = e.target.value)} 
                    autocomplete="off"
                  />

                  <label >Landmark</label>
                  <input
                    type="text"
                    id="permanentlandmark"
                    value=${this.editData.PermanentLandmark}
                    @input=${(e) =>
                      (this.editData.PermanentLandmark = e.target.value)} 
                    autocomplete="off"
                  />

                  <label>Country</label>
                  <select
                  @input=${(e) =>
                    (this.editData.PermanentCountry = e.target.value)} 
                  id="permanentcountry">
                    <option>${this.editData.PermanentCountry}</option>
                    ${repeat(
                      this.countries,
                      (items) =>
                        html`<option class="options">${items.name}</option>`
                    )}
                  </select>

                  <label >State</label>
                  <select   
                  @input=${(e) =>
                    (this.editData.PermanentState = e.target.value)}  
                    id="permanentstate"
                  >
                    <option>${this.editData.PermanentState}</option>
                    ${repeat(
                      state,
                      (items) =>
                        html`<option class="options">${items.state}</option>`
                    )}
                  </select>

                  <label >City</label>
                  <select
                  @input=${(e) =>
                    (this.editData.PermanentCity = e.target.value)}  
                   id="permanentcity"
                   >
                    <option>${this.editData.PermanentCity}</option>
                    ${repeat(
                      city,
                      (items) =>
                        html`<option class="options">${items.city}</option>`
                    )}
                  </select>

                  <label >Zip Code</label>
                  <input
                    type="number"
                    value=${this.editData.PermanentZipCode}
                    @input=${(e) =>
                      (this.editData.PermanentZipCode = e.target.value)} 
                    id="permanentzipcode"   
                  />
                    </div>
                    </div>
                  <div class="f-block">
                    <h3>Contact Details</h3>
                  <label >Primary Number</label>
                <input
                  id="primarynumber"
                  value=${this.editData.PrimaryNumber}
                  @input=${(e) =>
                    (this.editData.PrimaryNumber = e.target.value)}  
                />

                  <label >Secondary Number</label>
                <input
                  id="secondarynumber"
                  value=${this.editData.SecondaryNumber}
                  @input=${(e) =>
                    (this.editData.SecondaryNumber = e.target.value)}  
                />

                  <label >Emergency Number</label>
                <input
                  id="emergencynumber"
                  value=${this.editData.EmergencyNumber}
                  @input=${(e) =>
                    (this.editData.EmergencyNumber = e.target.value)} 
                />
              </div>

                <button  @click=${this.cancelEdit}>Cancel</button>
                <button  @click=${this.saveEdit}>Save</button>
            </form>
          </dialog> 
      <div >

      <!-- Main Data display  -->
        <table>
        <tr >
          <th>Name<button @click=${this.sort}>↑</button></th>
          <th>Emp Code</th>
          <th>Email Type</th>
          <th>Email</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Correspondence Address</th>
          <th>Permanent Address</th>
          <th>Contact Details</th>
          <!-- <th>Secondary Number</th>
          <th>Emergency Number</th> -->
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
            <td class="address">
              <p><strong>AddressLine1 </strong>${
                items.CorrespondenceAddressLine1
              }</p>
              <p><strong>AddressLine2 </strong>${
                items.CorrespondenceAddressLine2
              }</p>
              <p><strong>Landmark </strong>${items.CorrespondenceLandmark}</p>
              <p><strong>Country </strong>${items.CorrespondenceCountry}</p>
              <p><strong>State </strong>${items.CorrespondenceState}</p>
              <p><strong>City </strong>${items.CorrespondenceCity}</p>
              <p><strong>ZipCode </strong>${items.CorrespondenceZipCode}</p>
            </td>
            <td class="address">
            <p ><strong>AddressLine1 </strong>${items.PermanentAddressLine1}</p>
             <p> <strong>AddressLine2 </strong>${
               items.PermanentAddressLine2
             }</p>
              <p><strong>Landmark </strong>${items.PermanentLandmark}</p>
             <p> <strong>Country </strong>${items.PermanentCountry}</p>
             <p> <strong>State </strong>${items.PermanentState}</p>
             <p> <strong>City </strong>${items.PermanentCity}</p>
             <p> <strong>ZipCode </strong>${items.PermanentZipCode}</p>
              <td><p><strong>Primary </strong>${items.PrimaryNumber}</p><br>
              <p><strong>Secondary </strong>${items.SecondaryNumber}</p><br>
              <p><strong>Emergency </strong>${items.EmergencyNumber}</p></td>
            <td>
              <button  id="editbtn" @click=${() =>
                this.editItem(index)}>Edit</button>
              <button id="dltbtn"  @click=${() =>
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
  sort() {
    this.sortAscending = !this.sortAscending;
    this.data.sort((a, b) => {
      const nameA = a.Name.toLowerCase();
      const nameB = b.Name.toLowerCase();
      return this.sortAscending
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    this.requestUpdate();
  }

  editItem(index) {
    this.editingIndex = index;
    const item = this.data[index];
    console.log(item);
    this.editData = item;
    // this.editData.editName = item.Name;
    // this.editData.editEmpCode = item.EmployeeCode
    // this.editData.editEmailType = item.EmailType
    // this.editData.editEmail = item.Email;
    // this.editData.editDesignation = item.Designation
    // this.editData.editDepartment = item.Department

    // this.editData.editCorrespondenceLine1 = item.CorrespondenceAddressLine1
    // this.editData.editCorrespondenceLine2 = item.CorrespondenceAddressLine2
    // this.editData.editCorrespondenceLandmark = item.CorrespondenceLandmark
    // this.editData.editCorrespondenceCountry = item.CorrespondenceCountry
    // this.editData.editCorrespondenceState = item.CorrespondenceState
    // this.editData.editCorrespondenceCity = item.CorrespondenceCity
    // this.editData.editCorrespondenceZipCode = item.CorrespondenceZipCode

    // this.editData.editPermanentLine1 = item.PermanentAddressLine1
    // this.editData.editPermanentLine2 = item.PermanentAddressLine2
    // this.editData.editPermanentLandmark = item.PermanentLandmark
    // this.editData.editPermanentCountry = item.PermanentCountry
    // this.editData.editPermanentState = item.PermanentState
    // this.editData.editPermanentCity = item.PermanentCity
    // this.editData.editPermanentZipCode = item.PermanentZipCode

    // this.editData.editPrimaryNumber = item.PrimaryNumber
    // this.editData.editSecondaryNumber = item.SecondaryNumber
    // this.editData.editEmergencyNumber = item.EmergencyNumber
    this.openmodal();
  }

  cancelEdit() {
    window.location.reload();
    this.requestUpdate();
    this.closemodel();
  }

  saveEdit() {
    // e.preventDefault();
    // const newName = this.renderRoot.querySelector("#name").value;
    // const newEmpCode = this.renderRoot.querySelector("#empcode").value;
    // const newEmailType = this.renderRoot.querySelector("#emailtype").value;
    // const newEmail = this.renderRoot.querySelector("#email").value;
    // const newDesignation = this.renderRoot.querySelector("#designation").value;
    // const newDepartment = this.renderRoot.querySelector("#department").value;
    // const newCorrespondenceLine1 = this.renderRoot.querySelector("#correspondenceaddressline1").value;
    // const newCorrespondenceLine2 = this.renderRoot.querySelector("#correspondenceaddressline2").value;
    // const newCorrespondenceLandmark = this.renderRoot.querySelector("#correspondencelandmark").value;
    // const newCorrespondenceCountry = this.renderRoot.querySelector("#correspondencecountry").value;
    // const newCorrespondenceState = this.renderRoot.querySelector("#correspondencestate").value;
    // const newCorrespondenceCity = this.renderRoot.querySelector("#correspondencecity").value;
    // const newCorrespondenceZipcode = this.renderRoot.querySelector("#correspondencezipcode").value;
    // const newPermanentLine1 = this.renderRoot.querySelector("#permanentaddressline1").value;
    // const newPermanentLine2 = this.renderRoot.querySelector("#permanentaddressline2").value;
    // const newPermanentLandmark = this.renderRoot.querySelector("#permanentlandmark").value;
    // const newPermanentCountry = this.renderRoot.querySelector("#permanentcountry").value;
    // const newPermanentState = this.renderRoot.querySelector("#permanentstate").value;
    // const newPermanentCity = this.renderRoot.querySelector("#permanentcity").value;
    // const newPermanentZipcode = this.renderRoot.querySelector("#permanentzipcode").value;
    // const newPrimaryNumber = this.renderRoot.querySelector("#primarynumber").value;
    // const newSecondaryNumber = this.renderRoot.querySelector("#secondarynumber").value;
    // const newEmergencyNumber = this.renderRoot.querySelector("#emergencynumber").value;

    // if(this.renderRoot.querySelector("#name").value.trim() !==""){
    //   const item = this.data[this.editingIndex];

    //   item.Name = this.renderRoot.querySelector("#name").value;
    //   item.EmployeeCode = this.renderRoot.querySelector("#empcode").value;
    //   item.EmailType = this.renderRoot.querySelector("#emailtype").value;
    //   item.Email = this.renderRoot.querySelector("#email").value;
    //   item.Designation = this.renderRoot.querySelector("#designation").value;
    //   item.Department = this.renderRoot.querySelector("#department").value;
    //   item.CorrespondenceAddressLine1 = this.renderRoot.querySelector("#correspondenceaddressline1").value;
    //   item.CorrespondenceAddressLine2 = this.renderRoot.querySelector("#correspondenceaddressline2").value;
    //   item.CorrespondenceLandmark = this.renderRoot.querySelector("#correspondencelandmark").value;
    //   item.CorrespondenceCountry = this.renderRoot.querySelector("#correspondencecountry").value;
    //   item.CorrespondenceState = this.renderRoot.querySelector("#correspondencestate").value;
    //   item.CorrespondenceCity = this.renderRoot.querySelector("#correspondencecity").value;
    //   item.CorrespondenceZipCode = this.renderRoot.querySelector("#correspondencezipcode").value;
    //   item.PermanentAddressLine1 = this.renderRoot.querySelector("#permanentaddressline1").value;
    //   item.PermanentAddressLine2 = this.renderRoot.querySelector("#permanentaddressline2").value;
    //   item.PermanentLandmark =  this.renderRoot.querySelector("#permanentlandmark").value;
    //   item.PermanentCountry = this.renderRoot.querySelector("#permanentcountry").value;
    //   item.PermanentState = this.renderRoot.querySelector("#permanentstate").value;
    //   item.PermanentCity = this.renderRoot.querySelector("#permanentcity").value;
    //   item.PermanentZipCode = this.renderRoot.querySelector("#permanentzipcode").value;
    //   item.PrimaryNumber = this.renderRoot.querySelector("#primarynumber").value;
    //   item.SecondaryNumber = this.renderRoot.querySelector("#secondarynumber").value;
    //   item.EmergencyNumber = this.renderRoot.querySelector("#emergencynumber").value;

    this.storeData();
    window.location.reload();
    this.requestUpdate();
    this.closemodel();
    // }
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
    return css`\
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .modal{
        border:2px solid #1b1818;
        padding:1em;
        border-radius:5px;
        width:60%;
        margin:20px auto;
        /* display:inline-block; */
      }
      .modal::backdrop{
        background:#585555;
        opacity:.2;
      }
      .contain{
        display:flex;
      }
      .block2{
        display:block;
        width:50%;
      }
      .block2 input{
        display:block;
        width:50%;
      }
      .block2 select{
        display:block;
        width:50%;
      }
      .block1{
        display:block;
        width:50%;
      }
      .block1 input{
        display:block;
        width:50%;
      }
      .block1 select{
        display:block;
        width:50%;
      }
      .h-block input{
        display:inline-flex;
        width:25%;
      }
      .h-block select{
        display:inline-flex;
        width:20%;
      }
      .h1-block input{
        display:inline-flex;
        width:25%;
      }
      .h1-block select{
        display:inline-flex;
        width:14%;
      }
      table {
        border-collapse: collapse;
        margin:5px;
      }
      
      th {
        text-align: left;
        font-family: 'Poppins', sans-serif;
        padding: 8px;
        border-right:4px solid #fff;
        background-color: #8d8d8d;
      }
      
      
      td {
        text-align: left;
        font-family: 'Lora', serif;
        padding: 8px;
        border-right:4px solid #fff;
      }
      
      tr{
        background-color: #ececec;
        border-bottom:4px solid #ffffff;
        }
        #dltbtn{
          padding:2px;
          margin:5px 2px;
          width:100%;
          background:#ff0000;
          color:#fff;
          cursor:pointer;
          font-family: 'Lora', serif;
          border-radius:6px;
        }
        #editbtn{
          padding:2px;
          margin:5px 2px;
          width:100%;
          cursor:pointer;
          color:#fff;
          border-radius:6px;
          font-family: 'Lora', serif;
          background:#6e6863;
        }
        #editbtn:hover{
          background:#d1d1d1;
          color:#6e6863;
        }
        #dltbtn:hover{
          color:#ff0000;
          background:#d1d1d1;;
        }
        .address p{
          padding:3px;
        }
    `;
  }
}

window.customElements.define("my-userdata", UserData);
