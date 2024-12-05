const { MemoryDBClient, DescribeACLsCommand, DescribeClustersCommand, DescribeParameterGroupsCommand } = require("@aws-sdk/client-memorydb"); // CommonJS import

const config = require('./awsConfig');
const client = new MemoryDBClient(config); // Initialize the MemoryDB client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeACLs() {
    const input = {};

    const command = new DescribeACLsCommand(input);

    try {
        const response = await client.send(command);
        console.log("ACLs:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeACLs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MemoryDB: DescribeACLs", error);    } // Updated error logging
}

async function describeClusters() {
    const input = {};

    const command = new DescribeClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MemoryDB: DescribeClusters", error);    } // Updated error logging
}

async function describeParameterGroups() {
    const input = {};

    const command = new DescribeParameterGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Parameter Groups:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeParameterGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MemoryDB: DescribeParameterGroups", error);    } // Updated error logging
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeACLs,    
        describeClusters, 
        describeParameterGroups, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('memorydb.txt')
}

//  main() 

module.exports = { main };
