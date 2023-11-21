import React, { useState } from 'react';
import { createQuery } from '../api/apiPostgreSQL/apiPostgreSQL';

const SaveQueryButton = ({ selectedValue, filterValues }) => {
    const [showForm, setShowForm] = useState(false);
    const [queryName, setQueryName] = useState('');
    const [queryDescription, setQueryDescription] = useState('');

    const handleSave = async (event) => {
        event.preventDefault(); // prevent form from refreshing the page
        const data = {
            name: queryName,
            user_id: selectedValue,
            query_data: filterValues,
        };
        const response = await createQuery(data);
        console.log(response);
        //console.log(data);
        alert("Query saved! The data is, name: " + queryName + ", user_id: " + selectedValue + ", query_data: " + JSON.stringify(filterValues));
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <>
            {!showForm && <button onClick={() => setShowForm(true)}>Save Query</button>}
            {showForm && (
                <form onSubmit={handleSave} style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <label>
                        Query Name:
                        <input type="text" value={queryName} onChange={e => setQueryName(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={queryDescription} onChange={e => setQueryDescription(e.target.value)} />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            )}
        </>
    );
};

export default SaveQueryButton;