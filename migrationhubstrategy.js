const { MigrationHubStrategyClient, ListCollectorsCommand, ListImportFileTaskCommand } = require("@aws-sdk/client-migrationhubstrategy"); // CommonJS import
const config = require('./awsConfig');
const client = new MigrationHubStrategyClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCollectors() {
    const input = {}; // Empty input object to list all collectors

    const command = new ListCollectorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Collectors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCollectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MigrationHubStrategy: ListCollectors", error);    }
}

async function listImportFileTasks() {
    const input = {};

    const command = new ListImportFileTaskCommand(input);

    try {
        const response = await client.send(command);
        console.log("Import File Tasks:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listImportFileTasks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MigrationHubStrategy: ListImportFileTasks", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listCollectors,    
        listImportFileTasks, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('migrationhubstrategy.txt')
}

//  main();

module.exports = { main };
