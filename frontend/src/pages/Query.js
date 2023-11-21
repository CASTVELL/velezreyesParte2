import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DropdownContext } from '../index'; // Import the context

const Query = () => {
    let { id } = useParams();
    // Use the useContext hook to access the state
    const { selectedValue } = useContext(DropdownContext);

    return (
        <div>
            <p>Selected value: {selectedValue}</p>
            {/* Display your query data here */}
        </div>
    );
};

export default Query;