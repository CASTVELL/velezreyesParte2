import React, { useState } from 'react';
import FilterContainer from '../containers/FilterContainer/FilterContainer';
import GraphContainer from '../containers/GraphContainer';
import { useContext } from 'react';
import { DropdownContext } from '../index'; // Import the context

const Home = () => {

    // Use the useContext hook to access the state
    const { selectedValue } = useContext(DropdownContext);

    const [filterValues, setFilterValues] = useState({});

    const handleFilterChange = (newFilterValues) => {
        setFilterValues(newFilterValues);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Public Health Data Exploring Tool</h1>
            <p>Selected value: {selectedValue}</p>
            <FilterContainer onFilterChange={handleFilterChange} />
            <GraphContainer filterValues={filterValues} />
        </div>
    );
}

export default Home;