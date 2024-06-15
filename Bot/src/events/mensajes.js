import pkg from "whatsapp-web.js";
import messages from "./mensajes.js";
import path from "path";

const { MessageMedia, Location } = pkg;

const PALABRAS_CLAVE_MENÚ_OPCIÓN_1 = 
[
    "1",
    "menu",
    "menú",
    "ver el menú",
    "ver el menu"
];
const PALABRAS_CLAVE_MENÚ_OPCIÓN_2 = 
[
    "2",
    "pedido",
    "hacer un pedido",
    "ordenar"
];
const PALABRAS_CLAVE_MENÚ_OPCIÓN_3 = 
[
    "3",
    "consultar",
    "estado de mi"  
];
const PALABRAS_CLAVE_MENÚ_OPCIÓN_4 = 
[
    "4",
    "ubicacion",
    "ubicación",
    "horarios",
    "horario"  
];
const PALABRAS_CLAVE_MENÚ_OPCIÓN_5 = 
[
    "5",
    "agente",
    "hablar con un",
    "horarios",
    "horario"  
];

class flowMenu{

    constructor(cliente){
        this.cliente = cliente;
    }

    initialize(){
        this.cliente.on("message", this.eventMessage.bind(this));
    }
    async eventMessage(msg){
        console.log("De: ", msg.from);
        if (msg.body == "!hola") {
            console.log("Mensaje: ", msg.body);
            msg.reply('Comdo estas');
        }
    }
}

export default flowMenu;