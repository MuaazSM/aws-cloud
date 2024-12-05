const { NetworkMonitorClient, ListMonitorsCommand } = require("@aws-sdk/client-networkmonitor"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new NetworkMonitorClient(config); // Create the Network Monitor client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listMonitors() {
    const input = {};

    const command = new ListMonitorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Monitors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listMonitors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: NetworkMonitor: ListMonitors", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listMonitors,    
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('networkmonitor.txt')
}

//  main(); 

module.exports = { main };
