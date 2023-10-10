const cityElement = document.querySelector('.js-city-input');
const btnElement = document.querySelector('.js-get-weather-btn');
const errorElement = document.querySelector('.js-error');
const iconElement = document.querySelector('.js-forcast-icon');
const tempElement = document.querySelector('.js-temp');
const descriptionElement = document.querySelector('.js-description');
const detailsElement = document.querySelector('.js-details');
const cityNameElement = document.querySelector('.js-city-name');
const loadingMessageElement = document.querySelector('.js-loading-message');

const url = 'https://api.api-ninjas.com/v1/weather?city=';

const options = {
  headers : {
    'X-Api-Key': 'JBxpNkHM50xBAfDb8OJU7w==fNWNEOqY5Jlou1yc',
    'accept': 'application/json'
  }
}

btnElement.addEventListener('click', () => {
  clearPreviousData();
  renderWeather();
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    clearPreviousData();
    renderWeather();
  }
});

async function getWeather(city) {
  
  try {

    loadingMessageElement.innerHTML = 'Getting the data...';

    const response = await fetch(url + city, options);
    const data = await response.json();

    if (response.ok) {

      cityNameElement.innerHTML = city;
      filterWeather(data);
      cityElement.value = '';

      // ERROR HANDLING

    } else if (response.status === 400) {

      iconElement.innerHTML = `<img src="./icons/nodata-svgrepo-com.svg" alt="Weather icon">`;
      errorElement.innerHTML = `The city name doesn't look quite right! Make sure the spelling is correct.`;

    } else if (response.status === 404) {

      iconElement.innerHTML = `<img src="./icons/nodata-svgrepo-com.svg" alt="Weather icon">`;
      errorElement.innerHTML = `Sorry! We couldn't find ${city}.`;

    } else if (response.status === 503) {

      errorElement.innerHTML = `Sorry! The server is down at the moment. Please try again later.`;

    }

  } catch (error) {

    errorElement.innerHTML = 'Oops! something went wrong, Please try again later.';

  } finally {

    loadingMessageElement.innerHTML = '';
    
  }
}

// SELECT AND IMPORT THE NEEDED DATA TO HTML FILE

function filterWeather(data) {
  
  // CLOUDINESS DECLARATION

  if (data.cloud_pct <= 10) {

    iconElement.innerHTML = `<img src="./icons/sunny-svgrepo-com.svg" alt="Weather icon">`;
    descriptionElement.innerHTML = 'Sunny';

  } else if (data.cloud_pct <= 30) {

    iconElement.innerHTML = `<img src="./icons/lightcloud-svgrepo-com.svg" alt="Weather icon">`;
    descriptionElement.innerHTML = 'Light cloud';
    
  } else if (data.cloud_pct <= 80 && data.cloud_pct > 30) {

    iconElement.innerHTML = `<img src="./icons/partlycloud-svgrepo-com.svg" alt="Weather icon">`;
    descriptionElement.innerHTML = 'Partly cloudy';
    
  } else if (data.cloud_pct > 80) {

    iconElement.innerHTML = `<img src="./icons/cloud-svgrepo-com.svg" alt="Weather icon">`;
    descriptionElement.innerHTML = 'cloudy';

  }

  // TEMP

  tempElement.innerHTML = `${data.temp}&deg;C`;

  // DETAILS

  detailsElement.innerHTML =
  `<div>Feels like: ${data.feels_like}&deg;C</div>
  <div>Humidity: ${data.humidity}&#37;</div>
  <div>Wind speed: ${data.wind_speed} m/s</div>`;

}

// IF THERE'S A CITY INPUT SEND REQUEST

function renderWeather() {
  const city = cityElement.value;
  city ? getWeather(city) : showNoInputError();
}

function showNoInputError() {
  iconElement.innerHTML = `<img src="./icons/nodata-svgrepo-com.svg" alt="Weather icon">`;
  errorElement.innerHTML = 'Please enter a city!';
}

function clearPreviousData() {
  
  cityNameElement.innerHTML = '';
  iconElement.innerHTML = '';
  tempElement.innerHTML = '';
  descriptionElement.innerHTML = '';
  errorElement.innerHTML = '';
  detailsElement.innerHTML = '';

}

