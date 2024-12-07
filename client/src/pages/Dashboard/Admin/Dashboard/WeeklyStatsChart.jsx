import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler, // Required for the area fill
    Tooltip,
    Legend
);

const WeeklyStatsChart = ({ weeklyReport }) => {
    
    const days = weeklyReport.map(data => data.day);
    const earnings = weeklyReport.map(data => parseFloat(data.earnings));
    const products = weeklyReport.map(data => data.products);

    const earningsData = {
        labels: days,
        datasets: [
            {
                label: 'Earnings',
                data: earnings,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54,162,235,0.2)',
                tension: 0.2,
            },
        ],
    };

    const productsData = {
        labels: days,
        datasets: [
            {
                label: 'Products Added',
                data: products,
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: "#e5e7eb", 
                },
            },
        },
    };

    return (
        <div className="mt-12 space-y-12" id='weekly-admin-stats'>
            <h2 className="text-2xl font-semibold mb-4">Weekly Report Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="max-h-96 md:h-96 w-full">
                    <h3 className="text-lg font-medium mb-2">Weekly Earnings</h3>
                    <Chart type="line" data={earningsData} options={options} />
                </div>

                <div className="max-h-96 md:h-96 w-full">
                    <h3 className="text-lg font-medium mb-2">Products Added Weekly</h3>
                    <Chart type="bar" data={productsData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default WeeklyStatsChart;
