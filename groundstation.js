const { GroundStationClient, ListConfigsCommand, ListDataflowEndpointGroupsCommand, ListSatellitesCommand } = require("@aws-sdk/client-groundstation"); // CommonJS import
const config = require('./awsConfig');
const client = new GroundStationClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listConfigs() {
    const input = {};

    const command = new ListConfigsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Configurations:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConfigs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: GroundStation: List Configs", error); // Enhanced error log format
    }
}

async function listDataflowEndpointGroups() {
    const input = {};

    const command = new ListDataflowEndpointGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Dataflow Endpoint Groups:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDataflowEndpointGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: GroundStation: List Dataflow Endpoint Groups", error); // Enhanced error log format
    }
}

async function listSatellites() {
    const input = {};

    const command = new ListSatellitesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Satellites:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listSatellites ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: GroundStation: List Satellites", error); // Enhanced error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listConfigs,    
        listDataflowEndpointGroups, 
        listSatellites, 
    ];

    for (const func of functionsToExecute) {
        try {
            await func(); // Await the function call
        } catch (error) {
            console.error(`Error executing ${func.name}:`, error);
            // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('groundstation.txt')
}

//  main() 

module.exports = { main };
