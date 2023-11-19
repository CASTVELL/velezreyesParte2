import React, { useState } from 'react';
import Checkbox from '../components/Checkbox';
import Dropdown from '../components/Dropdown';
import Textbox from '../components/Textbox';
import SubmitButton from '../components/SubmitButton';

import './FilterContainer.css';

import { fetchData } from '../api/apiBigQuery/apiBigQuery';

function FilterContainer() {
    const [isAbnormalitiesChecked, setAbnormalitiesChecked] = useState(false);
    const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
    const [selectedAbnormalCondition, setSelectedAbnormalCondition] = useState('');
    const [selectedMorbidity, setSelectedMorbidity] = useState('');
    const [year, setYear] = useState('');

    const handleCheckboxChange = (event) => {
        setAbnormalitiesChecked(event.target.checked);
        alert(`Checkbox is ${event.target.checked ? 'checked' : 'not checked'}`);
    };

    const handlePaymentSourceChange = (event) => {
        setSelectedPaymentSource(event.target.value);
        alert(`Option selected: ${event.target.value}`);
    };

    const handleAbnormalConditionChange = (event) => {
        setSelectedAbnormalCondition(event.target.value);
        alert(`Option selected: ${event.target.value}`);
    };

    const handleMorbidityChange = (event) => {
        setSelectedMorbidity(event.target.value);
        alert(`Option selected: ${event.target.value}`);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleSubmit = async () => {
        const query = 'SELECT * FROM my_table'; // Replace with your actual query
        try {
            const data = await fetchData(query);
            alert(JSON.stringify(data));
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };


    // Define your options for each dropdown
    const paymentSourceOptions = ['Option 1', 'Option 2', 'Option 3'];
    const abnormalConditionOptions = ['Option 1', 'Option 2', 'Option 3'];
    const morbidityOptions = ['Option 1', 'Option 2', 'Option 3'];

    return (

        <div>
            <div className="FilterContainer">
                <div className="Row">

                    <label className="label">Select Payment Source:</label>
                    <Dropdown options={paymentSourceOptions} selectedOption={selectedPaymentSource} handleDropdownChange={handlePaymentSourceChange} className="filterElement" />

                </div>
                <div className="Row">

                    <label className="label">Select Abnormal Condition:</label>
                    <Dropdown options={abnormalConditionOptions} selectedOption={selectedAbnormalCondition} handleDropdownChange={handleAbnormalConditionChange} className="filterElement" />

                </div>
                <div className="Row">

                    <label className="label">Select Morbidity:</label>
                    <Dropdown options={morbidityOptions} selectedOption={selectedMorbidity} handleDropdownChange={handleMorbidityChange} className="filterElement" />

                </div>
                <div className="Row">

                    <label className="label">Enter Year:</label>
                    <Textbox value={year} handleTextboxChange={handleYearChange} className="filterElement" />

                </div>
                <div className="Row">

                    <label className="label">Is Abnormalities Checked:</label>
                    <input type="checkbox" checked={isAbnormalitiesChecked} onChange={handleCheckboxChange} />

                </div>

            </div>
            <div className="ButtonContainer">
                <SubmitButton label="Buscar" handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default FilterContainer;