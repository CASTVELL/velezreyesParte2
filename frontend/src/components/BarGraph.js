import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BarGraph() {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = new Chart(
            chartRef.current,
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.year),
                    datasets: [
                        {
                            label: 'Total Births',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        );
    }, []);

    return (
        <div>
            <div style={{ width: '800px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default BarGraph;