import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { country, state, city } from "./assets/data";

export class MyAddress extends LitElement {
  static get properties() {
    return {
      address: { type: Object },
    };
  }

  constructor() {
    super();
    this.address = {
      zip: { value: "", isValidName: false, errorMessage: "" },
      Address1: { value: "", isValidName: false, errorMessage: "" },
    };
  }

  render() {
    return html`
      <form @submit=${this.submit1}>
        <h4>Address</h4>
        <div class="label-container">
          <label>Address Line 1</label>
          <input type="text" id="addressline1" autocomplete="off" /><br /><br />
        </div>

        <div class="label-container">
          <label>Address Line 2</label>
          <input type="text" id="addressline2" autocomplete="off" /><br /><br />
        </div>

        <div class="label-container">
          <label>Landmark</label>
          <input type="text" id="landmark" autocomplete="off" /><br /><br />
        </div>

        <div class="label-container">
          <label>Country</label>
          <select>
            ${repeat(
              country,
              (items) => html`<option class="options">${items.country}</option>`
            )}
          </select>
          <span class="error"></span>

          <br />
        </div>

        <div class="label-container">
          <label>State</label>
          <select>
            ${repeat(
              state,
              (items) => html`<option class="options">${items.state}</option>`
            )}
          </select>
          <span class="error"></span>
          <br />
        </div>
        <div class="label-container">
          <label>City</label>
          <select>
            ${repeat(
              city,
              (items) => html`<option class="options">${items.city}</option>`
            )}
          </select>
          <span class="error"></span>
          <br />
        </div>

        <div class="label-container">
          <label>Zip Code</label>
          <input
            @input=${(e) => this.validate(e, "zipcode")}
            autocomplete="off"
          />
          <span>${this.address.zip.errorMessage}</span><br /><br />
        </div>
        <button type="submit"></button>
      </form>
    `;
  }

  // connectedCallback(){
  //     this.dispatchAddressUpdated()
  // }

  submit1(e){
    e.preventDefault()

        if (!this.address.zip.value){
      this.address = {
        ...this.address,
        zip: {
          value: `${e.target.value}`,
          isValidName: false,
          errorMessage: "Can't be empty from another",
        },
      };
    }

    if(this.address.zip.isValidName===true){
        const form1 = this.renderRoot.querySelector("form")
        form1.rese()
    }
  }

  validate(e, type) {
    switch (type) {
      case "zipcode":
        {
          this.address = {
            ...this.address,
            zip: {
              value: `${e.target.value}`,
              isValidName: false,
              errorMessage: "",
            },
          };

          if (!this.address.zip.value) {
            this.address = {
              ...this.address,
              zip: {
                value: `${e.target.value}`,
                isValidName: false,
                errorMessage: "Can't be empty",
              },
            };

          } else {
            this.address = {
              ...this.address,
              zip: {
                value: `${e.target.value}`,
                isValidName: true,
                errorMessage: "",
              },
            };
           
          }
        }
        break;
    }
  }



  static get styles() {
    return css`
      .label-container {
        /* border: 2px solid yellow; */
        margin: 0px auto;
        width: 300px;
        display: flex;
        flex-direction: column;
      }
    `;
  }
}

window.customElements.define("my-address", MyAddress);
