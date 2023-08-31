
import DB from "./DB.js";
import UI from "./UI.js";
import Shorter from "./Shorter.js";
import { btnMenu, form } from "../selector.js";

//* Instanciar
const db = new DB();
const ui = new UI();
const shorter = new Shorter();

export default class App {
    
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            db.createDB();

            window.addEventListener("resize", () => { 
                ui.showMenu();
            });
            ui.showMenu();
            this.initApp();

            if(window.indexedDB.open("links", 1)) {
                setTimeout(() => {
                    shorter.sprintLinks();
                }, 200);
            }
        });
    }

    initApp() {
        // Eventos
        btnMenu.addEventListener('click', ui.showMenuMobil);
        form.addEventListener('submit', shorter.validate);
    }
}
