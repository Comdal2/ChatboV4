import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import flowMenu from "./events/mensajes.js"
import flowAutomatico from "./events/mensajesAuto.js";

const { Client, LocalAuth } = pkg;

const client = new Client({
    authStrategy: new LocalAuth({
      dataPath: "sessions",
    }),
    webVersionCache: {
      type: "remote",
      remotePath: 'https://raw.githubusercontent.com/guigo613/alternative-wa-version/main/html/2.2412.54v2.html',
    },
  });

client.on('ready', () => {
    console.log('Conexión Exitosa'); 

});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    new flowMenu(client);
    new flowAutomatico(client);
});

client.initialize().catch((err) => {
    console.error("ERROR_INICIO_DE_CLIENTE: ", err);
  });

