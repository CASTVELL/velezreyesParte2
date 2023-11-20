import React, { useState } from 'react';
import Checkbox from '../components/Checkbox';
import Dropdown from '../components/Dropdown';
import Textbox from '../components/Textbox';
import SubmitButton from '../components/SubmitButton';

import './FilterContainer.css';

import { fetchData } from '../api/apiBigQuery/apiBigQuery';
import { fetchDataFromBackend } from '../api/apiBigQuery/apiBigQuery';

function FilterContainer() {

    const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMorbidity, setSelectedMorbidity] = useState('');
    const [year, setYear] = useState('');



    const handlePaymentSourceChange = (event) => {
        setSelectedPaymentSource(event.target.value);
        alert(`Option selected: ${event.target.value}`);
    };

    const handleAbnormalConditionChange = (event) => {
        setSelectedYear(event.target.value);
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
        await fetchDataFromBackend();
    };


    // Define your options for each dropdown
    const paymentSourceOptions = ['Any', 'Other', 'Medicaid', 'Self Pay', 'Private Insurance', 'Unknown or Not Stated'];
    const yearOptions = ['Any', '2016', '2017', '2018'];
    const searchOptions = ['Ave_Age_of_Mother', 'Ave_Pre_pregnancy_BMI', 'Ave_OE_Gestational_Age_Wks', 'Ave_Birth_Weight_gms', 'Ave_Number_of_Prenatal_Wks', 'Ave_LMP_Gestational_Age_Wks'];




    return (

        <div>
            <div className="FilterContainer">


                <div className="Row">

                    <label className="label">Select Morbidity:</label>
                    <Dropdown options={searchOptionsOptions} selectedOption={selectedMorbidity} handleDropdownChange={handleMorbidityChange} className="filterElement" />

                </div>
                <div className="Row">

                    <label className="label">Select Payment Source:</label>
                    <Dropdown options={paymentSourceOptions} selectedOption={selectedPaymentSource} handleDropdownChange={handlePaymentSourceChange} className="filterElement" />

                </div>
                <div className="Row">

                    <label className="label">Select Year:</label>
                    <Dropdown options={yearOptions} selectedOption={selectedYear} handleDropdownChange={handleAbnormalConditionChange} className="filterElement" />

                </div>


            </div>
            <div className="ButtonContainer">
                <SubmitButton label="Buscar" handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default FilterContainer;