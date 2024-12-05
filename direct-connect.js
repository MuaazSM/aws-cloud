const { DirectConnectClient, DescribeConnectionsCommand, DescribeLocationsCommand } = require("@aws-sdk/client-direct-connect"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new DirectConnectClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeConnections() {
    const input = {}; // Empty input parameter

    const command = new DescribeConnectionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Connections:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeConnections ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DirectConnect: DescribeConnections", error);    
    }
}

async function describeLocations() {
    const input = {}; // Empty input parameter

    const command = new DescribeLocationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Locations:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeLocations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DirectConnect: DescribeLocations", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeConnections,    
        describeLocations, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('direct-connect.txt')
}

//  main() 

module.exports = { main };
