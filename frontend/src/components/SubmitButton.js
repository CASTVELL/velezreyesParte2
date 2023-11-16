// components/SubmitButton.js
import React from 'react';

function SubmitButton({ label, handleSubmit }) {
    return (
        <div>
            <button onClick={handleSubmit}>{label}</button>
        </div>
    );
}

export default SubmitButton;