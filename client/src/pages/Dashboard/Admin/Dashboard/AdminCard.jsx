import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { FaBox } from 'react-icons/fa';

const AdminCard = ({ title, value, percentage, chartData, chartColor }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
                {/*//? Left Logo */}
                <div className="bg-green-100 text-green-500 p-3 rounded-full">
                    <FaBox size={24} />
                </div>
                {/*//? Right Stats */}
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-2xl font-bold text-[#353030FF]">{value}</p>
                    <p className="text-green-500 text-sm flex items-center">
                        ▲ {percentage}%
                    </p>
                </div>
            </div>
            {/* Chart */}
            <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor || "#22c55e"} // Use chartColor or default to green
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminCard;
