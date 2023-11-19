// api.js
import { BigQuery } from '@google-cloud/bigquery';
import path from 'path-browserify';

// Initialize BigQuery client
const bigquery = new BigQuery({
    keyFilename: path.join(__dirname, '../../velezreyes-897d5faa1790.json'),
});

// Function to fetch data from BigQuery
export async function fetchData(query) {
    try {
        // Create a job
        const [job] = await bigquery.createQueryJob({ query });

        // Get query results
        const [rows] = await job.getQueryResults();

        // Perform basic data quality checks
        if (!rows || rows.length === 0) {
            throw new Error('No data returned from query');
        }

        // Return the data
        return rows;
    } catch (error) {
        console.error('Error fetching data from BigQuery', error);
        throw error;
    }
}