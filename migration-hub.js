const { MigrationHubClient, ListApplicationStatesCommand, ListMigrationTasksCommand } = require("@aws-sdk/client-migration-hub"); // CommonJS import
const config = require('./awsConfig');
const client = new MigrationHubClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listApplicationStates() {
    const input = {}; // No parameters needed to list all application states

    const command = new ListApplicationStatesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Application States:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listApplicationStates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MigrationHub: ListApplicationStates", error);    }
}

async function listMigrationTasks() {
    const input = {};

    const command = new ListMigrationTasksCommand(input);

    try {
        const response = await client.send(command);
        console.log("Migration Tasks:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listMigrationTasks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MigrationHub: ListMigrationTasks", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listApplicationStates,    
        listMigrationTasks, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('migration-hub.txt')
}

//  main(); 

module.exports = { main };
