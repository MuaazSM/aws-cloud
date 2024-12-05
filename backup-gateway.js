// index.js
const { BackupGatewayClient, ListGatewaysCommand, ListHypervisorsCommand, ListVirtualMachinesCommand, } = require("@aws-sdk/client-backup-gateway");
const config = require('./awsConfig');
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const client = new BackupGatewayClient(config);

async function listGateways() {
    const input = {}; // No parameters are required for this command
    const command = new ListGatewaysCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listGateways ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: BackupGateway: List Gateways", error);
    }
}

async function listHypervisors() {
    const input = {}; // No parameters are required for this command
    const command = new ListHypervisorsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listHypervisors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: BackupGateway: List Hypervisors", error);
    }
}

async function listVirtualMachines() {
    const input = {}; // Initialize as empty; parameters can be added as needed
    const command = new ListVirtualMachinesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listVirtualMachines ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: BackupGateway: List Virtual Machines", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listGateways,    
        listHypervisors,
        listVirtualMachines,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
      }
      saveAllOutputToFile('backup-gateway.txt')
    }
 //main() 

module.exports = { main };
