---
title: Deploy
---
# Deploy the Books Service
Once you are satisfied with your infrastructure specification and code implementation, we can create a new neuron version to "snapshot" the infrastructure and logic and then
deploy this version to serve traffic.

## Release neuron
To release the neuron, run `alis neuron release {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}`. This will create a new neruon version.

## Deploy neuron
Once we have a neuron version, we can deploy it by running `alis neuron deploy {orgID}.{productID}.{resources|services}-{neuronName}-{neuronVersion}` and selecting the product deployment of choice
or creating a new deployment if one does not exist (follow the prompts offered by the CLI for selecting/creating the product deployment).

Your server will now be available to serve traffic on cloud run. Navigate to the product deployment Google project
on [cloud console](https://console.cloud.google.com) to view the cloud run service.