import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin); // Register the zoom plugin

function BarGraph(props) {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const data = props.data;

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const xKey = Object.keys(data[0])[0]; // Selects the key for the xaxis
        const yKey = Object.keys(data[0])[1]; // Selects the key for the yaxis

        chartInstanceRef.current = new Chart(
            chartRef.current,
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row[xKey]),
                    datasets: [
                        {
                            label: yKey, // Set the dataset label to the Y key
                            data: data.map(row => row[yKey]),
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: xKey // Set the X axis title to the X key
                            }
                        },
                        y: {
                            type: 'linear',
                            title: {
                                display: true,
                                text: yKey // Set the Y axis title to the Y key
                            }
                        }
                    },
                    plugins: {
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'x',
                            },
                            zoom: {
                                wheel: {
                                    enabled: true, // Enable zooming with the mouse wheel
                                },
                                pinch: {
                                    enabled: true, // Enable zooming with a pinch gesture
                                },
                                mode: 'x',
                            }
                        }
                    }
                }
            }
        );
    }, [props.data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '90%' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default BarGraph;