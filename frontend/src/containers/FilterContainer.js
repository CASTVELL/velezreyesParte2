// Importing required modules and components
import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import SubmitButton from '../components/SubmitButton';
import { sendDataToBackend } from '../api/apiBigQuery/apiBigQuery';
import BarGraph from '../components/BarGraph';

// Importing CSS
import './FilterContainer.css';

function FilterContainer() {

    // State variables for selected options
    const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSearch, setSelectedSearch] = useState('');
    const [graphData, setGraphData] = useState(null);

    // Options for each dropdown
    const paymentSourceOptions = ['All', 'Medicaid', 'Self Pay', 'Private Insurance', 'Other', 'Unknown or Not Stated'];
    const yearOptions = ['All', '2016', '2017', '2018'];
    const searchOptions = ['Ave_Age_of_Mother', 'Ave_Pre_pregnancy_BMI', 'Ave_OE_Gestational_Age_Wks', 'Ave_Birth_Weight_gms', 'Ave_Number_of_Prenatal_Wks', 'Ave_LMP_Gestational_Age_Wks'];

    // Handlers for dropdown changes
    const handleSelectedSearchChange = (event) => {
        setSelectedSearch(event.target.value);
    };

    const handlePaymentSourceChange = (event) => {
        setSelectedPaymentSource(event.target.value);
    };

    const handleSelectedYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Function to get selected values
    const getDropdownValues = () => {
        return {
            selectedSearch: selectedSearch,
            selectedPaymentSource: selectedPaymentSource,
            selectedYear: selectedYear
        };
    };

    // Handler for form submission
    const handleSubmit = async () => {
        const data = await sendDataToBackend(getDropdownValues());
        setGraphData(data);
    };

    // Render
    return (
        <div>
            <div className="FilterContainer">
                <div className="Row">
                    <label className="label">Search:</label>
                    <Dropdown id="searchDropdown" options={searchOptions} selectedOption={selectedSearch} handleDropdownChange={handleSelectedSearchChange} className="filterElement" />
                </div>
                <div className="Row">
                    <label className="label">Payment Source:</label>
                    <Dropdown id="paymentDropdown" options={paymentSourceOptions} selectedOption={selectedPaymentSource} handleDropdownChange={handlePaymentSourceChange} className="filterElement" />
                </div>
                <div className="Row">
                    <label className="label">Year:</label>
                    <Dropdown id="yearDropdown" options={yearOptions} selectedOption={selectedYear} handleDropdownChange={handleSelectedYearChange} className="filterElement" />
                </div>
            </div>
            <div className="ButtonContainer">
                <SubmitButton label="Buscar" handleSubmit={handleSubmit} />
            </div>
            <div className="GraphContainer">
                {graphData && <BarGraph data={graphData} />}
            </div>
        </div>
    );
}

export default FilterContainer;