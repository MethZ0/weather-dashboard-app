import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HistoricalTrends = ({ historicalData }) => {
  const [activeView, setActiveView] = useState('Temperature');

  const views = ['Temperature', 'Precipitation', 'Wind Speed'];

  const data = {
    labels: historicalData?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: activeView,
        data: historicalData?.data || [12, 14, 16, 18, 22, 25, 28, 27, 24, 20, 16, 13],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}${activeView === 'Temperature' ? '°C' : activeView === 'Precipitation' ? 'mm' : 'km/h'}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
          callback: (value) => `${value}${activeView === 'Temperature' ? '°' : ''}`,
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white">Historical Trends</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeView === view
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 sm:h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default HistoricalTrends;
