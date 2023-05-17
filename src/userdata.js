import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";

export class UserData extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = JSON.parse(localStorage.getItem("MyEmployeeList"));
  }
  connectedCallback() {
    super.connectedCallback();
    console.log(this.data)
  }
  render() {
    return html`
      <div class="outer-container">
        <tr class="container">
          <!-- <th>Id</th> -->
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
          (items) => html` <tr class="container">
            <td>${items.Name}</td>
            <td>${items.EmployeeCode}</td>
            <td>${items.EmailType}</td>
            <td>${items.Email}</td>

            <td>${items.Designation}</td>
            <td>${items.Department}</td>
            <td>
              AddressLine1:${items.CorrespondenceAddressLine1}
              AddressLine2:${items.CorrespondenceAddressLine2}
              Landmark:${items.CorrespondenceLandmark}
              Country:${items.CorrespondenceCountry}
              State:${items.CorrespondenceState}
              City:${items.CorrespondenceCity}
              ZipCode:${items.CorrespondenceZipCode}
            </td>
            <td>AddressLine1:${items.PermanentAddressLine1}
              AddressLine2:${items.PermanentAddressLine2}
              Landmark:${items.PermanentLandmark}
              Country:${items.PermanentCountry}
              State:${items.PermanentState}
              City:${items.PermanentCity}
              ZipCode:${items.PermanentZipCode}</td>
              <td>${items.PrimaryNumber}</td>
              <td>${items.SecondaryNumber}</td>
              <td>${items.EmergencyNumber}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>`
        )}
      </div>
    `;
  }

  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .container {
        display: flex;
        gap: 30px;
        border-bottom: 1px solid black;
      }
      .outer-container {
        margin: 10px 10px;
        padding: 10px 10px;
        border: 1px solid black;
      }
      td {
        display: inline-block;
        width: 100%;
      }
      th {
        display: inline-block;
        width: 100%;
      }
    `;
  }
}

window.customElements.define("my-userdata", UserData);
