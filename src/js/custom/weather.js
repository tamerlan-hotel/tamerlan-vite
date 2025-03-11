const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const city = "Khmelnytskyy";
const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const temperature = Math.round(data.current.temp_c);
    const iconUrl = data.current.condition.icon;

    document.getElementById(
      "weather"
    ).innerHTML = `<img src="https:${iconUrl}" alt="Weather"> ${temperature} °C`;
  })
  .catch((error) => console.error("Error retrieving weather data:", error));

export default {};
