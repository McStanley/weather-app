const weather = (() => {
  const API_KEY = '20ce4be2790486118f707683c2bb267a';

  let units = 'metric';
  let lastQuery = '';

  // function which takes a query and returns the geographical coordinates
  // along with the name of the found location
  const getCoordinates = async (query) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
    );
    const json = await response.json();
    const data = json[0];

    const coordinates = {
      lat: data.lat,
      lon: data.lon,
    };
    const location = `${data.name}, ${data.country}`;

    return {
      coordinates,
      location,
    };
  };

  // function which takes a query and returns weather data
  // along with the name of the provided location
  const getWeather = async (query = lastQuery) => {
    lastQuery = query;

    const { coordinates, location } = await getCoordinates(query);

    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=${units}&appid=${API_KEY}`
    );
    const data = await response.json();

    // object with selected weather data
    const weatherData = {
      current: {
        temp: data.current.temp,
        condition: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
      },
    };

    return {
      weatherData,
      location,
    };
  };

  const getUnits = () => units;

  const toggleUnits = () => {
    units = units === 'metric' ? 'imperial' : 'metric';
  };

  return {
    getWeather,
    getUnits,
    toggleUnits,
  };
})();

export default weather;
