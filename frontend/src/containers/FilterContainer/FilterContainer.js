import React, { useState } from 'react';
import Dropdown from '../../components/Dropdown';
import './FilterContainer.css';

function FilterContainer({ onFilterChange }) {
    // State variables for selected options
    const [selectedPaymentSource, setSelectedPaymentSource] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedSearch, setSelectedSearch] = useState('Ave_Age_of_Mother');

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

    // Call the onFilterChange function whenever a dropdown value changes
    React.useEffect(() => {
        onFilterChange(getDropdownValues());
    }, [selectedSearch, selectedPaymentSource, selectedYear, onFilterChange]);

    // Render
    return (
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
    );
}

export default FilterContainer;