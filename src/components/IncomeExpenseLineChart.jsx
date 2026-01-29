import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const IncomeExpenseLineChart = ({ incomeData, expenseData, labels }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); 
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.2)",
            tension: 0.4,
          },
          {
            label: "Expense",
            data: expenseData,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239,68,68,0.2)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#e5e7eb" },
          },
        },
        scales: {
          x: { ticks: { color: "#94a3b8" } },
          y: { ticks: { color: "#94a3b8" } },
        },
      },
    });

    return () => chartRef.current.destroy();
  }, [incomeData, expenseData, labels]);

  return (
    <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
      <h3 className="text-white font-semibold mb-3">
        Income vs Expense
      </h3>
      <div className="relative h-full">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default IncomeExpenseLineChart;