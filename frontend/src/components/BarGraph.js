import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarGraph({ data }) {
    const labels = data.results.map(item => Object.values(item)[0]);
    const dataset = data.results.map(item => Object.values(item)[1]);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: Object.keys(data.results[0])[1],
                //label: 'Total Births',
                data: dataset,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    return <Bar data={chartData} options={options} />;
}

export default BarGraph;