const { IoTFleetHubClient, ListApplicationsCommand } = require("@aws-sdk/client-iotfleethub"); // CommonJS import
const config = require('./awsConfig');
const client = new IoTFleetHubClient(config); // Initialize the IoT Fleet Hub client
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listApplications() {
    const input = {}; 

    const command = new ListApplicationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Applications List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listApplications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: IoTFleetHub: listApplications", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listApplications,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('iotfleethub.txt')
    }
    //  main()
    module.exports = { main }