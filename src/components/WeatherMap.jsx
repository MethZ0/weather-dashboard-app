import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const WeatherMap = ({ city, coordinates }) => {
  const [activeLayer, setActiveLayer] = useState('Temperature');
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Default to San Francisco coordinates
  const defaultCoords = [37.7749, -122.4194];
  const center = coordinates || defaultCoords;

  const layerUrls = {
    Temperature: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
    Precipitation: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
    Wind: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">Weather Map</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {Object.keys(layerUrls).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeLayer === layer
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <ChangeView center={center} zoom={10} />
          
          {/* Base map layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Weather overlay layer */}
          <TileLayer
            url={layerUrls[activeLayer]}
            opacity={0.6}
          />
          
          {/* Marker for the city */}
          <Marker position={center}>
            <Popup>
              <div className="text-sm">
                <strong>{city || 'San Francisco'}</strong>
                <br />
                {activeLayer} Layer
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMap;
