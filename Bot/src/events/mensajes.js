import pkg from "whatsapp-web.js";
import { ValidacionPalabras } from "../validation/validaciones.js";

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
const PALABRAS_CLAVE_BIENVENIDA = [
    "hola",
    "que tal",
    "q tal",
    "buenas"
]
const OPCIONES_MENU = {
    MENU_PRINCIPAL:
    "Soy su asistente virtual\n"+
    "¿En qué puedo ayudarle hoy",
    MENU_OPCIONES: 
    "Aqui tiene algunas opociones\n"+
    "(Digite la opción):\n"+
    "*1* Ver el menú 🍕🍔\n"+
    "*2* Hacer un pedido 😋\n"+
    "*3* Consultar estado de mi pedido 🧾\n"+
    "*4* Ubicaciones y horarios 🌎⏰\n"+
    "*5* hablar con un agente 💬",
    MENU_AYUDA:
    "¿Necesitas ayuda?"
}


class flowMenu{

    constructor(client){
        this.client = client;
        this.initialize();
    }

    initialize(){
        this.client.on("message", this.eventMessage.bind(this));
    }

    async eventMessage(msg){
        console.log("De: ", msg.from);
        console.log("Mensaje: ", msg.body);
        if (msg.from == "593984990218@c.us") {
            await this.eventRegisteredUser(msg);
        } else {
            
        }
    }

    async eventRegisteredUser(msg){
        if (ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_BIENVENIDA)) {
            await this.eventWelcome(msg.from);
        }
    }

    async eventWelcome(chatID){
        try {         
            const logo = MessageMedia.fromFilePath("./assets/image/MENU_LOGO.jpg");
            await this.client.sendMessage(chatID, logo, {
                caption: "¡Hola!, Bienvenido a Papa's Pizzeria"
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_PRINCIPAL);
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_OPCIONES);
        } catch (error) {
            console.log("ERROR_EVENTO_BIENVENIDA: " + error);   
        }
    }

    async eventHelp(chatID){
        try {         
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_AYUDA);
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_OPCIONES);
        } catch (error) {
            console.log("ERROR_EVENTO_AYUDA: " + error);   
        }
    }

    FormateoMensaje(mensaje) {
        return mensaje.toLowerCase();   
    }
}

export default flowMenu;