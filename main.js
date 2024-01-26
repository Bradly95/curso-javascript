/*
*********
Este progrma es un simulador de app del tiempo, 
tiene un grupo de ciudades, el usuario selecciona una
y la app le muestra el estado del tiempo actual en esa ciudad.
*********
*/

import { weatherFetcher } from "./fetcher.js";

swal({
    title: "Bienvenid@ a la entrega final",
    text: "Gracias por calificarme",
    icon: "info",
    button: "Estoy list@ para evaluarte",
  });

// objeto que simula la respuesta del servidor de weather
const citiesDatabase = ['Londres','Nueva York','Tokio','Sidney','Moscu','Luanda','El Cairo'];

//Genera la clase CSS segun los datos del clima para mostrar una animacion svg distinta, y 
//genera una descipcion humanizada del estado del tiempo
const generateClassAndDescription = (cityWeather) => {

    let classToAdd = '';
    let description = '';

    if (cityWeather.isDaytime) {
        classToAdd = 'dia';
        description += 'Día';
        if (cityWeather.clouds < 40) {
            classToAdd += '-0';
            description += ' Soleado';
        } else if (cityWeather.clouds >= 40 && cityWeather.clouds < 75) {
            classToAdd += '-50';
            description += ' Parcialmente Nublado';
        } else {
            classToAdd += '-100';
            description += ' Nublado';
        }
    } else {
        classToAdd += 'noche';
        description += 'Noche';
        if (cityWeather.clouds < 40) {
            classToAdd += '-0';
            description += ' Despejada';
        } else if (cityWeather.clouds >= 40 && cityWeather.clouds < 75) {
            classToAdd += '-50';
            description += ' Parcialmente Nublada';
        } else {
            classToAdd += '-100';
            description += ' Nublada';
        }
    }

    return ({
        class: classToAdd,
        description: description
    });
}

//Mostrar datos en UI de una ciudad seleccionada
const mainContainer = document.querySelector('main');
const frontCityName = document.querySelector('#front-city-name');
const dayDescription = document.querySelector('#day-description');
const tempText = document.querySelector('#temperature-text');
const humiText = document.querySelector('#humidity-text');
const windText = document.querySelector('#wind-text');
const errorFetch = document.querySelector('#fetch-error');
const displayData = (cityWeather) => {
    if(!cityWeather){ // en caso de que no se pueda hacer el fetch mostrar el error sin romper el sistema.
        errorFetch.style.display='flex';
    }else{
        errorFetch.style.display='none';
        const classAndDescription = generateClassAndDescription(cityWeather);
        mainContainer.className = classAndDescription.class;
        frontCityName.innerText = cityWeather.cityName;
        dayDescription.innerText = classAndDescription.description;
        tempText.innerText = cityWeather.temperature;
        humiText.innerText = cityWeather.humidity;
        windText.innerText = cityWeather.wind;
    }
}

// Guardar Favoritos
let favoriteCities = [];
if (localStorage.getItem('favoriteCities') !== null) { //se cargan los favoritos en caso de que existan
    favoriteCities = Array.from(localStorage.getItem('favoriteCities').split(','));
}
const setFavorite = (cityName, favoriteToggle) => {
    favoriteToggle.classList.toggle('selected');
    if (favoriteToggle.classList.contains('selected')) {
        let cityAlreadyExists = false;
        favoriteCities.forEach(c => {
            if (cityName === c) {
                cityAlreadyExists = true;
            }
        });
        if (!cityAlreadyExists) {
            if (favoriteCities[0] === '' || favoriteCities.length === 0) {
                favoriteCities[0] = cityName;
            } else {
                favoriteCities.push(cityName);
            }
            localStorage.setItem('favoriteCities', favoriteCities);
            displayFavorites();
            displayActiveShorcut();
        };
    } else {
        const favoriteArray = Array.from(localStorage.getItem('favoriteCities').split(',')); // creo un array de las ciudades guardadas en LS separando el string en las ','
        const newFavoriteArray = favoriteArray.filter((savedCity) => savedCity !== cityName);
        localStorage.setItem('favoriteCities', newFavoriteArray);
        favoriteCities = newFavoriteArray;
        const existingCircles = document.querySelectorAll('.saved-city-circle');
        existingCircles.forEach(circle => {
            if (circle.innerText === `${cityName[0]}${cityName[1].toUpperCase()}`) {
                circle.remove();
            }
        })
    }
}

//Mostrar el acceso directo activo
const displayActiveShorcut = () => {
    const accesosDirectos = Array.from(document.getElementsByClassName('saved-city-circle'));
    const listItems = Array.from(document.getElementsByClassName('text-name'));
    if (accesosDirectos.length > 0) {
        accesosDirectos.forEach(accesoDirecto => {
            listItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    const cityName = item.getElementsByTagName('p')[0];
                    if (accesoDirecto.innerText === `${cityName.innerText[0]}${cityName.innerText[1].toUpperCase()}`) {
                        accesoDirecto.classList.add('selected');
                    } else {
                        accesoDirecto.classList.remove('selected');
                    }
                }
            })
        });
    };
}

//Seleccionar ciudad de la lista y llamar a Mostrar Datos en UI
const selectCity = async (cityName, listItem) => {
    const listItems = document.querySelectorAll('.text-name');
    listItems.forEach(element => {
        element.classList.remove('selected');
    })
    listItem.classList.add('selected');
    displayActiveShorcut();
    optionsCard.animate([
        { transform: 'translateX(0)', opacity: '1', offset: 0 },
        { transform: 'translateX(100%)', opacity: '0.3', offset: 1 }
    ], 300);
    setTimeout(() => {
        optionsCard.style.display = 'none';
    }, 280);
    optionsAreActive = false;
    displayData(await weatherFetcher(cityName));
}

//Crea la lista de ciudades disponibles y les asigna el eventListener correspondiente
const listContainer = document.querySelector('.list-container');
const generateCityList = () => {
    citiesDatabase.forEach((i) => {
        const newListItem = document.createElement('div');
        newListItem.className = 'city-item';
        newListItem.innerHTML = `
            <div class="text-name">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <g clip-path="url(#clip0_14_318)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.1145 8.0924C34.5597 8.53778 34.8098 9.14176 34.8098 9.77152C34.8098 10.4013 34.5597 11.0053 34.1145 11.4506L16.313 29.2521C16.0778 29.4874 15.7985 29.674 15.4911 29.8014C15.1837 29.9287 14.8542 29.9943 14.5215 29.9943C14.1888 29.9943 13.8593 29.9287 13.5519 29.8014C13.2445 29.674 12.9652 29.4874 12.73 29.2521L3.88546 20.4091C3.65862 20.1901 3.47769 19.928 3.35322 19.6382C3.22875 19.3485 3.16323 19.0368 3.16049 18.7215C3.15775 18.4061 3.21784 18.0934 3.33726 17.8015C3.45668 17.5096 3.63303 17.2445 3.85602 17.0215C4.07902 16.7985 4.34419 16.6221 4.63607 16.5027C4.92795 16.3833 5.24069 16.3232 5.55604 16.3259C5.87139 16.3287 6.18304 16.3942 6.4728 16.5187C6.76256 16.6431 7.02462 16.8241 7.24371 17.0509L14.5207 24.3279L30.7546 8.0924C30.9752 7.8717 31.2371 7.69662 31.5253 7.57717C31.8136 7.45772 32.1225 7.39624 32.4345 7.39624C32.7466 7.39624 33.0555 7.45772 33.3438 7.57717C33.632 7.69662 33.8939 7.8717 34.1145 8.0924Z" fill="#4C75DC"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_14_318">
                        <rect width="38" height="38" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <p>${i}</p>
            </div>
            <div class="favorite-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M10.2039 5.21063C11.8932 2.18129 12.7372 0.666626 13.9999 0.666626C15.2626 0.666626 16.1066 2.18129 17.7959 5.21063L18.2332 5.99463C18.7132 6.85596 18.9532 7.28663 19.3266 7.57063C19.6999 7.85463 20.1666 7.95996 21.0999 8.17063L21.9479 8.36263C25.2279 9.10529 26.8666 9.47596 27.2572 10.7306C27.6466 11.984 26.5292 13.292 24.2932 15.9066L23.7146 16.5826C23.0799 17.3253 22.7612 17.6973 22.6186 18.156C22.4759 18.616 22.5239 19.112 22.6199 20.1026L22.7079 21.0053C23.0452 24.4946 23.2146 26.2386 22.1932 27.0133C21.1719 27.7893 19.6359 27.0813 16.5666 25.668L15.7706 25.3026C14.8986 24.9 14.4626 24.7 13.9999 24.7C13.5372 24.7 13.1012 24.9 12.2279 25.3026L11.4346 25.668C8.36391 27.0813 6.82791 27.788 5.80791 27.0146C4.78524 26.2386 4.95457 24.4946 5.29191 21.0053L5.37991 20.104C5.47591 19.112 5.52391 18.616 5.37991 18.1573C5.23857 17.6973 4.91991 17.3253 4.28524 16.584L3.70657 15.9066C1.47057 13.2933 0.35324 11.9853 0.742573 10.7306C1.13324 9.47596 2.77324 9.10396 6.05324 8.36263L6.90124 8.17063C7.83324 7.95996 8.29857 7.85463 8.67324 7.57063C9.04657 7.28663 9.28657 6.85596 9.76657 5.99463L10.2039 5.21063Z" fill="white"/>
                </svg>
            </div>`;
        listContainer.append(newListItem);
        const textName = newListItem.getElementsByClassName('text-name')[0];
        textName.addEventListener('click', () => selectCity(i, textName)); // eventListener para que la ciudad sea seleccionable
        const favoriteToggle = newListItem.getElementsByClassName('favorite-toggle')[0];
        favoriteToggle.addEventListener('click', () => setFavorite(textName.innerText, favoriteToggle)) // eventListener para marcar la ciudad como favorita
    })
}
generateCityList();

//Mostrar favoritos
const displayFavorites = () => {
    const cityNames = document.querySelectorAll('.text-name>p');
    const stars = document.querySelectorAll('.favorite-toggle');
    const favoritesHeaderContainer = document.querySelector('.saved-cities');
    favoriteCities.forEach(city => {
        cityNames.forEach((cityName, index) => {
            if (city === cityName.innerText) {
                if (!stars[index].classList.contains('selected')) {
                    stars[index].classList.add('selected');
                }
                const existingCircles = document.querySelectorAll('.saved-city-circle');
                let circleAlreadyExists = false;
                existingCircles.forEach(circle => {
                    if (circle.innerText === `${cityName.innerText[0]}${cityName.innerText[1].toUpperCase()}`) {
                        circleAlreadyExists = true;
                    }
                })
                if (!circleAlreadyExists) {
                    const shortcut = document.createElement('p');
                    shortcut.innerText = `${cityName.innerText[0]}${cityName.innerText[1]}`;
                    favoritesHeaderContainer.appendChild(shortcut);
                    shortcut.className = 'saved-city-circle';
                    let cityInfoToDisplay;
                    citiesDatabase.forEach(city => { // busco los datos que le corresponden a este acceso directo
                        if (city === cityName.innerText) {
                            cityInfoToDisplay = city;
                        }
                    })
                    // busco el listItem que debe mostrarse seleccionado
                    let listItemToSelect;
                    const citiesList = Array.from(document.getElementsByClassName('text-name'));
                    citiesList.forEach(item => {
                        const innerP = item.getElementsByTagName('p')[0];
                        if (innerP.innerText === cityName.innerText) {
                            listItemToSelect = item;
                        }
                    })
                    shortcut.addEventListener('click', () => selectCity(cityInfoToDisplay, listItemToSelect)); // eventListener para que la ciudad sea seleccionable
                }
            }
        })
    })
}
displayFavorites();

// Muestra/Oculta la lista de ciudades disponibles
const switcher = document.querySelector('#city-selector');
const optionsCard = document.querySelector('.options');
let optionsAreActive = false;
let hideCard;
const switchCard = () => {
    if (optionsAreActive) {
        optionsCard.animate([
            { transform: 'translateX(0)', opacity: '1', offset: 0 },
            { transform: 'translateX(100%)', opacity: '0.3', offset: 1 }
        ], 300);
        hideCard = setTimeout(() => {
            optionsCard.style.display = 'none';
        }, 280);
        optionsAreActive = false;
    } else {
        clearTimeout(hideCard);
        optionsCard.style.display = 'block';
        optionsCard.animate([
            { transform: 'translateX(100%)', opacity: '0.3', offset: 0 },
            { transform: 'translateX(0)', opacity: '1', offset: 1 }
        ], 300)
        optionsAreActive = true;
    }
}
switcher.addEventListener('click', switchCard);


// Por defecto muestra el clima de la primera ciudad de la lista
selectCity(citiesDatabase[0], document.querySelector('.text-name'));
displayActiveShorcut();