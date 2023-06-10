import { LitElement, css, html, nothing } from "lit";

import { repeat } from "lit/directives/repeat.js";
import "./my-element.js";
import "@shoelace-style/shoelace/dist/components/tree/tree.js";
import "@shoelace-style/shoelace/dist/components/tree-item/tree-item.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

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

      <div class="main-container">
        <div>
          <img src="./src/registration.png"/>
        </div>
        <div class="container1">
          <section class="header">
            <div class="heading">
            <u><h1>Employee Details</u></h1>
      </div>
            <div class="sortBtn">
            <button @click=${this.sort}>Sort ⇵</button>
          </div>
          </section>
          
          <div class="container">
            ${repeat(
              this.data,
              (items, index) => html`
                <sl-tree selection="leaf" class="custom-icons">
                  <sl-icon
                    class="expand"
                    name="plus-square"
                    slot="expand-icon"
                  ></sl-icon>
                  <sl-icon
                    class="expand"
                    name="dash-square"
                    slot="collapse-icon"
                  ></sl-icon>

                  <sl-tree-item >
                    <strong class="title">${items.name}</strong>

                    <sl-tooltip hoist content="Edit" placement="top">
                        <sl-icon  class="editBtn"
                        @click=${() => this.editItem(index)} name="pencil-square"></sl-icon>

                  </sl-tooltip>
                    <sl-tooltip hoist content="Delete" placement="top">
                        <sl-icon class="deleteBtn"
                        @click=${() => this.DeleteConfirmation(items)} name="trash"></sl-icon>
                  </sl-tooltip>
                  
                    <sl-tree-item class="base"
                      ><strong>Name :</strong
                      ><strong class="inner"
                        >${items.name}</strong
                      ></sl-tree-item
                    >
                    <sl-tree-item class="base"
                      ><strong>Email :</strong
                      ><strong class="inner">
                        ${items.email} (${items.emailtype})</strong
                      ></sl-tree-item
                    >
                    <sl-tree-item class="base"
                      ><strong>Employee Code :</strong>
                      <strong class="inner"
                        >${items.empCode}</strong
                      ></sl-tree-item
                    >
                    <sl-tree-item class="base"
                      ><strong>Designation :</strong>
                      <strong class="inner"
                        >${items.designation}</strong
                      ></sl-tree-item
                    >
                    <sl-tree-item class="base"
                      ><strong>Department :</strong>
                      <strong class="inner"
                        >${items.department}
                      </strong></sl-tree-item
                    >
                    <sl-tree-item class="base"
                      ><strong>Correspondence Address :</strong>
                      <strong class="inner"
                        >${items.correspondenceaddressline1},
                        ${items.correspondencelandmark},
                        ${items.correspondencecountry},
                        ${items.correspondencestate},
                        ${items.correspondencecity},
                        ${items.correspondencezipcode}</strong
                      ></sl-tree-item
                    >
                    <sl-tree-item class="base"
                      ><strong>Permanent :</strong>
                      <strong class="inner"
                        >${items.permanentaddressline1},
                        ${items.permanentlandmark}, ${items.permanentcountry},
                        ${items.permanentstate}, ${items.permanentcity},
                        ${items.permanentzipcode}</strong
                      >
                    </sl-tree-item>

                    <sl-tree-item class="base"
                      ><strong>Contact Details :</strong>
                      <strong class="inner"
                        >${items.primary}, ${items.secondary},
                        ${items.emergency}</strong
                      ></sl-tree-item
                    >
                  </sl-tree-item> </sl-tree
                ><br />
              `
            )}
          </div>
        </div>
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
      .custom-icons sl-tree-item::part(expand-button) {
        rotate: none;
      }

      .main-container {
        padding-top: 10px;
        /* padding-bottom: 20px; */
        min-height: 91.9vh;
        display:flex;
        /* background-color:#d1d5db; */
        /* background-color:#9292ca7b; */
        background-image: linear-gradient(45deg,#80a9d1 29.4%, #c1dcf7 0%);
      }
      .container1 {
        /* margin: 0px 100px; */
        margin-left:15px;
        margin-right:60px;
        /* background-color: #fff; */
        border-radius: 8px;
        width:100%;
        max-height:500px;
        /* box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.2); */
      }
      .container {
        position: relative;
        background-color: none;
        margin: 0px 20px;
        max-height: 390px;
        margin-top: 10px;
        overflow-y: scroll;
      }
      .container::-webkit-scrollbar {
        width: 0rem;
        height: 0rem;
      }
      .sortBtn button {
        height: 35px;
        width: 120px;
        border: none;
        color: #fff;
        border-radius: 5px;
        margin-top: 15px;
        margin-left: 379px;
        cursor: pointer;
        font-size: 18px;
        font-family: "Roboto";
        font-weight: 500;
        background-color: #8b5cf6;
        letter-spacing: 0.03em;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }
      .sortBtn button:hover {
        background-color: #fff;
        color: #8b5cf6;
        border: 1px solid #8b5cf6;
        -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      }
      .sortBtn button:active {
        background-color: #aa8af3;
      }
      .deleteBtn {
        position: absolute;
        right: 10px;
        top: 5px;
        /* background-color: #f97316; */
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 23px;
        color: #fff;
      }
      .editBtn {
        position: absolute;
        right: 50px;
        top: 5px;
        /* background-color: #f97316; */
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 23px;
        color: #fff;
      }
      .editBtn:hover,
      .deleteBtn:hover {
        transform: scale(1.2);
      }
      .expand {
        color: #fff;
      }
      strong {
        margin-right: 5px;
        font-family: "Roboto";
        letter-spacing: 0.03em;
      }
      strong.inner {
        font-family: "Roboto";
        font-weight: 500;
      }

      .title {
        font-family: "Roboto";
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.05em;
      }

      sl-tree::part(base) {
        background-color: #f97316;
        /* background-image:linear-gradient(to right,#c3faed,#f0fdfa ); */
        /* background-image:linear-gradient(to right,#e5e7eb,#f3f4f6 ); */
        border:none;
        box-shadow: 4px 2px 5px 0.1px #fff7ed;
        border-radius: 4px;
        padding-top: 12px;
        padding-bottom: 6px;
        
      }


      sl-tree-item::part(base) {
        color: #fff;
      }
      sl-tooltip::part(base) {
        -webkit-text-fill-color: #fff;
      }
      .base {
        background-color: #fff7ed;
        /* background-image:linear-gradient(to right,#e5e7eb,#f3f4f6 ); */
        -webkit-text-fill-color: #000000;
        font-family: "Roboto";
        font-weight: 400;
      }
      .header {
        display:flex;
      }
      .heading{
        padding-bottom: 15px;
        padding-top: 15px;
        margin-left:20px;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        color: #3b0764;
       
        font-family: "Raleway";
        font-weight: 700;
        font-size: 20px;
        /* text-align: center; */
        background-color: none;
      }
      h1{
        -webkit-text-stroke-width: 0.8px;
  -webkit-text-stroke-color: #8f7f9c;
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
        font-size: 22px;
        font-weight: 300;
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
        border-radius: 5px;
        margin-left: 12px;
        border: 1px solid #3263e9;
        color: #000000;

        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        font-family: "Roboto";
        font-weight: 500;
        background-color: #1d4ed8;
        letter-spacing: 0.05em;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }
      #cancel-btn:hover {
        background-color: #fff;
        color: #1d4ed8;
        border: 1px solid #1d4ed8;
        -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      }
      #cancel-btn:active {
        background-color: #678cf3a7;
      }
    `;
  }
}

window.customElements.define("my-userdata", UserData);
