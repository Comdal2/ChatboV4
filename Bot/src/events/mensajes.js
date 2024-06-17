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
    "buenas",
    "ola"
]
const PALABRAS_CLAVE_MENU = {
    MENU_OPCION_1: [
        "a",
        "hamburguesa",
        "hamburguesas"
    ],
    MENU_OPCION_2: [
        "b",
        "pizza",
        "pizzas"
    ],
    MENU_OPCION_3: [
        "c",
        "bebida",
        "bebidas"
    ],
    MENU_OPCION_4: [
        "d",
        "postre",
        "postres"
    ],
    MENU_OPCION_5: [
        "e",
        "promocion",
        "promociones"
    ]
}
const OPCIONES_MENU = {
    MENU_BIENVENIDA:
    "¡Hola!👋, Bienvenido a Papa's Pizzeria.",
    MENU_PRINCIPAL:
    "Soy su asistente virtual.\n"+
    "¿En qué puedo ayudarle hoy?",
    MENU_OPCIONES: 
    "Aquí tiene algunas opciones.\n"+
    "(Digite la opción):\n"+
    "[ *1* ] Ver el menú 🍕🍔\n"+
    "[ *2* ] Hacer un pedido 😋\n"+
    "[ *3* ] Consultar estado de mi pedido 🧾\n"+
    "[ *4* ] Ubicaciones y horarios 🌎⏰\n"+
    "[ *5* ] hablar con un agente 💬",
    MENU_AYUDA:
    "¿Necesitas ayuda?",
    MENU_SUBMENU_OPCION_1:
    "Aquí tienes nuestro menú principal:\n"+
    "Por favor elija una categoría:\n"+
    "(Digite una letra):\n"+
    "[ *A* ] Hamburguesas\n"+
    "[ *B* ] Pizzas\n"+
    "[ *C* ] Bebidas\n"+
    "[ *D* ] Postres\n"+
    "[ *E* ] Promociones",
    MENU_DESCRIPCION:
    "Aqui tienes el menú, tomate tu tiempo.\n"+
    "¿Deseas ordenar?\n"+
    "Para ordenar digita [ *2* ]",
    MENU_UBICACION:
    "Atendemos todos los días de Lun - Vie de [ 10:00 A.M. - 8:00P.M. ]\n"+
    "O si prefieres puedes visitarnos:",
    MENU_AGENTE:
    "Si deseas porte en contacto con nosotros puedes usar nuestra línea de servicio al cliente\n"+
    "Llame al siguiente número [ *02-2996-519* ]"
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
        }
    }

    async eventRegisteredUser(msg){
        if (ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_BIENVENIDA)) {
            await this.eventWelcome(msg.from);
        }else if(ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENÚ_OPCIÓN_1)){
            await this.eventMenú(msg.from);
        }else if(ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENU.MENU_OPCION_1)){
            await this.eventMenuA(msg.from);
        }else if(ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENU.MENU_OPCION_2)){
            await this.eventMenuB(msg.from);
        }else if(ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENU.MENU_OPCION_3)){
            await this.eventMenuC(msg.from);
        }else if(ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENU.MENU_OPCION_4)){
            await this.eventMenuD(msg.from);
        }else if(ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENU.MENU_OPCION_5)){
            await this.eventMenuE(msg.from);
        } else {
            await this.eventHelp(msg.from);
        }
    }
    //EVENTO QUE SUCEDE CUANDO SE SALUDA Y DESPLIEGA LAS OPCIONES
    async eventWelcome(chatID){
        try {         
            const logo = MessageMedia.fromFilePath("./assets/images/IMG_MENU_LOGO.jpg");
            await this.client.sendMessage(chatID, logo, {
                caption: OPCIONES_MENU.MENU_BIENVENIDA
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_PRINCIPAL);
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_OPCIONES);
        } catch (error) {
            console.log("ERROR_EVENTO_BIENVENIDA: " + error);   
        }
    }
    //EVENTO QUE DESPLIEGA UN MENSAJE CON UN SUBMENÚ PARA LA OPCION 1
    async eventMenú(chatID){
        try {         
            const menu = MessageMedia.fromFilePath("./assets/images/IMG_MENU_MENÚ.jpg");
            await this.client.sendMessage(chatID, menu, {
                caption: OPCIONES_MENU.MENU_SUBMENU_OPCION_1
            });
        } catch (error) {
            console.log("ERROR_EVENTO_MENÚ: " + error);   
        }
    }
    //EVENTOS QUE ENVIAN LOS DIFERENTES MENÚS DISPONIBLES
    async eventMenuA(chatID){
        try {         
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_HAMBURGER.jpg");
            await this.client.sendMessage(chatID, imagen, {
                capture: OPCIONES_MENU.MENU_DESCRIPCION
            });            
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_A: " + error);   
        }
    }
    async eventMenuB(chatID){
        try {                     
            const pdf = MessageMedia.fromFilePath("./assets/documents/DOC_PIZZAS.pdf");
            await this.client.sendMessage(chatID, pdf, {
                sendMediaAsDocument: true
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_DESCRIPCION);
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_B: " + error);   
        }
    }
    async eventMenuC(chatID){
        try {         
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_DRINKS.jpg");
            await this.client.sendMessage(chatID, imagen, {
                capture: true
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_DESCRIPCION);
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_C: " + error);   
        }
    }
    async eventMenuD(chatID){
        try {         
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_DESSERTS.jpg");
            await this.client.sendMessage(chatID, pdf, {
                capture: true
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_DESCRIPCION);
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_D: " + error);   
        }
    }
    async eventMenuE(chatID){
        try {         
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_PROMOTION.jpg");
            await this.client.sendMessage(chatID, pdf, {
                capture: true
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_DESCRIPCION);
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_E: " + error);   
        }
    }
    //TODO: EVENTO QUE SE DESPLIEGA CUANDO EL USUARIO QUIERE REALIZAR UN PEDIDO
    async eventOrder(chatID){
        try {         
            
        } catch (error) {
            console.log("ERROR_EVENTO_PEDIDO: " + error);   
        }
    }
    //TODO: EVENTO QUE SE DESPLIEGA CUANDO EL USUARIO QUIERE VERIFICAR SUS PEDIDOS REALIZDOS
    async eventConsult(chatID){
        try {         
            
        } catch (error) {
            console.log("ERROR_EVENTO_CONSULTA: " + error);   
        }
    }
    //EVENTO QUE SE DESPLIEGA CUANDO EL USUARIO QUIERE VER LA UBICACION DEL LOCAL Y SUS HORARIOS
    async eventLocation(chatID){
        try {         
            const location = new Location(-1.2693696, -78.648095, {
                url: "https://www.google.com/maps/place/Universidad+T%C3%A9cnica+de+Ambato/@-1.2693696,-78.648095,14z/data=!4m10!1m2!2m1!1suniversidad+tecnica+de+ambato!3m6!1s0x91d38225e088295f:0xb16c26da66e6e4b3!8m2!3d-1.2693706!4d-78.6259616!15sCh11bml2ZXJzaWRhZCB0ZWNuaWNhIGRlIGFtYmF0b5IBCnVuaXZlcnNpdHngAQA!16s%2Fm%2F0cpbjgr?entry=ttu",
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_UBICACION);
            await this.client.sendMessage(chatID, location);
        } catch (error) {
            console.log("ERROR_EVENTO_UBICACIÓN: " + error);   
        }
    }
    //EVENTO QUE SE DESPLIEGA CUANDO EL USUARIO QUIERE HABLAR CON UNA PERSONA (agent)
    async eventAgent(chatID){
        try {         
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_AGENTE);
        } catch (error) {
            console.log("ERROR_EVENTO_AGENTE: " + error);   
        }
    }
    //EVENTO DE AYUDA QUE APARECE CUANDO EL MENSAJE DEL NO COINCIDE CON LAS OPCIONES
    async eventHelp(chatID){
        try {         
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_AYUDA);
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_OPCIONES);
        } catch (error) {
            console.log("ERROR_EVENTO_AYUDA: " + error);   
        }
    }
    //MÉTODO QUE CAMBIA EL FORMATO DE LOS MENSAJES A MINÚSCULAS
    FormateoMensaje(mensaje) {
        return mensaje.toLowerCase();   
    }
}

export default flowMenu;