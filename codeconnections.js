const { CodeConnectionsClient, ListConnectionsCommand, ListHostsCommand, ListRepositoryLinksCommand, } = require("@aws-sdk/client-codeconnections"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CodeConnectionsClient
const client = new CodeConnectionsClient(config);

async function listConnections() {
  const input = {};

  const command = new ListConnectionsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Connections:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listConnections ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeConnections: ListConnections", error);
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
      logger.error("Error: CodeConnections: ListHosts", error);
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
      logger.error("Error: CodeConnections: ListRepositoryLinks", error);
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
      saveAllOutputToFile('codeconnections.txt')
    }
    //  main() 
    module.exports = { main };
