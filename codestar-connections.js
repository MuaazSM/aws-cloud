const { CodeStarConnectionsClient, ListConnectionsCommand, ListHostsCommand, ListRepositoryLinksCommand } = require("@aws-sdk/client-codestar-connections"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const client = new CodeStarConnectionsClient(config); // Create a client instance
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listConnections() {
    const input = {};

    const command = new ListConnectionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Connections:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listConnections ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CodeStarConnections: ListConnections", error);
    }
}

async function listHosts() {
    const input = {};

    const command = new ListHostsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Hosts:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listHosts ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CodeStarConnections: ListHosts", error);
    }
}

async function listRepositoryLinks() {
    const input = {};

    const command = new ListRepositoryLinksCommand(input);

    try {
        const response = await client.send(command);
        console.log("Repository Links:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listRepositoryLinks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CodeStarConnections: ListRepositoryLinks", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listConnections,    
        listHosts, 
        listRepositoryLinks, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('codestar-connections.txt')
    }
    //  main() 
    module.exports = { main };
