import './style.css';
import { getRealtimeFromLocationString, getForecastFromLocationString } from './weatherAPI';

const initForm = () => {
  document.getElementById('location-search-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    if (document.getElementById('location-text').value) {
      getForecastFromLocationString(document.getElementById('location-text').value);
      document.getElementById('location-text').value = '';
    }
  });
};

const showLocalForecast = (pos) => {
  getForecastFromLocationString(`${pos.coords.latitude}, ${pos.coords.longitude}`);
};

const showDefaultForecast = () => {
  getForecastFromLocationString('New York City');
};

initForm();
navigator.geolocation.getCurrentPosition(showLocalForecast, showDefaultForecast);
