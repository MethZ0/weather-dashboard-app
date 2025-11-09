# Weather Dashboard

An interactive weather dashboard with location-based forecasts, weather maps, and historical data visualization.

## Features

- 🌡️ **Current Weather**: Real-time temperature, humidity, wind speed, and UV index
- 📅 **7-Day Forecast**: Daily weather predictions with icons and temperature ranges
- 🗺️ **Interactive Weather Map**: Toggle between Temperature, Precipitation, and Wind layers
- 📊 **Historical Trends**: Visualize weather data over time with Chart.js
- 🔍 **City Search**: Search for weather in any city worldwide
- 🎨 **Modern UI**: Dark theme design with smooth animations

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **OpenWeather API** - Weather data
- **Lucide React** - Icons

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get OpenWeather API Key

1. Go to [OpenWeather API](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### 3. Configure Environment Variables

Open the `.env` file and replace `your_api_key_here` with your actual OpenWeather API key:

```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
weather/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navigation bar with search
│   │   ├── CurrentWeather.jsx      # Current weather display
│   │   ├── Forecast.jsx            # 7-day forecast
│   │   ├── WeatherMap.jsx          # Interactive map
│   │   └── HistoricalTrends.jsx    # Historical data chart
│   ├── services/
│   │   └── weatherService.js       # API service layer
│   ├── App.jsx                     # Main application
│   ├── App.css                     # Global styles
│   └── main.jsx                    # Entry point
├── .env                            # Environment variables
└── package.json
```

## Usage

1. **Search for a City**: Use the search bar in the header to find weather for any city
2. **View Current Weather**: See real-time weather conditions in the left panel
3. **Check Forecast**: Browse the 7-day forecast below current weather
4. **Explore the Map**: Toggle between different weather layers (Temperature, Precipitation, Wind)
5. **View Historical Data**: Check temperature trends over time in the chart

## API Endpoints Used

- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`

## Future Enhancements

- Add actual map integration (Google Maps, Mapbox, or Leaflet)
- Implement real historical data (requires OpenWeather paid tier)
- Add weather alerts and notifications
- Support for multiple locations
- Responsive mobile design improvements
- Weather animations and icons based on conditions

## License

MIT

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
