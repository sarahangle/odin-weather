const weatherAPIKey = 'ed6020a452a5438e9d3183415230805';

// async function getRealtimeFromLocationString(locationString) {
//   const requestString = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${locationString}`;
//   const dataPromise = await fetch(requestString, { mode: 'cors' });
//   if (!dataPromise.ok) { throw new Error('Location not found!'); }
//   const dataJSON = await dataPromise.json();
//   const data = {
//     current: {
//       location: dataJSON.location.name,
//       time: dataJSON.location.localtime,
//       condition_text: dataJSON.current.condition.text,
//       temperature_f: dataJSON.current.temp_f,
//       temperature_c: dataJSON.current.temp_c,
//       feelslike_f: dataJSON.current.feelslike_f,
//       feelslike_c: dataJSON.current.feelslike_c,
//       wind_mph: dataJSON.current.wind_mph,
//       wind_kph: dataJSON.current.wind_kph,
//       wind_dir: dataJSON.current.wind_dir,
//       humidity: dataJSON.current.humidity,
//     },
//   };
//   return data;
// }

async function getForecastFromLocationString(locationString, numDays) {
  const requestString = `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${locationString}&days=${numDays}`;
  const dataPromise = await fetch(requestString, { mode: 'cors' });
  if (!dataPromise.ok) { throw new Error('Location not found!'); }
  const dataJSON = await dataPromise.json();
  const data = {
    current: {
      location: dataJSON.location.name,
      time: dataJSON.location.localtime,
      condition_text: dataJSON.current.condition.text,
      condition_icon: `./assets${dataJSON.current.condition.icon.substring(20)}`,
      temperature_f: Math.round(dataJSON.current.temp_f),
      temperature_c: Math.round(dataJSON.current.temp_c),
      feelslike_f: Math.round(dataJSON.current.feelslike_f),
      feelslike_c: Math.round(dataJSON.current.feelslike_c),
      wind_mph: dataJSON.current.wind_mph,
      wind_kph: dataJSON.current.wind_kph,
      wind_dir: dataJSON.current.wind_dir,
      humidity: dataJSON.current.humidity,
    },
    forecast: [],
  };
  dataJSON.forecast.forecastday.forEach((val) => {
    const entry = {};
    entry.condition_text = val.day.condition.text;
    entry.condition_icon = `./assets${val.day.condition.icon.substring(20)}`;
    entry.date = val.date;
    entry.maxtemp_f = Math.round(val.day.maxtemp_f);
    entry.maxtemp_c = Math.round(val.day.maxtemp_c);
    entry.mintemp_f = Math.round(val.day.mintemp_f);
    entry.mintemp_c = Math.round(val.day.mintemp_c);
    data.forecast.push(entry);
  });
  return data;
}

export { getForecastFromLocationString };
