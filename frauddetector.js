const { FraudDetectorClient, GetBatchPredictionJobsCommand, GetDetectorsCommand, GetEventTypesCommand,
    GetLabelsCommand } = require("@aws-sdk/client-frauddetector"); // CommonJS import
const config = require('./awsConfig');
const client = new FraudDetectorClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function getBatchPredictionJobs() {
    const input = {};

    const command = new GetBatchPredictionJobsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Batch Prediction Jobs:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getBatchPredictionJobs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: FraudDetector: Get Batch Prediction Jobs", error); // Updated error log format
    }
}

async function getDetectors() {
    const input = {};

    const command = new GetDetectorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Detectors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getDetectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: FraudDetector: Get Detectors", error); // Updated error log format
    }
}

async function getEventTypes() {
    const input = {};

    const command = new GetEventTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Event Types:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getEventTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: FraudDetector: Get Event Types", error); // Updated error log format
    }
}

async function getLabels() {
    const input = {};

    const command = new GetLabelsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Labels:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getLabels ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: FraudDetector: Get Labels", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}


async function main() {
    const functionsToExecute = [
        getBatchPredictionJobs,    
        getDetectors, 
        getEventTypes, 
        getLabels, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('frauddetector.txt')
}

// main() 

module.exports = { main };
