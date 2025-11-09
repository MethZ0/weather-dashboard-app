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
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-xl font-semibold text-white mb-6">7-Day Forecast</h3>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0"
          >
            <div className="flex items-center gap-4 flex-1">
              {getWeatherIcon(day.condition)}
              <div>
                <p className="text-white font-medium">{day.day}</p>
                <p className="text-gray-400 text-sm">{day.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">
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
