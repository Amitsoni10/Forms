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
        <section class="form-header">
          <h2 id="form-heading">Edit Details of ${this.editData.Name}</h2>
        </section>
        <form>
          <div class="form">
            <div class="h-block">
              <div class="blocks">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  value=${this.editData.Name}
                  autocomplete="off"
                  @input=${(e) => (this.editData.Name = e.target.value)}
                />
              </div>
              <div class="blocks">
                <label>Employee Code</label>
                <input
                  type="text"
                  id="empcode"
                  value=${this.editData.EmployeeCode}
                  @input=${(e) => (this.editData.EmployeeCode = e.target.value)}
                />
              </div>
            </div>
            <div class="h1-block">
              <div class="blocks">
                <label>Email Type</label>
                <select
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
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  value=${this.editData.Email}
                  @input=${(e) => (this.editData.Email = e.target.value)}
                />
              </div>
            </div>
            <div class="h2-block">
              <div class="blocks">
                <label>Choose a Designation </label>
                <select
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
                <label>Choose a Department </label>
                <select
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
                <label>Address Line 1</label>
                <input
                  type="text"
                  id="correspondenceaddressline1"
                  value=${this.editData.CorrespondenceAddressLine1}
                  @input=${(e) =>
                    (this.editData.CorrespondenceAddressLine1 = e.target.value)}
                  autocomplete="off"
                />

                <label>Address Line 2</label>
                <input
                  type="text"
                  id="correspondenceaddressline2"
                  value=${this.editData.CorrespondenceAddressLine2}
                  @input=${(e) =>
                    (this.editData.CorrespondenceAddressLine2 = e.target.value)}
                  autocomplete="off"
                />

                <label>Landmark</label>
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
                  id="correspondencecountry"
                >
                  <option>${this.editData.CorrespondenceCountry}</option>
                  ${repeat(
                    this.countries,
                    (items) =>
                      html`<option class="options">${items.name}</option>`
                  )}
                </select>

                <label>State</label>
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

                <label>City</label>
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

                <label>Zip Code</label>
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
                <label>Address Line 1</label>
                <input
                  type="text"
                  id="permanentaddressline1"
                  value=${this.editData.PermanentAddressLine1}
                  @input=${(e) =>
                    (this.editData.PermanentAddressLine1 = e.target.value)}
                  autocomplete="off"
                />

                <label>Address Line 2</label>
                <input
                  type="text"
                  id="permanentaddressline2"
                  value=${this.editData.PermanentAddressLine2}
                  @input=${(e) =>
                    (this.editData.PermanentAddressLine2 = e.target.value)}
                  autocomplete="off"
                />

                <label>Landmark</label>
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
                  id="permanentcountry"
                >
                  <option>${this.editData.PermanentCountry}</option>
                  ${repeat(
                    this.countries,
                    (items) =>
                      html`<option class="options">${items.name}</option>`
                  )}
                </select>

                <label>State</label>
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

                <label>City</label>
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

                <label>Zip Code</label>
                <input
                  type="number"
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
              <label>Primary Number</label>
              <input
                id="primarynumber"
                value=${this.editData.PrimaryNumber}
                @input=${(e) => (this.editData.PrimaryNumber = e.target.value)}
              />
            </div>

            <div class="blocks">
              <label>Secondary Number</label>
              <input
                id="secondarynumber"
                value=${this.editData.SecondaryNumber}
                @input=${(e) =>
                  (this.editData.SecondaryNumber = e.target.value)}
              />
            </div>

            <div class="blocks">
              <label>Emergency Number</label>
              <input
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
                    Name<button id="sort-btn" @click=${this.sort}>⇵</button>
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
    return css`\
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
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
        border:2px solid #1b1818;
        padding:1em;
        border-radius:10px;
        width:50%;
        height:80%;
        margin:70px auto;
        /* display:inline-block; */
        overflow-y:scroll;
        background-image:linear-gradient(45deg, #bbb4b4,#ff1046);
        backdrop-filter:blur(5px);
        box-shadow:0.4rem .8rem #2c2b2ba3;
      }
      .modal::-webkit-scrollbar{
        width:0.5rem;
        height:0.5rem;
      }
      .modal::-webkit-scrollbar-thumb{
          border-radius:.5rem;
          background-color:#0004;
        }

      .modal::backdrop{
        background:#585555;
        opacity:.7;
      }
      .form-header{
          width:100%;
          height:10%;
          margin-bottom:15px;
          background-image:linear-gradient(to right, #020202, #3d3b3b,#020202);
          text-align:center;
          padding:.4rem 1rem;
          color:#fff;
          font-family: 'Lora', serif;
          border-top-left-radius:8px;
          border-top-right-radius:8px;
      }

      .contain{
        display:flex;
        margin:20px 0px;
        gap:16px
        font-family: 'Poppins', sans-serif;
        padding: 0px 8px
        
      }
      .block2{
        display:flex;
        flex-direction:column;
        gap:5px;
      }
      .block2 input{
        width:70%;
        height:30px;
        border:1px solid black;
        border-radius:3px;
        background:#ffffff96;
        padding:0px 5px;
      }
      .block2 select{
        width:70%;
        height:30px;
        border-radius:3px;
        border:1px solid black;
        background:#ffffff96;
        padding:0px 5px;
      }
      .block1{
        display:flex;
        flex-direction:column; 
        gap:5px;
      }
      .block1 input{
        width:70%;
        height:30px;
        border-radius:3px;
        border:1px solid black;
        background:#ffffff96;
        padding:0px 5px;
      }
      .block1 select{
        width:70%;
        height:30px;
        border-radius:3px;
        border:1px solid black;
        background:#ffffff96;
        padding:0px 5px;
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
        background:#ffffff96;
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
        background:#ffffff96;
        padding:0px 5px;
      }
      .h1-block select{
        width:70%;
        height:30px;
        border:1px solid black;
        border-radius:3px;
        background:#ffffff96;
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
        background:#ffffff96;
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
        background:#ffffff96;
        padding:0px 5px;
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
      }
      #cancel-btn{
          padding:2px;
          margin:5px 2px;
          width:50%;
          height:35px;
          font-weight:bold;
          cursor:pointer;
          color:#fff;
          border-radius:6px;
          font-family: 'Lora', serif;
          background-image:linear-gradient(to right, #020202, #2c2a2a,#3d3b3b);
        }
        #cancel-btn:hover{
          color:#ffffff;
          background-image:linear-gradient(to right, #fa0b0bed, #ff2727e6,#f84c4c);
        }
       #save-btn{
          padding:2px;
          margin:5px 2px;
          width:50%;
          height:35px;
          font-weight:bold;
          cursor:pointer;
          color:#fff;
          border-radius:6px;
          font-family: 'Lora', serif;
          background-image:linear-gradient(to right, #020202, #2c2a2a,#3d3b3b);
        }
        #save-btn:hover{
          color:#ffffff;
          background-image:linear-gradient(to right, #174b09, #298310,#2aaa10);
        }

        .main-table{
          background: url(https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80) center/cover;
          padding:6px 0px;

        }

        table,th,td{
          padding:1rem;
          border-collapse:collapse;
          
        }
        main.table{
          margin:0px auto;
          width:93vw;
          height:90vh;
          background-color:#807b7b40;  
          backdrop-filter:blur(2px);
          border-radius:0.8rem;
          overflow:hidden;
          border:2px solid #02020275;
        }

        .table_header{
          width:100%;
          height:10%;
          background-color:#070707f0;
          padding:.8rem 1rem;
          color:#fff;
          font-family: 'Lora', serif;         
        }
        .table_body{
          width:97%;
          max-height:86%;
          background-color:#ffffffc0;
          margin:.8rem auto;
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
          background-color:#ff1046;
          font-family: 'Lora', serif;


        }
       tbody tr:nth-child(even){
          background-color:#00000032;
        }
        tbody tr:hover{
          background-color:#ffffff81;

        }
        tbody tr{
          font-size:14px;
          font-family: 'Lora', serif;
                  
        }
        #sort-btn{
          border:none;
          background:none;
          cursor:pointer;
        }   
    
        #dltbtn{
          padding:2px;
          margin:5px 2px;
          width:100%;
          background-image:linear-gradient(to right, #f01414f9, #ff2727fb,#ec3939);
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
          background-image:linear-gradient(to right, #f01414f9, #ff2727fb,#ec3939);
        }
        #editbtn:hover{
          background:#d1d1d1;
          color:#1a7408;
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
