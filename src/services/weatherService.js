import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  // Get current weather by city name
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      return {
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind_speed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
        description: response.data.weather[0].description,
        condition: response.data.weather[0].main,
        uv_index: 'Moderate', // UV index requires separate API call or One Call API
        coordinates: [response.data.coord.lat, response.data.coord.lon],
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  // Get 7-day forecast
  getForecast: async (city) => {
    try {
      // First get coordinates
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
        },
      });

      const { lat, lon } = weatherResponse.data.coord;

      // Get 5-day forecast (free tier)
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      });

      // Process forecast data to get daily forecasts
      const dailyForecasts = [];
      const processedDays = new Set();

      forecastResponse.data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateKey = date.toDateString();

        if (!processedDays.has(dateKey) && dailyForecasts.length < 7) {
          processedDays.add(dateKey);
          dailyForecasts.push({
            day: dayName,
            condition: item.weather[0].main,
            temp_max: Math.round(item.main.temp_max),
            temp_min: Math.round(item.main.temp_min),
          });
        }
      });

      return dailyForecasts;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get historical data (simulated for now, as it requires paid API)
  getHistoricalData: async () => {
    // Simulated historical data
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [12, 14, 16, 18, 22, 25, 28, 27, 24, 20, 16, 13],
    };
  },
};
