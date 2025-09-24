import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChartComponent({
  data,
  width = "100%",
  height = "100%",
  backgroundColor = "#10B981",
  borderRadius = 6,
  showLegend = false,
  legendPosition = "top",
  label = "Data",
  className = "",
  yAxisStepSize = 5,
  showTooltip = true,
  title = "Bar Chart",
  showCard = true,
  cardClassName = "",
  chartHeight = "300px",
  horizontal = false, // Properti baru untuk chart horizontal
  dataKey = "kelas", // Properti baru untuk key label
  valueKey = "jumlah", // Properti baru untuk key value
}) {
  const chartData = {
    labels: data.map((d) => d[dataKey]),
    datasets: [
      {
        label: label,
        data: data.map((d) => d[valueKey]),
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    indexAxis: horizontal ? "y" : "x", // Mengatur sumbu utama (y untuk horizontal)
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
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: showTooltip,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = horizontal ? context.parsed.x : context.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: yAxisStepSize,
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const chartElement = (
    <div className={`w-full ${className}`} style={{ width, height }}>
      <Bar data={chartData} options={options} />
    </div>
  );

  if (!showCard) {
    return chartElement;
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${cardClassName}`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      <div style={{ height: chartHeight }}>{chartElement}</div>
    </div>
  );
}
