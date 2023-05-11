import './style.css';
import { getForecastFromLocationString } from './weatherAPI';
import { displayError, displayForecast } from './pageBuilder';

// Default forecast location
const defaultLocation = 'New York City';
// Default forecast length
const forecastLength = 7;

// Global Variables with state characteristics
let isDegF = true;
let location = defaultLocation;
let forecastData = {};

async function getAndShowForecast() {
  try {
    forecastData = await getForecastFromLocationString(location, forecastLength);
    displayForecast(forecastData, isDegF);
  } catch (err) {
    displayError(err);
  }
}

const showLocalForecast = (pos) => {
  location = `${pos.coords.latitude}, ${pos.coords.longitude}`;
  getAndShowForecast();
};

const showDefaultForecast = () => {
  location = defaultLocation;
  getAndShowForecast();
};

const initForm = () => {
  document.getElementById('location-search-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    if (document.getElementById('location-text').value) {
      location = document.getElementById('location-text').value;
      getAndShowForecast();
      document.getElementById('location-text').value = '';
    }
  });
};

const initCheckbox = () => {
  document.getElementById('units-toggle').addEventListener('change', () => {
    if (document.getElementById('units-toggle').checked) {
      isDegF = false;
      displayForecast(forecastData, isDegF);
    } else {
      isDegF = true;
      displayForecast(forecastData, isDegF);
    }
  });
};

initForm();
initCheckbox();
navigator.geolocation.getCurrentPosition(showLocalForecast, showDefaultForecast);
