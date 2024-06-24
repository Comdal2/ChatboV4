import pkg from "whatsapp-web.js";
import schedule from "node-schedule";

const { MessageMedia } = pkg;

const MENSAJES_AUTOMATICOS = {
    MENSAJE_PROMOCION: "- PROMOCIÓN -\n"+
    "Aproveche nuestra promoción especial solo por hoy.",
    MENSJAE_PAGO: "- Recordatorio -\n"+
    "Le recordamos que debe acercase a canselar su consumo por $20\n"+
    "Esperamos tenga un buen día"
}


class flowAutomatico{
    constructor(client){
        this.client = client;

        this.auto = [
            {message: MENSAJES_AUTOMATICOS.MENSAJE_PROMOCION, time: "35 10 * * *"}
        ];
        this.autoPago = [
            {message: MENSAJES_AUTOMATICOS.MENSJAE_PAGO, time: "35 10 * * *"}
        ];
        this.dir = [
            "593984990218@c.us"
        ];
        this.deudor = [
            "593995547555@c.us"
        ];
        this.initialize();
    }
    initialize() {
        this.eventRecordatorio(); 
        this.evenPromotion(); 
      }
            
      evenPromotion() {
        this.auto.forEach((promo) => {
          schedule.scheduleJob(promo.time, () => {
            this.eventPromotionMensaje(promo.message);
          });
        });
      }
      evenPago() {
        this.autoPago.forEach((pago) => {
          schedule.scheduleJob(pago.time, () => {
            this.eventDeudaMensaje(pago.message);
          });
        });
      }
      
      async eventPromotionMensaje(message) {
        try {
          for (const phone of this.deudor) {
            await this.eventEnvioPromo(phone, message);
            await this.delay(10000); 
          }
        } catch (error) {
          console.error("Error al enviar mensajes de promoción:", error);
        }
      }
    
      async eventEnvioPromo(to, message) {
        const imagen = MessageMedia.fromFilePath("./assets/images/IMG_MENU_PROMOTION.jpg");
        await this.client.sendMessage(to, imagen, { caption: message });
      }
    
      delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    
      async eventDeudaMensaje() {
        try {
            for (const phone of this.deu) {
              await this.eventEnvioPromo(phone, message);
              await this.delay(10000); 
            }
          } catch (error) {
            console.error("Error al enviar mensajes de promoción:", error);
          }
      }
}
export default flowAutomatico;
