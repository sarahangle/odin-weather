const displayError = (err) => {
  document.getElementById('error').textContent = err;
  document.getElementById('error').style.display = 'block';
};

const hideError = () => {
  document.getElementById('error').textContent = '';
  document.getElementById('error').style.display = 'none';
};

const getDayOfWeek = (dateString) => {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date(
    parseInt(dateString.substring(0, 4), 10),
    parseInt((dateString.substring(5, 7) - 1), 10),
    parseInt(dateString.substring(8, 10), 10),
  );
  return weekday[d.getDay()];
};

const createRealtimeCard = (forecast, isDegF) => {
  const realtimeElement = document.getElementById('current');
  realtimeElement.innerHTML = '';

  realtimeElement.appendChild(document.createElement('div'));
  realtimeElement.lastChild.classList.add('current-location');
  realtimeElement.lastChild.textContent = forecast.current.location;

  realtimeElement.appendChild(document.createElement('div'));
  realtimeElement.lastChild.classList.add('current-temp-icon');

  realtimeElement.lastChild.appendChild(document.createElement('img'));
  realtimeElement.lastChild.lastChild.classList.add('current-icon');
  realtimeElement.lastChild.lastChild.src = forecast.current.condition_icon;

  realtimeElement.lastChild.appendChild(document.createElement('div'));
  realtimeElement.lastChild.lastChild.classList.add('current-temp');
  if (isDegF) {
    realtimeElement.lastChild.lastChild.textContent = `${forecast.current.temperature_f} \xB0F`;
  } else {
    realtimeElement.lastChild.lastChild.textContent = `${forecast.current.temperature_c} \xB0C`;
  }

  realtimeElement.appendChild(document.createElement('div'));
  realtimeElement.lastChild.classList.add('current-desc');
  realtimeElement.lastChild.textContent = forecast.current.condition_text;
};

const createForecastCards = (forecast, isDegF) => {
  const forecastElement = document.getElementById('forecast');
  forecastElement.innerHTML = '';

  forecast.forecast.forEach((forecastDay) => {
    const forecastDayCard = document.createElement('div');
    forecastDayCard.classList.add('forecast-card');

    forecastDayCard.appendChild(document.createElement('img'));
    forecastDayCard.lastChild.classList.add('forecast-icon');
    forecastDayCard.lastChild.src = forecastDay.condition_icon;

    forecastDayCard.appendChild(document.createElement('div'));
    forecastDayCard.lastChild.classList.add('forecast-text');

    forecastDayCard.lastChild.appendChild(document.createElement('div'));
    forecastDayCard.lastChild.lastChild.classList.add('forecast-day');
    forecastDayCard.lastChild.lastChild.textContent = getDayOfWeek(forecastDay.date);

    forecastDayCard.lastChild.appendChild(document.createElement('div'));
    forecastDayCard.lastChild.lastChild.classList.add('forecast-temp');
    if (isDegF) {
      forecastDayCard.lastChild.lastChild.textContent = `High: ${forecastDay.maxtemp_f}\xB0F | Low: ${forecastDay.mintemp_f}\xB0F`;
    } else {
      forecastDayCard.lastChild.lastChild.textContent = `High: ${forecastDay.maxtemp_c}\xB0C | Low: ${forecastDay.mintemp_c}\xB0C`;
    }

    forecastElement.appendChild(forecastDayCard);
  });
};

const displayForecast = (forecast, isDegF) => {
  hideError();
  createRealtimeCard(forecast, isDegF);
  createForecastCards(forecast, isDegF);
};

export { displayForecast, displayError };
