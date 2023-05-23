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
    this.sortAscending = false;
    this.editData = {};
    this.countries = [];
    this.editingIndex = -1;
    this.data = [];
  }
  connectedCallback() {
    super.connectedCallback();
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
      <div id="alertbox" class="invisible">
        <div class="alert">
          <span class="closebtn" @click=${this.toggleAlert}>&times;</span>
          <strong>Data Deleted Successfully!!!</strong>
        </div>
      </div>

      <dialog class="modal" id="modal">
        <form class>
          <section class="form-header">
            <h2 id="form-heading">Edit Details of ${this.editData.Name}</h2>
          </section>
          <div class="form">
            <div class="h-block">
              <div class="blocks">
                <label for="name">Name</label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  value=${this.editData.Name}
                  autocomplete="off"
                  @input=${(e) => (this.editData.Name = e.target.value)}
                />
              </div>
              <div class="blocks">
                <label for="empcode">Employee Code</label>
                <input
                  name="empcode"
                  type="text"
                  id="empcode"
                  value=${this.editData.EmployeeCode}
                  @input=${(e) => (this.editData.EmployeeCode = e.target.value)}
                />
              </div>
            </div>
            <div class="h1-block">
              <div class="blocks">
                <label for="emailtype">Email Type</label>
                <select
                  name="emailtype"
                  id="emailtype"
                  @input=${(e) => (this.editData.EmailType = e.target.value)}
                >
                  <option>${this.editData.EmailType}</option>
                  ${repeat(
                    emaildata,
                    (items) =>
                      html`<option class="options">${items.email}</option>`
                  )}
                </select>
              </div>

              <div class="blocks">
                <label for="email">Email</label>
                <input
                  name="email"
                  type="text"
                  id="email"
                  value=${this.editData.Email}
                  @input=${(e) => (this.editData.Email = e.target.value)}
                />
              </div>
            </div>
            <div class="h2-block">
              <div class="blocks">
                <label for="designation">Choose a Designation </label>
                <select
                  name="designation"  
                  id="designation"
                  @input=${(e) => (this.editData.Designation = e.target.value)}
                >
                  <option>${this.editData.Designation}</option>
                  ${repeat(
                    designation,
                    (items) =>
                      html`<option class="options">
                        ${items.designation}
                      </option>`
                  )}
                </select>
              </div>

              <div class="blocks">
                <label for="department">Choose a Department </label>
                <select
                  name="department"
                  id="department"
                  @input=${(e) => (this.editData.Department = e.target.value)}
                >
                  <option>${this.editData.Department}</option>
                  ${repeat(
                    department,
                    (items) =>
                      html`<option class="options">${items.department}</option>`
                  )}
                </select>
              </div>
            </div>

            <div class="contain">
              <div class="block1">
                <h3>Correspondence Address</h3>
                <label for="correspondenceaddressline1">Address Line 1</label>
                <input
                  type="text"
                  name="correspondenceaddressline1"
                  id="correspondenceaddressline1"
                  value=${this.editData.CorrespondenceAddressLine1}
                  @input=${(e) =>
                    (this.editData.CorrespondenceAddressLine1 = e.target.value)}
                  autocomplete="off"
                />

                <label for="correspondenceaddressline2">Address Line 2</label>
                <input
                  type="text"
                  name="correspondenceaddressline2"
                  id="correspondenceaddressline2"
                  value=${this.editData.CorrespondenceAddressLine2}
                  @input=${(e) =>
                    (this.editData.CorrespondenceAddressLine2 = e.target.value)}
                  autocomplete="off"
                />

                <label for="correspondencelandmark">Landmark</label>
                <input
                  type="text"
                  name="correspondencelandmark"
                  id="correspondencelandmark"
                  value=${this.editData.CorrespondenceLandmark}
                  @input=${(e) =>
                    (this.editData.CorrespondenceLandmark = e.target.value)}
                  autocomplete="off"
                />
                <label for="correspondencecountry">Country</label>
                <select
                  @input=${(e) =>
                    (this.editData.CorrespondenceCountry = e.target.value)}
                  id="correspondencecountry"
                  name="correspondencecountry"
                >
                  <option>${this.editData.CorrespondenceCountry}</option>
                  ${repeat(
                    country,
                    (items) =>
                      html`<option class="options">${items.country}</option>`
                  )}
                </select>

                <label for="correspondencestate">State</label>
                <select
                  @input=${(e) =>
                    (this.editData.CorrespondenceState = e.target.value)}
                  name="correspondencestate"  
                  id="correspondencestate"
                >
                  <option>${this.editData.CorrespondenceState}</option>
                  ${repeat(
                    state,
                    (items) =>
                      html`<option class="options">${items.state}</option>`
                  )}
                </select>

                <label for="correspondencecity">City</label>
                <select
                  id="correspondencecity"
                  name="correspondencecity"
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

                <label for="correspondencezipcode">Zip Code</label>
                <input
                  type="number"
                  name="correspondencezipcode"
                  @input=${(e) =>
                    (this.editData.CorrespondenceZipCode = e.target.value)}
                  value=${this.editData.CorrespondenceZipCode}
                  id="correspondencezipcode"
                />
              </div>
              <div class="block2">
                <h3>Permanent Address</h3>
                <label for="permanentaddressline1">Address Line 1</label>
                <input
                  type="text"
                  name="permanentaddressline1"
                  id="permanentaddressline1"
                  value=${this.editData.PermanentAddressLine1}
                  @input=${(e) =>
                    (this.editData.PermanentAddressLine1 = e.target.value)}
                  autocomplete="off"
                />

                <label for="permanentaddressline2">Address Line 2</label>
                <input
                  type="text"
                  name="permanentaddressline2"
                  id="permanentaddressline2"
                  value=${this.editData.PermanentAddressLine2}
                  @input=${(e) =>
                    (this.editData.PermanentAddressLine2 = e.target.value)}
                  autocomplete="off"
                />

                <label for="permanentlandmark">Landmark</label>
                <input
                  type="text"
                  name="permanentlandmark"
                  id="permanentlandmark"
                  value=${this.editData.PermanentLandmark}
                  @input=${(e) =>
                    (this.editData.PermanentLandmark = e.target.value)}
                  autocomplete="off"
                />

                <label for="permanentcountry">Country</label>
                <select
                  @input=${(e) =>
                    (this.editData.PermanentCountry = e.target.value)}
                  name="permanentcountry"  
                  id="permanentcountry"
                >
                  <option>${this.editData.PermanentCountry}</option>
                  ${repeat(
                    country,
                    (items) =>
                      html`<option class="options">${items.country}</option>`
                  )}
                </select>

                <label for="permanentstate">State</label>
                <select
                  @input=${(e) =>
                    (this.editData.PermanentState = e.target.value)}
                  name="permanentstate"  
                  id="permanentstate"
                >
                  <option>${this.editData.PermanentState}</option>
                  ${repeat(
                    state,
                    (items) =>
                      html`<option class="options">${items.state}</option>`
                  )}
                </select>

                <label for="permanentcity">City</label>
                <select
                  @input=${(e) =>
                    (this.editData.PermanentCity = e.target.value)}
                  id="permanentcity"
                  name="permanentcity"
                >
                  <option>${this.editData.PermanentCity}</option>
                  ${repeat(
                    city,
                    (items) =>
                      html`<option class="options">${items.city}</option>`
                  )}
                </select>

                <label for="permanentzipcode">Zip Code</label>
                <input
                  type="number"
                  name="permanentzipcode"
                  value=${this.editData.PermanentZipCode}
                  @input=${(e) =>
                    (this.editData.PermanentZipCode = e.target.value)}
                  id="permanentzipcode"
                />
              </div>
            </div>
          </div>
          <h3 id="contact">Contact Details</h3>
          <div class="f-block">
            <div class="blocks">
              <label for="primarynumber">Primary Number</label>
              <input
                name="primarynumber"    
                id="primarynumber"
                value=${this.editData.PrimaryNumber}
                @input=${(e) => (this.editData.PrimaryNumber = e.target.value)}
              />
            </div>

            <div class="blocks">
              <label for="secondarynumber">Secondary Number</label>
              <input
                id="secondarynumber"
                name="secondarynumber"
                value=${this.editData.SecondaryNumber}
                @input=${(e) =>
                  (this.editData.SecondaryNumber = e.target.value)}
              />
            </div>

            <div class="blocks">
              <label for="emergencynumber">Emergency Number</label>
              <input
                name="emergencynumber"  
                id="emergencynumber"
                value=${this.editData.EmergencyNumber}
                @input=${(e) =>
                  (this.editData.EmergencyNumber = e.target.value)}
              />
            </div>
          </div>
          <div class="btn-block">
            <button id="cancel-btn" @click=${this.cancelEdit}>Cancel</button>
            <button id="save-btn" @click=${this.saveEdit}>Save</button>
          </div>
        </form>
      </dialog>

      <!-- Main Data display  -->
      <div class="main-table">
        <main class="table">
          <section class="table_header">
            <h1>Employee Details</h1>
          </section>
          <section class="table_body">
            <table>
              <thead>
                <tr>
                  <th>
                    Name <button id="sort-btn" @click=${this.sort}>⇵</button>
                  </th>
                  <th>Emp Code</th>
                  <th>Email Type</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Correspondence Address</th>
                  <th>Permanent Address</th>
                  <th>Contact Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${repeat(
                  this.data,
                  (items, index) => html`<tr>
                    <td>${items.Name}</td>
                    <td>${items.EmployeeCode}</td>
                    <td>${items.EmailType}</td>
                    <td>${items.Email}</td>

                    <td>${items.Designation}</td>
                    <td>${items.Department}</td>
                    <td class="address">
                      <p>
                        <strong>AddressLine1: </strong
                        >${items.CorrespondenceAddressLine1}
                      </p>
                      <p>
                        <strong>AddressLine2: </strong
                        >${items.CorrespondenceAddressLine2}
                      </p>
                      <p>
                        <strong>Landmark: </strong
                        >${items.CorrespondenceLandmark}
                      </p>
                      <p>
                        <strong>Country: </strong>${items.CorrespondenceCountry}
                      </p>
                      <p>
                        <strong>State: </strong>${items.CorrespondenceState}
                      </p>
                      <p><strong>City: </strong>${items.CorrespondenceCity}</p>
                      <p>
                        <strong>ZipCode: </strong>${items.CorrespondenceZipCode}
                      </p>
                    </td>
                    <td class="address">
                      <p>
                        <strong>AddressLine1: </strong
                        >${items.PermanentAddressLine1}
                      </p>
                      <p>
                        <strong>AddressLine2: </strong
                        >${items.PermanentAddressLine2}
                      </p>
                      <p>
                        <strong>Landmark: </strong>${items.PermanentLandmark}
                      </p>
                      <p><strong>Country: </strong>${items.PermanentCountry}</p>
                      <p><strong>State: </strong>${items.PermanentState}</p>
                      <p><strong>City: </strong>${items.PermanentCity}</p>
                      <p><strong>ZipCode: </strong>${items.PermanentZipCode}</p>
                    </td>

                    <td>
                      <p><strong>Primary: </strong>${items.PrimaryNumber}</p>
                      <br />
                      <p>
                        <strong>Secondary: </strong>${items.SecondaryNumber}
                      </p>
                      <br />
                      <p>
                        <strong>Emergency: </strong>${items.EmergencyNumber}
                      </p>
                    </td>
                    <td>
                      <button id="editbtn" @click=${() => this.editItem(index)}>
                        Edit
                      </button>
                      <button
                        id="dltbtn"
                        @click=${() => this.DeleteConfirmation(items)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr> `
                )}
              </tbody>
            </table>
          </section>
        </main>
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

  toggleAlert() {
    let alertbox = this.renderRoot.querySelector("#alertbox");
    alertbox.classList.remove("visible");
    alertbox.classList.add("invisible");
  }

  alert() {
    let alertbox = this.renderRoot.querySelector("#alertbox");
    alertbox.classList.remove("invisible");
    alertbox.classList.add("visible");
    this.requestUpdate();
  }

  editItem(index) {
    this.editingIndex = index;
    const item = this.data[index];
    console.log(item);
    this.editData = item;
    this.openmodal();
  }

  cancelEdit() {
    window.location.reload();
    this.requestUpdate();
    this.closemodel();
  }

  saveEdit() {
    this.storeData();
    window.location.reload();
    this.requestUpdate();
    this.closemodel();
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
    if (index > -1) {
      this.data.splice(index, 1);
      this.storeData();
      this.requestUpdate();
      this.alert();
    }
  }

  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .invisible{
        display:none;
      }
      .visible{
        display:block;
      }

      .alert {
        text-align:center;
        padding: 20px;
        background-color: #d30606;
        color: white;
      }

      .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
      }

      .closebtn:hover {
        color: black;
      }

      .form{
        padding-left:70px;
      }

      .modal{
        border:none;
        padding:1em;
        border-radius:10px;
        width:50%;
        height:80%;
        margin:70px auto;
        /* display:inline-block; */
        overflow-y:scroll;
        background-image:linear-gradient(45deg, #838c91,#5bdcfce3 );
        backdrop-filter:blur(5px);
        box-shadow:4px 2px 5px 0.6px #769affa1;
      }
      .modal::-webkit-scrollbar{
        width:0.5rem;
        height:0.5rem;
      }
      .modal::-webkit-scrollbar-thumb{
          border-radius:.5rem;
          visibility:hidden;
          background-color:#0004;
        }

      .modal::backdrop{
        background:#585555;
        opacity:.7;
      }
      .form-header{
          margin-bottom:15px;
          background:#03265a39;
          text-align:center;
          padding:.4rem 1rem;
          color:#000000;
          font-family: 'Lora', serif;
          border-top-left-radius:8px;
          border-top-right-radius:8px;
      }

      .contain{
        display:flex;
        margin:20px 0px;
        gap:50px;
        font-family: 'Poppins', sans-serif;
        padding: 0px 8px;
        
      }
      .block2{
        display:flex;
        flex-direction:column;
        gap:5px;
      }
      .block2 input{
        width:100%;
        height:30px;
        border:1px solid black;
        border-radius:3px;
        background:#fff;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
        padding:0px 5px;
      }
      .block2 select{
        width:100%;
        height:30px;
        border-radius:3px;
        border:1px solid black;
        background:#fff;
        padding:0px 5px;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
      }
      .block1{
        display:flex;
        flex-direction:column; 
        gap:5px;
      }
      .block1 input{
        width:80%;
        height:30px;
        border-radius:3px;
        border:1px solid black;
        background:#fff;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
        padding:0px 5px;
      }
      .block1 select{
        width:80%;
        height:30px;
        border-radius:3px;
        border:1px solid black;
        background:#fff;
        padding:0px 5px;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
      }
      .h-block{
        display: flex;
        gap: 5px;
      }
      .h-block input{
        width:70%;
        height:30px;
        border:1px solid black;
        border-radius:3px;
        background:#fff;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
        padding:0px 5px;
      }
      .h1-block{
        display: flex;
        gap: 5px;
      }
      .h1-block input{
        width:70%;
        height:30px;
        border:1px solid black;
        border-radius:3px;
        background:#fff;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
        padding:0px 5px;
      }
      .h1-block select{
        width:70%;
        height:30px;
        border:1px solid black;
        border-radius:3px;
        background:#fff;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
        padding:0px 5px;
      }
      .h2-block{
        display: flex;
        gap: 5px;
      }
      .h2-block select{
        width:70%;
        height:30px;
        border:1px solid black;
        border-radius:3px;
        background:#fff;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
        padding:0px 5px;
      }
      .blocks{
        margin: 0px auto;
        width: 300px;
        display: flex;
        flex-direction: column;
      }
      #contact{
        font-family: 'Poppins', sans-serif;
      }
      .f-block{
        display:flex;
        flex-direction:column;
        gap:5px;
        font-family: 'Poppins', sans-serif;
      }
      .f-block input{
        height:30px;
        width:155%;
        margin-left:-90px;
        border-radius:3px;
        border:1px solid black;
        background:#fff;
        padding:0px 5px;
        box-shadow: 2px 3px 5px 0.1px #3f3f3f;
      }
      .f-block label{
        margin-left:-90px;
      }
      #contact{
        margin-left:250px;
      }
      .btn-block{
        display:flex;
        gap: 109px;
        margin: 27px 125px;
        font-family: 'Poppins', sans-serif;

      }
      form label{
        font-family: 'Lora', serif;
        /* color:#fff; */
        font-weight:bold;
        padding:2px;
      }
      #cancel-btn{
          padding:2px;
          margin:5px 2px;
          width:50%;
          height:35px;
          font-weight:bold;
          cursor:pointer;
          color:#000000;
          border-radius:6px;
          font-family: 'Lora', serif;
          background-image:linear-gradient(to right,  #60626b88, #5482b3);
        }
        #cancel-btn:hover{
          color:#000000;
          background-image:linear-gradient(to right, #bcc5b9, #f16666e6);
        }
       #save-btn{
          padding:2px;
          margin:5px 2px;
          width:50%;
          height:35px;
          font-weight:bold;
          cursor:pointer;
          color:#000000;
          border-radius:6px;
          font-family: 'Lora', serif;
          background-image:linear-gradient(to right, #60626b88, #5482b3);
        }
        #save-btn:hover{
          color:#000000;
          background-image:linear-gradient(to right, #bcc5b9, #a1d493);
        }

         .main-table{
          padding:0px 0px;

        }

        table,th,td{
          padding:1rem;
          border-collapse:collapse;
          
        }
        main.table{
          margin:0px auto;
          width:100%;
          height:91.9vh;
          background:linear-gradient(90deg,#d9e5eb,#5bdcfce3);
          backdrop-filter:blur(2px);
          overflow:hidden;
          border:2px solid #02020275;
        }

        .table_header{
          padding:25px;
          color:#000000;
          font-family: 'Lora', serif; 
          font-size:20px;       
        }
        .table_body{
          width:97%;
          max-height:82%;
          background-color:#c7e4f0eb;
          margin:-16px 19px;
          border-radius:.6rem;
          overflow:auto;

        }
        .table_body::-webkit-scrollbar{
          width:0rem;
          height:0rem;
        }
        .table_body::-webkit-scrollbar-thumb{
          border-radius:.5rem;
          background-color:#0004;
          visibility:hidden;
        }
        .table_body:hover::-webkit-scrollbar-thumb{
          visibility:visible;
 
        }
        table{
          width:100%;
        }
        thead th{
          position:sticky;
          top:0;
          left:0;
          background-color:#090155;
          font-family: 'Lora', serif;
          color:#fff;

        }
       tbody tr:nth-child(even){
          background-color:#ffffff;
        }
        tbody tr{
          font-size:14px;
          font-family: 'Lora', serif;
                  
        }
        #sort-btn{
          border:none;
          background:none;
          cursor:pointer;
          color:#fff;
          font-size:18px;
        }    
    
        #dltbtn{
          padding:2px;
          margin:5px 2px;
          width:100%;
          background:#090155;
          color:#fff;
          cursor:pointer;
          font-family: 'Lora', serif;
          border-radius:6px;
          border:2px solid #090155;
          box-shadow:2px 0.9px 6px 0.8px #000000;
        }
        #editbtn{
          padding:2px;
          margin:5px 2px;
          width:100%;
          cursor:pointer;
          color:#fff;
          background:#090155;
          border-radius:6px;
          font-family: 'Lora', serif;
          border:2px solid #090155;
          box-shadow:2px 0.9px 6px 0.8px #000000;
        }
        #editbtn:hover{
          background:#d1d1d1;
          border:none;
          color:#1a7408;
        }
        #dltbtn:hover{
          color:red;
          border:none;
          background:#d1d1d1;;
        } 
        .address p{
          padding:3px;
        }
    `;
  }
}

window.customElements.define("my-userdata", UserData);
