
import UI from "./UI.js";
import { inputLink } from "../selector.js";

//* Instanciar
const ui = new UI();

let DB;

export default class Shorter {
    
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                this.connectDB();
            }, 100);
        })
    }

    connectDB() {
        const openConnection = window.indexedDB.open("links", 1);

        openConnection.onerror = e => {
            console.error(`Database error: ${e.target.errorCode}`);
        }

        openConnection.onsuccess = e => {
            DB = e.target.result;
        }
    }
    
    validate (e) {
        e.preventDefault();
        const shorter = new Shorter();

        // Validar si el campo esta vacio
        if(inputLink.value === "" ) {
            ui.showAlert("please add a link");
            return;
        }

        // Limpiar alerta
        ui.removeAlert();
        
        // Consulta el API
        shorter.shorterURL(inputLink.value);
    }

    // Consulta la API y la corta
    shorterURL(url) {

        const urlApi = `https://api.shrtco.de/v2/shorten?url=${url}`; 
        
        fetch( urlApi )
            .then( answer => answer.json() )
            .then( data => {

                const links = {
                    long : data.result.original_link,
                    short : data.result.full_short_link3,
                    id : Date.now()
                }

                this.saveLink(links);
            });
    } 
    
    // Guarda el objeto linksObj en indexDB
    saveLink(links) {
        const transaction = DB.transaction(["links"], "readwrite");
        const objectStore = transaction.objectStore("links");

        objectStore.add(links);

        transaction.onerror = e => {
            console.error(`Database error: ${e.target.errorCode}`);
        }   

        transaction.oncomplete = e => {
            this.sprintLinks();
            form.reset();
        }
    }

    // Itera sobre los datos de IndexedDB y manda a imprimir los datos
    sprintLinks() {
        ui.cleanHTML();

        const transaction = DB.transaction(["links"], "readwrite");
        const objectStore = transaction.objectStore("links");

        const links = objectStore.openCursor();

        links.onsuccess = e => {
            const cursor = e.target.result;

            if(cursor) {
                ui.showLinks(cursor.value);
                cursor.continue();
            }
        }
    }
}