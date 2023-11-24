const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=california';
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
	console.log(result);
} catch (error) {
	console.error(error);
}