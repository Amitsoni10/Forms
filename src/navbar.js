import { LitElement, css, html } from "lit";


export class Navbar extends LitElement {
    static get properties() {
      return {

      }
    }


    constructor(){
        super();
    }

    render(){
        return html`
        <nav id="nav">
            <ul id="nav-ul">
                <li>Annalect</li>
                <div id="direction">
                <li><a href="index.html">Home</a></li>
                <li><a href="UserData.html">Userdata</a></li>
            </div>
            </ul>
        </nav>
        `
    }

    static get styles(){
        return css`
        *{
        margin:0;
        padding:0;
        box-sizing: border-box;
      }
        #nav{
            height:50px;
            background-color:#181529;
        }
        #nav-ul{
            display:flex;
            text-decoration:none;
            padding:10px 25px;
        }
         li{
            text-decoration:none;
            list-style-type:none;
            font-size:20px;
            color:white;
            font-family:"Raleway";
        font-weight:500;
         }
         a{
            text-decoration:none;
            color:white;
            font-family:"Raleway";
        font-weight:500;
         
            
         }
         #direction{
            display:flex;
            position:absolute;
            right:20px;
            top:10px;
            gap:20px;
         }
         a:hover{
            color:#f97316;
         }
        `
    }


}

window.customElements.define("my-navbar", Navbar);