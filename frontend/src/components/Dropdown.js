// components/Dropdown.js
import React from 'react';

function Dropdown({ label, options, selectedOption, handleDropdownChange }) {
    return (
        <div>
            <label>
                {label}
                <select value={selectedOption} onChange={handleDropdownChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default Dropdown;