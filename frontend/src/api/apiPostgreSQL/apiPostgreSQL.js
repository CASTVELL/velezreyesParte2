const API_URL = 'http://localhost:3000';

// Function to get all queries
export async function getQueries() {
    const response = await fetch(`${API_URL}/query`);
    const data = await response.json();
    return data;
}

// Function to create a new query
export async function createQuery(query) {
    const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
    });
    const data = await response.json();
    return data;
}

// Function to get a specific query
export async function getQuery(queryId) {
    const response = await fetch(`${API_URL}/query/${queryId}`);
    const data = await response.json();
    return data;
}

// Function to update a specific query
export async function updateQuery(queryId, updatedQuery) {
    const response = await fetch(`${API_URL}/query/${queryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuery),
    });
    const data = await response.json();
    return data;
}

// Function to delete a specific query
export async function deleteQuery(queryId) {
    const response = await fetch(`${API_URL}/query/${queryId}`, {
        method: 'DELETE',
    });
    return response.ok;
}

// Function to get all comments
export async function getComments() {
    const response = await fetch(`${API_URL}/comment`);
    const data = await response.json();
    return data;
}

// Function to create a new comment
export async function createComment(comment) {
    const response = await fetch(`${API_URL}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    const data = await response.json();
    return data;
}

// Function to get a specific comment
export async function getComment(commentId) {
    const response = await fetch(`${API_URL}/comment/${commentId}`);
    const data = await response.json();
    return data;
}

// Function to update a specific comment
export async function updateComment(commentId, updatedComment) {
    const response = await fetch(`${API_URL}/comment/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedComment),
    });
    const data = await response.json();
    return data;
}

// Function to delete a specific comment
export async function deleteComment(commentId) {
    const response = await fetch(`${API_URL}/comment/${commentId}`, {
        method: 'DELETE',
    });
    return response.ok;
}