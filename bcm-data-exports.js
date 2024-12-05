const { BCMDataExportsClient, ListExportsCommand, ListTablesCommand,  } = require("@aws-sdk/client-bcm-data-exports");
const config = require('./awsConfig');
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';
const client = new BCMDataExportsClient(config);

async function listExports() {
    const input = {}; // No parameters are required; can be left empty or include optional params

    const command = new ListExportsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listExports ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: BCMDataExports: List Exports", error);
    }
}

async function listTables() {
    const input = {}; // No parameters are required; can be left empty or include optional params

    const command = new ListTablesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listTables ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: BCMDataExports: List Tables", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listExports,    
        listTables, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
    }
    saveAllOutputToFile('bcm-data-exports.txt')
}

// main(); 
module.exports = { main };
