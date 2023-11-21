import React, { useState, useCallback, useContext } from 'react';
import FilterContainer from '../containers/FilterContainer/FilterContainer';
import GraphContainer from '../containers/GraphContainer';
import SaveQueryButton from '../components/SaveQueryButton';
import { DropdownContext } from '../index'; // Import the context

const Home = () => {

    // Use the useContext hook to access the state
    const { selectedValue } = useContext(DropdownContext);

    const [filterValues, setFilterValues] = useState({});

    const handleFilterChange = useCallback((newFilterValues) => {
        setFilterValues(newFilterValues);
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Public Health Data Exploring Tool</h1>
            <p>Selected value: {selectedValue}</p>
            <FilterContainer onFilterChange={handleFilterChange} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SaveQueryButton selectedValue={selectedValue} filterValues={filterValues} />
            </div>
            <GraphContainer filterValues={filterValues} />
        </div>
    );
}

export default Home;