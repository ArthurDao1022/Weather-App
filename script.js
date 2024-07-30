const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.notFound');

search.addEventListener('click', () => {

  const ApiKey = '7f47de63523195261be15d0c0d2017c2';
  const city = document.querySelector('.search-box input').value; 

  if (city == '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${ApiKey}`).then(response => response.json()).then(json => {

    if (json.cod == '404') {
      container.style.height = '500px';
      weatherBox.classList.remove('active');
      weatherDetails.classList.remove('active');
      error404.classList.add('active');
      return;
    }

    container.style.height = '580px';
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');



    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather .temperature-class');
    const description = document.querySelector('.weather .description');
    const humidity = document.querySelector('.humidity .info-humidity span');
    const wind = document.querySelector('.wind .info-wind span');
    const thermometer = document.querySelector('.thermometer .info-thermometer span');
    const weatherMain = json.weather[0].main;
    console.log(`Weather Main: ${weatherMain}`);

    switch (json.weather[0].main) {
      case 'Clear':
          image.src = '../WeatherApp/images/clearSky.png';
          break;

      case 'Clouds':
          image.src = '../WeatherApp/images/cloudySky.png';
          break;

      case 'Rain':
          image.src = '../WeatherApp/images/rainSky.png';
          break;

      case 'Thunderstorm':
          image.src = '../WeatherApp/images/thunderstorm.png';
          break;

      case 'Snow':
          image.src = '../WeatherApp/images/snowSky.png';
          break;

      case 'Haze':
          image.src = '../WeatherApp/images/haze.png';
          break;
    
      default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span`;
      description.innerHTML = `${json.weather[0].description}`;

      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}MPH`;
      thermometer.innerHTML = `${parseInt(json.main.feels_like)}<span>°F</span`;

    
  });

});