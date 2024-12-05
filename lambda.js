const { LambdaClient, GetAccountSettingsCommand, ListCodeSigningConfigsCommand, ListEventSourceMappingsCommand, ListFunctionsCommand,
    ListLayersCommand,
} = require("@aws-sdk/client-lambda"); // CommonJS import

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new LambdaClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function getAccountSettings() {
    const input = {}; // No specific inputs

    const command = new GetAccountSettingsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountSettings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: GetAccountSettingsCommand failed", error);
    }
}

async function listCodeSigningConfigs() {
    const input = {};

    const command = new ListCodeSigningConfigsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listCodeSigningConfigs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ListCodeSigningConfigsCommand failed", error);
    }
}

async function listEventSourceMappings() {
    const input = {};

    const command = new ListEventSourceMappingsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listEventSourceMappings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ListEventSourceMappingsCommand failed", error);
    }
}

async function listFunctions() {
    const input = {};

    const command = new ListFunctionsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listFunctions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ListFunctionsCommand failed", error);
    }
}

async function listLayers() {
    const input = {};

    const command = new ListLayersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listLayers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ListLayersCommand failed", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        getAccountSettings,
        listCodeSigningConfigs,
        listEventSourceMappings,
        listFunctions,
        listLayers,
    ];

    for (const func of functionsToExecute) {
        try {
            await func(); // Await the function call
        } catch (error) {
            console.error(`Error executing ${func.name}:`, error);
            //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('lambda.txt')
}

//  main();

module.exports = { main };
