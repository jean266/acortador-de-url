
import { btnMenu, inputLink, menuMobil, sectionLinks } from "../selector.js";

//* Instanciar 

export default class UI {

    // Muestra el menu mobil
    showMenu() {
        if (window.innerWidth <= 1024) {
            menuMobil.style.display = "none";
            btnMenu.addEventListener('click', this.showMenuMobil);
        } else {
            menuMobil.style.display = "flex";
        }
    }

    // Muestra el menu mobil
    showMenuMobil() {
        if (menuMobil.style.display === "none") {
            menuMobil.style.display = "unset";
        } else {
            menuMobil.style.display = "none";
        }
    }

    // Muestra la alerta 
    showAlert(message) {

        this.removeAlert();

        const alertParagraph = document.createElement("P");

        alertParagraph.classList.add("alert_message");
        inputLink.parentElement.classList.add("alert");
        alertParagraph.textContent = message;

        // Insertar en el HTML
        inputLink.parentElement.appendChild(alertParagraph);
    }

    // Elimina la alerta
    removeAlert() {
        const alert = document.querySelector(".alert_message");

        if (alert) {
            alert.remove();
            inputLink.parentElement.classList.remove("alert");
        }
    }

    // Mostrar informacion
    showLinks(links) {
        const { id, long, short } = links;

        const divShort = document.createElement("DIV");
        divShort.classList.add("short");

        const divLinkShort = document.createElement("DIV");
        divLinkShort.classList.add("container_link-short");

        const linkLong = document.createElement("P");
        linkLong.classList.add("link-long");
        linkLong.textContent = long;

        const linkShort = document.createElement("P");
        linkShort.classList.add("link-short");
        linkShort.textContent = short;

        const btnCopy = document.createElement("BUTTON");
        btnCopy.textContent = "Copy";
        btnCopy.onclick = this.copy;

        // Unir HTML
        divLinkShort.appendChild(linkShort);
        divLinkShort.appendChild(btnCopy);

        divShort.appendChild(linkLong);
        divShort.appendChild(divLinkShort);

        // Insertar en el HTML
        sectionLinks.appendChild(divShort);
    }

    // Limpia el HTML
    cleanHTML() {
        while (sectionLinks.firstChild) {
            sectionLinks.removeChild(sectionLinks.firstChild);
        }
    }

    copy(e) {

        const link = e.target.parentElement.firstChild;
        const btnCopy = e.target;

        try {
            navigator.clipboard.writeText(link.textContent);
            btnCopy.classList.add("copied");
            btnCopy.textContent = "Copied!"
        } catch (error) {
            console.error('Failed to copy: ', error);
        }

    }
}