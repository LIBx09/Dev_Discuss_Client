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


    // console.log("chartData", chartData);

    const colors = ['#2659ff', '#ff26ac', '#51ff26', ];

    // Custom triangle bar component
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        const path = `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}Z`;
        return <path d={path} fill={fill} />;
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="lg:w-full md:h-[320px] h-[280px] flex justify-center mt-8">
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis dataKey="name"  textAnchor="end" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" label={{ position: 'top' }} shape={<TriangleBar />}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-center text-gray-500 text-lg font-semibold my-auto">
                😕 No activity data available yet. <br />
                Start engaging to see your stats here!
            </p>
            )}
        </div>
    );
};

export default BarCharts;
