import React from "react";
import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserStats from "./UserStats"; 

//console.log(stats)

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  if (!user?.email) {
    return <div className="text-center text-gray-500">User email is required.</div>;
  }

  if (isLoading) {
    console.log("Loading user stats...");
    return <div className="text-center text-gray-500">Loading....</div>;
  }

  if (error) {
    console.error("Error fetching user stats:", error);
    return <div className="text-center text-gray-500">Error loading data</div>;
  }

  if (!stats) {
    console.log("No stats available for the user.");
    return <div className="text-center text-gray-500">No data available</div>;
  }

  console.log("User stats:", stats);

  const data = {
    labels: ["Total Payments", "Total Reviews", "Total Purchased Products"],
    datasets: [
      {
        label: "User Stats",
        data: [stats.totalPayments, stats.totalReviews, stats.totalPurchasedProduct],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;

            if (tooltipItem.label === "Total Payments") {
              return `${label}: $${value.toFixed(2)}`;
            }
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <p className="text-gray-500">Hi, {user?.username}! Welcome to your user dashboard</p>
      </div>
      <UserStats stats={stats} />
      <div className="mt-6">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserDMain;
