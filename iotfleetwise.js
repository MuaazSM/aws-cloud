const { IoTFleetWiseClient, ListFleetsCommand, ListSignalCatalogsCommand } = require("@aws-sdk/client-iotfleetwise"); // CommonJS import
const config = require('./awsConfig');
const client = new IoTFleetWiseClient(config); // Initialize the IoT FleetWise client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listFleets() {
    const input = {}; 

    const command = new ListFleetsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Fleets List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFleets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT FleetWise: List Fleets", error);    
    }
}

async function listSignalCatalogs() {
    const input = {}; 

    const command = new ListSignalCatalogsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Signal Catalogs List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listSignalCatalogs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT FleetWise: List Signal Catalogs", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listFleets,    
        listSignalCatalogs, 
    ];
    
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('iotfleetwise.txt')
}

//  main();

module.exports = { main };