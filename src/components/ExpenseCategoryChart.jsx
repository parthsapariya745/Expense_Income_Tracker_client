import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ExpenseCategoryChart = ({ categoryData }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: Object.keys(categoryData),
        datasets: [
          {
            data: Object.values(categoryData),
            backgroundColor: [
              "#6366f1",
              "#22c55e",
              "#06b6d4",
              "#f97316",
              "#ef4444",
              "#a855f7",
              "#facc15",
              "#14b8a6",
              "#ec4899",
              "#64748b",
            ]
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "58%",
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#e5e7eb" },
          },
        },
      },
    });

    return () => chartRef.current.destroy();
  }, [categoryData]);

  return (
    <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
      <h3 className="text-white font-semibold mb-3 text-center">
        Expense by Category
      </h3>
      <div className="relative xl:h-90 sm:h-100 h-full flex justify-center">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default ExpenseCategoryChart;