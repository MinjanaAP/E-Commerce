import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const OrderStatsCharts = ({ dailyOrders, ordersByStatus }) => {
    //* Get data for orders by daily
    const days = dailyOrders.map(data => data.day);
    const dailyOrderCounts = dailyOrders.map(data => data.totalOrders);

    const dailyOrdersData = {
        labels: days,
        datasets: [
            {
                label: 'Daily Orders',
                data: dailyOrderCounts,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
            },
        ],
    };

    //* Orders separated by status
    const statuses = ordersByStatus.map(data => data.status);
    const statusCounts = ordersByStatus.map(data => data.totalOrders);

    const ordersByStatusData = {
        labels: statuses,
        datasets: [
            {
                label: 'Orders by Status',
                data: statusCounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Different colors
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
                    color: "#e5e7eb", // Gray grid lines
                },
            },
        },
    };
    return (
        <div className="space-y-12">
            <h2 className="text-2xl font-semibold mb-4 mt-5">Weekly Order Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/*//? Daily Orders Chart */}
                <div className="max-h-96 md:h-96">
                    <h3 className="text-lg font-medium mb-2">Daily Orders</h3>
                    <Chart type="bar" data={dailyOrdersData} options={options} />
                </div>

                {/*//? Orders by Status Chart */}
                <div className="max-h-96 md:h-96">
                    <h3 className="text-lg font-medium mb-2">Orders by Status</h3>
                    <Chart type="bar" data={ordersByStatusData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default OrderStatsCharts;
