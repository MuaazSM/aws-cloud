const { PCSClient, ListClustersCommand } = require("@aws-sdk/client-pcs"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new PCSClient(config); // Create the PCS client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listClusters() {
    const input = {};

    const command = new ListClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: PCS: listClusters", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listClusters,    

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('pcs.txt')
    }
// main()

module.exports = { main };
