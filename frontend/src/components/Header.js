import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownContext } from '../index'; // Import the context

const Header = () => {
    // Use the useContext hook to access the state and the setter function
    const { selectedValue, setSelectedValue } = useContext(DropdownContext);

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/queries">Saved Queries</NavLink>
            </div>
            <div>
                <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>
        </header>
    );
};

export default Header;