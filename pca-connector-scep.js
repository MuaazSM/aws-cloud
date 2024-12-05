const { PcaConnectorScepClient, ListConnectorsCommand } = require("@aws-sdk/client-pca-connector-scep"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new PcaConnectorScepClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = ''

async function listConnectors() {
    const input = {}; // Empty input object to list all connectors

    const command = new ListConnectorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Connectors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConnectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: PCA Connector SCEP:", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listConnectors,    

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('pca-connector-scep.txt')
    }
// main()

module.exports = { main };
