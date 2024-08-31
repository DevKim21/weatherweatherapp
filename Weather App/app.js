// https://api.openweathermap.org/data/2.5/weather
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherIcons = {
  Clear: 'Images/clear.png',
  Rain: 'Images/rain.png',
  Snow: 'Images/snow.png',
  Clouds: 'Images/clouds.png',
  Haze: 'Images/haze.png'
};

function fetchWeatherData(country) {
  const url = `${apiUrl}?q=${country}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

function displayWeatherData(data) {
  const locationElement = document.getElementById('location');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const weatherIconElement = document.getElementById('weather-icon');

  locationElement.textContent = data.name;
  temperatureElement.textContent = `${data.main.temp} °C`;
  descriptionElement.textContent = data.weather[0].description;
  
  const weatherIcon = weatherIcons[data.weather[0].main];
  weatherIconElement.src = weatherIcon;
}

document.getElementById('search-button').addEventListener('click', function () {
  const searchInput = document.getElementById('search-input');
  const country = searchInput.value;
  
  if (country) {
    fetchWeatherData(country);
    searchInput.value = '';
  }
});
