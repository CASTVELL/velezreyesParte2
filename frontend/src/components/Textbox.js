// components/Textbox.js
import React from 'react';

function Textbox({ label, value, handleTextboxChange }) {
    return (
        <div>
            <label>
                {label}
                <input type="text" value={value} onChange={handleTextboxChange} />
            </label>
        </div>
    );
}

export default Textbox;