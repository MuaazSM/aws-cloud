const { TransferClient, ListConnectorsCommand,ListWorkflowsCommand } = require("@aws-sdk/client-transfer"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file (AWS credentials)
const client = new TransferClient(config); // Create the client using the configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listConnectors() {
    const input = {};

    const command = new ListConnectorsCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Connectors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConnectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Transfer: listConnectors", error);    }
}

async function listWorkflows() {
    const input = {};

    const command = new ListWorkflowsCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Workflows:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConnectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Transfer: listWorkflows", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listConnectors,    
        listWorkflows, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('transfer.txt')
    }
    // main()
    module.exports = { main };