import { LitElement, css, html, nothing, svg } from "lit";

import { repeat } from "lit/directives/repeat.js";
import "./my-element.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";

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
        ? html` <dialog class="modal" id="modal">
            <my-element isEditing .editData=${this.editData} .data=${this.data}
              ><button slot="next" id="cancel-btn" @click=${this.closemodel}>
                Cancel</button
              ><button id="cancel-btn" @click=${this.closemodel}>
                Cancel
              </button></my-element
            >
          </dialog>`
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
                    <td>
                      ${items.correspondenceaddressline1},
                      ${items.correspondenceaddressline2},
                      ${items.correspondencelandmark},
                      ${items.correspondencecountry},
                      ${items.correspondencestate}, ${items.correspondencecity},
                      ${items.correspondencezipcode}
                    </td>
                    <td>
                      ${items.permanentaddressline1},
                      ${items.permanentaddressline2},
                      ${items.permanentlandmark}, ${items.permanentcountry},
                      ${items.permanentstate}, ${items.permanentcity},
                      ${items.permanentzipcode}
                    </td>

                    <td>
                      ${items.primary}, ${items.secondary}, ${items.emergency}
                    </td>
                    <td id="buttontd">
                      <button id="editbtn" @click=${() => this.editItem(index)}>
                        <img
                          title="Edit"
                          src="./src/edit.png"
                          height="20px"
                          width="20px"
                        />
                      </button>
                      <button
                        id="dltbtn"
                        @click=${() => this.DeleteConfirmation(items)}
                      >
                        <img
                          title="Delete"
                          src="./src/delete.png"
                          height="20px"
                          width="25px"
                        />
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
    let dialog = this.renderRoot.querySelector(".modal");
    dialog.showModal();
  }
  closemodel() {
    this.editData = undefined;
    window.location.reload();
  }
  sort() {
    this.sortAscending = !this.sortAscending;
    this.data.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
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
    setTimeout(() => {
      window.location.reload();
    }, 700);
  }

  editItem(index) {
    this.editingIndex = index;
    const item = this.data[index];
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
        `WARNING!!!!!!!!!!!!!!!\nAre you sure you want to delete? ${items.name}'s Data\nThis Action will delete the data permanently!!`
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
        padding: 15px;
        font-size:22px;
        font-weight:300;
        font-family: "Raleway", sans-serif;
        background-color: #ff2020f6;
        color: white;
      }

      .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: 400;
        float: right;
        font-size: 40px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
      }

      .closebtn:hover {
        color: black;
      }

      #modal {
        border: none;
        border-radius: 10px;
        width: 70%;
        height: 92%;
        margin: 30px auto;
        overflow-y: scroll;
        background-image: linear-gradient(45deg, #838c91, #5bdcfce3);
        backdrop-filter: blur(5px);
        box-shadow: 4px 2px 5px 0.6px #6589ebdf;
      }
      #modal::-webkit-scrollbar {
        width: 0rem;
        height: 0rem;
      }

      #modal::backdrop {
        background: #8385f0d5;
        opacity: 0.7;
      }

      #cancel-btn {
        height: 45px;
        max-width: 200px;
        width: 100%;
        border: 1px solid #3263e9;
        color: #000000;
        border-radius: 5px;
        margin-left: 12px;
        cursor: pointer;
        font-size: 18px;
        font-weight: 500;
        font-family: "PT Serif", serif;
        background-color: #fff;
      }
      #cancel-btn:hover {
        background-color: #a2bbff89;
      }
      #cancel-btn:active {
        background-color: #678cf3a7;
      }

      table,
      th,
      td {
        padding: 0.8rem;
        border-collapse: collapse;
      }
      main.table {
        margin: 0px auto;
        width: 100%;
        height: 91.9vh;
        background: linear-gradient(90deg, #d9e5eb, #5a83f3f0);
        border: 2px solid #02020275;
      }

      .table_header {
        padding-bottom: 25px;
        padding-top: 10px;
        padding-left: 25px;
        color: #000000;
        font-family: "Raleway", sans-serif;
        font-size: 20px;
      }
      .table_body {
        width: 97%;
        max-height: 88%;
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
        background-color: #0b0069;
        font-family: "Lora", serif;
        font-weight:400;
        color: #fff;
      }

      tbody tr {
        font-size: 15px;
        font-family: "PT Serif", serif;
        background-color: #ffffff;
      }
      /* 090155 */
      #sort-btn {
        border: none;
        background: none;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
      }

      #dltbtn,
      #editbtn {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
      }

      #editbtn:hover,
      #dltbtn:hover {
        transform: scale(1.09);
      }

      #buttontd {
        display: flex;
        margin-top: 20px;
        gap: 7px;
      }
      #namedata {
        font-weight: 600;
      }
    `;
  }
}

window.customElements.define("my-userdata", UserData);
