const form = document.querySelector("form");
const input = document.querySelector("input");

// Your OpenWeather API key
const apiKey = "9f193363df4b5d0543a577f8c9faea95";

// Event listener for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  const city = input.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  // Fetch weather data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    showWeather(data);
  } catch (error) {
    alert(error.message);
  }
});

// Function to show weather
function showWeather(data) {
  const card = document.querySelector(".weather-card");

  const icon = data.weather[0].icon; // weather icon code from API
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  card.innerHTML = `
    <div class="card-body">
      <h2 class="card-title">${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
      <h3>${Math.round(data.main.temp)}°C</h3>
      <p class="lead">${data.weather[0].description}</p>
      <hr>
      <div class="weather-details">
        <div>
          🌡️ <strong>Feels like:</strong><br> ${Math.round(data.main.feels_like)}°C
        </div>
        <div>
          💧 <strong>Humidity:</strong><br> ${data.main.humidity}%
        </div>
        <div>
          💨 <strong>Wind:</strong><br> ${data.wind.speed} m/s
        </div>
      </div>
    </div>
  `;
}
