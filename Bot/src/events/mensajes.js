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
    "🛒 Aquí tienes nuestro menú principal:\n"+
    "Por favor elija una categoría:\n"+
    "(Digite una letra):\n"+
    "[ *A* ] Hamburguesas - $5.99\n"+
    "[ *B* ] Pizzas - $8.99\n"+
    "[ *C* ] Bebidas - $1.99\n"+
    "[ *D* ] Postres - $2.99\n"+
    "[ *E* ] Promociones",
    MENU_DESCRIPCION:
    "Tomate tu tiempo.\n"+
    "¿Deseas ordenar?\n"+
    "Para ordenar digita [ *2* ]",
    MENU_PROMOCION:
    "🚀 Promociones actuales:\n"+
    "- 10% de Descuento en pedidos mayores a $20\n"+
    "- 2x1 en pizzas todos los martes",
    MENU_UBICACION:
    "Atendemos todos los días de Lun - Vie de [ 10:00 A.M. - 8:00 P.M. ]\n"+
    "O si prefieres puedes visitarnos:",
    MENU_AGENTE:
    "Si deseas porte en contacto con nosotros puedes usar nuestra línea de servicio al cliente\n"+
    "Llame al siguiente número [ *02-2996-519* ]",
    MENU_PEDIDO:
    "Para realizar un pedido debe hacerlo con el siguiente formato:\n"+
    "Ejemplo: *Código: 1 - Cantidad: 1*"
}
//SIMULACION DE PRODUCTOS EN LA BASE DE DATOS
const productos = [
    { id: 1, nombre: 'Hamburguesa', precio: 5.99, stock: 10 },
    { id: 2, nombre: 'Pizza', precio: 8.99, stock: 5 },
    { id: 3, nombre: 'Papas Fritas', precio: 2.99, stock: 20 },
    { id: 4, nombre: 'Refresco', precio: 1.99, stock: 0 }
];
const pedidos = [
    { id: 1, estado: 'En preparación', productos: [{ id: 1, cantidad: 2 }, { id: 3, cantidad: 1 }] },
    { id: 2, estado: 'Listo para recoger', productos: [{ id: 2, cantidad: 1 }] },
    { id: 3, estado: 'Entregado', productos: [{ id: 4, cantidad: 3 }] },
    { id: 4, estado: 'Cancelado', productos: [{ id: 1, cantidad: 1 }, { id: 4, cantidad: 1 }] }
];
class flowMenu{

    constructor(client){
        this.client = client;
        this.order = {};
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
        }else if (ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENÚ_OPCIÓN_2)){
            await this.eventOrder(msg);
        }else if (ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENÚ_OPCIÓN_4)){
            await this.eventLocation(msg.from);
        }else if (ValidacionPalabras(this.FormateoMensaje(msg.body), PALABRAS_CLAVE_MENÚ_OPCIÓN_5)){
            await this.eventAgent(msg.from);
        }else if (msg.body.startsWith('Pedido:')){
            await this.eventBuscarPedido(msg.from, msg.body);
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
            await this.client.sendMessage(chatID, "Aqui tienes el menú de hamburguesas: ");
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_HAMBURGER.jpg");
            await this.client.sendMessage(chatID, imagen, {
                caption: OPCIONES_MENU.MENU_DESCRIPCION
            });            
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_A: " + error);   
        }
    }
    async eventMenuB(chatID){
        try {          
            await this.client.sendMessage(chatID, "Aqui tienes el menú de pizzas: ");           
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
            await this.client.sendMessage(chatID, "Aqui tienes el menú de bebidas: ");
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_DRINKS.jpg");
            await this.client.sendMessage(chatID, imagen, {
                caption: true
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_DESCRIPCION);
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_C: " + error);   
        }
    }
    async eventMenuD(chatID){
        try {        
            await this.client.sendMessage(chatID, "Aqui tienes el menú de postres: "); 
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_DESSERTS.jpg");
            await this.client.sendMessage(chatID, imagen, {
                caption: true
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_DESCRIPCION);
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_D: " + error);   
        }
    }
    async eventMenuE(chatID){
        try {         
            const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_PROMOTION.jpg");            
            await this.client.sendMessage(chatID, imagen, {
                caption: true
            });
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_PROMOCION);
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_DESCRIPCION);
        } catch (error) {
            console.log("ERROR_EVENTO_MENU_OPCION_E: " + error);   
        }
    }
    //TODO: EVENTO QUE SE DESPLIEGA CUANDO EL USUARIO QUIERE REALIZAR UN PEDIDO
    async eventOrder(msg){
        try {         
            await this.client.sendMessage(msg.from, OPCIONES_MENU.MENU_PEDIDO);
            if (this.order[msg.from]) {
                console.log(this.order);
                const pedido = this.order[msg.from];
                if (pedido.step === 1) {

                    mensaje = msg.body;
                    const regex = /Código:\s*(\d+)\s*-\s*Cantidad:\s*(\d+)/i;
                    const match = mensaje.match(regex);
                    console.log("match:"+ match);
                    if (!match) {
                        await this.client.sendMessage(msg.from, '❌ Formato incorrecto. Por favor usa el formato "Código: X - Cantidad: Y".');
                        return;
                    }
                    const productoID = parseInt(match[1]);
                    const cantidad = parseInt(match[2]);

                    if (isNaN(productoID) || isNaN(cantidad)) {
                        await this.client.sendMessage(chatID, '❌ Formato incorrecto. Por favor usa el formato "Código: X - Cantidad: Y".');
                        return;
                    }

                    const producto = productos.find(p => p.id === productoID);

                    if (!producto) {
                        await this.client.sendMessage(chatID, '❌ Producto no encontrado.');
                        return;
                    }

                    if (producto.stock >= cantidad) {
                        await this.client.sendMessage(chatID, `✅ ${producto.nombre} está disponible. Cantidad solicitada: ${cantidad}`);
                    } else {
                        await this.client.sendMessage(chatID, `❌ ${producto.nombre} no está disponible en la cantidad solicitada. Stock actual: ${producto.stock}`);
                    }

                    //REPARAR
                    pedido.code = productoID;
                    pedido.quantity = cantidad;
                    pedido.step = 2;
                    await this.client.sendMessage(msg.from, "Envie la dirección para la entrega:");
                  } else if (pedido.step === 2) {
                    pedido.estado = "En camino";
                    delete this.order[msg.from];
                    await this.client.sendMessage(msg.from, "Pedido en camino");            
                  }
                return;
            }            
        } catch (error) {
            console.log("ERROR_EVENTO_PEDIDO: " + error);   
        }
    }
    //EVENTO QUE SE DESPLIEGA CUANDO EL USUARIO QUIERE VERIFICAR SUS PEDIDOS REALIZDOS
    async eventConsult(chatID){
        try {         
            await this.client.sendMessage(chatID, "Para ver su pedido digite: Pedido:[Código pedido]");
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
    //EVENTO DE AYUDA QUE APARECE CUANDO EL MENSAJE DEL USUARIO NO COINCIDE CON LAS OPCIONES
    async eventHelp(chatID){
        try {         
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_AYUDA);
            await this.client.sendMessage(chatID, OPCIONES_MENU.MENU_OPCIONES);
        } catch (error) {
            console.log("ERROR_EVENTO_AYUDA: " + error);   
        }
    }
    //EVENTO PARA BUSCAR PEDIDO
    async eventBuscarPedido(chatID, mensaje){
        try {                    
            const regex = /Pedido:\s*(\d+)/i;
            const match = mensaje.match(regex);

            if (!match) {
                await client.sendMessage(chatID, '❌ Formato incorrecto. Por favor usa el formato "Pedido: X".');
                return;
            }

            const pedidoID = parseInt(match[1]);

            if (isNaN(pedidoID)) {
                await client.sendMessage(chatID, '❌ Formato incorrecto. Por favor usa el formato "Pedido: X".');
                return;
            }
            await eventEstado(chatID, pedidoID);
            } catch (error) {
                console.log("ERROR_EVENTO_BUSCAR_PEDIDO: " + error);   
            }
    }
    async eventEstado(chatID, pedidoID){
        const pedido = pedidos.find(p => p.id === pedidoID);

        if (!pedido) {
            await client.sendMessage(chatID, '❌ Pedido no encontrado.');
            return;
        }

        let mensaje = `🔍 El estado de tu pedido (Código: ${pedidoID}) es: ${pedido.estado}\n`;
        mensaje += 'Productos ordenados:\n';

        pedido.productos.forEach(item => {
            const producto = productos.find(p => p.id === item.id);
            if (producto) {
                mensaje += `- ${producto.nombre}: ${item.cantidad}\n`;
            }
        });
    }
    //MÉTODO QUE CAMBIA EL FORMATO DE LOS MENSAJES A MINÚSCULAS
    FormateoMensaje(mensaje) {
        return mensaje.toLowerCase();   
    }    

}

export default flowMenu;