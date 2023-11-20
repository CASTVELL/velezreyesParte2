
// Function to make a request to the backend endpoint
export async function fetchDataFromBackend() {
    try {
        const response = await fetch("http://localhost:3001/query");
        const data = await response.json();
        console.log(data); // Do something with the response data
        alert("Data fetched from backend!" + data);
    } catch (error) {
        console.error("Error fetching data from backend:", error);
    }
}

// Call the function to fetch data from the backend
fetchDataFromBackend();
