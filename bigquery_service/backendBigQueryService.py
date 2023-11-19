# server.py
from flask import Flask, jsonify, request
from google.cloud import bigquery



app = Flask(__name__)
client = bigquery.Client.from_service_account_json('./velezreyes-ea51c7c9f7f8.json')

# Specify your public dataset
dataset_id = 'bigquery-public-data.sdoh_cdc_wonder_natality'

# Use the client to fetch the dataset.
dataset = client.get_dataset(dataset_id)  # Make an API request.

print("Fetched dataset {}".format(dataset_id))

# Define a simple query
query = """

    SELECT Source_of_Payment, SUM(Births) AS Total_Births
    FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_payment`
    WHERE EXTRACT(YEAR FROM Year) = 2017
    GROUP BY Source_of_Payment
    LIMIT 40

"""

# Run the query
query_job = client.query(query)

# Print the results
for row in query_job:
    print(row)

if __name__ == '__main__':
    app.run(port=3001)