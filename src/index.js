let currentTime = new Date();

function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let today = `${currentDay} ${currentHour}:${currentMinutes}`;
  return today;
}

let todayDate = document.querySelector("#current-day");
todayDate.innerHTML = currentDate(currentTime);

// 2 part

function search(city) {
  //getting temperature from api

  let apiKey = "62adc1ac7dfc036aa7bc43938cb7257f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
  console.log(cityInput.value);
  // let h1 = document.querySelector("h1");
  //h1.innerHTML = cityInput.value;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity, showTemperature);

//getting geolocation

function showLocationTemperature(response) {
  console.log(response.data.name);
  let locationTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let locationTemperatureElement = document.querySelector("#today-temperature");
  locationTemperatureElement.innerHTML = `${locationTemperature}°C`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey1 = "62adc1ac7dfc036aa7bc43938cb7257f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl1 = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey1}`;
  console.log(apiUrl1);
  axios.get(apiUrl1).then(showLocationTemperature);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

function showTemperature(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");

  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
