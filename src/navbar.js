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
                <li><a href="UserData.html">UserData</a></li>
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
            background-color:#272525;
        }
        #nav-ul{
            display:flex;
            text-decoration:none;
            margin:0px 10px;
            padding:10px 25px;
            gap:50px;
        }
         li{
            text-decoration:none;
            list-style-type:none;
            font-size:20px;
            color:white;
         }
         a{
            text-decoration:none;
            color:white;
         
            
         }
         #direction{
            display:flex;
            gap:50px;
            margin:0px 950px
         }
         a:hover{
            color:#482fd4;
         }
        `
    }


}

window.customElements.define("my-navbar", Navbar);