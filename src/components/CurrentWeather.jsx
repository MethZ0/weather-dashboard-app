import { Cloud } from 'lucide-react';

const CurrentWeather = ({ weather }) => {
  if (!weather) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <p className="text-gray-400">Loading weather data...</p>
      </div>
    );
  }

  const getWeatherIcon = () => {
    // Return cloud icon for now, can be extended
    return <Cloud className="w-16 h-16 text-blue-400" />;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1">
          {weather.city}, {weather.country}
        </h2>
        <p className="text-gray-400 text-sm">{weather.description}</p>
      </div>

      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-4">
          {getWeatherIcon()}
          <div className="text-5xl sm:text-7xl font-bold text-white">
            {Math.round(weather.temp)}°C
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div>
          <p className="text-gray-400 text-xs sm:text-sm mb-1">Feels Like</p>
          <p className="text-white text-lg sm:text-xl font-semibold">{Math.round(weather.feels_like)}°C</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs sm:text-sm mb-1">Humidity</p>
          <p className="text-white text-lg sm:text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs sm:text-sm mb-1">Wind Speed</p>
          <p className="text-white text-lg sm:text-xl font-semibold">{weather.wind_speed} km/h</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs sm:text-sm mb-1">UV Index</p>
          <p className="text-white text-lg sm:text-xl font-semibold">{weather.uv_index || 'Moderate'}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
