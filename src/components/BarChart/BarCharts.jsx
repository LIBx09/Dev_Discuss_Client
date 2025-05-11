import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import useAxios from '../../MainLayout/Shared/Hooks/useAxios';

const BarCharts = () => {
    const { user } = useContext(AuthContext);
    const axios = useAxios();
    const { data: pointsBreakdown = {}, isLoading } = useQuery({
        queryKey: ["pointsBreakdownData", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`/users/points-breakdown?email=${user.email}`);
            return data;
        }
    });

    const chartData = pointsBreakdown?.pointsBreakdown
        ? Object.entries(pointsBreakdown.pointsBreakdown)
            .filter(([key, value]) => key.toLowerCase() !== 'login' && value > 0)
            .map(([key, value]) => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                value: value
            }))
        : [];

    // Theme-aware colors for bars
    const colors = [
        'var(--button-bg)', // Blue from theme (#3b82f6)
        '#10b981', // Green as secondary color
        '#f59e0b', // Amber as tertiary color
    ];

    // Custom triangle bar component
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        const path = `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}Z`;
        return <path d={path} fill={fill} />;
    };

    if (isLoading) return <p className="text-center text-[var(--text-color)]">Loading...</p>;

    return (
        <div className="lg:w-full md:h-[320px] h-[280px] flex justify-center mt-8">
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--text-color)"
                            opacity={0.2} // Subtle grid
                        />
                        <XAxis
                            dataKey="name"
                            textAnchor="end"
                            stroke="var(--text-color)"
                            tick={{ fill: 'var(--text-color)' }}
                        />
                        <YAxis stroke="var(--text-color)" tick={{ fill: 'var(--text-color)' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--background)',
                                color: 'var(--text-color)',
                                border: '1px solid var(--text-color)',
                                borderRadius: '4px',
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="var(--button-bg)" // Default to blue
                            label={{ position: 'top', fill: 'var(--text-color)' }}
                            shape={<TriangleBar />}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-center text-[var(--text-color)] text-lg font-semibold my-auto">
                    😕 No activity data available yet. <br />
                    Start engaging to see your stats here!
                </p>
            )}
        </div>
    );
};

export default BarCharts;