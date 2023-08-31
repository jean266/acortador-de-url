
let dataBase;

export default class DB {

    createDB() {
        const createDB = window.indexedDB.open("links", 1);

        createDB.onerror = e => {
            console.error(`Database error: ${e.target.errorCode}`);
        }   

        createDB.onsuccess = e => {
            dataBase = e.target.result;
        }

        createDB.onupgradeneeded = e => {
            const db = e.target.result;

            const objectStore = db.createObjectStore("links", {KeyPath: "id", autoIncrement: true});

            objectStore.createIndex('long', 'long', { unique: false });
            objectStore.createIndex('short', 'short', { unique: true });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log("DB lista y Creada");
        }
    }
}