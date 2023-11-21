/**
 * apiBigQuery.js
 * This module contains functions to interact with the backend.
 */

/**
 * Fetch data from the backend.
 * This function sends a GET request to the backend and logs the response.
 */
export async function fetchDataFromBackend() {
    try {
        const response = await fetch("http://localhost:3001/query");
        const data = await response.json();
        console.log(data); // Do something with the response data
    } catch (error) {
        console.error("Error fetching data from backend:", error);
    }
}

/**
 * Send data to the backend.
 * This function sends a POST request with JSON data to the backend and logs the response.
 * jsonData - Is the data to send to the backend.
 */
export async function sendDataToBackend(jsonData) {
    console.log("JSON data:", JSON.stringify(jsonData));  // Debugging print statement
    try {

        const response = await fetch("http://localhost:3001/querysearch", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        const data = await response.json();
        alert("The final result is: " + data);
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error sending data to backend:", error);
    }
}