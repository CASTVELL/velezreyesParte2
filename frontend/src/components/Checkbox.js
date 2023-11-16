// components/Checkbox.js
import React from 'react';

function Checkbox({ label, isChecked, handleCheckboxChange }) {
    return (
        <div>
            <label>
                {label}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </label>
        </div>
    );
}

export default Checkbox;