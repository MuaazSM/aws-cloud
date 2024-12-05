const { LocationClient, ListKeysCommand, ListMapsCommand, ListPlaceIndexesCommand, ListRouteCalculatorsCommand } = require("@aws-sdk/client-location"); // CommonJS import
const config = require('./awsConfig');
const client = new LocationClient(config); // Initialize the Location client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listKeys() {
    const input = {}; 
    const command = new ListKeysCommand(input);

    try {
        const response = await client.send(command);
        console.log("Keys List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listKeys ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Location: ListKeys", error); // Updated error logging
    }
}

async function listMaps() {
    const input = {}; 
    const command = new ListMapsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Maps List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listMaps ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Location: ListMaps", error); // Updated error logging
    }
}

async function listPlaceIndexes() {
    const input = {}; 
    const command = new ListPlaceIndexesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Place Indexes List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPlaceIndexes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Location: ListPlaceIndexes", error); // Updated error logging
    }
}

async function listRouteCalculators() {
    const input = {}; 
    const command = new ListRouteCalculatorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Route Calculators List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listRouteCalculators ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Location: ListRouteCalculators", error); // Updated error logging
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listKeys,    
        listMaps, 
        listPlaceIndexes,
        listRouteCalculators,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('location.txt')
}

//  main() 

module.exports = { main };
