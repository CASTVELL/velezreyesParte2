// containers/FilterContainer.js
import React, { useState } from 'react';
import Checkbox from '../components/Checkbox';
import Dropdown from '../components/Dropdown';
import Textbox from '../components/Textbox';
import SubmitButton from '../components/SubmitButton';

function FilterContainer() {
    const [isAbnormalitiesChecked, setAbnormalitiesChecked] = useState(false);
    const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
    const [selectedAbnormalCondition, setSelectedAbnormalCondition] = useState('');
    const [selectedMorbidity, setSelectedMorbidity] = useState('');
    const [year, setYear] = useState('');

    const handleCheckboxChange = (event) => {
        setAbnormalitiesChecked(event.target.checked);
    };

    const handlePaymentSourceChange = (event) => {
        setSelectedPaymentSource(event.target.value);
    };

    const handleAbnormalConditionChange = (event) => {
        setSelectedAbnormalCondition(event.target.value);
    };

    const handleMorbidityChange = (event) => {
        setSelectedMorbidity(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleSubmit = () => {
        // Here you would handle the form submission.
        // This could involve making a request to your backend with the state of the form.
    };

    return (
        <div>
            <Checkbox isChecked={isAbnormalitiesChecked} handleCheckboxChange={handleCheckboxChange} />
            <Dropdown selectedOption={selectedPaymentSource} handleDropdownChange={handlePaymentSourceChange} />
            <Dropdown selectedOption={selectedAbnormalCondition} handleDropdownChange={handleAbnormalConditionChange} />
            <Dropdown selectedOption={selectedMorbidity} handleDropdownChange={handleMorbidityChange} />
            <Textbox value={year} handleTextboxChange={handleYearChange} />
            <SubmitButton handleSubmit={handleSubmit} />
        </div>
    );
}

export default FilterContainer;