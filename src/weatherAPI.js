const weatherAPIKey = 'ed6020a452a5438e9d3183415230805';

async function getRealtimeFromLocationString(locationString) {
  try {
    const requestString = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${locationString}`;
    const dataPromise = await fetch(requestString, { mode: 'cors' });
    if (!dataPromise.ok) { throw new Error('Location not found!'); }
    const dataJSON = await dataPromise.json();
    const data = {
      current: {
        location: dataJSON.location.name,
        time: dataJSON.location.localtime,
        condition_text: dataJSON.current.condition.text,
        temperature_f: dataJSON.current.temp_f,
        temperature_c: dataJSON.current.temp_c,
        feelslike_f: dataJSON.current.feelslike_f,
        feelslike_c: dataJSON.current.feelslike_c,
        wind_mph: dataJSON.current.wind_mph,
        wind_kph: dataJSON.current.wind_kph,
        wind_dir: dataJSON.current.wind_dir,
        humidity: dataJSON.current.humidity,
      },
    };
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function getForecastFromLocationString(locationString, numDays) {
  try {
    const requestString = `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${locationString}&days=${numDays}`;
    const dataPromise = await fetch(requestString, { mode: 'cors' });
    if (!dataPromise.ok) { throw new Error('Location not found!'); }
    const dataJSON = await dataPromise.json();
    const data = {
      current: {
        location: dataJSON.location.name,
        time: dataJSON.location.localtime,
        condition_text: dataJSON.current.condition.text,
        temperature_f: dataJSON.current.temp_f,
        temperature_c: dataJSON.current.temp_c,
        feelslike_f: dataJSON.current.feelslike_f,
        feelslike_c: dataJSON.current.feelslike_c,
        wind_mph: dataJSON.current.wind_mph,
        wind_kph: dataJSON.current.wind_kph,
        wind_dir: dataJSON.current.wind_dir,
        humidity: dataJSON.current.humidity,
      },
      forecast: [],
    };
    dataJSON.forecast.forecastday.forEach((val) => {
      const entry = {};
      entry.condition = val.day.condition.text;
      entry.maxtemp_f = val.day.maxtemp_f;
      entry.maxtemp_c = val.day.maxtemp_c;
      entry.mintemp_f = val.day.mintemp_f;
      entry.mintemp_c = val.day.mintemp_c;
      data.forecast.push(entry);
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export { getRealtimeFromLocationString, getForecastFromLocationString };
