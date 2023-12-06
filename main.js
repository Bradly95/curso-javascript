/*
*********
Este progrma es un simulador de app del tiempo, 
tiene un grupo de ciudades, el usuario selecciona una
y la app le muestra el estado del tiempo actual en esa ciudad.
*********
*/

const ciudades = ['California', 'Tokyo', 'Angola'];

const climaCalifornia = [23,23,57,2.57,true]; // porciento_nubes - temp - humedad - viento - es_de_dia?
const climaTokyo = [75,20,42,3,false];
const climaAngola = [50,32,24,1.52,true];

const climas = [climaCalifornia, climaTokyo, climaAngola];

alert('¡Hola! \nEste sistema permite monitorear el estado del tiempo de algunas ciudades del mundo');



//funcion para tomar los datos del clima y redactar una respuesta humanizada
const redactaRespuesta = (clima, ciudad)=>{
    
    let respuesta = 'Está haciendo ';

    if(clima[4]){
        respuesta += "un día";
        if(clima[0]<40){
            respuesta += ` soleado en ${ciudad}.\n`;
        }else if(clima[0]>=40 && clima[0]<75){
            respuesta += ` parcialmente nublado en ${ciudad}.\n`;
        }else{
            respuesta += ` nublado en ${ciudad}, mejor lleva tu paraguas, habrá tormenta.\n`;
        }
    }else{
        respuesta += "una noche";
        if(clima[0]<40){
            respuesta += ` despejada en ${ciudad}.\n`;
        }else if(clima[0]>=40 && clima[0]<75){
            respuesta += ` parcialmente nublada en ${ciudad}.\n`;
        }else{
            respuesta += ` nublada en ${ciudad}, mejor lleva tu paraguas, habrá tormenta.\n`;
        }
    }

    respuesta += `\nLa temperatura es de ${clima[1]}℃. \nHay una humedad relativa de ${clima[2]}%. \nLa velocidad del viento es ${clima[3]}m/s.`;

    return respuesta;
}

// funcion para gestionar la respuesta al user - y para tener las 3 funciones que pedía la consigna :)
const imprimir = (ciudadSeleccionada)=>{
    const pedirNuevamente = confirm(`${redactaRespuesta(climas[ciudadSeleccionada-1],ciudades[ciudadSeleccionada-1])} \n\nSi deseas ver el estado de otra ciudad presiona aceptar`);
    if(pedirNuevamente){
        pideCiudad();
    }
}

// funcion para pedir al user una ciudad, validar la entrada y llamar al procesamiento
const pideCiudad = ()=>{
    ciudadesDisponibles = '';
    ciudades.forEach((ciudad,index)=>{
        ciudadesDisponibles+=`(${index+1})${ciudad}`;
        if(index+1!==ciudades.length){
            ciudadesDisponibles+=' - ';
        }
    })
    const ciudadSeleccionada = parseInt(prompt(`Las ciudades disponibles son: ${ciudadesDisponibles}. \nEscribe el número correspondiente para ver el estado del tiempo`));
    if(ciudadSeleccionada>ciudades.length || isNaN(ciudadSeleccionada)){
        alert('Inserta un número válido');
        pideCiudad();
    }else{
        imprimir(ciudadSeleccionada);
    }
    
}
pideCiudad();
