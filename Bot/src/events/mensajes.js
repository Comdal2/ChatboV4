import pkg from "whatsapp-web.js";
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
const PALABRAS_CLAVE_BIENVENIDA = [
    "hola",
    "que tal",
    "q tal",
    "buenas"
]

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
        }
    }
    async eventRegisteredUser(msg){
        if (ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_BIENVENIDA)) {
            await this.eventWelcome(msg.from);
        }
    }
    async eventWelcome(chatID){
        //const logo = MessageMedia.fromUrl("https://images.crazygames.com/games/papas-pizzeria/cover-1628776612329.png?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop");
        /*await this.client.sendMessage(chatID, logo, {
            caption: "¡Hola!, Bienvenido a Papa's Pizzeria"
        });*/
        await this.client.sendMessage(chatID, "¡Hola!, Bienvenido a Papa's Pizzeria")
    }
    FormateoMensaje(mensaje) {
        return mensaje.toLowerCase();   
    }
}

export default flowMenu;