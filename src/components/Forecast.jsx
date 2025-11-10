import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

const Forecast = ({ forecast }) => {
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Sunny': <Sun className="w-8 h-8 text-yellow-400" />,
      'Cloudy': <Cloud className="w-8 h-8 text-gray-400" />,
      'Rain': <CloudRain className="w-8 h-8 text-blue-400" />,
      'Storm': <CloudRain className="w-8 h-8 text-purple-400" />,
    };
    return iconMap[condition] || <Cloud className="w-8 h-8 text-gray-400" />;
  };

  if (!forecast || forecast.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h3>
        <p className="text-gray-400">Loading forecast data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">7-Day Forecast</h3>
      <div className="space-y-3 sm:space-y-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-800 last:border-b-0"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="shrink-0">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium text-sm sm:text-base truncate">{day.day}</p>
                <p className="text-gray-400 text-xs sm:text-sm truncate">{day.condition}</p>
              </div>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                {day.temp_max}° / {day.temp_min}°
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
