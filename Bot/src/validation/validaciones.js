function ValidacionPalabras(palabraEnviada, palabrasClave) {
    return palabrasClave.some((clave) => palabraEnviada.includes(clave));
}