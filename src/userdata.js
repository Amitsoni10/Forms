import { LitElement, css, html, nothing,svg } from "lit";

import { repeat } from "lit/directives/repeat.js";
import "./my-element.js";
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

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
    this.editData = undefined;
    this.countries = [];
    this.editingIndex = -1;
    this.data = [];
    this.loadData();
  }

  loadData() {
    const storedData = localStorage.getItem("MyEmployeeList");
    if (storedData) {
      this.data = JSON.parse(storedData);
    }
  }
  storeData() {
    localStorage.setItem("MyEmployeeList", JSON.stringify(this.data));
  }

  render() {
    return html`
      <div id="alertbox" class="invisible">
        <div class="alert">
          <span class="closebtn" @click=${this.toggleAlert}>&times;</span>
          <strong>Data Deleted Successfully!!!</strong>
        </div>
      </div>

      ${this.editData
        ? html` <sl-dialog no-header label="Edit Details" style="--width: 70vw;" class="dialog-deny-close" id="modal">
        
            <my-element
              isEditing
              .editData=${this.editData}
              .data=${this.data}
            ><button id="cancel-btn" @click=${this.closemodel}>Cancel</button></my-element>
            
          </sl-dialog>`
        : nothing}

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
                    <td id="namedata">${items.name}</td>
                    <td>${items.empCode}</td>
                    <td>${items.emailtype}</td>
                    <td>${items.email}</td>

                    <td>${items.designation}</td>
                    <td>${items.department}</td>
                    <td >
                      ${items.correspondenceaddressline1},
                      ${items.correspondenceaddressline2},
                      ${items.correspondencelandmark},
                      ${items.correspondencecountry},
                      ${items.correspondencestate},
                      ${items.correspondencecity},
                      ${items.correspondencezipcode}
                    </td>
                    <td >
                      ${items.permanentaddressline1},
                      ${items.permanentaddressline2},
                      ${items.permanentlandmark},
                      ${items.permanentcountry},
                      ${items.permanentstate},
                      ${items.permanentcity},
                      ${items.permanentzipcode}
                    </td>

                    <td>
                    ${items.primary}, ${items.secondary}, ${items.emergency}
                    </td>
                    <td>
                      <button id="editbtn" @click=${() => this.editItem(index)}>
                        Edit
                      </button>
                      <button
                        id="dltbtn"
                        @click=${() => this.DeleteConfirmation(items)}
                      >Delete
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
    let dialog = this.renderRoot.querySelector(".dialog-deny-close");
    dialog.show();
    dialog.addEventListener('sl-request-close', event => {
      if (event.detail.source === 'overlay') {
        event.preventDefault();
      }
    })
  }
  closemodel() {
    this.editData = undefined;
    // let dialog = this.renderRoot.querySelector(".dialog-deny-close");
    // dialog.hide();
    window.location.reload();
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
    // console.log(item);
    this.editData = item;
    requestAnimationFrame(() => {
      this.openmodal();
    });
  }

  cancelEdit() {
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

      .invisible {
        display: none;
      }
      .visible {
        display: block;
      }

      .alert {
        text-align: center;
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

      .form {
        padding-left: 70px;
      }

      #modal::part(close-button){
        display:none;
      }

      /* #modal {
        border: none;

        border-radius: 10px;
        width: 60%;
        height: 80%;
        margin: 70px auto;

        overflow-y: scroll;
        background-image: linear-gradient(45deg, #838c91, #5bdcfce3);
        backdrop-filter: blur(5px);
        box-shadow: 4px 2px 5px 0.6px #769affa1;
      } */
      /* #modal::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
      } */
      /* #modal::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        visibility: hidden;
        background-color: #0004;
      } */

      /* #modal::backdrop {
        background: #585555;
        opacity: 0.7;
      } */

      #cancel-btn {
        border-radius: 2px;
        margin:15px 0px;
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
      #cancel-btn:hover {
        background: linear-gradient(45deg, #11e3ff, #090155);
      }


      .main-table {
        padding: 0px 0px;
      }

      table,
      th,
      td {
        padding: 1rem;
        border-collapse: collapse;
      }
      main.table {
        margin: 0px auto;
        width: 100%;
        height: 91.9vh;
        background: linear-gradient(90deg, #d9e5eb, #5bdcfce3);
        backdrop-filter: blur(2px);
        overflow: hidden;
        border: 2px solid #02020275;
      }

      .table_header {
        padding: 25px;
        color: #000000;
        font-family: "Lora", serif;
        font-size: 20px;
      }
      .table_body {
        width: 97%;
        max-height: 82%;
        background-color: #c7e4f0eb;
        margin: -16px 19px;
        border-radius: 0.6rem;
        overflow: auto;
      }
      .table_body::-webkit-scrollbar {
        width: 0rem;
        height: 0rem;
      }
      .table_body::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        background-color: #0004;
        visibility: hidden;
      }
      .table_body:hover::-webkit-scrollbar-thumb {
        visibility: visible;
      }
      table {
        width: 100%;
      }
      thead th {
        position: sticky;
        top: 0;
        left: 0;
        background-color: #090155;
        font-family: "Lora", serif;
        color: #fff;
      }
      tbody tr:nth-child(even) {
        background-color: #ffffff;
      }
      tbody tr {
        font-size: 14px;
        font-family: "Lora", serif;
      }
      #sort-btn {
        border: none;
        background: none;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
      }

      #dltbtn {
        padding: 2px;
        margin: 5px 2px;
        width: 100%;
        background: #090155;
        color: #fff;
        cursor: pointer;
        font-family: "Lora", serif;
        border-radius: 6px;
        border: 2px solid #090155;
        box-shadow: 2px 0.9px 6px 0.8px #000000;
      }
      #editbtn {
        padding: 2px;
        margin: 5px 2px;
        width: 100%;
        cursor: pointer;
        color: #fff;
        background: #090155;
        border-radius: 6px;
        font-family: "Lora", serif;
        border: 2px solid #090155;
        box-shadow: 2px 0.9px 6px 0.8px #000000;
      }
      #editbtn:hover {
        background: #d1d1d1;
        border: none;
        color: #1a7408;
      }
      #dltbtn:hover {
        color: red;
        border: none;
        background: #d1d1d1;
      }
      #namedata {
        font-weight: bold;
      }
    `;
  }
}

window.customElements.define("my-userdata", UserData);
