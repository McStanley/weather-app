const weather = (() => {
  const API_KEY = '20ce4be2790486118f707683c2bb267a';

  const getCoordinates = async (query) => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
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
})();

export default weather;
