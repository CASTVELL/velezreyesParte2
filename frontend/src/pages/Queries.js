import React, { useContext } from 'react';
import { DropdownContext } from '../index'; // Import the context

const Queries = () => {
    // Use the useContext hook to access the state
    const { selectedValue } = useContext(DropdownContext);

    return (
        <div>

            <h1>All Queries</h1>
            <p>Selected value: {selectedValue}</p>
            {/* Display your list of queries here */}

        </div>
    );
};

export default Queries;