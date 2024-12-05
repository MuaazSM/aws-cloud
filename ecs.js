const { ECSClient, DescribeCapacityProvidersCommand, DescribeClustersCommand, ListClustersCommand } = require("@aws-sdk/client-ecs"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new ECSClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeCapacityProviders() {
    const input = {}; // Empty input for default behavior

    const command = new DescribeCapacityProvidersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Capacity Providers Description:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeCapacityProviders ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ECS: Describe Capacity Providers", error); // Updated error log format
    }
}

async function describeClusters() {
    const input = {}; // Empty input parameter

    const command = new DescribeClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters Description:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ECS: Describe Clusters", error); // Updated error log format
    }
}

async function listClusters() {
    const input = {}; // Empty input parameter to list all clusters

    const command = new ListClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters List:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ECS: List Clusters", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeCapacityProviders,    
        describeClusters, 
        listClusters, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('ecs.txt')
}

// main() 

module.exports = { main };
