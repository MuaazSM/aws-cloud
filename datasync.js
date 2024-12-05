const { DataSyncClient, ListAgentsCommand, ListDiscoveryJobsCommand, ListTaskExecutionsCommand } = require("@aws-sdk/client-datasync"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new DataSyncClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAgents() {
    const input = {}; // Empty input parameter

    const command = new ListAgentsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Agents:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listAgents ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataSync: ListAgents", error);    
    }
}

async function listDiscoveryJobs() {
    const input = {}; // Empty input parameter

    const command = new ListDiscoveryJobsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Discovery Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listDiscoveryJobs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataSync: ListDiscoveryJobs", error);    
    }
}

async function listTaskExecutions() {
    const input = {}; // Empty input parameter

    const command = new ListTaskExecutionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Task Executions:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listTaskExecutions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataSync: ListTaskExecutions", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAgents,    
        listDiscoveryJobs, 
        listTaskExecutions,
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('datasync.txt')
}

//  main() 

module.exports = { main };
