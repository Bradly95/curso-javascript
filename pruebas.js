// bloque de código en el que estoy haciendp pruebas para futuras entregas/proyecto final

/*
let clima;

const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=dubai';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7588943f91mshfba75f4a66675d4p1457c3jsnfdb97fb1f436',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.json();
	clima  = await result;
} catch (error) {
	console.error(error);
}

// Convertir el timestamp que viene de la respuesta a una fecha
const horaSunrise = new Date(clima.sunrise * 1000); // Multiplicamos por 1000 para obtener milisegundos
const horaSunset = new Date(clima.sunset * 1000);

const extractorHora = new Intl.DateTimeFormat('es-US', {
  hour: 'numeric',
  hour12: false,
});

const horaLocal = new Date();

console.log('dubai in:', extractorHora.format(horaSunrise));
console.log('dubai out:', extractorHora.format(horaSunset));
console.log('mi hora:', extractorHora.format(horaLocal));
*/