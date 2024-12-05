const { ConnectClient, ListInstancesCommand } = require("@aws-sdk/client-connect"); // CommonJS import
const config = require('./awsConfig');
const client = new ConnectClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listInstances(nextToken = null, maxResults = null) {
    const input = {};

    const command = new ListInstancesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Instances:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listInstances ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Connect: ListInstances", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listInstances,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('connect.txt')
    }
  //  main()

module.exports = { main };
