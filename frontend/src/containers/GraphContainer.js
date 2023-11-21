import React, { useState } from 'react';
import SubmitButton from '../components/SubmitButton';
import { sendDataToBackend } from '../api/apiBigQuery/apiBigQuery';
import BarGraph from '../components/BarGraph';

function GraphContainer({ filterValues }) {
    const [graphData, setGraphData] = useState([]);
    const [showGraph, setShowGraph] = useState(false);

    // Handler for form submission
    const handleSubmit = async () => {
        const data = await sendDataToBackend(filterValues);
        setGraphData(data.results);
        setShowGraph(true);
    };

    return (
        <div>
            <div className="ButtonContainer">
                <SubmitButton label="Show Data" handleSubmit={handleSubmit} />
            </div>
            <div className="GraphContainer">
                {showGraph && <BarGraph data={graphData} />}
            </div>
        </div>
    );
}

export default GraphContainer;