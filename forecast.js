const { ForecastClient, ListDatasetGroupsCommand, ListDatasetsCommand, ListExplainabilitiesCommand, ListForecastsCommand, ListMonitorsCommand,
    ListPredictorsCommand } = require("@aws-sdk/client-forecast"); // CommonJS import
const config = require('./awsConfig');
const client = new ForecastClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDatasetGroups() {
    const input = {}; // Empty input object

    const command = new ListDatasetGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Dataset Groups:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDatasetGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Forecast: List Dataset Groups", error); // Updated error log format
    }
}

async function listDatasets() {
    const input = {}; // Empty input object

    const command = new ListDatasetsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Datasets:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDatasets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Forecast: List Datasets", error); // Updated error log format
    }
}

async function listExplainabilities() {
    const input = {}; // Empty input object

    const command = new ListExplainabilitiesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Explainabilities:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listExplainabilities ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Forecast: List Explainabilities", error); // Updated error log format
    }
}

async function listForecasts() {
    const input = {}; // Empty input object

    const command = new ListForecastsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Forecasts:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listForecasts ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Forecast: List Forecasts", error); // Updated error log format
    }
}

async function listMonitors() {
    const input = {}; // Empty input object

    const command = new ListMonitorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Monitors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listMonitors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Forecast: List Monitors", error); // Updated error log format
    }
}

async function listPredictors() {
    const input = {}; // Empty input object

    const command = new ListPredictorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Predictors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPredictors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Forecast: List Predictors", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDatasetGroups,    
        listDatasets, 
        listExplainabilities,
        listForecasts, 
        listMonitors,  
        listPredictors, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('forecast.txt')
}

// main() 

module.exports = { main };
