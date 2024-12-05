const { Route53RecoveryControlConfigClient, ListClustersCommand, ListControlPanelsCommand } = require("@aws-sdk/client-route53-recovery-control-config"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new Route53RecoveryControlConfigClient(config); // Create the client using the configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listClusters() {
    const input = {}; // Empty input to list all clusters

    const command = new ListClustersCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Clusters:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Route53RecoveryControlConfig: listClusters", error);    
    }
}

async function listControlPanels() {
    const input = {};

    const command = new ListControlPanelsCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Control Panels:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listControlPanels ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Route53RecoveryControlConfig: listControlPanels", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listClusters,    
        listControlPanels, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('route53-recovery-control-config.txt')
    }
// main()

module.exports = { main };
