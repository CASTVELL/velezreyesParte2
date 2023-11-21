// components/SubmitButton.js
import React from 'react';

function SubmitButton({ label, handleSubmit, nombre }) {
    return (
        <div>
            <button name={nombre} onClick={handleSubmit}>{label}</button>
        </div>
    );
}

export default SubmitButton;