const weatherFetcher = async (cityName) => {
    let weatherFromFetch = {};

    const prepareResponse = () => {

        let weatherToReturn ={};
        weatherToReturn.cityName = cityName;
        weatherToReturn.clouds = weatherFromFetch.cloud_pct;
        weatherToReturn.humidity = weatherFromFetch.humidity;
        weatherToReturn.temperature = weatherFromFetch.temp;
        weatherToReturn.wind = weatherFromFetch.wind_speed;

        // Convertir el timestamp que viene de la respuesta a una fecha
        const sunriseHour = new Date(weatherFromFetch.sunrise * 1000); // Multiplicamos por 1000 para obtener milisegundos
        const sunsetHour = new Date(weatherFromFetch.sunset * 1000);

        const hourExtractor = new Intl.DateTimeFormat('es-US', {
            hour: 'numeric',
            hour12: false,
        });

        const localDate = new Date();

        const citySunrise = hourExtractor.format(sunriseHour);
        const citySunset = hourExtractor.format(sunsetHour);
        const localTime = hourExtractor.format(localDate);

        // determinar si es de dia o de noche en la ciudad seleccionada
        if (citySunrise > citySunset) {
            if (localTime > citySunrise && localTime > citySunset || localTime < citySunrise && localTime < citySunset) {
                weatherToReturn.isDaytime = true;
            } else {
                weatherToReturn.isDaytime = false;
            }
        } else {
            if (localTime > citySunrise && localTime < citySunset) {
                weatherToReturn.isDaytime = true;
            } else {
                weatherToReturn.isDaytime = false;
            }
        };

        return weatherToReturn;
    };

    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7588943f91mshfba75f4a66675d4p1457c3jsnfdb97fb1f436',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        weatherFromFetch = await response.json();
        return prepareResponse();
    } catch (error) {
        swal({
            title: "Conexión fallida",
            text: "Reintenta más tarde",
            icon: "error",
            button: "Entiendo",
          });
    }
}

export {weatherFetcher};