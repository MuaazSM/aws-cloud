const { DAXClient, DescribeClustersCommand, DescribeDefaultParametersCommand, DescribeParameterGroupsCommand } = require("@aws-sdk/client-dax"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new DAXClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeClusters() {
    const input = {}; // Empty input parameter

    const command = new DescribeClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DAX: DescribeClusters", error);    
    }
}

async function describeDefaultParameters() {
    const input = {}; // Empty input parameter

    const command = new DescribeDefaultParametersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Default Parameters:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeDefaultParameters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DAX: DescribeDefaultParameters", error);    
    }
}

async function describeParameterGroups() {
    const input = {}; // Empty input parameter

    const command = new DescribeParameterGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Parameter Groups:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeParameterGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DAX: DescribeParameterGroups", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeClusters,    
        describeDefaultParameters, 
        describeParameterGroups, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('dax.txt')
}

//  main() 

module.exports = { main };
