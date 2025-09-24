import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartComponent({ 
  data,
  width = "100%",
  height = "100%",
  colors = ["#0EA5E9", "#EC4899", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
  showLegend = true,
  legendPosition = "bottom",
  borderWidth = 1,
  className = "",
  title = "Pie Chart",
  showCard = true,
  cardClassName = "",
  chartHeight = "300px"
}) {
  // Generate colors based on data length
  const generateColors = (length) => {
    if (length <= colors.length) {
      return colors.slice(0, length);
    }
    // If data length exceeds available colors, repeat colors
    const repeatedColors = [];
    for (let i = 0; i < length; i++) {
      repeatedColors.push(colors[i % colors.length]);
    }
    return repeatedColors;
  };

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: generateColors(data.length),
        borderWidth: borderWidth,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: showLegend,
        position: legendPosition,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  const chartElement = (
    <div 
      className={`w-full ${className}`}
      style={{ width, height }}
    >
      <Pie data={chartData} options={options} />
    </div>
  );

  if (!showCard) {
    return chartElement;
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${cardClassName}`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        {title}
      </h3>
      <div style={{ height: chartHeight }}>
        {chartElement}
      </div>
    </div>
  );
}
