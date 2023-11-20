# server.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.cloud import bigquery
import json

app = Flask(__name__)
CORS(app)
client = bigquery.Client.from_service_account_json('./velezreyes-ea51c7c9f7f8.json')

# Specify your public dataset
dataset_id = 'bigquery-public-data.sdoh_cdc_wonder_natality'

# Use the client to fetch the dataset.
dataset = client.get_dataset(dataset_id)  # Make an API request.

print("Fetched dataset {}".format(dataset_id))

# Define a simple query
query = """
    SELECT Ave_Number_of_Prenatal_Wks, SUM(Births) AS Total_Births
    FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_payment`
    WHERE Source_of_Payment = 'Private Insurance' AND EXTRACT(YEAR FROM Year) = 2017
    GROUP BY Ave_Number_of_Prenatal_Wks
    ORDER BY Ave_Number_of_Prenatal_Wks;
"""

# Run the query
query_job = client.query(query)

# Print the results
for row in query_job:
    print(row)

@app.route('/query', methods=['GET'])
def execute_query():
    """
    Executes a query job and returns the results as a JSON response.

    Returns:
        A JSON response containing the query results.
    """
    query_job = client.query(query)  
    results = []
    for row in query_job:
        results.append(dict(row))
    response = {"results": results}
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=3001)