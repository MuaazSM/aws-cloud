const { OpenSearchClient, ListApplicationsCommand, ListDomainNamesCommand, ListVersionsCommand, ListVpcEndpointsCommand } = require("@aws-sdk/client-opensearch"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new OpenSearchClient(config); // Create the OpenSearch client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';


async function listApplications() {
    const input = {};

    const command = new ListApplicationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Applications:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listApplications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: OpenSearch: ListApplications", error);    }
}

async function listDomainNames() {
    const input = {}; // Empty input object to list all domain names

    const command = new ListDomainNamesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Domain Names:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDomainNames ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: OpenSearch: ListDomainNames", error);    }
}

async function listVersions() {
    const input = {}; // Empty input object to list all versions

    const command = new ListVersionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Versions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listVersions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: OpenSearch: ListVersions", error);    }
}

async function listVpcEndpoints() {
    const input = {}; // Empty input object to list all VPC endpoints

    const command = new ListVpcEndpointsCommand(input);

    try {
        const response = await client.send(command);
        console.log("VPC Endpoints:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listVpcEndpoints ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: OpenSearch: ListVpcEndpoints", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listApplications,    
        listDomainNames, 
        listVersions, 
        listVpcEndpoints, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('opensearch.txt')
}

//  main(); 

module.exports = { main };
