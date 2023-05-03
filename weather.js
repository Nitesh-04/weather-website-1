const locationForm = document.getElementById("locate-form");
const locationInput = document.getElementById("location");
const weatherInfo = document.getElementById("the_weather");

var video = document.getElementById("myVideo");

locationForm.addEventListener("submit", (event) => 
{
  event.preventDefault();
  const location = locationInput.value;
  getWeather(location);
  locationInput.value = "";
});

const getWeather = async (location) => 
{
  try 
  {
    const response = await fetch
    (
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=659877f1f69a3bdcd54eb88f2cf70275`
    );
    const weather_data = await response.json();
    showWeather(weather_data);
  } catch (error) 
  {
    console.error(error);
    weatherInfo.innerText = "Location not found. Please enter again !";
  }
};

const showWeather = (weather_data) => 
{
  const { name, main, weather } = weather_data;
  const { temp, feels_like, humidity } = main;
  const { description, icon } = weather[0];
  weatherInfo.innerHTML = 
  `
    <h2>${name}</h2>
    <p>${description}</p>
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon" />
    <p>Temperature in C: ${temp}°C</p>
    <p>Real Feel: ${feels_like}°C</p>
    <p>Humidity %: ${humidity}%</p>
  `;
};
