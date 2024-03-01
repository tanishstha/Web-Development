import React from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
    data: number[];
    labels: string[];
    title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, labels, title }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: data,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
