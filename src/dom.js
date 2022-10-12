import weather from './weather';
import LoadingImg from './assets/loading.png';
import ErrorImg from './assets/error.png';

const dom = (() => {
  const displayLoading = () => {
    const pLocation = document.querySelector('#p-location');
    const pCondition = document.querySelector('#p-condition');
    const pTemp = document.querySelector('#p-temp');
    const iconWeather = document.querySelector('#icon-weather');

    pLocation.textContent = 'Loading...';
    pCondition.textContent = 'Please wait.';
    pTemp.textContent = '';
    iconWeather.src = LoadingImg;
  };

  const displayError = () => {
    const pLocation = document.querySelector('#p-location');
    const pCondition = document.querySelector('#p-condition');
    const pTemp = document.querySelector('#p-temp');
    const iconWeather = document.querySelector('#icon-weather');

    pLocation.textContent = 'Could not retrieve the weather.';
    pCondition.textContent = 'Try again.';
    pTemp.textContent = '';
    iconWeather.src = ErrorImg;
  };

  const displayWeather = async (query) => {
    try {
      const pLocation = document.querySelector('#p-location');
      const pCondition = document.querySelector('#p-condition');
      const pTemp = document.querySelector('#p-temp');
      const iconWeather = document.querySelector('#icon-weather');

      displayLoading();

      const { weatherData, location } = await weather.getWeather(query);

      pLocation.textContent = location;
      pCondition.textContent = weatherData.current.condition;
      pTemp.textContent = `${weatherData.current.temp}° C`;
      iconWeather.src = `https://openweathermap.org/img/wn/${weatherData.current.icon}@4x.png`;
    } catch (error) {
      displayError();
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    const inputQuery = document.querySelector('#input-query');

    if (!inputQuery.value) {
      return;
    }

    displayWeather(inputQuery.value);

    inputQuery.value = '';
  };

  const init = () => {
    const formQuery = document.querySelector('#form-query');

    formQuery.addEventListener('submit', submitForm);

    displayWeather('Warsaw, Poland');
  };

  return {
    init,
  };
})();

export default dom;
