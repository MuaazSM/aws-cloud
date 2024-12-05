const { GreengrassClient, ListBulkDeploymentsCommand, ListConnectorDefinitionsCommand, ListCoreDefinitionsCommand,
    ListDeviceDefinitionsCommand, ListFunctionDefinitionsCommand, ListGroupsCommand, ListLoggerDefinitionsCommand,
    ListResourceDefinitionsCommand  
} = require("@aws-sdk/client-greengrass"); // CommonJS import
const config = require('./awsConfig');
const client = new GreengrassClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listBulkDeployments() {
    const input = {};

    const command = new ListBulkDeploymentsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Bulk Deployments:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listBulkDeployments ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Bulk Deployments", error); // Updated error log format
    }
}

async function listConnectorDefinitions() {
    const input = {};

    const command = new ListConnectorDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Connector Definitions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConnectorDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Connector Definitions", error); // Updated error log format
    }
}

async function listCoreDefinitions() {
    const input = {};

    const command = new ListCoreDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Core Definitions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCoreDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Core Definitions", error); // Updated error log format
    }
}

async function listDeviceDefinitions() {
    const input = {};

    const command = new ListDeviceDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Device Definitions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDeviceDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Device Definitions", error); // Updated error log format
    }
}

async function listFunctionDefinitions() {
    const input = {};

    const command = new ListFunctionDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Function Definitions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFunctionDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Function Definitions", error); // Updated error log format
    }
}

async function listGroups() {
    const input = {};

    const command = new ListGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Groups:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Groups", error); // Updated error log format
    }
}

async function listLoggerDefinitions() {
    const input = {};

    const command = new ListLoggerDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Logger Definitions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listLoggerDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Logger Definitions", error); // Updated error log format
    }
}

async function listResourceDefinitions() {
    const input = {};

    const command = new ListResourceDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Resource Definitions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listResourceDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Greengrass: List Resource Definitions", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listBulkDeployments,    
        listConnectorDefinitions, 
        listCoreDefinitions, 
        listDeviceDefinitions, 
        listFunctionDefinitions, 
        listGroups, 
        listLoggerDefinitions, 
        listResourceDefinitions, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('greengrass.txt')
}

//  main() 

module.exports = { main };
