import { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherMap from './components/WeatherMap';
import HistoricalTrends from './components/HistoricalTrends';
import { weatherService } from './services/weatherService';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [historicalData, setHistoricalData] = useState(null);
  const [currentCity, setCurrentCity] = useState('San Francisco');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weather, forecastData, historical] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city),
        weatherService.getHistoricalData(),
      ]);

      setCurrentWeather(weather);
      setForecast(forecastData);
      setHistoricalData(historical);
      setCurrentCity(weather.city);
    } catch (err) {
      setError('Failed to fetch weather data. Please check your API key or city name.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData('San Francisco');
  }, []);

  const handleSearch = (city) => {
    fetchWeatherData(city);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header 
        onSearch={handleSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64 sm:h-96">
            <p className="text-gray-400 text-lg">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 sm:h-96">
            <div className="text-center px-4">
              <p className="text-red-400 text-lg mb-2">{error}</p>
              <p className="text-gray-400 text-sm">
                Make sure to add your OpenWeather API key to the .env file
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Current Weather and Forecast */}
            <div className="space-y-4 sm:space-y-6">
              <CurrentWeather weather={currentWeather} />
              <Forecast forecast={forecast} />
            </div>

            {/* Middle and Right Columns - Map and Historical Trends */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <WeatherMap 
                city={currentCity} 
                coordinates={currentWeather?.coordinates}
              />
              <HistoricalTrends historicalData={historicalData} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
