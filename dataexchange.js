const { DataExchangeClient, ListDataGrantsCommand, ListEventActionsCommand } = require("@aws-sdk/client-dataexchange"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new DataExchangeClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDataGrants() {
    const input = {}; // Empty input parameter

    const command = new ListDataGrantsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Data Grants:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listDataGrants ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataExchange: ListDataGrants", error);    
    }
}

async function listEventActions() {
    const input = {}; // Empty input parameter

    const command = new ListEventActionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Event Actions:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listEventActions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataExchange: ListEventActions", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDataGrants,    
        listEventActions, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('dataexchange.txt')
}

//  main() 

module.exports = { main };
