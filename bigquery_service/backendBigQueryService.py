# server.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.cloud import bigquery
import json

# Initialize Flask and CORS
app = Flask(__name__)
CORS(app)

# Initialize BigQuery client
client = bigquery.Client.from_service_account_json('./velezreyes-ea51c7c9f7f8.json')

# Specify your public dataset
dataset_id = 'bigquery-public-data.sdoh_cdc_wonder_natality'

# Use the client to fetch the dataset.
dataset = client.get_dataset(dataset_id)  # Make an API request.
print("Fetched dataset {}".format(dataset_id))



# Function to create query based on JSON input
def create_query(json_input): 

    search = json_input['selectedSearch']
    payment_source = json_input['selectedPaymentSource']
    year = json_input['selectedYear']

    where_clause = ""
    if payment_source != "All" and year != "All":
        where_clause = f"WHERE Source_of_Payment = '{payment_source}' AND EXTRACT(YEAR FROM Year) = {year}"
    elif payment_source != "All":
        where_clause = f"WHERE Source_of_Payment = '{payment_source}'"
    elif year != "All":
        where_clause = f"WHERE EXTRACT(YEAR FROM Year) = {year}"

    query = f"""
        SELECT {search}, SUM(Births) AS Total_Births
        FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_payment`
        {where_clause}
        GROUP BY {search};
    """
    return query

# Route for executing a predefined query
@app.route('/query', methods=['GET'])
def execute_query():
    query = """
        SELECT Ave_Number_of_Prenatal_Wks, SUM(Births) AS Total_Births
        FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_payment`
        WHERE Source_of_Payment = 'Private Insurance' AND EXTRACT(YEAR FROM Year) = 2017
        GROUP BY Ave_Number_of_Prenatal_Wks
        ORDER BY Ave_Number_of_Prenatal_Wks;
    """
    query_job = client.query(query)  
    results = []
    for row in query_job:
        results.append(dict(row))
    response = {"results": results}
    return jsonify(response)

# Route for executing a query based on POSTed JSON
@app.route('/querysearch', methods=['POST'])
def post_query():
    print(f"request.data: {request.data}")  # Debugging print statement
    print(f"request.headers: {request.headers}")  # Debugging print statement
    json_input = request.get_json()
    print(f"json_input: {json_input}")  # Debugging print statement
    query = create_query(json_input)
    print(f"query: {query}")  # Debugging print statement
    query_job = client.query(query)  
    results = []
    for row in query_job:
        results.append(dict(row))
    response = {"results": results}
    return jsonify(response)

# Main entry point
if __name__ == '__main__':
    app.run(port=3001)